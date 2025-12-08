import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import { articleService } from '../../services/articleService';
import { showSuccess, showError, showConfirm } from '../../utils/sweetalert';

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        featured_image: '',
        is_featured: false,
        is_published: true
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await articleService.getAll(1, 100);
            setArticles(response.data || []);
        } catch (error) {
            showError('เกิดข้อผิดพลาดในการโหลดข้อมูล: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingItem(null);
        setFormData({
            title: '',
            excerpt: '',
            content: '',
            featured_image: '',
            is_featured: false,
            is_published: true
        });
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            excerpt: item.excerpt || '',
            content: item.content,
            featured_image: item.featured_image || '',
            is_featured: item.is_featured,
            is_published: item.is_published
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        const confirmed = await showConfirm('บทความจะถูกลบอย่างถาวร', 'ต้องการลบบทความนี้?');
        if (!confirmed) return;

        try {
            await articleService.delete(id);
            loadData();
            showSuccess('ลบบทความสำเร็จ');
        } catch (error) {
            showError('เกิดข้อผิดพลาด: ' + error.message);
        }
    };

    const handleToggleFeatured = async (id, currentStatus) => {
        try {
            const article = articles.find(a => a.id === id);
            await articleService.update(id, { ...article, is_featured: !currentStatus });
            loadData();
        } catch (error) {
            alert('เกิดข้อผิดพลาด: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingItem) {
                await articleService.update(editingItem.id, formData);
                showSuccess('แก้ไขบทความสำเร็จ');
            } else {
                await articleService.create(formData);
                showSuccess('เพิ่มบทความสำเร็จ');
            }
            setIsModalOpen(false);
            loadData();
        } catch (error) {
            showError('เกิดข้อผิดพลาด: ' + error.message);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('th-TH');
    };

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-700">จัดการบทความ</h3>
                    <p className="text-gray-500 text-sm">จำนวนทั้งหมด: {articles.length} รายการ</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i>
                    เพิ่มบทความ
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <i className="fas fa-spinner fa-spin text-4xl text-gold-500"></i>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อบทความ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {articles.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">{item.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium max-w-xs truncate">{item.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{item.slug}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {formatDate(item.published_at || item.created_at)}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <button
                                            onClick={() => handleToggleFeatured(item.id, item.is_featured)}
                                            className={`px-3 py-1 rounded-full text-xs font-medium text-gray-500 ${item.is_featured
                                                ? 'bg-gold-100 text-gold-800'
                                                : 'bg-gray-100 text-gray-500'
                                                }`}
                                        >
                                            {item.is_featured ? '⭐ Featured' : 'Normal'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-right space-x-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs"
                                        >
                                            <i className="fas fa-edit mr-1"></i>
                                            แก้ไข
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                                        >
                                            <i className="fas fa-trash mr-1"></i>
                                            ลบ
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {articles.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <i className="fas fa-inbox text-4xl mb-2 block"></i>
                            ยังไม่มีข้อมูล
                        </div>
                    )}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingItem ? 'แก้ไขบทความ' : 'เพิ่มบทความใหม่'}
                size="lg"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อบทความ *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Slug จะถูกสร้างอัตโนมัติจากชื่อบทความ</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">บทนำ *</label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                            placeholder="สรุปสั้นๆ ของบทความ"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">เนื้อหา *</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            rows="8"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                            placeholder="เนื้อหาเต็มของบทความ"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">รูปภาพหลัก (URL)</label>
                        <input
                            type="url"
                            value={formData.featured_image}
                            onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_featured"
                                checked={formData.is_featured}
                                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                className="w-4 h-4 text-gold-500 border-gray-300 rounded focus:ring-gold-500"
                            />
                            <label htmlFor="is_featured" className="ml-2 text-sm text-gray-700">
                                ⭐ บทความแนะนำ (Featured)
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_published"
                                checked={formData.is_published}
                                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                                className="w-4 h-4 text-gold-500 border-gray-300 rounded focus:ring-gold-500"
                            />
                            <label htmlFor="is_published" className="ml-2 text-sm text-gray-700">
                                เผยแพร่
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-lg"
                        >
                            <i className="fas fa-save mr-2"></i>
                            บันทึก
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold rounded-lg"
                        >
                            ยกเลิก
                        </button>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
