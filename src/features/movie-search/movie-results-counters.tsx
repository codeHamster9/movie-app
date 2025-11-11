import { useMovieStore } from '@/features/movie-search/store/movie-store'

export const MovieResultsCounters = ({
  totalPages,
  totalResults,
  filteredMovies,
}: {
  totalPages: number
  totalResults: number
  filteredMovies: number
}) => {
  const currentPage = useMovieStore((state) => state.currentPage)

  return (
    <div className="flex flex-col justify-between">
      <h2 className="text-2xl font-semibold">{filteredMovies} Movies</h2>
      <p className="text-sm text-muted-foreground mt-1 text-nowrap">
        Total results: {totalResults.toLocaleString()} | Page {currentPage} of{' '}
        {totalPages}
      </p>
    </div>
  )
}
