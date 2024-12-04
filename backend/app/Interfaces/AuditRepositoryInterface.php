<?php

namespace App\Interfaces;

interface AuditRepositoryInterface
{
    public function index($fromYear, $toYear, $page, $pageSize);
    public function getById($id);
}
