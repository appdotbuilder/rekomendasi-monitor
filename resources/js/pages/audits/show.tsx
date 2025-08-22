import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Finding {
    id: number;
    finding_code: string;
    description: string;
    recommendation: string;
    status: string;
    responsible_party: string | null;
    target_completion: string | null;
    follow_ups_count: number;
    latest_follow_up: string | null;
}

interface Audit {
    id: number;
    report_name: string;
    report_number: string;
    audit_date: string;
    auditor_type: string;
    description: string | null;
    report_file: string | null;
    findings: Finding[];
}

interface AuditShowProps {
    audit: Audit;
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
        title: 'Detail Audit',
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

export default function AuditShow({ audit }: AuditShowProps) {
    const statusCounts = audit.findings.reduce((acc, finding) => {
        acc[finding.status] = (acc[finding.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${audit.report_name} - Detail Audit`} />
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-2xl">{getAuditorEmoji(audit.auditor_type)}</span>
                                <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                                    {audit.auditor_type}
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {audit.report_name}
                            </h1>
                            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                                <span>📄 {audit.report_number}</span>
                                <span>📅 {audit.audit_date}</span>
                                <span>🔍 {audit.findings.length} Temuan</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            {audit.report_file && (
                                <a
                                    href={`/storage/${audit.report_file}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                                >
                                    <span>📎</span>
                                    <span>Lihat File</span>
                                </a>
                            )}
                            <Link
                                href={route('findings.create', audit.id)}
                                className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <span>➕</span>
                                <span>Tambah Temuan</span>
                            </Link>
                        </div>
                    </div>
                    {audit.description && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                            <p className="text-gray-700 dark:text-gray-300">{audit.description}</p>
                        </div>
                    )}
                </div>

                {/* Status Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📊 Ringkasan Status Temuan</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {['Belum Ditindaklanjuti', 'Sedang Ditindaklanjuti', 'Selesai', 'Dibatalkan'].map((status) => {
                            const count = statusCounts[status] || 0;
                            return (
                                <div key={status} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="text-2xl mb-2">{getStatusEmoji(status)}</div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{count}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">{status}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Findings List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">🔍 Daftar Temuan</h2>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {audit.findings.length} temuan ditemukan
                        </span>
                    </div>

                    {audit.findings.length > 0 ? (
                        <div className="divide-y divide-gray-200 dark:divide-gray-600">
                            {audit.findings.map((finding) => (
                                <div key={finding.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <span className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm font-mono">
                                                    {finding.finding_code}
                                                </span>
                                                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(finding.status)}`}>
                                                    <span>{getStatusEmoji(finding.status)}</span>
                                                    <span>{finding.status}</span>
                                                </span>
                                            </div>
                                            
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Temuan:</h3>
                                            <p className="text-gray-700 dark:text-gray-300 mb-3">
                                                {finding.description.length > 200 
                                                    ? finding.description.substring(0, 200) + '...' 
                                                    : finding.description}
                                            </p>
                                            
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Rekomendasi:</h4>
                                            <p className="text-gray-700 dark:text-gray-300 mb-3">
                                                {finding.recommendation.length > 200 
                                                    ? finding.recommendation.substring(0, 200) + '...' 
                                                    : finding.recommendation}
                                            </p>

                                            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                                                {finding.responsible_party && (
                                                    <span>👤 {finding.responsible_party}</span>
                                                )}
                                                {finding.target_completion && (
                                                    <span>📅 Target: {finding.target_completion}</span>
                                                )}
                                                <span>📝 {finding.follow_ups_count} tindak lanjut</span>
                                                {finding.latest_follow_up && (
                                                    <span>🕒 Terakhir: {finding.latest_follow_up}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2 ml-4">
                                            <Link
                                                href={route('findings.show', finding.id)}
                                                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                            >
                                                Lihat Detail
                                            </Link>
                                            <Link
                                                href={route('follow-ups.create', finding.id)}
                                                className="inline-flex items-center space-x-1 px-3 py-1 bg-orange-600 text-white text-sm font-medium rounded hover:bg-orange-700 transition-colors"
                                            >
                                                <span>📋</span>
                                                <span>Tindak Lanjut</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <span className="text-6xl mb-4 block">🔍</span>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Belum ada temuan</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Tambahkan temuan audit untuk mulai tracking tindak lanjut</p>
                            <Link
                                href={route('findings.create', audit.id)}
                                className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <span>➕</span>
                                <span>Tambah Temuan</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}