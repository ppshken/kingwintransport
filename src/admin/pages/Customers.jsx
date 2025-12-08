import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import { customerService } from '../../services/customerService';
import { showSuccess, showError, showConfirm } from '../../utils/sweetalert';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        logo_url: '',
        is_active: true,
        display_order: 0
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await customerService.getAll();
            setCustomers(data);
        } catch (error) {
            showError('เกิดข้อผิดพลาดในการโหลดข้อมูล: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingItem(null);
        setFormData({
            name: '',
            logo_url: '',
            is_active: true,
            display_order: 0
        });
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            logo_url: item.logo_url || '',
            is_active: item.is_active,
            display_order: item.display_order || 0
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        const confirmed = await showConfirm('ข้อมูลจะถูกลบอย่างถาวร', 'ต้องการลบลูกค้านี้?');
        if (!confirmed) return;

        try {
            await customerService.delete(id);
            loadData();
            showSuccess('ลบลูกค้าสำเร็จ');
        } catch (error) {
            showError('เกิดข้อผิดพลาด: ' + error.message);
        }
    };

    const handleToggleActive = async (id, currentStatus) => {
        try {
            const customer = customers.find(c => c.id === id);
            await customerService.update(id, { ...customer, is_active: !currentStatus });
            loadData();
        } catch (error) {
            alert('เกิดข้อผิดพลาด: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingItem) {
                await customerService.update(editingItem.id, formData);
                showSuccess('แก้ไขข้อมูลลูกค้าสำเร็จ');
            } else {
                await customerService.create(formData);
                showSuccess('เพิ่มลูกค้าสำเร็จ');
            }
            setIsModalOpen(false);
            loadData();
        } catch (error) {
            showError('เกิดข้อผิดพลาด: ' + error.message);
        }
    };

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-700">จัดการลูกค้า</h3>
                    <p className="text-gray-500 text-sm">จำนวนทั้งหมด: {customers.length} รายการ</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i>
                    เพิ่มลูกค้า
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อลูกค้า</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Logo URL</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ลำดับ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {customers.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">{item.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.name}</td>
                                    <td className="px-6 py-4 text-sm text-blue-600 truncate max-w-xs">{item.logo_url || '-'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{item.display_order}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <button
                                            onClick={() => handleToggleActive(item.id, item.is_active)}
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${item.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {item.is_active ? 'Active' : 'Inactive'}
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

                    {customers.length === 0 && (
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
                title={editingItem ? 'แก้ไขลูกค้า' : 'เพิ่มลูกค้าใหม่'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อลูกค้า *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                        <input
                            type="url"
                            value={formData.logo_url}
                            onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                            placeholder="https://example.com/logo.png"
                        />
                        <p className="text-xs text-gray-500 mt-1">URL รูป logo ของลูกค้า</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ลำดับการแสดงผล</label>
                            <input
                                type="number"
                                value={formData.display_order}
                                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
                            <select
                                value={formData.is_active}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'true' })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
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
