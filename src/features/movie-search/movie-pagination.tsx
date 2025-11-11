import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useMovieStore } from '@/features/movie-search/store/movie-store'

interface MoviePaginationProps {
  totalPages: number

  hide?: boolean
}

export function MoviePagination({
  totalPages,

  hide = false,
}: MoviePaginationProps) {
  const currentPage = useMovieStore((state) => state.currentPage)
  const setCurrentPage = useMovieStore((state) => state.setCurrentPage)

  if (hide) return null

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const showPages = 5 // total visible page items including first and last

    // If few pages, show them all
    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
      return pages
    }

    // Reserve slots: first and last are always shown
    const middleCount = showPages - 2 // slots available between first and last

    // Center the middle window around currentPage
    let start = currentPage - Math.floor(middleCount / 2)
    let end = start + middleCount - 1

    // Clamp to valid range [2, totalPages-1]
    if (start < 2) {
      start = 2
      end = start + middleCount - 1
    }
    if (end > totalPages - 1) {
      end = totalPages - 1
      start = end - (middleCount - 1)
    }

    pages.push(1)
    if (start > 2) pages.push('ellipsis')

    for (let i = start; i <= end; i++) pages.push(i)

    if (end < totalPages - 1) pages.push('ellipsis')
    pages.push(totalPages)

    return pages
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) setCurrentPage(currentPage - 1)
            }}
            className={
              currentPage === 1
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage(page)
                }}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages) setCurrentPage(currentPage + 1)
            }}
            className={
              currentPage === totalPages
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
