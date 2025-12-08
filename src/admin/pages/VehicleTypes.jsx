import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import { vehicleTypeService } from '../../services/vehicleTypeService';
import { showSuccess, showError, showConfirm } from '../../utils/sweetalert';

export default function VehicleTypes() {
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon: 'fas fa-bus',
        capacity: '',
        size: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await vehicleTypeService.getAll();
            setVehicleTypes(data);
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
            description: '',
            icon: 'fas fa-bus',
            capacity: '',
            size: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            description: item.description,
            icon: item.icon || 'fas fa-bus',
            capacity: item.capacity || '',
            size: item.size || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        const confirmed = await showConfirm('ข้อมูลจะถูกลบอย่างถาวร', 'ต้องการลบประเภทรถนี้?');
        if (!confirmed) return;

        try {
            await vehicleTypeService.delete(id);
            loadData();
            showSuccess('ลบข้อมูลสำเร็จ');
        } catch (error) {
            showError('เกิดข้อผิดพลาด: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingItem) {
                await vehicleTypeService.update(editingItem.id, formData);
                showSuccess('แก้ไขข้อมูลสำเร็จ');
            } else {
                await vehicleTypeService.create(formData);
                showSuccess('เพิ่มข้อมูลสำเร็จ');
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
                    <h3 className="text-xl font-bold text-gray-700">จัดการประเภทรถ</h3>
                    <p className="text-gray-500 text-sm">จำนวนทั้งหมด: {vehicleTypes.length} รายการ</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i>
                    เพิ่มประเภทรถ
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Icon</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อประเภทรถ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ความจุ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ขนาด</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {vehicleTypes.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">{item.id}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <i className={`${item.icon} text-2xl text-gold-500`}></i>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{item.capacity || '-'} ที่นั่ง</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{item.size || '-'} เมตร</td>
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

                    {vehicleTypes.length === 0 && (
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
                title={editingItem ? 'แก้ไขประเภทรถ' : 'เพิ่มประเภทรถใหม่'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อประเภทรถ *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">คำอธิบาย *</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                            required
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Font Awesome)</label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                                placeholder="fas fa-bus"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ความจุ (ที่นั่ง)</label>
                            <input
                                type="number"
                                value={formData.capacity}
                                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ขนาด (เมตร)</label>
                            <input
                                type="text"
                                value={formData.size}
                                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                            />
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
