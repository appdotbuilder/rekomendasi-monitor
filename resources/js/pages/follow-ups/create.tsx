import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';



interface Audit {
    report_name: string;
    report_number: string;
}

interface Finding {
    id: number;
    finding_code: string;
    description: string;
    recommendation: string;
    current_status: string;
    audit: Audit;
}

interface CreateFollowUpProps {
    finding: Finding;
    [key: string]: unknown;
}

export default function CreateFollowUp({ finding }: CreateFollowUpProps) {
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
            title: finding.finding_code,
            href: `/findings/${finding.id}`,
        },
        {
            title: 'Tambah Tindak Lanjut',
            href: '#',
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        finding_id: finding.id,
        follow_up_date: new Date().toISOString().split('T')[0],
        responsible_party: '',
        action_description: '',
        new_status: finding.current_status,
        supporting_document: '',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('follow-ups.store'));
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Tambah Tindak Lanjut - ${finding.finding_code}`} />
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">📋 Tambah Tindak Lanjut</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{finding.finding_code}</span>
                        <span>📋 {finding.audit.report_name}</span>
                        <span>📄 {finding.audit.report_number}</span>
                    </div>
                    
                    {/* Finding Context */}
                    <div className="grid lg:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📝 Temuan:</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                {finding.description.length > 150 
                                    ? finding.description.substring(0, 150) + '...' 
                                    : finding.description}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">💡 Rekomendasi:</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                {finding.recommendation.length > 150 
                                    ? finding.recommendation.substring(0, 150) + '...' 
                                    : finding.recommendation}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Follow-up Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    📅 Tanggal Tindak Lanjut <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.follow_up_date}
                                    onChange={(e) => setData('follow_up_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                {errors.follow_up_date && (
                                    <p className="text-red-500 text-sm mt-1">{errors.follow_up_date}</p>
                                )}
                            </div>

                            {/* New Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    📊 Status Baru <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.new_status}
                                    onChange={(e) => setData('new_status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="Belum Ditindaklanjuti">{getStatusEmoji('Belum Ditindaklanjuti')} Belum Ditindaklanjuti</option>
                                    <option value="Sedang Ditindaklanjuti">{getStatusEmoji('Sedang Ditindaklanjuti')} Sedang Ditindaklanjuti</option>
                                    <option value="Selesai">{getStatusEmoji('Selesai')} Selesai</option>
                                    <option value="Dibatalkan">{getStatusEmoji('Dibatalkan')} Dibatalkan</option>
                                </select>
                                <p className="text-sm text-gray-500 mt-1">
                                    Status saat ini: <span className="font-medium">{finding.current_status}</span>
                                </p>
                                {errors.new_status && (
                                    <p className="text-red-500 text-sm mt-1">{errors.new_status}</p>
                                )}
                            </div>
                        </div>

                        {/* Responsible Party */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                👤 Pihak Bertanggung Jawab <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.responsible_party}
                                onChange={(e) => setData('responsible_party', e.target.value)}
                                placeholder="Contoh: Divisi Keuangan, Manager IT, PT ABC, dll."
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                required
                            />
                            {errors.responsible_party && (
                                <p className="text-red-500 text-sm mt-1">{errors.responsible_party}</p>
                            )}
                        </div>

                        {/* Action Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                📝 Deskripsi Tindakan <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.action_description}
                                onChange={(e) => setData('action_description', e.target.value)}
                                placeholder="Jelaskan secara detail tindakan yang telah atau akan dilakukan untuk menindaklanjuti rekomendasi ini..."
                                rows={6}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                required
                            />
                            {errors.action_description && (
                                <p className="text-red-500 text-sm mt-1">{errors.action_description}</p>
                            )}
                        </div>

                        {/* Supporting Document */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                📎 Dokumen Pendukung
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setData('supporting_document', e.target.files?.[0] as any || '')} // eslint-disable-line @typescript-eslint/no-explicit-any
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Format yang didukung: PDF, DOC, DOCX, JPG, PNG. Maksimal 10MB.
                            </p>
                            {errors.supporting_document && (
                                <p className="text-red-500 text-sm mt-1">{errors.supporting_document}</p>
                            )}
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                📄 Catatan Tambahan
                            </label>
                            <textarea
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                placeholder="Tambahkan catatan, kendala, atau informasi tambahan lainnya..."
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.notes && (
                                <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
                            )}
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
                                        <span>Simpan Tindak Lanjut</span>
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