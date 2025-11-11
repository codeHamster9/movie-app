import { useMemo } from 'react'

import Spinner from '@/components/spinner'
import { MovieCarousel } from '@/features/movie-search/movie-carousel'
import { MoviePagination } from '@/features/movie-search/movie-pagination'
import { MovieResultsCounters } from '@/features/movie-search/movie-results-counters'
import { useDebounce } from '@/hooks/use-debounce'
import { useMovieSearch } from '@/features/movie-search/hooks/use-movies'
import type { Movie } from '@/api/tmdb-api'
import { filterRanges } from '@/pages/movies'
import { useMovieStore } from '@/features/movie-search/store/movie-store'

export function MovieSearchResults() {
  const searchQuery = useMovieStore((state) => state.searchQuery)
  const selectedYear = useMovieStore((state) => state.selectedYear)
  const selectedRating = useMovieStore((state) => state.selectedRating)
  const currentPage = useMovieStore((state) => state.currentPage)
  const selectedGenreId = useMovieStore((state) => state.selectedGenreId)

  const debouncedSearch = useDebounce(searchQuery, 500)

  const { data: searchResponse, isLoading: loading } = useMovieSearch(
    debouncedSearch,
    currentPage,
    selectedGenreId || undefined,
  )

  const movies = searchResponse?.movies || []
  const totalResults = searchResponse?.totalResults || 0
  const totalPages = searchResponse?.totalPages || 0

  const filteredMovies = useMemo(() => {
    return movies.filter((movie: Movie) => {
      const movieYear = Number.parseInt(
        movie.release_date?.split('-')[0] || '0',
        10,
      )
      const movieRating = movie.vote_average

      const matchesYear =
        selectedYear === filterRanges.minYear || movieYear >= selectedYear
      const matchesRating =
        selectedRating === filterRanges.minRating ||
        movieRating >= selectedRating

      return matchesYear && matchesRating
    })
  }, [movies, selectedYear, selectedRating, filterRanges])

  return (
    <div className="flex flex-col gap-6 mt-6">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <MovieResultsCounters
              totalResults={totalResults}
              totalPages={totalPages}
              filteredMovies={filteredMovies.length}
            />

            <div>
              <MoviePagination
                totalPages={totalPages}
                hide={loading || !totalPages}
              />
            </div>
          </div>
          <MovieCarousel
            movies={filteredMovies}
            autoScroll={!loading}
            loading={loading}
          />
        </>
      )}
    </div>
  )
}
