import { useState, useRef, useEffect } from 'react';
import './VideoPlayerModal.css';

const PLAYER_TABS = [
  { id: 'custom',  label: '🎮 اختصاصی' },
  { id: 'html5',   label: '🌐 HTML5'   },
  { id: 'youtube', label: '▶ YouTube'  },
  { id: 'vimeo',   label: '🎬 Vimeo'   },
];

// ── Custom HTML5 player ────────────────────────────────────
function CustomPlayer({ src }) {
  const videoRef   = useRef(null);
  const [playing,  setPlaying]  = useState(false);
  const [progress, setProgress] = useState(0);
  const [curTime,  setCurTime]  = useState('0:00');
  const [totTime,  setTotTime]  = useState('0:00');
  const [volume,   setVolume]   = useState(0.8);
  const [muted,    setMuted]    = useState(false);
  const [buffered, setBuffered] = useState(0);

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = volume;
    v.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else         { v.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
    setCurTime(fmt(v.currentTime));
    if (v.buffered.length > 0)
      setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100);
  };

  const onLoaded = () => {
    const v = videoRef.current;
    if (v) setTotTime(fmt(v.duration));
  };

  const seek = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / r.width) * v.duration;
  };

  const changeVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) videoRef.current.volume = val;
    setMuted(val === 0);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
  };

  const goFullscreen = () => videoRef.current?.requestFullscreen?.();

  return (
    <div className="cp-wrap">
      <video
        ref={videoRef}
        src={src}
        className="cp-video"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoaded}
        onEnded={() => setPlaying(false)}
        onClick={togglePlay}
      />

      {/* Play/Pause overlay */}
      {!playing && (
        <button className="cp-overlay-play" onClick={togglePlay}>▶</button>
      )}

      {/* Controls bar */}
      <div className="cp-controls">
        {/* Progress */}
        <div className="cp-progress-wrap" onClick={seek}>
          <div className="cp-bar-buffer" style={{ width: `${buffered}%` }} />
          <div className="cp-bar"        style={{ width: `${progress}%` }} />
        </div>

        <div className="cp-row">
          <button className="cp-btn" onClick={togglePlay}>{playing ? '⏸' : '▶'}</button>
          <button className="cp-btn" onClick={toggleMute}>{muted ? '🔇' : '🔊'}</button>
          <input
            type="range" min="0" max="1" step="0.05"
            value={muted ? 0 : volume}
            onChange={changeVolume}
            className="cp-volume"
          />
          <span className="cp-time">{curTime} / {totTime}</span>
          <button className="cp-btn cp-full" onClick={goFullscreen} title="تمام صفحه">⛶</button>
        </div>
      </div>
    </div>
  );
}

// ── Main modal ─────────────────────────────────────────────
export default function VideoPlayerModal({ video, onClose }) {
  // Opens immediately with the custom player — no selection step
  const [selected, setSelected] = useState('custom');

  const renderPlayer = () => {
    if (selected === 'youtube') {
      return (
        <iframe
          key="yt"
          className="vp-iframe"
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={video.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }
    if (selected === 'vimeo') {
      return (
        <iframe
          key="vm"
          className="vp-iframe"
          src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&title=0&byline=0`}
          title={video.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }
    if (selected === 'html5') {
      return (
        <video
          key="h5"
          className="vp-iframe"
          src={video.mp4Url}
          controls
          autoPlay
          style={{ background: '#000' }}
        />
      );
    }
    // custom (default)
    return <CustomPlayer key="cp" src={video.mp4Url} />;
  };

  return (
    <div className="vp-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="vp-box" dir="rtl">

        {/* Header */}
        <div className="vp-header">
          <div>
            <p className="vp-label">در حال پخش</p>
            <h3 className="vp-title">{video.title}</h3>
          </div>
          <button className="vp-close" onClick={onClose}>✕</button>
        </div>

        {/* Player switch tabs */}
        <div className="vp-tabs">
          {PLAYER_TABS.map(t => (
            <button
              key={t.id}
              className={`vp-tab ${selected === t.id ? 'active' : ''}`}
              onClick={() => setSelected(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Player */}
        <div className="vp-player-area">
          {renderPlayer()}
        </div>

      </div>
    </div>
  );
}
