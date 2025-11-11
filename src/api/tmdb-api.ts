const TMDB_API_KEY = "778188c6be8aa420e97fe8bcefad0815"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export interface Movie {
  id: number
  title: string
  release_date: string
  poster_path: string | null
  vote_average: number
  genre_ids: number[]
  overview: string
}

export interface Genre {
  id: number
  name: string
}

export interface MovieDetails {
  id: number
  title: string
  release_date: string
  runtime: number
  genres: { id: number; name: string }[]
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  status: string
  original_language: string
  production_countries: { name: string }[]
  credits: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[]
    crew: { id: number; name: string; job: string }[]
  }
}

export interface SearchResponse {
  movies: Movie[]
  totalResults: number
  totalPages: number
}

export function getPosterUrl(path: string | null, size: "w185" | "w342" | "w500" | "original" = "w342"): string {
  if (!path) return "/placeholder.svg?height=450&width=300"
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export async function getGenreList(): Promise<Genre[]> {
  const response = await fetch(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`)

  if (!response.ok) {
    throw new Error("Failed to fetch genres")
  }

  const data = await response.json()
  return data.genres || []
}

export async function searchMovies(query: string, page = 1, genreId?: number): Promise<SearchResponse> {
  let endpoint: string

  // Use discover endpoint when genre is selected
  if (genreId) {
    const params = new URLSearchParams({
      api_key: TMDB_API_KEY,
      page: page.toString(),
      with_genres: genreId.toString(),
    })

    endpoint = `${TMDB_BASE_URL}/discover/movie?${params}`
  } else if (query) {
    // Use search endpoint when only query is provided
    endpoint = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  } else {
    // Default to popular movies
    endpoint = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
  }

  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error("Failed to fetch movies")
  }

  const data = await response.json()

  return {
    movies: data.results || [],
    totalResults: data.total_results || 0,
    totalPages: data.total_pages || 0,
  }
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits`)

  if (!response.ok) {
    throw new Error("Failed to fetch movie details")
  }

  const data = await response.json()
  return data
}
