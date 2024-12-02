<?php

namespace App\Application\Common\Models;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PaginatedList
{
    public array $items; // The items for the current page
    public int $totalCount; // Total number of items
    public int $currentPage; // Current page number
    public int $totalPages; // Total number of pages
    public int $perPage; // Number of items per page

    public function __construct(LengthAwarePaginator $paginator)
    {
        $this->items = $paginator->items(); // Get the items for the current page
        $this->totalCount = $paginator->total(); // Total number of items
        $this->currentPage = $paginator->currentPage(); // Current page number
        $this->totalPages = $paginator->lastPage(); // Total number of pages
        $this->perPage = $paginator->perPage(); // Number of items per page
    }

    public static function create(LengthAwarePaginator $paginator): self
    {
        return new self($paginator);
    }

    public function hasPreviousPage(): bool
    {
        return $this->currentPage > 1;
    }

    public function hasNextPage(): bool
    {
        return $this->currentPage < $this->totalPages;
    }
}