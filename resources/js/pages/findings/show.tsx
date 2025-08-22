import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface FollowUp {
    id: number;
    follow_up_date: string;
    responsible_party: string;
    action_description: string;
    new_status: string;
    supporting_document: string | null;
    notes: string | null;
    user_name: string;
    created_at: string;
}

interface Audit {
    id: number;
    report_name: string;
    report_number: string;
    auditor_type: string;
}

interface Finding {
    id: number;
    finding_code: string;
    description: string;
    recommendation: string;
    status: string;
    responsible_party: string | null;
    target_completion: string | null;
    audit: Audit;
    follow_ups: FollowUp[];
}

interface FindingShowProps {
    finding: Finding;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Daftar Audit',
        href: '/audits',
    },
    {
        title: 'Detail Temuan',
        href: '#',
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Belum Ditindaklanjuti':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        case 'Sedang Ditindaklanjuti':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        case 'Selesai':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'Dibatalkan':
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        default:
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
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

export default function FindingShow({ finding }: FindingShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${finding.finding_code} - Detail Temuan`} />
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center space-x-3 mb-3">
                                <span className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm font-mono">
                                    {finding.finding_code}
                                </span>
                                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(finding.status)}`}>
                                    <span>{getStatusEmoji(finding.status)}</span>
                                    <span>{finding.status}</span>
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Detail Temuan</h1>
                            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                                <Link
                                    href={route('audits.show', finding.audit.id)}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    {getAuditorEmoji(finding.audit.auditor_type)} {finding.audit.report_name}
                                </Link>
                                <span>📄 {finding.audit.report_number}</span>
                                <span>📝 {finding.follow_ups.length} tindak lanjut</span>
                            </div>
                        </div>
                        <Link
                            href={route('follow-ups.create', finding.id)}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
                        >
                            <span>📋</span>
                            <span>Tambah Tindak Lanjut</span>
                        </Link>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Finding Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📝 Deskripsi Temuan</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {finding.description}
                            </p>
                        </div>

                        {/* Recommendation */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">💡 Rekomendasi</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {finding.recommendation}
                            </p>
                        </div>

                        {/* Follow-ups Timeline */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📊 Riwayat Tindak Lanjut</h2>
                            
                            {finding.follow_ups.length > 0 ? (
                                <div className="space-y-6">
                                    {finding.follow_ups.map((followUp, index) => (
                                        <div key={followUp.id} className="relative">
                                            {index < finding.follow_ups.length - 1 && (
                                                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
                                            )}
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                    <span className="text-sm">{getStatusEmoji(followUp.new_status)}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center space-x-3">
                                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(followUp.new_status)}`}>
                                                                {followUp.new_status}
                                                            </span>
                                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                                📅 {followUp.follow_up_date}
                                                            </span>
                                                        </div>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            oleh {followUp.user_name} • {followUp.created_at}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                        👤 <strong>{followUp.responsible_party}</strong>
                                                    </p>
                                                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                                                        {followUp.action_description}
                                                    </p>
                                                    {followUp.notes && (
                                                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                <strong>Catatan:</strong> {followUp.notes}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {followUp.supporting_document && (
                                                        <a
                                                            href={`/storage/${followUp.supporting_document}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                        >
                                                            <span>📎</span>
                                                            <span>Lihat Dokumen Pendukung</span>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    <span className="text-4xl mb-2 block">📋</span>
                                    <p>Belum ada tindak lanjut</p>
                                    <Link
                                        href={route('follow-ups.create', finding.id)}
                                        className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors mt-4"
                                    >
                                        <span>📋</span>
                                        <span>Tambah Tindak Lanjut</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        {/* Basic Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">ℹ️ Informasi</h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Status Saat Ini</span>
                                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(finding.status)}`}>
                                        <span>{getStatusEmoji(finding.status)}</span>
                                        <span>{finding.status}</span>
                                    </div>
                                </div>
                                {finding.responsible_party && (
                                    <div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Pihak Bertanggung Jawab</span>
                                        <p className="text-gray-900 dark:text-white font-medium">{finding.responsible_party}</p>
                                    </div>
                                )}
                                {finding.target_completion && (
                                    <div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Target Penyelesaian</span>
                                        <p className="text-gray-900 dark:text-white font-medium">📅 {finding.target_completion}</p>
                                    </div>
                                )}
                                <div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Jumlah Tindak Lanjut</span>
                                    <p className="text-gray-900 dark:text-white font-medium">{finding.follow_ups.length} tindak lanjut</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">⚡ Aksi Cepat</h3>
                            <div className="space-y-3">
                                <Link
                                    href={route('follow-ups.create', finding.id)}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
                                >
                                    <span>📋</span>
                                    <span>Tambah Tindak Lanjut</span>
                                </Link>
                                <Link
                                    href={route('audits.show', finding.audit.id)}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                                >
                                    <span>📋</span>
                                    <span>Lihat Audit</span>
                                </Link>
                                <Link
                                    href={route('follow-ups.index')}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <span>📊</span>
                                    <span>Semua Tindak Lanjut</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}