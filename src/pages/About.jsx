import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
    return (
        <>
            <Navbar />

            {/* Page Header / Mini Hero */}
            <section className="relative h-[50vh] flex items-center justify-center bg-hero-pattern bg-cover bg-center bg-fixed bg-no-repeat mt-16">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                        เกี่ยวกับ <span className="text-gradient-gold">KINGWIN</span>
                    </h1>
                    <div className="flex justify-center gap-2 text-gray-400 text-sm tracking-wider uppercase">
                        <Link to="/" className="hover:text-gold-500 transition-colors">หน้าแรก</Link>
                        <span>/</span>
                        <span className="text-gold-500">เกี่ยวกับเรา</span>
                    </div>
                </div>
            </section>

            {/* Company Story Section */}
            <section className="py-24 bg-dark-900">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Text Content */}
                        <div className="order-2 md:order-1">
                            <h3 className="text-gold-500 font-bold tracking-widest uppercase mb-2">
                                Our Story
                            </h3>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                กว่า 10 ปี บนเส้นทาง<br />แห่งความภาคภูมิใจ
                            </h2>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                บริษัท คิง วิน ทรานสปอร์ต จำกัด
                                ก่อตั้งขึ้นด้วยความมุ่งมั่นที่จะยกระดับมาตรฐานการให้บริการรถโดยสารไม่ประจำทางในประเทศไทย
                                จากจุดเริ่มต้นเล็กๆ เราได้เติบโตและพัฒนาอย่างต่อเนื่อง
                                จนได้รับความไว้วางใจจากองค์กรชั้นนำ โรงงานอุตสาหกรรม
                                และสถาบันการศึกษามากมาย
                            </p>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                เราไม่เพียงแค่ให้บริการรถรับ-ส่ง แต่เราส่งมอบ
                                "ประสบการณ์การเดินทาง" ที่ปลอดภัย สะดวกสบาย และประทับใจ
                                ด้วยทีมงานมืออาชีพและการบริหารจัดการที่ทันสมัย
                            </p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-6 border-t border-gray-800 pt-8">
                                <div>
                                    <span className="block text-3xl font-bold text-gold-500 mb-1">10+</span>
                                    <span className="text-xs text-gray-500 uppercase">ปีประสบการณ์</span>
                                </div>
                                <div>
                                    <span className="block text-3xl font-bold text-gold-500 mb-1">50+</span>
                                    <span className="text-xs text-gray-500 uppercase">จำนวนรถในเครือ</span>
                                </div>
                                <div>
                                    <span className="block text-3xl font-bold text-gold-500 mb-1">100%</span>
                                    <span className="text-xs text-gray-500 uppercase">ความพึงพอใจ</span>
                                </div>
                            </div>
                        </div>

                        {/* Image Composition */}
                        <div className="order-1 md:order-2 relative">
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl"></div>
                            <img
                                src="/assets/Photo-180.jpg"
                                alt="Office Team"
                                className="rounded-xl shadow-2xl border border-gray-800 relative z-10 w-full object-cover h-[400px]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-20 bg-dark-800 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
                    <i className="fas fa-quote-right text-[400px] text-white absolute -top-20 -left-20"></i>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Vision */}
                        <div className="bg-dark-900 p-10 rounded-2xl border border-gray-800 hover:border-gold-500/50 transition-colors group">
                            <div className="w-16 h-16 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 text-3xl mb-6 group-hover:bg-gold-500 group-hover:text-black transition-all">
                                <i className="fas fa-eye"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                วิสัยทัศน์ (Vision)
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                เป็นผู้นำด้านการให้บริการขนส่งผู้โดยสารที่ได้มาตรฐานสากล
                                ด้วยนวัตกรรมที่ทันสมัย และการบริการที่เป็นเลิศ
                                เพื่อยกระดับคุณภาพชีวิตการเดินทางของคนไทย
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="bg-dark-900 p-10 rounded-2xl border border-gray-800 hover:border-gold-500/50 transition-colors group">
                            <div className="w-16 h-16 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 text-3xl mb-6 group-hover:bg-gold-500 group-hover:text-black transition-all">
                                <i className="fas fa-rocket"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                พันธกิจ (Mission)
                            </h3>
                            <ul className="space-y-3 text-gray-400">
                                <li className="flex items-start gap-3">
                                    <i className="fas fa-check text-gold-500 mt-1"></i>
                                    <span>พัฒนาศักยภาพบุคลากรและการให้บริการอย่างต่อเนื่อง</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <i className="fas fa-check text-gold-500 mt-1"></i>
                                    <span>ดูแลรักษารถให้มีความพร้อมและปลอดภัยสูงสุด</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <i className="fas fa-check text-gold-500 mt-1"></i>
                                    <span>สร้างความพึงพอใจสูงสุดให้แก่ลูกค้า</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-24 bg-dark-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-gold-500 font-bold tracking-widest uppercase mb-2">
                            Our Values
                        </h3>
                        <h2 className="text-4xl font-bold text-white">ค่านิยมองค์กร</h2>
                        <div className="w-20 h-1 bg-gold-500 mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {/* Value 1 */}
                        <div className="bg-dark-800 p-8 rounded-xl text-center card-hover border border-gray-700">
                            <div className="inline-block p-4 rounded-full bg-gold-500/10 text-gold-500 text-3xl mb-6">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">Safety First</h4>
                            <p className="text-sm text-gray-400">
                                ความปลอดภัยต้องมาเป็นอันดับหนึ่งในทุกการเดินทาง
                            </p>
                        </div>
                        {/* Value 2 */}
                        <div className="bg-dark-800 p-8 rounded-xl text-center card-hover border border-gray-700">
                            <div className="inline-block p-4 rounded-full bg-gold-500/10 text-gold-500 text-3xl mb-6">
                                <i className="fas fa-clock"></i>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">Punctuality</h4>
                            <p className="text-sm text-gray-400">
                                ตรงต่อเวลา คือหัวใจของการบริการรับ-ส่งพนักงาน
                            </p>
                        </div>
                        {/* Value 3 */}
                        <div className="bg-dark-800 p-8 rounded-xl text-center card-hover border border-gray-700">
                            <div className="inline-block p-4 rounded-full bg-gold-500/10 text-gold-500 text-3xl mb-6">
                                <i className="fas fa-heart"></i>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">Service Mind</h4>
                            <p className="text-sm text-gray-400">
                                ให้บริการด้วยใจ ยิ้มแย้ม และเต็มใจช่วยเหลือ
                            </p>
                        </div>
                        {/* Value 4 */}
                        <div className="bg-dark-800 p-8 rounded-xl text-center card-hover border border-gray-700">
                            <div className="inline-block p-4 rounded-full bg-gold-500/10 text-gold-500 text-3xl mb-6">
                                <i className="fas fa-tools"></i>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">Quality</h4>
                            <p className="text-sm text-gray-400">
                                รักษารถให้สะอาด ใหม่ และพร้อมใช้งานเสมอ
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Standards Section (Reference: Abc Journeys) */}
            <section className="py-20 bg-dark-800">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-gold-500 font-bold tracking-widest uppercase mb-2">
                            Standards
                        </h3>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            มาตรฐานการบริการของเรา
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Standard 1: Safety */}
                        <div className="bg-dark-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gold-500/50 transition-all group">
                            <div className="p-8">
                                <div className="w-14 h-14 bg-gold-500/10 rounded-lg flex items-center justify-center text-gold-500 text-2xl mb-6 group-hover:bg-gold-500 group-hover:text-black transition-all">
                                    <i className="fas fa-satellite-dish"></i>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-4">ระบบมาตรฐานและความปลอดภัย</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    เรามีระบบรักษาความปลอดภัยคุณภาพสูงสุด ติดตั้งเข็มขัดนิรภัยทุกที่นั่ง
                                    ระบบ GPS Tracking ควบคุมความเร็ว และกล้องวงจรปิด CCTV
                                    รวมถึงพื้นรถชนิดพิเศษกันลื่น เพื่อให้คุณเดินทางไกลได้อย่างมั่นใจและปลอดภัยที่สุด
                                </p>
                            </div>
                        </div>

                        {/* Standard 2: Training */}
                        <div className="bg-dark-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gold-500/50 transition-all group">
                            <div className="p-8">
                                <div className="w-14 h-14 bg-gold-500/10 rounded-lg flex items-center justify-center text-gold-500 text-2xl mb-6 group-hover:bg-gold-500 group-hover:text-black transition-all">
                                    <i className="fas fa-chalkboard-teacher"></i>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-4">การฝึกอบรมพนักงาน</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    พนักงานขับรถทุกคนต้องผ่านการอบรมด้านการบริการ การขับขี่ปลอดภัย
                                    การซ่อมบำรุงเบื้องต้น รวมถึงการฝึกอบรมเผชิญเหตุฉุกเฉิน
                                    ซ้อมดับเพลิง และการปฐมพยาบาลเบื้องต้น เพื่อความพร้อมในทุกสถานการณ์
                                </p>
                            </div>
                        </div>

                        {/* Standard 3: Maintenance */}
                        <div className="bg-dark-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gold-500/50 transition-all group">
                            <div className="p-8">
                                <div className="w-14 h-14 bg-gold-500/10 rounded-lg flex items-center justify-center text-gold-500 text-2xl mb-6 group-hover:bg-gold-500 group-hover:text-black transition-all">
                                    <i className="fas fa-wrench"></i>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-4">การซ่อมบำรุงรักษาเต็มรูปแบบ</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    รถทุกคันต้องเข้าเช็คระยะทุก 10,000 กม. หรือ 3 เดือน
                                    โดยเน้นตรวจสอบ 4 ระบบหลักสำคัญ: ช่วงล่าง, เครื่องยนต์, ระบบแอร์,
                                    และระบบไฟฟ้า เพื่อให้รถมีประสิทธิภาพสมบูรณ์พร้อมให้บริการเสมอ
                                </p>
                            </div>
                        </div>

                        {/* Standard 4: Alcohol Check */}
                        <div className="bg-dark-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gold-500/50 transition-all group">
                            <div className="p-8">
                                <div className="w-14 h-14 bg-gold-500/10 rounded-lg flex items-center justify-center text-gold-500 text-2xl mb-6 group-hover:bg-gold-500 group-hover:text-black transition-all">
                                    <i className="fas fa-user-check"></i>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-4">มาตรการตรวจวัดแอลกอฮอล์</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    ความปลอดภัยคือสิ่งสำคัญที่สุด เรามีการตรวจวัดแอลกอฮอล์พนักงานขับรถทุกคน
                                    ก่อนออกเดินทางทุกครั้ง และมีทีมงาน Surprise Check ลงพื้นที่ตรวจสอบแบบสุ่ม
                                    เพื่อสร้างความมั่นใจสูงสุดให้กับลูกค้า
                                </p>
                            </div>
                        </div>

                        {/* Standard 5: Uniform & Image */}
                        <div className="bg-dark-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gold-500/50 transition-all group">
                            <div className="p-8">
                                <div className="w-14 h-14 bg-gold-500/10 rounded-lg flex items-center justify-center text-gold-500 text-2xl mb-6 group-hover:bg-gold-500 group-hover:text-black transition-all">
                                    <i className="fas fa-tshirt"></i>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-4">เครื่องแต่งกายและบุคลิกภาพ</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    ชุดยูนิฟอร์มที่สะอาด เรียบร้อย สง่าผ่าเผย สะท้อนถึงความเป็นมืออาชีพ
                                    สร้างความน่าเชื่อถือให้กับผู้ใช้บริการ พนักงานของเราได้รับการปลูกฝัง
                                    ทัศนคติที่ดี มีใจรักงานบริการ (Service Mind) พร้อมดูแลคุณตลอดเส้นทาง
                                </p>
                            </div>
                        </div>

                        {/* Standard 6: Call Center */}
                        <div className="bg-dark-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gold-500/50 transition-all group">
                            <div className="p-8">
                                <div className="w-14 h-14 bg-gold-500/10 rounded-lg flex items-center justify-center text-gold-500 text-2xl mb-6 group-hover:bg-gold-500 group-hover:text-black transition-all">
                                    <i className="fas fa-headset"></i>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-4">Call Center 24 ชม.</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    เรามีทีมงานคอยให้บริการรับฟังและแก้ไขปัญหาให้ลูกค้าตลอด 24 ชั่วโมง
                                    ทั้งการติดต่อประสานงาน และการรับฟังความคิดเห็นเพื่อนำมาพัฒนาปรับปรุง
                                    การบริการให้ดียิ่งขึ้น ตอบโจทย์ทุกความต้องการของลูกค้า
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Safety Standards Highlight */}
            <section className="py-20 bg-gradient-to-r from-gold-600 to-gold-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="md:w-2/3">
                            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                                มั่นใจด้วยมาตรฐานความปลอดภัย GPS Tracking 24 ชม.
                            </h2>
                            <p className="text-black/80 text-lg mb-8 font-medium">
                                เราควบคุมความเร็วและพฤติกรรมการขับขี่แบบ Real-time
                                เพื่อความปลอดภัยสูงสุดของผู้โดยสารทุกคน
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black/90 font-semibold">
                                <li className="flex items-center gap-2">
                                    <i className="fas fa-check-circle"></i> จำกัดความเร็วไม่เกิน 90 กม./ชม.
                                </li>
                                <li className="flex items-center gap-2">
                                    <i className="fas fa-check-circle"></i> ตรวจแอลกอฮอล์พนักงานก่อนขับ
                                </li>
                                <li className="flex items-center gap-2">
                                    <i className="fas fa-check-circle"></i> เช็คสภาพรถก่อนออกเดินทาง
                                </li>
                                <li className="flex items-center gap-2">
                                    <i className="fas fa-check-circle"></i> มีประกันภัยคุ้มครองทุกที่นั่ง
                                </li>
                            </ul>
                        </div>
                        <div className="md:w-1/3 text-center">
                            <Link
                                to="/contact"
                                className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold shadow-2xl hover:bg-gray-900 hover:scale-105 transition-all"
                            >
                                ติดต่อจองรถเลย
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
