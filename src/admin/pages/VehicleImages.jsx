import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import { vehicleImageService } from '../../services/vehicleImageService';
import { vehicleTypeService } from '../../services/vehicleTypeService';
import { showSuccess, showError, showConfirm } from '../../utils/sweetalert';

export default function VehicleImages() {
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [groupedImages, setGroupedImages] = useState({});
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        vehicle_type_id: '',
        category: 'exterior',
        display_order: 0
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            // Load vehicle types first
            const types = await vehicleTypeService.getAll();
            setVehicleTypes(types);

            // Load all images and group by vehicle type
            const allImages = await vehicleImageService.getAll();

            // Group images by vehicle_type_id
            const grouped = {};
            allImages.forEach(image => {
                if (!grouped[image.vehicle_type_id]) {
                    grouped[image.vehicle_type_id] = [];
                }
                grouped[image.vehicle_type_id].push(image);
            });

            setGroupedImages(grouped);
        } catch (error) {
            showError('เกิดข้อผิดพลาดในการโหลดข้อมูล: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = (vehicleTypeId = null) => {
        setSelectedFile(null);
        setFormData({
            vehicle_type_id: vehicleTypeId || vehicleTypes[0]?.id || '',
            category: 'exterior',
            display_order: 0
        });
        setIsModalOpen(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                showError('ไฟล์มีขนาดใหญ่เกิน 5MB');
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = await showConfirm('รูปภาพจะถูกลบออกจากระบบ', 'ต้องการลบรูปภาพนี้?');
        if (!confirmed) return;

        try {
            await vehicleImageService.delete(id);
            loadData();
            showSuccess('ลบรูปภาพสำเร็จ');
        } catch (error) {
            showError('เกิดข้อผิดพลาด: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            showError('กรุณาเลือกไฟล์รูปภาพ');
            return;
        }

        try {
            const uploadFormData = new FormData();
            uploadFormData.append('image', selectedFile);
            uploadFormData.append('vehicle_type_id', formData.vehicle_type_id);
            uploadFormData.append('category', formData.category);
            uploadFormData.append('display_order', formData.display_order);

            await vehicleImageService.upload(uploadFormData);
            showSuccess('อัปโหลดรูปภาพสำเร็จ');
            setIsModalOpen(false);
            loadData();
        } catch (error) {
            showError('เกิดข้อผิดพลาด: ' + error.message);
        }
    };

    const getCategoryBadge = (category) => {
        const badges = {
            exterior: 'bg-blue-100 text-blue-800',
            interior: 'bg-green-100 text-green-800',
            facility: 'bg-purple-100 text-purple-800',
            gallery: 'bg-orange-100 text-orange-800'
        };
        const labels = {
            exterior: 'ภายนอก',
            interior: 'ภายใน',
            facility: 'สิ่งอำนวยความสะดวก',
            gallery: 'แกลเลอรี่'
        };
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${badges[category]}`}>
                {labels[category]}
            </span>
        );
    };

    const getTotalImages = () => {
        return Object.values(groupedImages).reduce((sum, images) => sum + images.length, 0);
    };

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-700">จัดการรูปภาพรถ</h3>
                    <p className="text-gray-500 text-sm">จำนวนทั้งหมด: {getTotalImages()} รูป</p>
                </div>
                <button
                    onClick={() => handleAdd()}
                    className="px-6 py-2 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                    <i className="fas fa-upload"></i>
                    อัปโหลดรูป
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <i className="fas fa-spinner fa-spin text-4xl text-gold-500"></i>
                </div>
            ) : vehicleTypes.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg">
                    <i className="fas fa-inbox text-6xl text-gray-400 mb-4"></i>
                    <p className="text-gray-500">ยังไม่มีประเภทรถ</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {vehicleTypes.map((vehicleType) => {
                        const images = groupedImages[vehicleType.id] || [];

                        return (
                            <div key={vehicleType.id} className="bg-white rounded-lg shadow-sm p-6">
                                {/* Vehicle Type Header */}
                                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                                    <div className="flex items-center gap-4">
                                        <i className={`${vehicleType.icon} text-3xl text-gold-500`}></i>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-800">{vehicleType.name}</h4>
                                            <p className="text-sm text-gray-500">
                                                {images.length} รูปภาพ
                                                {vehicleType.capacity && ` • ${vehicleType.capacity} ที่นั่ง`}
                                                {vehicleType.size && ` • ${vehicleType.size} เมตร`}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleAdd(vehicleType.id)}
                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium"
                                    >
                                        <i className="fas fa-plus mr-2"></i>
                                        เพิ่มรูป
                                    </button>
                                </div>

                                {/* Images Grid */}
                                {images.length === 0 ? (
                                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                                        <i className="fas fa-image text-4xl text-gray-300 mb-2"></i>
                                        <p className="text-gray-400 text-sm">ยังไม่มีรูปภาพสำหรับรถประเภทนี้</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {images.map((image) => (
                                            <div
                                                key={image.id}
                                                className="relative group rounded-lg overflow-hidden border-2 border-gray-200 hover:border-gold-500 transition-all"
                                            >
                                                <div className="aspect-square bg-gray-100 relative">
                                                    <img
                                                        src={`http://localhost:5000${image.image_url}`}
                                                        alt={`Image ${image.id}`}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                                        }}
                                                    />

                                                    {/* Delete Button Overlay */}
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button
                                                            onClick={() => handleDelete(image.id)}
                                                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium"
                                                        >
                                                            <i className="fas fa-trash mr-1"></i>
                                                            ลบ
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Image Info */}
                                                <div className="p-2 bg-white">
                                                    <div className="flex items-center justify-between">
                                                        {getCategoryBadge(image.category)}
                                                        <span className="text-xs text-gray-400">#{image.display_order}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Upload Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="อัปโหลดรูปภาพรถ"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">เลือกรูปภาพ *</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">ขนาดไม่เกิน 5MB, รองรับ JPG, PNG, WebP</p>
                    </div>

                    {selectedFile && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-700">
                                <i className="fas fa-file-image text-gold-500 mr-2"></i>
                                {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                            </p>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ประเภทรถ *</label>
                        <select
                            value={formData.vehicle_type_id}
                            onChange={(e) => setFormData({ ...formData, vehicle_type_id: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                            required
                        >
                            {vehicleTypes.map(vt => (
                                <option key={vt.id} value={vt.id}>{vt.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่ *</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                            >
                                <option value="exterior">ภายนอก</option>
                                <option value="interior">ภายใน</option>
                                <option value="facility">สิ่งอำนวยความสะดวก</option>
                                <option value="gallery">แกลเลอรี่</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ลำดับ</label>
                            <input
                                type="number"
                                value={formData.display_order}
                                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-lg"
                        >
                            <i className="fas fa-upload mr-2"></i>
                            อัปโหลด
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
