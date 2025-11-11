import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useMovieStore } from '@/features/movie-search/store/movie-store'

interface MovieFiltersProps {
  minYear: number
  maxYear: number
  minRating: number
  maxRating: number
}

export function MovieFilters({
  minYear,
  maxYear,
  minRating,
  maxRating,
}: MovieFiltersProps) {
  const selectedYear = useMovieStore((state) => state.selectedYear)
  const selectedRating = useMovieStore((state) => state.selectedRating)
  const setSelectedYear = useMovieStore((state) => state.setSelectedYear)
  const setSelectedRating = useMovieStore((state) => state.setSelectedRating)

  return (
    <div className="flex gap-6 items-center justify-center">
      <div className="space-y-3 min-w-[200px]">
        <Label htmlFor="year-filter" className="text-sm font-medium">
          Release Year:{' '}
          {selectedYear === minYear ? 'All Years' : `${selectedYear}+`}
        </Label>
        <Slider
          id="year-filter"
          min={minYear}
          max={maxYear}
          step={1}
          value={[selectedYear]}
          onValueChange={(values) => setSelectedYear(values[0])}
          className="w-[200px]"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{minYear}</span>
          <span>{maxYear}</span>
        </div>
      </div>

      <div className="space-y-3 min-w-[200px]">
        <Label htmlFor="rating-filter" className="text-sm font-medium">
          Minimum Rating:{' '}
          {selectedRating === minRating ? 'All' : selectedRating.toFixed(1)}
        </Label>
        <Slider
          id="rating-filter"
          min={minRating}
          max={maxRating}
          step={0.1}
          value={[selectedRating]}
          onValueChange={(values) => setSelectedRating(values[0])}
          className="w-[200px]"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{minRating.toFixed(1)}</span>
          <span>{maxRating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}
