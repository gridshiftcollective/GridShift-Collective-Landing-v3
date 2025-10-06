import React, { useState } from 'react';
import Lightbox, { SlideImage, SlideVideo } from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import { MediaItem } from '../types/portfolio';
import { PDFViewer } from './PDFViewer';

interface ProjectMediaSectionProps {
  media: MediaItem[];
  projectSlug: string;
}

export function ProjectMediaSection({ media, projectSlug }: ProjectMediaSectionProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string>('');

  const nonPdfMedia = media.filter(item => item.type !== 'pdf');
  const slides: (SlideImage | SlideVideo)[] = nonPdfMedia.map(item => {
    if (item.type === 'video') {
      return {
        type: 'video' as const,
        sources: item.sources || [{ src: item.src, type: 'video/mp4' }],
        poster: item.poster,
        description: item.caption,
      };
    }
    return {
      src: item.src,
      alt: item.alt || item.caption || `Media ${media.indexOf(item) + 1}`,
      description: item.caption,
    };
  });

  const openLightbox = (index: number) => {
    const mediaItem = media[index];
    if (mediaItem.type === 'pdf') {
      setCurrentPdfUrl(mediaItem.src);
      setPdfViewerOpen(true);
    } else {
      const nonPdfIndex = nonPdfMedia.findIndex(item => item === mediaItem);
      setCurrentIndex(nonPdfIndex);
      setLightboxOpen(true);
    }
  };

  const getMediaIcon = (type: string) => {
    if (type === 'video') {
      return (
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z"/>
        </svg>
      );
    }
    if (type === 'pdf') {
      return (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-6 4h6m-6-8h4" />
        </svg>
      );
    }
    return null;
  };

  const renderThumbnail = (item: MediaItem, index: number) => {
    if (item.type === 'image') {
      return (
        <div className="aspect-video overflow-hidden">
          <img
            src={item.src}
            alt={item.alt || item.caption || `Media ${index + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      );
    }

    if (item.type === 'video') {
      return (
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
              {getMediaIcon('video')}
            </div>
          </div>
        </div>
      );
    }

    if (item.type === 'pdf') {
      return (
        <div className="aspect-video overflow-hidden bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 relative flex items-center justify-center">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-black/20 dark:bg-white/20 rounded-full p-4 mb-2" role="button" aria-label="View PDF">
              {getMediaIcon('pdf')}
            </div>
            <span className="text-sm font-medium text-red-900 dark:text-red-100">PDF Document</span>
          </div>
        </div>
      );
    }

    return null;
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
            {renderThumbnail(item, index)}
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
        plugins={[Video, Zoom, Fullscreen, Captions]}
        captions={{ descriptionTextAlign: 'center' }}
        video={{ 
          controls: true, 
          playsInline: true,
          autoPlay: false
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true
        }}
        on={{
          view: ({ index }) => setCurrentIndex(index),
        }}
        controller={{
          closeOnBackdropClick: true,
        }}
        animation={{ swipe: 250 }}
      />

      {pdfViewerOpen && (
        <PDFViewer
          url={currentPdfUrl}
          onClose={() => setPdfViewerOpen(false)}
        />
      )}
    </>
  );
}
