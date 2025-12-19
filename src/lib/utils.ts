import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePoster = (videoUrl: string) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.src = videoUrl;
    video.muted = true;
    video.playsInline = true;

    const cleanup = () => {
      video.remove();
    };

    video.addEventListener("loadeddata", () => {
      // Seek to 1 second (or whatever frame you want)
      video.currentTime = 1;
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        cleanup();
        reject("Canvas context not available");
        return;
      }
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            cleanup();
            reject("Failed to create poster blob");
            return;
          }

          const posterUrl = URL.createObjectURL(blob);
          cleanup();
          resolve(posterUrl);
        },
        "image/jpeg",
        0.8,
      );

      // Get as data URL or blob
      // const posterUrl = canvas.toDataURL("image/jpeg", 0.8);

      // resolve(posterUrl);
    });

    video.addEventListener("error", () => {
      cleanup();
      reject("Failed to load video");
    });
  });
};
