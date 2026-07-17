"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

import { canUseWebGL, selectRenderQuality, type RenderQuality } from "@/lib/capability";

const SystemsScene = dynamic(() => import("@/components/scene/SystemsScene"), {
  ssr: false,
  loading: () => <StaticSystem label="Preparing the optional system view" />
});

function StaticSystem({ label = "Static Systems in Motion map" }: { label?: string }) {
  return (
    <div className="static-system" role="img" aria-label={label}>
      <span className="static-core">JB</span>
      {Array.from({ length: 18 }, (_, index) => (
        <i key={index} style={{ "--node-index": index } as React.CSSProperties} />
      ))}
    </div>
  );
}

export function Hero() {
  const [quality, setQuality] = useState<RenderQuality>("static");
  const [paused, setPaused] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [sceneRequested, setSceneRequested] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const connection = navigator as Navigator & { connection?: { saveData?: boolean } };
      const device = navigator as Navigator & { deviceMemory?: number };
      setQuality(
        selectRenderQuality({
          webgl: canUseWebGL(),
          reducedMotion,
          saveData: Boolean(connection.connection?.saveData),
          memoryGb: device.deviceMemory,
          cores: navigator.hardwareConcurrency,
          width: window.innerWidth
        })
      );
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const showCanvas = quality !== "static" && !skipped && sceneRequested;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div
        className="hero-scene"
        data-quality={showCanvas ? quality : "static"}
        onPointerEnter={() => quality !== "static" && setSceneRequested(true)}
        onTouchStart={() => quality !== "static" && setSceneRequested(true)}
      >
        {showCanvas ? <SystemsScene quality={quality} paused={paused} /> : <StaticSystem />}
      </div>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow">Jashwanth Badugu / Systems in Motion</p>
        <h1 id="hero-title">Practical systems, made understandable.</h1>
        <p className="hero-lede">
          Software and AI engineer building explainable policy tools, local assistants, workflow
          platforms, migration controls, and grounded data products.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="#featured" prefetch={false}>
            Explore projects
          </Link>
          <Link className="button button-secondary" href="/recruiter/" prefetch={false}>
            Recruiter view
          </Link>
        </div>
        <div className="hero-utility" aria-label="Experience controls and contact">
          <button type="button" onClick={() => setSkipped(true)} disabled={skipped}>
            {skipped ? "Static experience active" : "Skip experience"}
          </button>
          {quality !== "static" && !skipped && !sceneRequested ? (
            <button type="button" onClick={() => setSceneRequested(true)}>
              Start visual system
            </button>
          ) : null}
          {showCanvas ? (
            <button type="button" onClick={() => setPaused((value) => !value)}>
              {paused ? "Resume motion" : "Pause motion"}
            </button>
          ) : null}
          <a href="https://github.com/badugujashwanth-create" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://github.com/badugujashwanth-create" target="_blank" rel="noreferrer">
            Contact via GitHub
          </a>
        </div>
      </div>
      <p className="scene-caption">
        One system, six signatures: rules, local intelligence, content streams, data trajectories,
        health signals, and migration state.
      </p>
    </section>
  );
}
