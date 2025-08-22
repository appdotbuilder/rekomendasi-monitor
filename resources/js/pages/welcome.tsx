import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Sistem Pemantauan Tindak Lanjut Audit">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Navigation */}
                <header className="px-6 py-4">
                    <nav className="flex items-center justify-between max-w-7xl mx-auto">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">🔍</span>
                            </div>
                            <span className="font-semibold text-gray-900 dark:text-white">AuditTracker</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                📊 Sistem Pemantauan <br />
                                <span className="text-blue-600">Tindak Lanjut Audit</span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                                Pantau dan kelola tindak lanjut rekomendasi audit dari SPI, BPK, dan KAP dengan mudah. 
                                Dashboard komprehensif untuk tracking progress dan status setiap temuan audit.
                            </p>
                            
                            {!auth.user && (
                                <div className="flex items-center justify-center space-x-4">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
                                    >
                                        🚀 Mulai Sekarang
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                    >
                                        🔑 Masuk ke Akun
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">📈</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    Dashboard Rekapitulasi
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Lihat ringkasan temuan berdasarkan status dan jenis pemeriksa dalam satu tampilan yang mudah dipahami.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    Manajemen Audit
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Kelola daftar pemeriksaan, upload laporan, dan catat temuan serta rekomendasi dengan terstruktur.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">⏱️</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    Tracking Tindak Lanjut
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Pantau progress tindak lanjut setiap rekomendasi dengan riwayat lengkap dan dokumen pendukung.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">🏛️</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    Multi-Auditor Support
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Mendukung audit dari berbagai instansi: SPI (Satuan Pengawasan Internal), BPK, dan KAP.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">📄</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    Manajemen Dokumen
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Upload dan kelola file laporan audit serta dokumen pendukung tindak lanjut dengan aman.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    Status Monitoring
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Monitor status: Belum Ditindaklanjuti, Sedang Ditindaklanjuti, Selesai, dan Dibatalkan.
                                </p>
                            </div>
                        </div>

                        {/* Status Overview */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                                📊 Status Tindak Lanjut
                            </h2>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-2xl">⏳</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Belum Ditindaklanjuti</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Menunggu tindakan</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-2xl">⚠️</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Sedang Ditindaklanjuti</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Dalam progress</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-2xl">✅</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Selesai</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Sudah diselesaikan</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-2xl">❌</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Dibatalkan</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Tidak dilanjutkan</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        {!auth.user && (
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-center text-white">
                                <h2 className="text-3xl font-bold mb-4">
                                    🚀 Siap Memulai Monitoring Audit?
                                </h2>
                                <p className="text-xl mb-6 opacity-90">
                                    Daftar sekarang dan kelola tindak lanjut audit Anda dengan lebih efektif
                                </p>
                                <div className="flex items-center justify-center space-x-4">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                                    >
                                        📝 Daftar Gratis
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
                                    >
                                        🔑 Masuk
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className="px-6 py-8 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                    <p>
                        © 2024 AuditTracker - Sistem Pemantauan Tindak Lanjut Audit. 
                        Dibuat dengan ❤️ untuk transparansi dan akuntabilitas.
                    </p>
                </footer>
            </div>
        </>
    );
}