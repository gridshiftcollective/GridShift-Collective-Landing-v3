export interface MediaItem {
  type: "image" | "video" | "pdf";
  src: string;
  caption?: string;
  poster?: string;
  sources?: Array<{ src: string; type: string }>;
  alt?: string;
  downloadUrl?: string;
}

export interface LightboxSlide {
  type?: "image" | "video" | "pdf";
  src: string;
  alt?: string;
  caption?: string;
  poster?: string;
  sources?: Array<{ src: string; type: string }>;
}

