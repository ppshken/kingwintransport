import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CustomerSection from '../components/CustomerSection';
import Footer from '../components/Footer';

export default function Customers() {
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
                    <div className="flex justify-center gap-2 text-gray-400 text-sm tracking-wider uppercase">
                        <Link to="/" className="hover:text-gold-500 transition-colors">หน้าแรก</Link>
                        <span>/</span>
                        <span className="text-gold-500">ลูกค้าของเรา</span>
                    </div>
                </div>
            </section>

            <CustomerSection />

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

            <Footer />
        </>
    );
}
