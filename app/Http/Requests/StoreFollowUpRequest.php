<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFollowUpRequest extends FormRequest
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
            'finding_id' => 'required|exists:findings,id',
            'follow_up_date' => 'required|date',
            'responsible_party' => 'required|string|max:255',
            'action_description' => 'required|string',
            'new_status' => 'required|in:Belum Ditindaklanjuti,Sedang Ditindaklanjuti,Selesai,Dibatalkan',
            'supporting_document' => 'nullable|file|mimes:pdf,doc,docx,jpg,png|max:10240',
            'notes' => 'nullable|string',
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
            'finding_id.required' => 'ID temuan harus diisi.',
            'finding_id.exists' => 'Temuan tidak ditemukan.',
            'follow_up_date.required' => 'Tanggal tindak lanjut harus diisi.',
            'responsible_party.required' => 'Pihak bertanggung jawab harus diisi.',
            'action_description.required' => 'Deskripsi tindakan harus diisi.',
            'new_status.required' => 'Status baru harus dipilih.',
            'new_status.in' => 'Status tidak valid.',
            'supporting_document.mimes' => 'File pendukung harus berformat PDF, DOC, DOCX, JPG, atau PNG.',
            'supporting_document.max' => 'Ukuran file pendukung maksimal 10MB.',
        ];
    }
}