import React, { useState } from 'react';
import { musicConfig } from '../data/music';
import { extractYouTubeId } from '../lib/youtube';

const AUTH_KEY = 'wedcard_admin_authed';
const USERNAME = 'husna';
const PASSWORD = 'husna@2026';

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username === USERNAME && password === PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, '1');
      onSuccess();
    } else {
      setError('Incorrect username or password.');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-24 max-w-sm border border-emerald-deep/15 bg-cream-soft p-8 shadow-[0_10px_36px_rgba(11,90,51,0.07)]">
      <h1 className="font-display text-2xl text-emerald-deep">Card Settings</h1>
      <p className="mt-1 font-body text-xs text-ink/60">Sign in to manage the background music.</p>

      <label className="mt-6 block font-body text-xs uppercase tracking-widest text-ink/60">
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 w-full rounded border border-emerald-deep/20 bg-white px-3 py-2 font-body text-sm text-ink"
          autoComplete="username" />
      </label>

      <label className="mt-4 block font-body text-xs uppercase tracking-widest text-ink/60">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded border border-emerald-deep/20 bg-white px-3 py-2 font-body text-sm text-ink"
          autoComplete="current-password" />
      </label>

      {error && <p className="mt-3 font-body text-xs text-red-600">{error}</p>}

      <button
        type="submit"
        className="mt-6 w-full rounded-full border border-gold bg-emerald-deep px-4 py-2.5 font-body text-[11px] uppercase tracking-[0.2em] text-gold-light transition-colors duration-150 ease-out hover:bg-emerald-deep/90">
        Sign In
      </button>
    </form>
  );
}

function MusicSettingsForm() {
  const initialMinute = Math.floor(musicConfig.startSeconds / 60);
  const initialSecond = musicConfig.startSeconds % 60;

  const [link, setLink] = useState(
    musicConfig.youtubeId ? `https://youtu.be/${musicConfig.youtubeId}` : ''
  );
  const [minute, setMinute] = useState(String(initialMinute));
  const [second, setSecond] = useState(String(initialSecond));
  const [status, setStatus] = useState<'idle' | 'saved' | 'manual' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('idle');
    setErrorMessage('');

    const youtubeId = extractYouTubeId(link);
    if (!youtubeId) {
      setErrorMessage('Could not read a video ID from that YouTube link.');
      setStatus('error');
      return;
    }

    const minuteNum = Number(minute) || 0;
    const secondNum = Number(second) || 0;
    if (secondNum < 0 || secondNum > 59 || minuteNum < 0) {
      setErrorMessage('Seconds must be between 0 and 59.');
      setStatus('error');
      return;
    }

    const startSeconds = minuteNum * 60 + secondNum;
    const code = `export type MusicConfig = {\n  youtubeId: string;\n  startSeconds: number;\n};\n\nexport const musicConfig: MusicConfig = {\n  youtubeId: '${youtubeId}',\n  startSeconds: ${startSeconds}\n};\n`;
    setGeneratedCode(code);

    try {
      const response = await fetch('/api/save-music-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtubeId, startSeconds })
      });
      setStatus(response.ok ? 'saved' : 'manual');
    } catch {
      setStatus('manual');
    }
  }

  return (
    <div className="mx-auto mt-24 max-w-md border border-emerald-deep/15 bg-cream-soft p-8 shadow-[0_10px_36px_rgba(11,90,51,0.07)]">
      <h1 className="font-display text-2xl text-emerald-deep">Background Music</h1>
      <p className="mt-1 font-body text-xs text-ink/60">
        Paste a YouTube link and pick where the music should start playing from.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="block font-body text-xs uppercase tracking-widest text-ink/60">
          YouTube link
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://youtu.be/..."
            className="mt-1 w-full rounded border border-emerald-deep/20 bg-white px-3 py-2 font-body text-sm text-ink" />
        </label>

        <div className="flex gap-4">
          <label className="block flex-1 font-body text-xs uppercase tracking-widest text-ink/60">
            Start minute
            <input
              type="number"
              min={0}
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="mt-1 w-full rounded border border-emerald-deep/20 bg-white px-3 py-2 font-body text-sm text-ink" />
          </label>
          <label className="block flex-1 font-body text-xs uppercase tracking-widest text-ink/60">
            Start second
            <input
              type="number"
              min={0}
              max={59}
              value={second}
              onChange={(e) => setSecond(e.target.value)}
              className="mt-1 w-full rounded border border-emerald-deep/20 bg-white px-3 py-2 font-body text-sm text-ink" />
          </label>
        </div>

        {status === 'error' && <p className="font-body text-xs text-red-600">{errorMessage}</p>}

        <button
          type="submit"
          className="mt-2 w-full rounded-full border border-gold bg-emerald-deep px-4 py-2.5 font-body text-[11px] uppercase tracking-[0.2em] text-gold-light transition-colors duration-150 ease-out hover:bg-emerald-deep/90">
          Save
        </button>
      </form>

      {status === 'saved' &&
      <p className="mt-4 font-body text-xs text-emerald-deep">
        Saved to src/data/music.ts — commit and redeploy to make this live for guests.
      </p>}

      {status === 'manual' &&
      <div className="mt-4">
        <p className="font-body text-xs text-ink/70">
          Couldn't save automatically (this only works while running the site locally with{' '}
          <code>npm run dev</code>). Paste this into <code>src/data/music.ts</code> and redeploy:
        </p>
        <pre className="mt-2 overflow-x-auto rounded bg-emerald-deep/5 p-3 font-mono text-[11px] text-ink/80">
          {generatedCode}
        </pre>
      </div>}
    </div>
  );
}

export function AdminMusic() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1');

  return (
    <div className="min-h-screen w-full bg-cream px-6 py-12 font-body text-ink">
      {authed ? <MusicSettingsForm /> : <LoginForm onSuccess={() => setAuthed(true)} />}
    </div>
  );
}
