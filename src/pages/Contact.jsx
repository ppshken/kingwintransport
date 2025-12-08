import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Contact() {
    return (
        <>
            <Navbar />

            {/* Page Header */}
            <section className="relative h-[50vh] flex items-center justify-center bg-hero-pattern bg-cover bg-center bg-fixed bg-no-repeat mt-16">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                        ติดต่อ <span className="text-gradient-gold">KING WIN</span>
                    </h1>
                    <div className="flex justify-center gap-2 text-gray-400 text-sm tracking-wider uppercase">
                        <Link to="/" className="hover:text-gold-500 transition-colors">หน้าแรก</Link>
                        <span>/</span>
                        <span className="text-gold-500">ติดต่อเรา</span>
                    </div>
                </div>
            </section>

            <ContactSection />

            <Footer />
        </>
    );
}
