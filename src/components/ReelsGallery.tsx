"use client";

import { useState, useRef } from "react";
import { Play, Volume2, VolumeX, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ReelItem {
  id: string;
  videoUrl: string;
  title: string;
  category: string;
  description: string;
  hashtags: string[];
}

const reelsData: ReelItem[] = [
  {
    id: "tecartherapie",
    videoUrl: "/videos/reel-1.mp4",
    title: "Tecarthérapie & Récupération",
    category: "Technologie Pointe",
    description: "Soin par électrothérapie haute fréquence pour accélérer la régénération musculaire et articulaire.",
    hashtags: ["#Tecarthérapie", "#Kiné", "#Recovery", "#PerformanceSportive"],
  },
  {
    id: "scoliose",
    videoUrl: "/videos/reel-2.mp4",
    title: "Évaluation & Suivi Scoliose",
    category: "Posture & Dos",
    description: "Chaque scoliose est unique. L'évaluation clinique personnalisée permet d'ajuster précisément les exercices.",
    hashtags: ["#Scoliose", "#KinéPosture", "#BilanClinique", "#Rehabilitation"],
  },
  {
    id: "lca-comeback",
    videoUrl: "/videos/reel-3.mp4",
    title: "Réhabilitation LCA (Genou)",
    category: "Kiné du Sport",
    description: "De la blessure au retour sur le terrain ⚽ : protocole complet de rééducation après rupture du Ligament Croisé Antérieur.",
    hashtags: ["#LigamentCroisé", "#FootballKiné", "#KinéDuSport", "#Comeback"],
  },
  {
    id: "neuromusculaire",
    videoUrl: "/videos/reel-4.mp4",
    title: "Rééducation Neuromusculaire",
    category: "Récupération Optimisée",
    description: "Utilisation combinée de la Tecarthérapie et d'exercices guidés pour optimiser la mobilité et la force.",
    hashtags: ["#NeuroMusculaire", "#Tecar", "#Mobilité", "#SoinsDoumi"],
  },
];

export default function ReelsGallery() {
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
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

  const nextReel = () => {
    if (activeReelIndex !== null) {
      const nextIdx = (activeReelIndex + 1) % reelsData.length;
      setActiveReelIndex(nextIdx);
      setIsPlaying(true);
    }
  };

  const prevReel = () => {
    if (activeReelIndex !== null) {
      const prevIdx = (activeReelIndex - 1 + reelsData.length) % reelsData.length;
      setActiveReelIndex(prevIdx);
      setIsPlaying(true);
    }
  };

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
            <div
              key={reel.id}
              onClick={() => openReel(index)}
              className="group relative h-[380px] rounded-lg overflow-hidden cursor-pointer bg-card border border-border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/40"
            >
              {/* Card Video Background */}
              <video
                src={reel.videoUrl}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                muted
                playsInline
                loop
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
                <h3 className="text-base font-semibold mb-1 group-hover:text-emerald-300 transition-colors">
                  {reel.title}
                </h3>
                <p className="text-xs text-slate-200 line-clamp-2 mb-2 leading-relaxed">
                  {reel.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {reel.hashtags.slice(0, 2).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] text-emerald-300 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Video Modal */}
      {activeReelIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 backdrop-blur-sm p-4">
          <button
            onClick={closeReel}
            className="absolute top-5 right-5 z-50 p-2 rounded-md bg-card text-foreground border border-border hover:bg-secondary transition-colors shadow-md"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={prevReel}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-md bg-card text-foreground border border-border hover:bg-secondary transition-colors hidden sm:flex shadow-md"
            aria-label="Reel précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextReel}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-md bg-card text-foreground border border-border hover:bg-secondary transition-colors hidden sm:flex shadow-md"
            aria-label="Reel suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Card Player */}
          <div className="relative w-full max-w-sm h-[80vh] rounded-xl overflow-hidden bg-card border border-border shadow-2xl flex flex-col">
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden cursor-pointer" onClick={togglePlay}>
              <video
                ref={modalVideoRef}
                src={reelsData[activeReelIndex].videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                loop
                muted={isMuted}
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
              <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur"
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
                </button>
              </div>
            </div>

            {/* Video Footer info */}
            <div className="p-5 bg-card border-t border-border text-foreground">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                {reelsData[activeReelIndex].category}
              </span>
              <h4 className="text-lg font-semibold text-card-foreground mt-1">
                {reelsData[activeReelIndex].title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-3">
                {reelsData[activeReelIndex].description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {reelsData[activeReelIndex].hashtags.map((tag, idx) => (
                  <span key={idx} className="text-xs text-secondary-foreground bg-secondary px-2 py-0.5 rounded border border-primary/10 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
