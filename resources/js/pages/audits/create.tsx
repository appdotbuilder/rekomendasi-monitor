import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';



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
        title: 'Tambah Audit',
        href: '/audits/create',
    },
];

export default function CreateAudit() {
    const { data, setData, post, processing, errors } = useForm({
        report_name: '',
        report_number: '',
        audit_date: '',
        auditor_type: '',
        report_file: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('audits.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Audit - Sistem Pemantauan Audit" />
            <div className="space-y-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📝 Tambah Audit Baru</h1>
                    <p className="text-gray-600 dark:text-gray-400">Masukkan informasi laporan audit dari SPI, BPK, atau KAP</p>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Report Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    📋 Nama Laporan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.report_name}
                                    onChange={(e) => setData('report_name', e.target.value)}
                                    placeholder="Contoh: Laporan Pemeriksaan SPI Tahun 2024"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                {errors.report_name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.report_name}</p>
                                )}
                            </div>

                            {/* Report Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    🔢 Nomor Laporan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.report_number}
                                    onChange={(e) => setData('report_number', e.target.value)}
                                    placeholder="Contoh: SPI/001/2024"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                {errors.report_number && (
                                    <p className="text-red-500 text-sm mt-1">{errors.report_number}</p>
                                )}
                            </div>

                            {/* Audit Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    📅 Tanggal Audit <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.audit_date}
                                    onChange={(e) => setData('audit_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                {errors.audit_date && (
                                    <p className="text-red-500 text-sm mt-1">{errors.audit_date}</p>
                                )}
                            </div>

                            {/* Auditor Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    🏛️ Jenis Auditor <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.auditor_type}
                                    onChange={(e) => setData('auditor_type', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="">Pilih Jenis Auditor</option>
                                    <option value="SPI">🔍 SPI (Satuan Pengawasan Internal)</option>
                                    <option value="BPK">🏛️ BPK (Badan Pemeriksa Keuangan)</option>
                                    <option value="KAP">📋 KAP (Kantor Akuntan Publik)</option>
                                </select>
                                {errors.auditor_type && (
                                    <p className="text-red-500 text-sm mt-1">{errors.auditor_type}</p>
                                )}
                            </div>
                        </div>

                        {/* Report File */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                📎 File Laporan
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setData('report_file', e.target.files?.[0] as any || '')} // eslint-disable-line @typescript-eslint/no-explicit-any
                                accept=".pdf,.doc,.docx"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Format yang didukung: PDF, DOC, DOCX. Maksimal 10MB.
                            </p>
                            {errors.report_file && (
                                <p className="text-red-500 text-sm mt-1">{errors.report_file}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                📄 Deskripsi Audit
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Masukkan deskripsi singkat mengenai audit ini..."
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
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
                                        <span>Simpan Audit</span>
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