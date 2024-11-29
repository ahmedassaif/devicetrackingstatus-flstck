<?php

namespace App\Shared\Common\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Shared\Common\Constants\CommonMaximumLengthFor;
use App\Shared\Common\Constants\ContentTypes;
use App\Shared\Common\Attributes\OpenApiContentTypeAttribute;

class FileRequest extends FormRequest
{
    #[OpenApiContentTypeAttribute(ContentTypes::TEXT_PLAIN)]
    public ?string $storage_file_id = null;

    // #[OpenApiContentTypeAttribute('application/octet-stream')]
    #[OpenApiContentTypeAttribute(ContentTypes::TEXT_PLAIN)]
    public ?string $file_binary = null;

    #[OpenApiContentTypeAttribute(ContentTypes::TEXT_PLAIN)]
    public ?string $file_name = null;

    #[OpenApiContentTypeAttribute(ContentTypes::TEXT_PLAIN)]
    public ?string $file_content_type = null;

    #[OpenApiContentTypeAttribute(ContentTypes::TEXT_PLAIN)]
    public ?int $file_size = null;

    public function rules()
    {
        return [
            'storage_file_id' => 'sometimes|required|max:' . CommonMaximumLengthFor::STORAGE_FILE_ID,
            'file_binary' => 'required_without:storage_file_id',
            'file_name' => 'required|max:' . CommonMaximumLengthFor::FILE_NAME,
            'file_content_type' => 'required|max:' . CommonMaximumLengthFor::FILE_CONTENT_TYPE,
            'file_size' => 'required|numeric', // Ensure file size is numeric
        ];
    }
}