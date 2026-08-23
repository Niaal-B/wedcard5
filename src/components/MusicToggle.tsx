import React from 'react';
import { MusicIcon, VolumeXIcon } from 'lucide-react';
import { musicConfig } from '../data/music';
import { useYouTubePlayer } from '../lib/useYouTubePlayer';

export function MusicToggle() {
  const { playing, toggle, hasTrack } = useYouTubePlayer(
    'bg-music-player',
    musicConfig.youtubeId,
    musicConfig.startSeconds
  );

  return (
    <>
      <div id="bg-music-player" className="fixed h-0 w-0 overflow-hidden" aria-hidden="true" />
      {hasTrack &&
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-emerald-deep text-gold-light shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-transform duration-150 ease-out hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">

        {playing ?
        <MusicIcon className="h-5 w-5" aria-hidden="true" /> :

        <VolumeXIcon className="h-5 w-5" aria-hidden="true" />
        }
      </button>}
    </>);

}
