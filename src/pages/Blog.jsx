import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { articleService } from '../services/articleService';

export default function Blog() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const articlesPerPage = 9;

    useEffect(() => {
        loadArticles();
    }, [currentPage]);

    const loadArticles = async () => {
        setLoading(true);
        try {
            const response = await articleService.getAll(currentPage, articlesPerPage);
            setArticles(response.data || []);
            setTotalPages(response.pagination?.totalPages || 1);
        } catch (error) {
            console.error('Error loading articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('th-TH', options);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Navbar />

            {/* Page Header */}
            <section className="relative h-[50vh] flex items-center justify-center bg-hero-pattern bg-cover bg-center bg-fixed bg-no-repeat mt-16">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                        บทความ<span className="text-gradient-gold">และข่าวสาร</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        อัปเดตข่าวสารและบทความเกี่ยวกับบริการรถรับจ้าง การเดินทาง และเคล็ดลับต่างๆ
                    </p>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-24 bg-dark-900">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <div className="text-center py-20">
                            <i className="fas fa-spinner fa-spin text-6xl text-gold-500"></i>
                            <p className="text-gray-400 mt-6 text-xl">กำลังโหลดบทความ...</p>
                        </div>
                    ) : articles.length === 0 ? (
                        <div className="text-center py-20">
                            <i className="fas fa-inbox text-6xl text-gray-600 mb-4"></i>
                            <p className="text-gray-400 text-xl">ยังไม่มีบทความ</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-3 gap-8 mb-12">
                                {articles.map((article) => (
                                    <Link
                                        key={article.id}
                                        to={`/blog/${article.slug}`}
                                        className="bg-dark-700 rounded-2xl overflow-hidden border border-gray-700 card-hover group cursor-pointer"
                                    >
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={article.featured_image || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800'}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800';
                                                }}
                                            />
                                        </div>
                                        <div className="p-6">
                                            {article.is_featured ? (
                                                <span className="inline-block px-3 py-1 bg-gold-500 text-black text-xs font-bold rounded-full mb-2">
                                                    <i className="fas fa-star mr-1"></i> แนะนำ
                                                </span>
                                            ) : null}
                                            <p className="text-xs text-gold-500 font-bold uppercase tracking-wider mb-2">
                                                {formatDate(article.published_at || article.created_at)}
                                            </p>
                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors line-clamp-2">
                                                {article.title}
                                            </h3>
                                            {article.excerpt && (
                                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                                    {article.excerpt}
                                                </p>
                                            )}
                                            <span className="text-gold-500 font-medium text-sm group-hover:text-white">
                                                อ่านเพิ่มเติม <i className="fas fa-chevron-right text-xs ml-1"></i>
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2">
                                    {/* Previous Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === 1
                                            ? 'bg-dark-700 text-gray-600 cursor-not-allowed'
                                            : 'bg-dark-700 text-white hover:bg-gold-500 hover:text-black'
                                            }`}
                                    >
                                        <i className="fas fa-chevron-left mr-2"></i>
                                        ก่อนหน้า
                                    </button>

                                    {/* Page Numbers */}
                                    {[...Array(totalPages)].map((_, index) => {
                                        const pageNumber = index + 1;
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => handlePageChange(pageNumber)}
                                                className={`w-10 h-10 rounded-lg font-bold transition-colors ${currentPage === pageNumber
                                                    ? 'bg-gold-500 text-black'
                                                    : 'bg-dark-700 text-white hover:bg-dark-600'
                                                    }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    })}

                                    {/* Next Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === totalPages
                                            ? 'bg-dark-700 text-gray-600 cursor-not-allowed'
                                            : 'bg-dark-700 text-white hover:bg-gold-500 hover:text-black'
                                            }`}
                                    >
                                        ถัดไป
                                        <i className="fas fa-chevron-right ml-2"></i>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}
