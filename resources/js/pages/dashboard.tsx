import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface DashboardProps {
    statusSummary: Record<string, { count: number }>;
    auditorSummary: Record<string, Array<{ status: string; count: number }>>;
    recentAudits: Array<{
        id: number;
        report_name: string;
        report_number: string;
        audit_date: string;
        auditor_type: string;
        findings_count: number;
    }>;
    stats: {
        totalAudits: number;
        totalFindings: number;
        pendingFindings: number;
        completedFindings: number;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Belum Ditindaklanjuti':
            return 'bg-red-500';
        case 'Sedang Ditindaklanjuti':
            return 'bg-yellow-500';
        case 'Selesai':
            return 'bg-green-500';
        case 'Dibatalkan':
            return 'bg-gray-500';
        default:
            return 'bg-blue-500';
    }
};

const getStatusEmoji = (status: string) => {
    switch (status) {
        case 'Belum Ditindaklanjuti':
            return '⏳';
        case 'Sedang Ditindaklanjuti':
            return '⚠️';
        case 'Selesai':
            return '✅';
        case 'Dibatalkan':
            return '❌';
        default:
            return '📄';
    }
};

const getAuditorEmoji = (type: string) => {
    switch (type) {
        case 'SPI':
            return '🔍';
        case 'BPK':
            return '🏛️';
        case 'KAP':
            return '📋';
        default:
            return '📊';
    }
};

export default function Dashboard({ statusSummary, auditorSummary, recentAudits, stats }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - Sistem Pemantauan Audit" />
            <div className="space-y-6 p-6">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                    <h1 className="text-3xl font-bold mb-2">📊 Dashboard Pemantauan Audit</h1>
                    <p className="text-blue-100">
                        Pantau status tindak lanjut rekomendasi dari SPI, BPK, dan KAP
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Audit</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalAudits}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📑</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Temuan</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalFindings}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">🔍</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Belum Ditindaklanjuti</p>
                                <p className="text-2xl font-bold text-red-600">{stats.pendingFindings}</p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">⏳</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Selesai</p>
                                <p className="text-2xl font-bold text-green-600">{stats.completedFindings}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">✅</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Status Summary */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Ringkasan Status</h2>
                        <div className="space-y-3">
                            {['Belum Ditindaklanjuti', 'Sedang Ditindaklanjuti', 'Selesai', 'Dibatalkan'].map((status) => {
                                const count = statusSummary[status]?.count || 0;
                                const percentage = stats.totalFindings > 0 ? Math.round((count / stats.totalFindings) * 100) : 0;
                                return (
                                    <div key={status} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-lg">{getStatusEmoji(status)}</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{status}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-20 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                                                <div 
                                                    className={`h-full ${getStatusColor(status)} rounded-full`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-8">{count}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Auditor Summary */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🏛️ Status per Auditor</h2>
                        <div className="space-y-4">
                            {['SPI', 'BPK', 'KAP'].map((auditorType) => {
                                const auditorData = auditorSummary[auditorType] || [];
                                const total = auditorData.reduce((sum, item) => sum + item.count, 0);
                                return (
                                    <div key={auditorType} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-lg">{getAuditorEmoji(auditorType)}</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{auditorType}</span>
                                            </div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Total: {total}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {auditorData.map((item) => (
                                                <div key={item.status} className="text-xs">
                                                    <span className="text-gray-600 dark:text-gray-400">{item.status.replace('Ditindaklanjuti', 'TL')}: </span>
                                                    <span className="font-medium">{item.count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Recent Audits */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">📋 Audit Terbaru</h2>
                        <Link
                            href={route('audits.index')}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                            Lihat Semua →
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-600">
                                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Laporan</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Nomor</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Tanggal</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Auditor</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Temuan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentAudits.map((audit) => (
                                    <tr key={audit.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="py-3 px-4">
                                            <Link
                                                href={route('audits.show', audit.id)}
                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                {audit.report_name}
                                            </Link>
                                        </td>
                                        <td className="py-3 px-4 text-gray-900 dark:text-white">{audit.report_number}</td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{audit.audit_date}</td>
                                        <td className="py-3 px-4">
                                            <span className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium">
                                                <span>{getAuditorEmoji(audit.auditor_type)}</span>
                                                <span>{audit.auditor_type}</span>
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-900 dark:text-white">{audit.findings_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {recentAudits.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <span className="text-4xl mb-2 block">📭</span>
                            <p>Belum ada data audit</p>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Aksi Cepat</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link
                            href={route('audits.create')}
                            className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <span className="text-2xl">📝</span>
                            <span className="font-medium text-gray-900 dark:text-white">Tambah Audit</span>
                        </Link>
                        <Link
                            href={route('audits.index')}
                            className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <span className="text-2xl">📋</span>
                            <span className="font-medium text-gray-900 dark:text-white">Daftar Audit</span>
                        </Link>
                        <Link
                            href={route('follow-ups.index')}
                            className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <span className="text-2xl">📊</span>
                            <span className="font-medium text-gray-900 dark:text-white">Riwayat Tindak Lanjut</span>
                        </Link>
                        <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <span className="text-2xl">📈</span>
                            <span className="font-medium text-gray-600 dark:text-gray-400">Laporan (Coming Soon)</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}