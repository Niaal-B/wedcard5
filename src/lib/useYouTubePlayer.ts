import { useEffect, useRef, useState } from 'react';

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
          };
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiLoadPromise: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (window.YT) return Promise.resolve();
  if (apiLoadPromise) return apiLoadPromise;

  apiLoadPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(script);
  });

  return apiLoadPromise;
}

export function useYouTubePlayer(elementId: string, videoId: string, startSeconds: number) {
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);

  useEffect(() => {
    if (!videoId) return;
    let cancelled = false;

    loadYouTubeApi().then(() => {
      if (cancelled || !window.YT) return;
      playerRef.current = new window.YT.Player(elementId, {
        videoId,
        playerVars: {
          start: startSeconds,
          controls: 0,
          disablekb: 1,
          playsinline: 1
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
            setReady(true);
          }
        }
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [elementId, videoId, startSeconds]);

  function unmute() {
    const player = playerRef.current;
    if (!player) return;
    player.unMute();
    player.setVolume(70);
    setMuted(false);
  }

  function toggleMute() {
    const player = playerRef.current;
    if (!player) return;

    if (muted) {
      unmute();
    } else {
      player.mute();
      setMuted(true);
    }
  }

  useEffect(() => {
    if (!ready || !muted) return;

    function handleFirstScroll() {
      unmute();
    }

    window.addEventListener('scroll', handleFirstScroll, { once: true, passive: true });
    return () => window.removeEventListener('scroll', handleFirstScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, muted]);

  return { muted, toggleMute, hasTrack: Boolean(videoId) };
}
