import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { LightboxSlide } from '../types/portfolio';

interface ProjectGalleryProps {
  gallery: string[];
  projectSlug: string;
}

export function ProjectGallery({ gallery, projectSlug }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides: LightboxSlide[] = gallery.map((image, index) => ({
    type: 'image',
    src: image,
    alt: `Gallery image ${index + 1}`
  }));

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  if (!gallery || gallery.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((image, index) => (
          <div
            key={index}
            className="group cursor-pointer overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={slides}
        on={{
          view: ({ index }) => setCurrentIndex(index),
        }}
      />
    </>
  );
}

