import { Star, Film } from 'lucide-react'
import { useState } from 'react'

import { Card } from '@/components/ui/card'

interface MovieCardProps {
  title: string
  rating?: number | null
  year: string
  image: string
  onClick?: () => void
}

export function MovieCard({
  title,
  rating,
  year,
  image,
  onClick,
}: MovieCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <Card
      className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-2/3 relative overflow-hidden">
        {imageError || image === 'N/A' ? (
          <div className="w-full h-full bg-linear-to-br from-muted to-muted/50 flex flex-col items-center justify-center p-4 text-center">
            <Film className="w-16 h-16 text-muted-foreground/50 mb-3" />
            <p className="text-sm font-medium text-muted-foreground line-clamp-3">
              {title}
            </p>
          </div>
        ) : (
          <img
            src={image || '/placeholder.svg'}
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        )}

        {rating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-semibold text-white">
              {rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{year}</p>
        </div>
      </div>
    </Card>
  )
}
