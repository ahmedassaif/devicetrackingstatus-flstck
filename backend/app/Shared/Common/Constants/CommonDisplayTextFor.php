<?php

namespace App\Shared\Common\Constants;

use App\Shared\Common\Extensions\StringExtensions;

class CommonDisplayTextFor
{
    public const HOME = 'Home';
    public const ABOUT = 'About';
    public const INDEX = 'Index';
    public const MASTER_DATA = 'Master Data'; // Store as a string

    public const ID = 'ID';
    public const ON = 'On';

    public const ACTION = 'Action';
    public const REQUIRED = 'Required';

    public const SUBMIT = 'Submit';
    public const SUBMITTED = 'Submitted';

    public const CREATE = 'Create';
    public const CREATED = 'Created';

    public const ADD = 'Add';
    public const ADDED = 'Added';

    public const COMMIT = 'Commit';
    public const COMMITTED = 'Committed';

    public const EDIT = 'Edit';
    public const EDITED = 'Edited';

    public const MODIFY = 'Modify';
    public const MODIFIED = 'Modified';

    public const UPDATE = 'Update';
    public const UPDATED = 'Updated';

    public const REFRESH = 'Refresh';
    public const REFRESHED = 'Refreshed';

    public const RELOAD = 'Reload';
    public const RELOADED = 'Reloaded';

    public const ENABLE = 'Enable';
    public const ENABLED = 'Enabled';

    public const DISABLE = 'Disable';
    public const DISABLED = 'Disabled';

    public const DELETE = 'Delete';
    public const DELETED = 'Deleted';

    public const SELECT = 'Select';
    public const SELECTED = 'Selected';

    public const DOWNLOAD = 'Download';
    public const DOWNLOADED = 'Downloaded';

    public const UPLOAD = 'Upload';
    public const UPLOADED = 'Uploaded';

    public const IMPORT = 'Import';
    public const IMPORTED = 'Imported';

    public const EXPORT = 'Export';
    public const EXPORTED = 'Exported';

    public const VIEW = 'View';
    public const SEARCH = 'Search';
    public const FILTER = 'Filter';
    public const APPLY = 'Apply';
    public const CONFIRM = 'Confirm';
    public const CANCEL = 'Cancel';
    public const DISMISS = 'Dismiss';
    public const GET = 'Get';

    public const BY = 'By';
    public const CREATED_BY = 'Created By'; // Store as a string
    public const MODIFIED_BY = 'Modified By'; // Store as a string

    public const FILE = 'File';
    public const FILE_NAME = 'File Name'; // Store as a string
    public const FILE_SIZE = 'File Size'; // Store as a string

    public const GENERAL_INFO = 'General Info'; // Store as a string
    public const TABLES = 'Tables';
    public const CHARTS = 'Charts';

    public const UNSUPPORTED = 'Unsupported';
    public const SERVICE = 'Service';
    public const ERROR = 'Error';

    // Static properties to hold split words
    public static function getMasterData()
    {
        return StringExtensions::splitWords(self::MASTER_DATA);
    }

    public static function getCreatedBy()
    {
        return StringExtensions::splitWords(self::CREATED_BY);
    }

    public static function getModifiedBy()
    {
        return StringExtensions::splitWords(self::MODIFIED_BY);
    }

    public static function getFileName()
    {
        return StringExtensions::splitWords(self::FILE_NAME);
    }

    public static function getFileSize()
    {
        return StringExtensions::splitWords(self::FILE_SIZE);
    }

    public static function getGeneralInfo()
    {
        return StringExtensions::splitWords(self::GENERAL_INFO);
    }
}