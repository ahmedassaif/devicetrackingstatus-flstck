<?php

namespace App\Interfaces;

interface AuditRepositoryInterface
{
    public function index();
    public function getById($id);
}
