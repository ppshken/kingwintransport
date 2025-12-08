import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { articleService } from '../services/articleService';

export default function BlogDetail() {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadArticle();
        loadRelatedArticles();
    }, [slug]);

    const loadArticle = async () => {
        try {
            const data = await articleService.getBySlug(slug);
            setArticle(data);
        } catch (error) {
            console.error('Error loading article:', error);
            setError('ไม่พบบทความที่ต้องการ');
        } finally {
            setLoading(false);
        }
    };

    const loadRelatedArticles = async () => {
        try {
            const response = await articleService.getAll(1, 3);
            setRelatedArticles(response.data || []);
        } catch (error) {
            console.error('Error loading related articles:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('th-TH', options);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-dark-900 mt-16">
                    <div className="text-center">
                        <i className="fas fa-spinner fa-spin text-6xl text-gold-500 mb-4"></i>
                        <p className="text-gray-400 text-xl">กำลังโหลดบทความ...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !article) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-dark-900 mt-16">
                    <div className="text-center">
                        <i className="fas fa-exclamation-circle text-6xl text-red-500 mb-4"></i>
                        <h2 className="text-2xl font-bold text-white mb-2">ไม่พบบทความ</h2>
                        <p className="text-gray-400 mb-6">{error}</p>
                        <Link to="/blog" className="btn-gold px-6 py-3 rounded-full inline-block">
                            <i className="fas fa-arrow-left mr-2"></i>
                            กลับไปหน้าบทความ
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            {/* Article Header */}
            <section className="relative h-[60vh] flex items-center justify-center bg-cover bg-center mt-16"
                style={{
                    backgroundImage: article.featured_image
                        ? `url(${article.featured_image})`
                        : 'url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000)'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-dark-900/40"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {article.is_featured && (
                            <span className="inline-block px-4 py-1 bg-gold-500 text-black font-bold rounded-full text-sm mb-4">
                                <i className="fas fa-star mr-1"></i> บทความแนะนำ
                            </span>
                        )}
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            {article.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-gray-300">
                            <span>
                                <i className="fas fa-calendar-alt mr-2 text-gold-500"></i>
                                {formatDate(article.published_at || article.created_at)}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-16 bg-dark-900">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Excerpt */}
                        {article.excerpt && (
                            <div className="bg-dark-800 border-l-4 border-gold-500 p-6 rounded-lg mb-8">
                                <p className="text-lg text-gray-300 leading-relaxed italic">
                                    {article.excerpt}
                                </p>
                            </div>
                        )}

                        {/* Main Content */}
                        <div className="prose prose-invert prose-lg max-w-none">
                            <div className="bg-dark-800 rounded-2xl p-8 border border-gray-700">
                                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                                    {article.content}
                                </div>
                            </div>
                        </div>

                        {/* Share Section */}
                        <div className="mt-12 pt-8 border-t border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4">แชร์บทความนี้</h3>
                            <div className="flex gap-4">
                                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                    <i className="fab fa-facebook-f mr-2"></i>
                                    Facebook
                                </button>
                                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                                    <i className="fab fa-line mr-2"></i>
                                    Line
                                </button>
                                <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                                    <i className="fas fa-link mr-2"></i>
                                    คัดลอกลิงก์
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
                <section className="py-16 bg-dark-800 border-t border-gray-700">
                    <div className="container mx-auto px-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                            บทความที่เกี่ยวข้อง
                        </h3>
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {relatedArticles.filter(a => a.slug !== slug).slice(0, 3).map((relatedArticle) => (
                                <Link
                                    key={relatedArticle.id}
                                    to={`/blog/${relatedArticle.slug}`}
                                    className="bg-dark-700 rounded-2xl overflow-hidden border border-gray-700 card-hover group"
                                >
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={relatedArticle.featured_image || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800'}
                                            alt={relatedArticle.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800';
                                            }}
                                        />
                                    </div>
                                    <div className="p-6">
                                        <p className="text-xs text-gold-500 font-bold uppercase tracking-wider mb-2">
                                            {formatDate(relatedArticle.published_at || relatedArticle.created_at)}
                                        </p>
                                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors line-clamp-2">
                                            {relatedArticle.title}
                                        </h4>
                                        {relatedArticle.excerpt && (
                                            <p className="text-gray-400 text-sm line-clamp-2">
                                                {relatedArticle.excerpt}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link to="/blog" className="btn-gold px-8 py-3 rounded-full inline-block font-bold">
                                ดูบทความทั้งหมด
                                <i className="fas fa-arrow-right ml-2"></i>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </>
    );
}
