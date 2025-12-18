"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Pause, Play, Volume2, VolumeOff } from "lucide-react";
import { generatePoster } from "@/lib/utils";

const VideoPlayer = ({
  videoUrl,
  autoPlay = false,
  showVolumeBtn = false,
}: {
  videoUrl: string;
  autoPlay?: boolean;
  showVolumeBtn?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const soundRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volumeOn, setVolumeOn] = useState(false);
  const [poster, setPoster] = useState<string>("");
  const cacheKey = `poster:${videoUrl}`;

  useEffect(() => {
    let mounted = true;

    const loadPoster = async () => {
      try {
        const cachedPoster = sessionStorage.getItem(cacheKey);
        if (cachedPoster) {
          setPoster(cachedPoster);
          return;
        }

        const posterUrl = await generatePoster(videoUrl);
        if (!mounted) return;

        sessionStorage.setItem(cacheKey, posterUrl as string);
        setPoster(posterUrl as string);
      } catch {
        // fail silently
      }
    };

    loadPoster();

    return () => {
      mounted = false;
    };
  }, [cacheKey, videoUrl]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (autoPlay) {
            videoEl.play();
          }
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(videoEl);

    return () => {
      observer.unobserve(videoEl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlayback = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleVolume = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    const newVolumeState = !volumeOn;
    videoRef.current.muted = !newVolumeState;
    setVolumeOn(newVolumeState);
  };

  return (
    <div className={`relative size-full overflow-hidden`}>
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay={autoPlay}
        muted
        playsInline
        preload="auto"
        poster={poster}
        className="size-full min-h-[200px] object-cover will-change-transform"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      <Button
        size="icon"
        className="absolute bottom-4 left-4 flex size-10 items-center justify-center rounded-full bg-white/10 px-3 py-2 text-xs text-white transition-all hover:bg-white/20"
        onClick={(e) => {
          e.stopPropagation();
          togglePlayback();
        }}
      >
        {isPlaying ? <Pause /> : <Play />}
      </Button>
      {showVolumeBtn && (
        <div
          ref={soundRef}
          className="absolute right-4 bottom-4 flex items-center gap-3 text-xs text-white uppercase"
        >
          SOUND:
          <Button
            size="icon"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
            onClick={toggleVolume}
          >
            {volumeOn ? <VolumeOff /> : <Volume2 />}
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
