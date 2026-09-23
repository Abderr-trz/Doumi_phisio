"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Play, Volume2, VolumeX, X } from "lucide-react";

interface ReelItem {
  id: string;
  videoUrl: string;
  posterUrl: string;
  title: string;
  category: string;
  description: string;
  hashtags: string[];
}

const reelsData: ReelItem[] = [
  {
    id: "tecartherapie",
    videoUrl: "/videos/reel-1.mp4",
    posterUrl: "/images/reels/reel-1.webp",
    title: "Tecarthérapie & Récupération",
    category: "Technologie Pointe",
    description: "Soin par électrothérapie haute fréquence pour accélérer la régénération musculaire et articulaire.",
    hashtags: ["#Tecarthérapie", "#Kiné", "#Recovery", "#PerformanceSportive"],
  },
  {
    id: "scoliose",
    videoUrl: "/videos/reel-2.mp4",
    posterUrl: "/images/reels/reel-2.webp",
    title: "Évaluation & Suivi Scoliose",
    category: "Posture & Dos",
    description: "Chaque scoliose est unique. L'évaluation clinique personnalisée permet d'ajuster précisément les exercices.",
    hashtags: ["#Scoliose", "#KinéPosture", "#BilanClinique", "#Rehabilitation"],
  },
  {
    id: "lca-comeback",
    videoUrl: "/videos/reel-3.mp4",
    posterUrl: "/images/reels/reel-3.webp",
    title: "Réhabilitation LCA (Genou)",
    category: "Kiné du Sport",
    description: "De la blessure au retour sur le terrain ⚽ : protocole complet de rééducation après rupture du Ligament Croisé Antérieur.",
    hashtags: ["#LigamentCroisé", "#FootballKiné", "#KinéDuSport", "#Comeback"],
  },
  {
    id: "neuromusculaire",
    videoUrl: "/videos/reel-4.mp4",
    posterUrl: "/images/reels/reel-4.webp",
    title: "Rééducation Neuromusculaire",
    category: "Récupération Optimisée",
    description: "Utilisation combinée de la Tecarthérapie et d'exercices guidés pour optimiser la mobilité et la force.",
    hashtags: ["#NeuroMusculaire", "#Tecar", "#Mobilité", "#SoinsDoumi"],
  },
];

export default function ReelsGallery() {
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const openReel = (index: number) => {
    setActiveReelIndex(index);
    setIsPlaying(true);
  };

  const closeReel = () => {
    setActiveReelIndex(null);
  };

  const togglePlay = () => {
    if (modalVideoRef.current) {
      if (isPlaying) {
        modalVideoRef.current.pause();
      } else {
        modalVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (activeReelIndex === null) return;

    const scrollPosition = window.scrollY;
    const modalElement = document.querySelector<HTMLElement>("[data-reel-modal]");
    const pageElements = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element !== modalElement
    );
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    const previousHtmlOverflow = document.documentElement.style.overflow;

    pageElements.forEach((element) => {
      element.inert = true;
    });
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";

    return () => {
      pageElements.forEach((element) => {
        element.inert = false;
      });
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyStyles.overflow;
      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.width = previousBodyStyles.width;
      window.scrollTo(0, scrollPosition);
    };
  }, [activeReelIndex]);

  return (
    <section id="reels" className="py-14 md:py-18 border-b border-border bg-card/40 backdrop-blur-sm relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 relative z-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-secondary border border-primary/20 rounded-md mb-3">
              Démonstrations & Cas Pratiques
            </span>
            <h2 className="text-3xl font-semibold text-foreground">
              Nos Interventions en Vidéo
            </h2>
            <p className="mt-3 text-muted-foreground text-sm leading-6 md:text-base">
              Découvrez nos techniques spécialisées (Tecarthérapie, rééducation LCA, soin de scoliose) en action directement au cabinet.
            </p>
          </div>
          <a
            href="#contact"
            className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            Prendre rendez-vous
          </a>
        </div>

        {/* Reels Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reelsData.map((reel, index) => (
            <button
              type="button"
              key={reel.id}
              onClick={() => openReel(index)}
              className="touch-static group relative h-[340px] overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md sm:h-[380px]"
              aria-label={`Ouvrir ${reel.title} en plein écran`}
            >
              {/* Card Video Background */}
              <video
                src={reel.videoUrl}
                poster={reel.posterUrl}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                muted
                playsInline
                loop
                preload="metadata"
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-85 transition-opacity group-hover:opacity-75" />

              {/* Top Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-1 text-xs font-medium bg-background/90 backdrop-blur border border-border text-primary rounded-md shadow-sm">
                  {reel.category}
                </span>
              </div>

              {/* Play Button Indicator */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-5 h-5 fill-primary-foreground ml-0.5" />
                </div>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 z-10 flex flex-col justify-end text-white">
                <h3 className="mb-1 text-base font-semibold transition-colors group-hover:text-white">
                  {reel.title}
                </h3>
                <p className="text-xs text-slate-200 line-clamp-2 mb-2 leading-relaxed">
                  {reel.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {reel.hashtags.slice(0, 2).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-medium text-white/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox / Video Modal */}
      {activeReelIndex !== null && createPortal(
        <div
          data-reel-modal
          className="fixed inset-0 z-[9999] h-[100dvh] w-screen overflow-hidden overscroll-none bg-black text-white"
          role="dialog"
          aria-modal="true"
          aria-label={`Reel : ${reelsData[activeReelIndex].title}`}
        >
          <button
            onClick={closeReel}
            autoFocus
            className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-50 grid size-11 place-items-center rounded-full bg-black/65 text-white backdrop-blur-md transition-colors hover:bg-black/85"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Full-screen player */}
          <div className="relative flex h-full w-full touch-none items-center justify-center overflow-hidden bg-black">
            <div
              className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden bg-black"
              onClick={togglePlay}
            >
              <video
                ref={modalVideoRef}
                src={reelsData[activeReelIndex].videoUrl}
                poster={reelsData[activeReelIndex].posterUrl}
                className="h-full w-full object-contain"
                autoPlay
                playsInline
                loop
                muted={isMuted}
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Play Overlay toggle state */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                    <Play className="w-7 h-7 fill-primary-foreground ml-1" />
                  </div>
                </div>
              )}

              {/* Controls bar over video */}
              <div className="absolute left-[max(0.75rem,env(safe-area-inset-left))] top-[max(0.75rem,env(safe-area-inset-top))] z-20 flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="grid size-11 place-items-center rounded-full bg-black/65 text-white backdrop-blur-md transition-colors hover:bg-black/85"
                  aria-label={isMuted ? "Activer le son" : "Couper le son"}
                >
                  {isMuted ? <VolumeX className="h-5 w-5 text-white/70" /> : <Volume2 className="h-5 w-5 text-white" />}
                </button>
              </div>
            </div>

            {/* Video information */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/75 to-transparent px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-20 text-white sm:px-8 sm:pt-28">
              <div className="mx-auto max-w-xl">
              <span className="text-xs font-semibold text-white/80">
                {reelsData[activeReelIndex].category}
              </span>
              <h4 className="mt-1 text-lg font-semibold text-white sm:text-xl">
                {reelsData[activeReelIndex].title}
              </h4>
              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/75 sm:text-sm">
                {reelsData[activeReelIndex].description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {reelsData[activeReelIndex].hashtags.slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/80 backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
