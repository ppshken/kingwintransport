import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authService.login(formData.username, formData.password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message || 'เข้าสู่ระบบไม่สำเร็จ');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-black flex items-center justify-center p-6">
            <div className="bg-dark-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-wider text-white">
                        KINGWIN <span className="text-gold-500">TRANSPORT</span>
                    </h1>
                    <p className="text-gray-400">Admin Panel Login</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
                        <i className="fas fa-exclamation-circle mr-2"></i>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-300 font-medium mb-2">
                            <i className="fas fa-user mr-2"></i>
                            ชื่อผู้ใช้
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                            placeholder="admin"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-300 font-medium mb-2">
                            <i className="fas fa-lock mr-2"></i>
                            รหัสผ่าน
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                กำลังเข้าสู่ระบบ...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-sign-in-alt mr-2"></i>
                                เข้าสู่ระบบ
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
