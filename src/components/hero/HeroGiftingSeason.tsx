import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroVideo from "./HeroVideo";
import HeroOffer from "./HeroOffer";
import { useHeroAnalytics } from "@/hooks/useHeroAnalytics";

const LOCAL_STORAGE_KEY = 'dandle_hero_video_seen';
const VIDEO_SRC = '/videos/festive-hero.mp4';

interface HeroGiftingSeasonProps {
  useGeneratedImages?: boolean;
  musicUrl?: string;
}

const HeroGiftingSeason = ({ 
  useGeneratedImages = false,
  musicUrl = ''
}: HeroGiftingSeasonProps) => {
  const [phase, setPhase] = useState<'video' | 'offer'>('video');
  const [hasSeenVideo, setHasSeenVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const { trackVideoComplete, resetTimer } = useHeroAnalytics();

  // Preload video immediately on mount for instant playback
  useEffect(() => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.src = VIDEO_SRC;
    video.oncanplaythrough = () => setIsVideoReady(true);
    // Also set ready after a short timeout as fallback
    const timeout = setTimeout(() => setIsVideoReady(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  // Check localStorage for analytics tracking only - video always plays first
  useEffect(() => {
    const seen = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (seen === 'true') {
      setHasSeenVideo(true);
    }
    // Always start with video phase - no skipping
  }, []);

  const handleVideoEnd = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    setHasSeenVideo(true);
    setPhase('offer');
    trackVideoComplete();
    resetTimer();
  };

  const handleSkipVideo = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    setHasSeenVideo(true);
    setPhase('offer');
    resetTimer();
  };

  const handleReplayVideo = () => {
    setPhase('video');
    resetTimer();
  };

  return (
    <motion.section
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #FAF9F7 0%, #F5F1EB 100%)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <AnimatePresence mode="wait">
        {phase === 'video' ? (
          <HeroVideo
            key="video"
            src={VIDEO_SRC}
            onEnded={handleVideoEnd}
            onSkip={handleSkipVideo}
          />
        ) : (
          <HeroOffer
            key="offer"
            onReplayVideo={hasSeenVideo ? handleReplayVideo : undefined}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default HeroGiftingSeason;
