import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function AdminLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const user = authService.getUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/admin/login');
    };

    const menuItems = [
        { path: '/admin/dashboard', icon: 'fas fa-home', label: 'Dashboard' },
        { path: '/admin/vehicle-types', icon: 'fas fa-bus', label: 'ประเภทรถ' },
        { path: '/admin/services', icon: 'fas fa-concierge-bell', label: 'บริการ' },
        { path: '/admin/customers', icon: 'fas fa-users', label: 'ลูกค้า' },
        { path: '/admin/articles', icon: 'fas fa-newspaper', label: 'บทความ' },
        { path: '/admin/vehicle-images', icon: 'fas fa-images', label: 'รูปภาพรถ' },
        { path: '/admin/contacts', icon: 'fas fa-envelope', label: 'ข้อความติดต่อ' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-dark-900 text-white flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-xl font-bold tracking-wider text-white">
                        KINGWIN <span className="text-gold-500">TRANSPORT</span>
                    </h1>
                    <p className="text-sm text-gray-400">Admin Panel</p>
                </div>

                <nav className="flex-1 p-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${location.pathname === item.path
                                ? 'bg-gold-500 text-black font-bold'
                                : 'text-gray-300 hover:bg-dark-800'
                                }`}
                        >
                            <i className={item.icon}></i>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <div className="text-sm text-gray-400 mb-2">
                        เข้าสู่ระบบในนาม:
                    </div>
                    <div className="font-bold mb-3">{user?.username}</div>
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <i className="fas fa-sign-out-alt"></i>
                        <span>ออกจากระบบ</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {menuItems.find(item => item.path === location.pathname)?.label || 'Admin Panel'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            target="_blank"
                            className="text-sm text-gray-600 hover:text-gold-500 flex items-center gap-2"
                        >
                            <i className="fas fa-external-link-alt"></i>
                            <span>ดูเว็บไซต์</span>
                        </Link>
                    </div>
                </div>

                {/* Page Content */}
                <div className="flex-1 p-6 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
