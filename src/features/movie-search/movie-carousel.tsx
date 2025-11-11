import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState } from 'react'
import * as React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { MovieCard } from '@/features/movie-search/movie-card'
import { MovieDetailsModal } from '@/features/movie-search/movie-details-modal'
import { getPosterUrl } from '@/api/tmdb-api'
import type { Movie } from '@/api/tmdb-api'

interface MovieCarouselProps {
  movies: Movie[]
  autoScroll?: boolean
  loading?: boolean
}

export function MovieCarousel({
  movies,
  autoScroll = true,
  loading = false,
}: MovieCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  )

  useEffect(() => {
    if (!api) return

    if (autoScroll && !loading) {
      autoplayPlugin.current.play()
    } else {
      autoplayPlugin.current.stop()
    }
  }, [api, autoScroll, loading])

  const handleMovieClick = (movieId: number) => {
    setSelectedMovieId(movieId)
    setIsModalOpen(true)
  }

  if (!movies.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">No movies found matching your criteria.</p>
      </div>
    )
  }

  return (
    <>
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={autoScroll ? [autoplayPlugin.current] : []}
      >
        <CarouselContent>
          {movies.map((movie) => {
            const rating = movie.vote_average || null
            const year = movie.release_date
              ? new Date(movie.release_date).getFullYear().toString()
              : 'N/A'
            const posterUrl = getPosterUrl(movie.poster_path ?? null, 'w342')

            return (
              <CarouselItem key={movie.id} className="basis-auto">
                <div className="w-52">
                  <MovieCard
                    title={movie.title}
                    rating={rating}
                    year={year}
                    image={posterUrl}
                    onClick={() => handleMovieClick(movie.id)}
                  />
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <MovieDetailsModal
        movieId={selectedMovieId}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  )
}
