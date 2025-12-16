import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { customerService } from '../services/customerService';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            const data = await customerService.getActive();
            setCustomers(data);
        } catch (error) {
            console.error('Error loading customers:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            {/* Page Header */}
            <section className="relative h-[50vh] flex items-center justify-center bg-hero-pattern bg-cover bg-center bg-fixed bg-no-repeat mt-16">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                        ลูกค้า<span className="text-gradient-gold">ของเรา</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        ภาพกิจกรรมและบริการที่เรามอบให้กับลูกค้า
                    </p>
                    <div className="flex justify-center gap-2 text-gray-400 text-sm tracking-wider uppercase mt-4">
                        <Link to="/" className="hover:text-gold-500 transition-colors">หน้าแรก</Link>
                        <span>/</span>
                        <span className="text-gold-500">ลูกค้าของเรา</span>
                    </div>
                </div>
            </section>

            {/* Activities Gallery */}
            <section className="py-24 bg-dark-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-gold-500 font-bold tracking-widest uppercase mb-2">
                            CUSTOMERS
                        </h3>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            กิจกรรมและบริการ
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            ภาพบรรยากาศการให้บริการลูกค้าของเรา ทั้งการรับส่งนักเรียน นักศึกษา ท่องเที่ยว และงานองค์กร
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">
                            <i className="fas fa-spinner fa-spin text-6xl text-gold-500"></i>
                            <p className="text-gray-400 mt-6 text-xl">กำลังโหลด...</p>
                        </div>
                    ) : customers.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {customers.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="bg-dark-800 rounded-2xl overflow-hidden border border-gray-700 card-hover group"
                                >
                                    {/* Image */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={activity.image}
                                            alt={activity.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                        {/* Tags */}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            {(() => {
                                                const tagsArray = Array.isArray(activity.tags)
                                                    ? activity.tags
                                                    : (activity.tags ? activity.tags.split(',').map(t => t.trim()) : []);

                                                return tagsArray.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-gold-500 text-black text-xs font-bold rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ));
                                            })()}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                                            {activity.title}
                                        </h3>
                                        <p className="text-gold-500 text-sm font-medium mb-3">
                                            <i className="fas fa-building mr-2"></i>
                                            {activity.subtitle}
                                        </p>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {activity.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <i className="fas fa-inbox text-4xl mb-3 block"></i>
                            <p>ยังไม่มีข้อมูลกิจกรรม</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials Section (New addition for the page) */}
            <section className="py-20 bg-dark-800">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-gold-500 font-bold tracking-widest uppercase mb-2">
                            Testimonials
                        </h3>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            เสียงตอบรับจากลูกค้า
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-dark-900 p-8 rounded-2xl border border-gray-800 relative">
                                <i className="fas fa-quote-left text-gold-500 text-4xl mb-6 opacity-30"></i>
                                <p className="text-gray-400 mb-6 italic">
                                    "บริการดีมากครับ รถใหม่สะอาด พนักงานขับรถสุภาพ ขับรถนิ่มมาก
                                    ประทับใจมากครับ จะกลับมาใช้บริการอีกแน่นอน"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?img=${item + 10}`} alt="User" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">คุณลูกค้า {item}</h4>
                                        <p className="text-gold-500 text-xs">ผู้ใช้บริการจริง</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-dark-900">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        พร้อมที่จะเป็นส่วนหนึ่งของเรา?
                    </h2>
                    <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
                        ติดต่อเราวันนี้ เพื่อรับบริการรถรับจ้างคุณภาพ ปลอดภัย สะดวกสบาย
                    </p>
                    <Link
                        to="/contact"
                        className="btn-gold px-8 py-4 rounded-full font-bold text-lg inline-flex items-center gap-2 shadow-2xl"
                    >
                        <i className="fas fa-phone-alt"></i>
                        ติดต่อเราเลย
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}
