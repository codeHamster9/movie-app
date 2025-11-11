import { create } from 'zustand'

interface MovieStore {
  searchQuery: string
  selectedYear: number
  selectedRating: number
  currentPage: number
  selectedGenreId: number | null
  setSearchQuery: (query: string) => void
  setSelectedYear: (year: number) => void
  setSelectedRating: (rating: number) => void
  setCurrentPage: (page: number) => void
  setSelectedGenreId: (genreId: number | null) => void
  resetFilters: () => void
}

export const useMovieStore = create<MovieStore>((set) => ({
  searchQuery: '',
  selectedYear: 1970,
  selectedRating: 0,
  currentPage: 1,
  selectedGenreId: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedYear: (year) => set({ selectedYear: year }),
  setSelectedRating: (rating) => set({ selectedRating: rating }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedGenreId: (genreId) => set({ selectedGenreId: genreId }),
  resetFilters: () =>
    set({ selectedYear: 1970, selectedRating: 0, currentPage: 1 }),
}))
