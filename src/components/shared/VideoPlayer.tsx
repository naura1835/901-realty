"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Pause, Play, Volume2, VolumeOff } from "lucide-react";

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
  const cursorRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volumeOn, setVolumeOn] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play();
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const soundEl = soundRef.current;

    if (soundEl) {
      const rect = soundEl.getBoundingClientRect();
      const padding = 20;
      const isNear =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding;

      if (isNear) {
        hideCursor();
        return;
      }
    }

    setShowCursor(true);
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    }
  };

  const hideCursor = () => {
    setShowCursor(false);
  };

  const showCursorfunc = () => {
    setShowCursor(true);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onClick={togglePlayback}
      onMouseLeave={hideCursor}
      className={`relative size-full overflow-hidden`}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay={autoPlay}
        muted
        playsInline
        className="size-full object-cover md:cursor-none"
      />

      {showCursor && (
        <div
          ref={cursorRef}
          className="pointer-events-none absolute z-50 hidden size-fit translate-0 transform items-center justify-center rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-white md:flex"
        >
          {isPlaying ? "PAUSE" : "PLAY"}
        </div>
      )}
      <Button
        size="icon"
        className="absolute bottom-4 left-4 flex size-10 items-center justify-center rounded-full bg-white/10 px-3 py-2 text-xs text-white transition-all hover:bg-white/20 md:hidden"
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
          onMouseEnter={hideCursor}
          onMouseLeave={showCursorfunc}
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
