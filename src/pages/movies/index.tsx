import { MovieFilters } from '@/features/movie-search/movie-filters'
import { MovieSearch } from '@/features/movie-search/movie-search'
import { MovieSearchResults } from '@/features/movie-search/movie-search-results'

export const filterRanges = {
  minYear: 1924,
  maxYear: 2025,
  minRating: 0,
  maxRating: 10,
}

export default function MoviePage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col mt-1">
          <MovieSearch />

          <MovieFilters
            minYear={filterRanges.minYear}
            maxYear={filterRanges.maxYear}
            minRating={filterRanges.minRating}
            maxRating={filterRanges.maxRating}
          />
          <MovieSearchResults />
        </div>
      </div>
    </div>
  )
}
