import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';



interface Audit {
    id: number;
    report_name: string;
    report_number: string;
}

interface CreateFindingProps {
    audit: Audit;
    [key: string]: unknown;
}

export default function CreateFinding({ audit }: CreateFindingProps) {
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
            title: audit.report_name,
            href: `/audits/${audit.id}`,
        },
        {
            title: 'Tambah Temuan',
            href: '#',
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        audit_id: audit.id,
        finding_code: '',
        description: '',
        recommendation: '',
        responsible_party: '',
        target_completion: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('findings.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Tambah Temuan - ${audit.report_name}`} />
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">🔍 Tambah Temuan Baru</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>📋 {audit.report_name}</span>
                        <span>📄 {audit.report_number}</span>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Finding Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                🔢 Kode Temuan <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.finding_code}
                                onChange={(e) => setData('finding_code', e.target.value)}
                                placeholder="Contoh: T-001, F-001, TM-001"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono"
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Gunakan kode unik untuk mengidentifikasi temuan ini
                            </p>
                            {errors.finding_code && (
                                <p className="text-red-500 text-sm mt-1">{errors.finding_code}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                📝 Deskripsi Temuan <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Jelaskan secara detail mengenai temuan audit yang ditemukan..."
                                rows={6}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                required
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                            )}
                        </div>

                        {/* Recommendation */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                💡 Rekomendasi <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.recommendation}
                                onChange={(e) => setData('recommendation', e.target.value)}
                                placeholder="Berikan rekomendasi tindakan yang perlu dilakukan untuk mengatasi temuan ini..."
                                rows={6}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                required
                            />
                            {errors.recommendation && (
                                <p className="text-red-500 text-sm mt-1">{errors.recommendation}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Responsible Party */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    👤 Pihak Bertanggung Jawab
                                </label>
                                <input
                                    type="text"
                                    value={data.responsible_party}
                                    onChange={(e) => setData('responsible_party', e.target.value)}
                                    placeholder="Contoh: Divisi Keuangan, PT ABC, dll."
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                                {errors.responsible_party && (
                                    <p className="text-red-500 text-sm mt-1">{errors.responsible_party}</p>
                                )}
                            </div>

                            {/* Target Completion */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    📅 Target Penyelesaian
                                </label>
                                <input
                                    type="date"
                                    value={data.target_completion}
                                    onChange={(e) => setData('target_completion', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                                {errors.target_completion && (
                                    <p className="text-red-500 text-sm mt-1">{errors.target_completion}</p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {processing ? (
                                    <>
                                        <span className="animate-spin">⏳</span>
                                        <span>Menyimpan...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>💾</span>
                                        <span>Simpan Temuan</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}