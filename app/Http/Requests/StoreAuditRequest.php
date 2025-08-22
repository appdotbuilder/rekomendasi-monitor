<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAuditRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'report_name' => 'required|string|max:255',
            'report_number' => 'required|string|max:255|unique:audits,report_number',
            'audit_date' => 'required|date',
            'auditor_type' => 'required|in:SPI,BPK,KAP',
            'report_file' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'description' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'report_name.required' => 'Nama laporan harus diisi.',
            'report_number.required' => 'Nomor laporan harus diisi.',
            'report_number.unique' => 'Nomor laporan sudah ada.',
            'audit_date.required' => 'Tanggal pemeriksaan harus diisi.',
            'auditor_type.required' => 'Jenis pemeriksa harus dipilih.',
            'auditor_type.in' => 'Jenis pemeriksa harus SPI, BPK, atau KAP.',
            'report_file.mimes' => 'File laporan harus berformat PDF, DOC, atau DOCX.',
            'report_file.max' => 'Ukuran file laporan maksimal 10MB.',
        ];
    }
}