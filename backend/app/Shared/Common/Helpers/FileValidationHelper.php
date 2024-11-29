<?php

namespace App\Shared\Common\Helpers;

use Illuminate\Http\UploadedFile;
// use Intervention\Image\Image; // Make sure to install the Intervention Image package
use Intervention\Image\Laravel\Facades\Image;

class FileValidationHelper
{
    /**
     * Check if file has valid size.
     *
     * @param UploadedFile|null $file
     * @param int $validSize Maximum File Size (default = 20MB)
     * @return bool
     */
    public static function validFileSize(?UploadedFile $file, int $validSize = 20971520): bool
    {
        return $file === null || $file->getSize() <= $validSize;
    }

    /**
     * Check if multiple files have valid size.
     *
     * @param array|null $files
     * @param int $validSize Maximum File Size (default = 20MB)
     * @return bool
     */
    public static function validFileSizeMultiple(?array $files, int $validSize = 20971520): bool
    {
        if ($files !== null) {
            foreach ($files as $file) {
                if ($file->getSize() > $validSize) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Check if file has valid extension.
     *
     * @param UploadedFile|null $file
     * @param string ...$extensions
     * @return bool
     */
    public static function validFileExtension(?UploadedFile $file, string ...$extensions): bool
    {
        if ($file !== null) {
            $fileExt = $file->getClientOriginalExtension();
            return in_array($fileExt, $extensions);
        }
        return true;
    }

    /**
     * Check if file is an image.
     *
     * @param UploadedFile|null $file
     * @return bool
     */
    public static function validImageFile(?UploadedFile $file): bool
    {
        if ($file !== null) {
            try {
                $image = Image::read($file->getRealPath());
                return true;
            } catch (\Exception $e) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check if file has valid file compression extension.
     *
     * @param UploadedFile|null $file
     * @return bool
     */
    public static function validFileCompression(?UploadedFile $file): bool
    {
        if ($file !== null) {
            $extensions = ['.7z', '.rar', '.zip'];
            $fileExt = $file->getClientOriginalExtension();
            return in_array('.' . $fileExt, $extensions);
        }
        return true;
    }

    /**
     * Check if file is a document.
     *
     * @param UploadedFile|null $file
     * @return bool
     */
    public static function validDocumentFile(?UploadedFile $file): bool
    {
        if ($file !== null) {
            $extensions = ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.csv'];
            $fileExt = $file->getClientOriginalExtension();
            return in_array('.' . $fileExt, $extensions);
        }
        return true;
    }

    /**
     * Check if file has valid dimensions.
     *
     * @param UploadedFile|null $file
     * @param int $minWidth Minimum Image Width
     * @param int $minHeight Minimum Image Height
     * @return bool
     */
    public static function validMinImageDimension(?UploadedFile $file, int $minWidth, int $minHeight): bool
    {
        if ($file !== null) {
            try {
                $image = Image::read($file->getRealPath());
                return $image->width() >= $minWidth && $image->height() >= $minHeight;
            } catch (\Exception $e) {
                return false;
            }
        }
        return true;
    }

    /**
     * Get Content Type from File Name
     *
     * @param string $fileName
     * @return string
     */
    public static function getContentType(string $fileName): string
    {
        return \Illuminate\Support\Facades\Storage::mimeType($fileName);
    }
}