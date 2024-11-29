<?php

namespace App\Shared\Common\Formats;

class DateTimeFormats
{
    const DD_MM_YYYY = 'd-m-Y';
    const DD_MMM_YYYY = 'd-M-Y';
    const DD_MMMM_YYYY = 'd F Y';

    const DD_MM_YYYY_HH_MM_SS = 'd-m-Y H:i:s';
    const DD_MMM_YYYY_HH_MM_SS = 'd-M-Y H:i:s';
    const DD_MMMM_YYYY_HH_MM_SS = 'd F Y H:i:s';

    const DD_MMMM_YYYY_HH_MM_SS_ZZZ = 'd F Y H:i:s "UTC" O';
}