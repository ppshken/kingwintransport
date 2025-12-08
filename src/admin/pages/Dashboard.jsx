import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { vehicleTypeService } from '../../services/vehicleTypeService';
import { serviceService } from '../../services/serviceService';
import { customerService } from '../../services/customerService';
import { articleService } from '../../services/articleService';
import { contactService } from '../../services/contactService';

export default function Dashboard() {
    const [stats, setStats] = useState({
        vehicleTypes: 0,
        services: 0,
        customers: 0,
        articles: 0,
        contacts: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const [vehicleTypes, services, customers, articles, contacts] = await Promise.all([
                vehicleTypeService.getAll(),
                serviceService.getAll(),
                customerService.getAll(),
                articleService.getAll(1, 100),
                contactService.getAll()
            ]);

            setStats({
                vehicleTypes: vehicleTypes.length,
                services: services.length,
                customers: customers.length,
                articles: articles.total || articles.data?.length || 0,
                contacts: contacts.length
            });
        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: 'ประเภทรถ', value: stats.vehicleTypes, icon: 'fas fa-bus', color: 'bg-blue-500' },
        { label: 'บริการ', value: stats.services, icon: 'fas fa-concierge-bell', color: 'bg-green-500' },
        { label: 'ลูกค้า', value: stats.customers, icon: 'fas fa-users', color: 'bg-purple-500' },
        { label: 'บทความ', value: stats.articles, icon: 'fas fa-newspaper', color: 'bg-orange-500' },
        { label: 'ข้อความติดต่อ', value: stats.contacts, icon: 'fas fa-envelope', color: 'bg-red-500' },
    ];

    return (
        <AdminLayout>
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-700 mb-2">สรุปภาพรวม</h3>
                <p className="text-gray-500">ข้อมูลสถิติทั้งหมดในระบบ</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <i className="fas fa-spinner fa-spin text-4xl text-gold-500 mb-4"></i>
                        <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {statCards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                                    <i className={card.icon}></i>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-800 mb-1">
                                {card.value}
                            </div>
                            <div className="text-sm text-gray-500">
                                {card.label}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-10 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                    <i className="fas fa-info-circle text-gold-500 mr-2"></i>
                    ยินดีต้อนรับสู่ Admin Panel
                </h3>
                <div className="text-gray-600 space-y-2">
                    <p>• ใช้เมนูทางซ้ายเพื่อจัดการข้อมูลต่างๆ</p>
                    <p>• ข้อมูลทั้งหมดจะถูกบันทึกลงในฐานข้อมูล</p>
                    <p>• เว็บไซต์หน้าบ้านจะดึงข้อมูลจาก API โดยอัตโนมัติ</p>
                </div>
            </div>
        </AdminLayout>
    );
}
