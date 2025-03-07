<?php

return [
    'provider' => env('STORAGE_PROVIDER', 'LocalFolder'),
    'local_folder' => [
        'folder_path' => env('LOCAL_FOLDER_PATH', 'C:/storages/devicetrackingstatus'),
    ],
];