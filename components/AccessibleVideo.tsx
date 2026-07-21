"use client";

import { useState } from "react";

type AccessibleVideoProps = {
  captions: string;
  mp4: string;
  poster: string;
  projectName: string;
  repositoryUrl: string;
  webm: string;
};

export function AccessibleVideo({ captions, mp4, poster, projectName, repositoryUrl, webm }: AccessibleVideoProps) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  return (
    <div className="media-player">
      <div className="media-frame">
        <video
          aria-label={`${projectName} product walkthrough`}
          controls
          onCanPlay={() => setState("ready")}
          onError={() => setState("error")}
          playsInline
          poster={poster}
          preload="metadata"
        >
          <source src={mp4} type="video/mp4" />
          <source src={webm} type="video/webm" />
          <track kind="captions" src={captions} srcLang="en" label="English" default />
          Your browser cannot play this video. Open the MP4 with the link below.
        </video>
      </div>
      <p className={`media-status media-status-${state}`} role="status" aria-live="polite">
        {state === "loading" ? "Loading video metadata…" : null}
        {state === "ready" ? "Video ready. Captions are available from the player controls." : null}
        {state === "error" ? "Embedded playback is unavailable. Use the direct MP4 or WebM link below." : null}
      </p>
      <nav className="media-actions" aria-label={`${projectName} media links`}>
        <a href={mp4} target="_blank" rel="noreferrer">Open MP4</a>
        <a href={webm} download>Download WebM</a>
        <a href={captions} target="_blank" rel="noreferrer">Read captions</a>
        <a href={repositoryUrl} target="_blank" rel="noreferrer">Repository ↗</a>
      </nav>
    </div>
  );
}
