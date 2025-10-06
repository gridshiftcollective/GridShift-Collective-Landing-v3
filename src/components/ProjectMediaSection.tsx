import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import { MediaItem, LightboxSlide } from '../types/portfolio';

interface ProjectMediaSectionProps {
  media: MediaItem[];
  projectSlug: string;
}

export function ProjectMediaSection({ media, projectSlug }: ProjectMediaSectionProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides: LightboxSlide[] = media.map(item => ({
    type: item.type,
    src: item.src,
    caption: item.caption,
    poster: item.poster,
    sources: item.sources,
    alt: item.alt || item.caption || `Media ${media.indexOf(item) + 1}`
  }));

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((item, index) => (
          <div
            key={index}
            className="group cursor-pointer overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
            onClick={() => openLightbox(index)}
          >
            {item.type === 'image' ? (
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt || item.caption || `Media ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="aspect-video overflow-hidden bg-black relative">
                {item.poster && (
                  <img
                    src={item.poster}
                    alt={item.alt || item.caption || `Video ${index + 1} poster`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-4" role="button" aria-label="Play video">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}
            {item.caption && (
              <div className="p-4">
                <p className="text-sm text-muted-foreground">{item.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={slides}
        plugins={[Video, Captions]}
        captions={{ descriptionText: "caption" }}
        video={{ controls: true, playsInline: true }}
        on={{
          view: ({ index }) => setCurrentIndex(index),
        }}
        // Accessibility features
        controller={{
          closeOnBackdropClick: true,
          closeOnEsc: true,
        }}
        animation={{ swipe: 0 }}
      />
    </>
  );
}
