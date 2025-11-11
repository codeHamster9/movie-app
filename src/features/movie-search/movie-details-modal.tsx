import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useMovieDetails } from '@/features/movie-search/hooks/use-movies'
import { getPosterUrl } from '@/api/tmdb-api'

interface MovieDetailsModalProps {
  movieId: number | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MovieDetailsModal({
  movieId,
  open,
  onOpenChange,
}: MovieDetailsModalProps) {
  const {
    data: movieDetails,
    isLoading: loading,
    error,
  } = useMovieDetails(movieId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-destructive">
            <p>{(error as Error).message}</p>
          </div>
        ) : movieDetails ? (
          <ScrollArea className="max-h-[80vh]">
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {movieDetails.title}
                </DialogTitle>
                <DialogDescription>
                  {new Date(movieDetails.release_date).getFullYear()} •{' '}
                  {movieDetails.status} • {movieDetails.runtime} min
                </DialogDescription>
              </DialogHeader>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <img
                    src={
                      getPosterUrl(movieDetails.poster_path, 'w500') ||
                      '/placeholder.svg'
                    }
                    alt={movieDetails.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                  {movieDetails.vote_average > 0 && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <Badge className="bg-yellow-500 text-black hover:bg-yellow-600 text-lg px-4 py-2">
                        ⭐ {movieDetails.vote_average.toFixed(1)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        ({movieDetails.vote_count} votes)
                      </span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Synopsis</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {movieDetails.overview}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {movieDetails.credits.crew.find(
                      (c) => c.job === 'Director',
                    ) && (
                      <div>
                        <span className="font-semibold">Director:</span>{' '}
                        <span className="text-muted-foreground">
                          {
                            movieDetails.credits.crew.find(
                              (c) => c.job === 'Director',
                            )?.name
                          }
                        </span>
                      </div>
                    )}
                    {movieDetails.credits.cast.length > 0 && (
                      <div>
                        <span className="font-semibold">Cast:</span>{' '}
                        <span className="text-muted-foreground">
                          {movieDetails.credits.cast
                            .slice(0, 5)
                            .map((actor) => actor.name)
                            .join(', ')}
                        </span>
                      </div>
                    )}
                    {movieDetails.credits.crew.filter(
                      (c) => c.job === 'Writer' || c.job === 'Screenplay',
                    ).length > 0 && (
                      <div>
                        <span className="font-semibold">Writer:</span>{' '}
                        <span className="text-muted-foreground">
                          {movieDetails.credits.crew
                            .filter(
                              (c) =>
                                c.job === 'Writer' || c.job === 'Screenplay',
                            )
                            .slice(0, 3)
                            .map((writer) => writer.name)
                            .join(', ')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {movieDetails.genres.map((genre) => (
                        <Badge key={genre.id} variant="secondary">
                          {genre.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold">Released:</span>{' '}
                      <span className="text-muted-foreground">
                        {movieDetails.release_date}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Language:</span>{' '}
                      <span className="text-muted-foreground">
                        {movieDetails.original_language.toUpperCase()}
                      </span>
                    </div>
                    {movieDetails.production_countries.length > 0 && (
                      <div>
                        <span className="font-semibold">Country:</span>{' '}
                        <span className="text-muted-foreground">
                          {movieDetails.production_countries
                            .map((c) => c.name)
                            .join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
