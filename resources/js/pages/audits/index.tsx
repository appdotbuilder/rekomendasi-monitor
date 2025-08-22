import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Audit {
    id: number;
    report_name: string;
    report_number: string;
    audit_date: string;
    auditor_type: string;
    description: string;
    findings_count: number;
    pending_findings: number;
    completed_findings: number;
}

interface AuditsIndexProps {
    audits: {
        data: Audit[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    filters: {
        auditor_type?: string;
        search?: string;
    };
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
];

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

export default function AuditsIndex({ audits, filters }: AuditsIndexProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [auditorTypeFilter, setAuditorTypeFilter] = useState(filters.auditor_type || '');

    const handleSearch = () => {
        router.get(route('audits.index'), {
            search: searchTerm,
            auditor_type: auditorTypeFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setAuditorTypeFilter('');
        router.get(route('audits.index'), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Audit - Sistem Pemantauan Audit" />
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📋 Daftar Audit</h1>
                        <p className="text-gray-600 dark:text-gray-400">Kelola semua laporan audit dari SPI, BPK, dan KAP</p>
                    </div>
                    <Link
                        href={route('audits.create')}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <span>📝</span>
                        <span>Tambah Audit</span>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                🔍 Pencarian
                            </label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari nama atau nomor laporan..."
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                🏛️ Jenis Auditor
                            </label>
                            <select
                                value={auditorTypeFilter}
                                onChange={(e) => setAuditorTypeFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Semua Auditor</option>
                                <option value="SPI">SPI</option>
                                <option value="BPK">BPK</option>
                                <option value="KAP">KAP</option>
                            </select>
                        </div>
                        <div className="flex items-end space-x-2">
                            <button
                                onClick={handleSearch}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Cari
                            </button>
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Audits List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    {audits.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b border-gray-200 dark:border-gray-600">
                                        <tr>
                                            <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Laporan</th>
                                            <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Nomor</th>
                                            <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Tanggal</th>
                                            <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Auditor</th>
                                            <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Status Temuan</th>
                                            <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {audits.data.map((audit) => (
                                            <tr key={audit.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="py-4 px-6">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {audit.report_name}
                                                        </p>
                                                        {audit.description && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                                {audit.description.length > 100 
                                                                    ? audit.description.substring(0, 100) + '...' 
                                                                    : audit.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-gray-900 dark:text-white font-mono text-sm">
                                                    {audit.report_number}
                                                </td>
                                                <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                                                    {audit.audit_date}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                                                        <span>{getAuditorEmoji(audit.auditor_type)}</span>
                                                        <span>{audit.auditor_type}</span>
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center space-x-4 text-sm">
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            Total: <span className="font-medium text-gray-900 dark:text-white">{audit.findings_count}</span>
                                                        </span>
                                                        <span className="text-red-600">
                                                            Pending: <span className="font-medium">{audit.pending_findings}</span>
                                                        </span>
                                                        <span className="text-green-600">
                                                            Selesai: <span className="font-medium">{audit.completed_findings}</span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center space-x-2">
                                                        <Link
                                                            href={route('audits.show', audit.id)}
                                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                                        >
                                                            Lihat
                                                        </Link>
                                                        <Link
                                                            href={route('findings.create', audit.id)}
                                                            className="text-green-600 hover:text-green-800 font-medium text-sm"
                                                        >
                                                            + Temuan
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {audits.links.length > 3 && (
                                <div className="flex items-center justify-center space-x-2 p-4 border-t border-gray-200 dark:border-gray-600">
                                    {audits.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-1 rounded text-sm font-medium ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : link.url
                                                    ? 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900'
                                                    : 'text-gray-400 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <span className="text-6xl mb-4 block">📭</span>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Belum ada data audit</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Mulai dengan menambahkan audit pertama Anda</p>
                            <Link
                                href={route('audits.create')}
                                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <span>📝</span>
                                <span>Tambah Audit</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}