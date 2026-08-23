// src/components/VideoBackground.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ReactPlayer from "react-player";

interface VideoBackgroundProps {
  videoSources: string[];
  overlayOpacity?: number;
}

export function VideoBackground({ videoSources, overlayOpacity = 0.4 }: VideoBackgroundProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={videoSources[currentIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 w-full h-full scale-[1.3] md:scale-[1.1] origin-center">
            <ReactPlayer
              url={videoSources[currentIndex]}
              playing
              muted
              playsinline
              onEnded={handleVideoEnd}
              loop={videoSources.length === 1}
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: { 
                    controls: 0,
                    showinfo: 0,
                    modestbranding: 1,
                    rel: 0,
                    disablekb: 1,
                    iv_load_policy: 3
                  }
                }
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dynamic Overlay Layer */}
      <div 
        className="absolute inset-0 bg-black z-10" 
        style={{ opacity: overlayOpacity }} 
      />

      {/* Gradients for Text Focus */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent z-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-transparent to-transparent h-1/3 z-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/60 via-transparent to-transparent w-full md:w-2/3 z-20" />

      {/* Subtle Grain/Noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-30" />
    </div>
  );
}
