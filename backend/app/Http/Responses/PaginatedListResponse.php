<?php
namespace App\Http\Responses;

class PaginatedListResponse
{
    /**
     * @var array
     */
    private array $items;

    /**
     * @var int
     */
    private int $pageIndex;

    /**
     * @var int
     */
    private int $totalPages;

    /**
     * @var int
     */
    private int $totalCount;

    /**
     * @var bool
     */
    private bool $hasPreviousPage;

    /**
     * @var bool
     */
    private bool $hasNextPage;

    public function __construct(
        array $items,
        int $pageIndex,
        int $totalPages,
        int $totalCount,
        bool $hasPreviousPage,
        bool $hasNextPage
    ) {
        $this->items = $items;
        $this->pageIndex = $pageIndex;
        $this->totalPages = $totalPages;
        $this->totalCount = $totalCount;
        $this->hasPreviousPage = $hasPreviousPage;
        $this->hasNextPage = $hasNextPage;
    }

    public function toArray(): array
    {
        return [
            'items' => $this->items,
            'pageIndex' => $this->pageIndex,
            'totalPages' => $this->totalPages,
            'totalCount' => $this->totalCount,
            'hasPreviousPage' => $this->hasPreviousPage,
            'hasNextPage' => $this->hasNextPage,
        ];
    }
}