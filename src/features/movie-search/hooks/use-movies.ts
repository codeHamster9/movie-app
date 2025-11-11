import { useQuery } from '@tanstack/react-query'

import { searchMovies, getMovieDetails, getGenreList } from '@/api/tmdb-api'

export function useMovieSearch(
  searchQuery: string,
  page = 1,
  genreId?: number,
) {
  return useQuery({
    queryKey: ['movies', searchQuery, page, genreId],
    queryFn: async () => searchMovies(searchQuery, page, genreId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: true,
  })
}

export function useMovieDetails(movieId: number | null) {
  return useQuery({
    queryKey: ['movie-details', movieId],
    queryFn: async () => getMovieDetails(movieId!),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useGenreList(selectFn?: (data: any) => any) {
  return useQuery({
    queryKey: ['genres'],
    queryFn: getGenreList,
    staleTime: 60 * 60 * 1000, // 1 hour (genres don't change often)
    select: selectFn,
  })
}
