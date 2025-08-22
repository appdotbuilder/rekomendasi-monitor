<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFindingRequest extends FormRequest
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
            'audit_id' => 'required|exists:audits,id',
            'finding_code' => 'required|string|max:255',
            'description' => 'required|string',
            'recommendation' => 'required|string',
            'responsible_party' => 'nullable|string|max:255',
            'target_completion' => 'nullable|date|after:today',
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
            'audit_id.required' => 'ID audit harus diisi.',
            'audit_id.exists' => 'Audit tidak ditemukan.',
            'finding_code.required' => 'Kode temuan harus diisi.',
            'description.required' => 'Deskripsi temuan harus diisi.',
            'recommendation.required' => 'Rekomendasi harus diisi.',
            'target_completion.after' => 'Target penyelesaian harus setelah hari ini.',
        ];
    }
}