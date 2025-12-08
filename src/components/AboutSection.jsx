import { Link } from 'react-router-dom';

export default function AboutSection() {
    return (
        <section id="about" className="py-24 bg-dark-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gold-500/5 blur-[150px]"></div>

            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold-500 rounded-tl-3xl"></div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold-500 rounded-br-3xl"></div>
                        <img
                            src="/assets/page/about_image.jpg"
                            alt="Luxury Bus"
                            className="rounded-xl shadow-2xl w-full object-cover h-[500px] grayscale hover:grayscale-0 transition-all duration-700"
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/800x600?text=King+Win+Transport";
                            }}
                        />

                        <div className="absolute bottom-10 -right-10 bg-dark-800 p-6 rounded-xl shadow-xl border border-gold-500/20 hidden md:block">
                            <div className="flex items-center gap-4">
                                <div className="text-4xl font-bold text-gold-500">10+</div>
                                <div className="text-sm text-gray-400">ปีแห่ง<br />ประสบการณ์</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-gold-500 font-bold tracking-widest uppercase mb-2">
                            About Us
                        </h3>
                        <h2 className="text-4xl font-bold text-white mb-6">
                            ทำไมต้องเลือก <br /><span className="text-gradient-gold">KingWin Transport?</span>
                        </h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            บริษัท คิง วิน ทรานสปอร์ต จำกัด
                            ผู้นำด้านการให้บริการรถบัสเช่าเหมาและรถรับส่งพนักงาน
                            เรามุ่งมั่นยกระดับมาตรฐานการเดินทางในประเทศไทย ด้วยรถที่ทันสมัย
                            สะอาด และปลอดภัย
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-gray-300">
                                <i className="fas fa-check-circle text-gold-500 text-xl"></i>
                                <span>รถใหม่ สะอาด ตรวจเช็คสภาพทุกการเดินทาง</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <i className="fas fa-check-circle text-gold-500 text-xl"></i>
                                <span>พนักงานขับรถมืออาชีพ ผ่านการอบรมมารยาท</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <i className="fas fa-check-circle text-gold-500 text-xl"></i>
                                <span>ระบบ GPS Tracking ติดตามรถได้ตลอด 24 ชม.</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <i className="fas fa-check-circle text-gold-500 text-xl"></i>
                                <span>ประกันภัยผู้โดยสารวงเงินสูง</span>
                            </li>
                        </ul>
                        <Link
                            to="/about"
                            className="text-gold-400 font-medium hover:text-white transition-colors border-b border-gold-400 pb-1 inline-block"
                        >
                            อ่านเพิ่มเติมเกี่ยวกับบริษัท
                            <i className="fas fa-long-arrow-alt-right ml-2"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
