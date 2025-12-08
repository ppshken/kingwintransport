import { useState } from 'react';
import { contactService } from '../services/contactService';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        subject: 'สนใจเช่ารถบัส',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitStatus(null);

        try {
            await contactService.create(formData);
            setSubmitStatus('success');
            setFormData({
                name: '',
                phone: '',
                subject: 'สนใจเช่ารถบัส',
                message: ''
            });
            alert('ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด');
        } catch (error) {
            setSubmitStatus('error');
            alert('เกิดข้อผิดพลาด: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-dark-900 relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="bg-dark-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-gray-700">
                    {/* Info */}
                    <div className="p-10 md:w-2/5 bg-gradient-to-br from-dark-800 to-black text-white">
                        <h3 className="text-3xl font-bold mb-6">ติดต่อเรา</h3>
                        <p className="text-gray-400 mb-10">
                            หากท่านสนใจบริการ หรือต้องการสอบถามข้อมูลเพิ่มเติม
                            สามารถติดต่อเราได้ตามช่องทางด้านล่าง
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500 shrink-0">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1 text-gold-400">ที่อยู่</h4>
                                    <p className="text-gray-400 text-sm">
                                        123/45 ถนนตัวอย่าง แขวงบางนา<br />เขตบางนา กรุงเทพมหานคร
                                        10260
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500 shrink-0">
                                    <i className="fas fa-phone-alt"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1 text-gold-400">เบอร์โทรศัพท์</h4>
                                    <p className="text-gray-400 text-sm">02-XXX-XXXX</p>
                                    <p className="text-gray-400 text-sm">08X-XXX-XXXX (สายด่วน)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500 shrink-0">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1 text-gold-400">อีเมล</h4>
                                    <p className="text-gray-400 text-sm">
                                        contact@kingwintransport.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h4 className="font-bold mb-4 text-sm uppercase tracking-wide">
                                Follow Us
                            </h4>
                            <div className="flex gap-4">
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:border-gold-500 hover:text-black transition-all"
                                >
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:border-gold-500 hover:text-black transition-all"
                                >
                                    <i className="fab fa-line"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:border-gold-500 hover:text-black transition-all"
                                >
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-10 md:w-3/5 bg-white">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">
                            ส่งข้อความถึงเรา
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ชื่อ - นามสกุล
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-gray-50 text-gray-900"
                                        placeholder="ระบุชื่อของท่าน"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        เบอร์โทรศัพท์
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-gray-50 text-gray-900"
                                        placeholder="08X-XXX-XXXX"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    เรื่องที่ติดต่อ
                                </label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-gray-50 text-gray-900"
                                >
                                    <option>สนใจเช่ารถบัส</option>
                                    <option>สนใจรถรับส่งพนักงาน</option>
                                    <option>อื่นๆ</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    ข้อความเพิ่มเติม
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-gray-50 text-gray-900"
                                    placeholder="รายละเอียดที่ต้องการสอบถาม..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-gold-500 hover:text-black transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        กำลังส่ง...
                                    </>
                                ) : (
                                    'ส่งข้อความ'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
