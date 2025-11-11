import { useGenreList } from '@/features/movie-search/hooks/use-movies'
import type { Genre } from '@/api/tmdb-api'
import { useMovieStore } from '@/features/movie-search/store/movie-store'

import { Autocomplete } from '../../components/autocomplete'

export function MovieSearch() {
  const setSearchQuery = useMovieStore((state) => state.setSearchQuery)
  const setSelectedGenreId = useMovieStore((state) => state.setSelectedGenreId)
  const resetFilters = useMovieStore((state) => state.resetFilters)
  const { data: genres } = useGenreList((data: Genre[]) =>
    data.map((d) => ({ value: d.id, label: d.name })),
  )

  const handleSelect = (value: string, suggested: boolean | undefined) => {
    if (suggested) {
      // if searching by genre
      setSelectedGenreId(Number(value))
    } else {
      setSelectedGenreId(null)
      setSearchQuery(value)
    }
    resetFilters()
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-[24vh]">
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-8 text-balance">
        Find Your Next <span className="text-primary">Favorite Movie</span>
      </h1>
      <div className="flex gap-3 w-full max-w-3xl">
        <Autocomplete
          items={genres}
          onSelect={handleSelect}
          placeholder="Search by movie title or genre..."
        />
      </div>
    </div>
  )
}
