import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { contactService } from '../../services/contactService';
import { showSuccess, showError } from '../../utils/sweetalert';

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await contactService.getAll();
            setContacts(data);
        } catch (error) {
            showError('เกิดข้อผิดพลาด: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await contactService.updateStatus(id, status);
            loadData();

            const statusText = status === 'new' ? 'ใหม่' : status === 'read' ? 'อ่านแล้ว' : 'ตอบแล้ว';
            showSuccess(`อัปเดตสถานะเป็น "${statusText}" สำเร็จ`);
        } catch (error) {
            showError('เกิดข้อผิดพลาด: ' + error.message);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            new: 'bg-yellow-100 text-yellow-800',
            read: 'bg-blue-100 text-blue-800',
            replied: 'bg-green-100 text-green-800'
        };
        const labels = {
            new: 'ใหม่',
            read: 'อ่านแล้ว',
            replied: 'ตอบแล้ว'
        };
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${badges[status]}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <AdminLayout>
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-700">ข้อความติดต่อ</h3>
                <p className="text-gray-500 text-sm">จำนวนทั้งหมด: {contacts.length} ข้อความ</p>
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เบอร์โทร</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เรื่อง</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ข้อความ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {contacts.map((contact) => (
                                <tr key={contact.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(contact.created_at).toLocaleDateString('th-TH')}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{contact.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{contact.phone}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{contact.subject}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{contact.message}</td>
                                    <td className="px-6 py-4 text-sm">{getStatusBadge(contact.status)}</td>
                                    <td className="px-6 py-4 text-sm text-right">
                                        <select
                                            value={contact.status}
                                            onChange={(e) => handleUpdateStatus(contact.id, e.target.value)}
                                            className="px-2 py-1 border border-gray-300 rounded text-xs text-gray-500" 
                                        >
                                            <option value="new">ใหม่</option>
                                            <option value="read">อ่านแล้ว</option>
                                            <option value="replied">ตอบแล้ว</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {contacts.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <i className="fas fa-inbox text-4xl mb-2 block"></i>
                            ยังไม่มีข้อความ
                        </div>
                    )}
                </div>
            )}
        </AdminLayout>
    );
}
