import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface FollowUp {
    id: number;
    follow_up_date: string;
    responsible_party: string;
    action_description: string;
    new_status: string;
    supporting_document: string | null;
    user_name: string;
    finding_code: string;
    audit_name: string;
    auditor_type: string;
}

interface FollowUpsIndexProps {
    followUps: {
        data: FollowUp[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    filters: {
        status?: string;
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
        title: 'Riwayat Tindak Lanjut',
        href: '/follow-ups',
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

export default function FollowUpsIndex({ followUps, filters }: FollowUpsIndexProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [auditorTypeFilter, setAuditorTypeFilter] = useState(filters.auditor_type || '');

    const handleSearch = () => {
        router.get(route('follow-ups.index'), {
            search: searchTerm,
            status: statusFilter,
            auditor_type: auditorTypeFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('');
        setAuditorTypeFilter('');
        router.get(route('follow-ups.index'), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat Tindak Lanjut - Sistem Pemantauan Audit" />
            <div className="space-y-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📊 Riwayat Tindak Lanjut</h1>
                    <p className="text-gray-600 dark:text-gray-400">Pantau semua tindak lanjut rekomendasi audit</p>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                🔍 Pencarian
                            </label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari pihak bertanggung jawab atau tindakan..."
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                📊 Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Semua Status</option>
                                <option value="Belum Ditindaklanjuti">Belum Ditindaklanjuti</option>
                                <option value="Sedang Ditindaklanjuti">Sedang Ditindaklanjuti</option>
                                <option value="Selesai">Selesai</option>
                                <option value="Dibatalkan">Dibatalkan</option>
                            </select>
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

                {/* Follow-ups List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    {followUps.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b border-gray-200 dark:border-gray-600">
                                        <tr>
                                            <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Tanggal</th>
                                            <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Temuan</th>
                                            <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Pihak Bertanggung Jawab</th>
                                            <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Tindakan</th>
                                            <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Status</th>
                                            <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">User</th>
                                            <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {followUps.data.map((followUp) => (
                                            <tr key={followUp.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                                                    📅 {followUp.follow_up_date}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white font-mono text-sm">
                                                            {followUp.finding_code}
                                                        </p>
                                                        <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                            <span className="flex items-center space-x-1">
                                                                <span>{getAuditorEmoji(followUp.auditor_type)}</span>
                                                                <span>{followUp.auditor_type}</span>
                                                            </span>
                                                            <span>•</span>
                                                            <span>{followUp.audit_name.length > 30 
                                                                ? followUp.audit_name.substring(0, 30) + '...' 
                                                                : followUp.audit_name}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-gray-900 dark:text-white">
                                                    👤 {followUp.responsible_party}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <p className="text-gray-700 dark:text-gray-300">
                                                        {followUp.action_description}
                                                    </p>
                                                    {followUp.supporting_document && (
                                                        <a
                                                            href={`/storage/${followUp.supporting_document}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-xs font-medium mt-1"
                                                        >
                                                            <span>📎</span>
                                                            <span>Dokumen</span>
                                                        </a>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(followUp.new_status)}`}>
                                                        <span>{getStatusEmoji(followUp.new_status)}</span>
                                                        <span>{followUp.new_status}</span>
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-gray-600 dark:text-gray-400 text-sm">
                                                    👤 {followUp.user_name}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <Link
                                                        href={route('follow-ups.show', followUp.id)}
                                                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                                    >
                                                        Lihat
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {followUps.links.length > 3 && (
                                <div className="flex items-center justify-center space-x-2 p-4 border-t border-gray-200 dark:border-gray-600">
                                    {followUps.links.map((link, index) => (
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
                            <span className="text-6xl mb-4 block">📊</span>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Belum ada data tindak lanjut</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Mulai dengan menambahkan tindak lanjut dari temuan audit</p>
                            <Link
                                href={route('audits.index')}
                                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <span>📋</span>
                                <span>Lihat Audit</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}