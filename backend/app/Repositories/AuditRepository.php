<?php

namespace App\Repositories;

use App\Interfaces\AuditRepositoryInterface;
use OwenIt\Auditing\Models\Audit;

class AuditRepository implements AuditRepositoryInterface
{
    /**
     * Create a new class instance.
     */
    public function index(){
        return Audit::all();
    }

    public function getById($id){
        return Audit::findOrFail($id);
    }
}
