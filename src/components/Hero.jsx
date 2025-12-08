import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section
            id="home"
            className="relative h-screen flex items-center justify-center bg-hero-pattern bg-cover bg-center bg-fixed bg-no-repeat"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent"></div>

            <div className="container mx-auto px-6 relative z-10 text-center mt-16">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    เดินทางเหนือระดับ <br />
                    กับ <span className="text-gradient-gold">KINGWIN TRANSPORT</span>
                </h1>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
                    บริการรถบัสเช่าเหมา VIP และรถรับ-ส่งพนักงาน มาตรฐานความปลอดภัยสากล
                    พร้อมดูแลคุณดุจญาติมิตร ตลอดการเดินทาง
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link
                        to="/contact"
                        className="btn-gold px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-gold-500/50 transform hover:-translate-y-1 transition-all"
                    >
                        จองรถทันที <i className="fas fa-arrow-right ml-2"></i>
                    </Link>
                    <Link
                        to="/service"
                        className="px-8 py-4 rounded-full border border-gray-600 hover:border-gold-500 text-white hover:text-gold-500 transition-all font-medium backdrop-blur-sm bg-white/5"
                    >
                        ดูบริการของเรา
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <a
                    href="#about"
                    className="text-gray-400 hover:text-gold-500 transition-colors"
                >
                    <i className="fas fa-chevron-down text-2xl"></i>
                </a>
            </div>
        </section>
    );
}
