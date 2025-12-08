import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-black pt-20 pb-10 border-t border-gray-900">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <i className="fas fa-crown text-gold-500 text-3xl"></i>
                            <h2 className="text-2xl font-bold text-white">KING WIN</h2>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            มุ่งมั่นให้บริการขนส่งที่เหนือระดับ
                            ด้วยความปลอดภัยและความพึงพอใจสูงสุดของลูกค้าคือหัวใจสำคัญของเรา
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">เมนูลัด</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-500 hover:text-gold-500 text-sm transition-colors">หน้าแรก</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-500 hover:text-gold-500 text-sm transition-colors">เกี่ยวกับเรา</Link>
                            </li>
                            <li>
                                <Link to="/service" className="text-gray-500 hover:text-gold-500 text-sm transition-colors">บริการ</Link>
                            </li>
                            <li>
                                <Link to="/customers" className="text-gray-500 hover:text-gold-500 text-sm transition-colors">ลูกค้าของเรา</Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-gray-500 hover:text-gold-500 text-sm transition-colors">บทความ</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">บริการ</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-500 hover:text-gold-500 text-sm transition-colors">รถบัส VIP</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 hover:text-gold-500 text-sm transition-colors">รถรับส่งพนักงาน</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 hover:text-gold-500 text-sm transition-colors">เช่าเหมารายวัน/ปี</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">รับข่าวสาร</h4>
                        <p className="text-gray-500 text-sm mb-4">
                            สมัครสมาชิกเพื่อรับโปรโมชั่นพิเศษก่อนใคร
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="อีเมลของคุณ"
                                className="bg-dark-800 text-white px-4 py-2 rounded-l-lg outline-none text-sm w-full border border-gray-700 focus:border-gold-500"
                            />
                            <button
                                className="bg-gold-500 text-black px-4 py-2 rounded-r-lg font-bold hover:bg-gold-400 transition-colors"
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-900 pt-8 text-center">
                    <p className="text-gray-600 text-sm">
                        &copy; 2025 KingWin Transport Co., Ltd. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
