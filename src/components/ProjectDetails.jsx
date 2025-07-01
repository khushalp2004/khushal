import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  images = [], // Now accepts multiple images
  tags,
  href,
  closeModal,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Reset timeout when index changes
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;

    resetTimeout();
    timeoutRef.current = setTimeout(
      () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      },
      3000 // Change slide every 3 seconds
    );

    return () => resetTimeout();
  }, [currentIndex, isAutoPlaying, images.length]);

  // Handle touch events for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const difference = touchStartX.current - touchEndX.current;
    if (difference > 5) {
      // Swipe left
      goToNext();
    } else if (difference < -5) {
      // Swipe right
      goToPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume auto-play after 5 sec
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume auto-play after 5 sec
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-2 sm:p-4 overflow-y-auto backdrop-blur-sm">
      <motion.div
        className="relative w-full max-w-[90vw] sm:max-w-md md:max-w-2xl lg:max-w-4xl border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
      >
        <button
          onClick={closeModal}
          className="absolute p-1 sm:p-2 rounded-sm top-1 right-1 sm:top-3 sm:right-3 bg-midnight hover:bg-gray-500/50 transition-colors z-20"
          aria-label="Close modal"
        >
          <img src="assets/close.svg" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" alt="Close" />
        </button>
        
        {/* Image Carousel */}
        <div 
          className="relative aspect-video overflow-hidden rounded-t-2xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`${title} screenshot ${index + 1}`}
              className={`absolute object-cover w-full h-full transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentIndex ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          ))}
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/75 transition-colors"
                aria-label="Previous image"
              >
                <img src="assets/arrow-right.svg" className="rotate-180 w-4 h-4" alt="" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/75 transition-colors"
                aria-label="Next image"
              >
                <img src="assets/arrow-right.svg" className="w-4 h-4" alt="" />
              </button>
            </>
          )}
          
          {/* Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAutoPlaying(true), 5000);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="p-3 sm:p-4 md:p-6">
          <h5 className="mb-2 text-lg sm:text-xl md:text-2xl font-bold text-white">{title}</h5>
          
          <div className="max-h-[40vh] sm:max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            <p className="mb-3 text-xs sm:text-sm md:text-base font-normal text-neutral-400">
              {description}
            </p>
            
            <div className="space-y-2 mb-4">
              {subDescription.map((subDesc, index) => (
                <p 
                  key={index} 
                  className="text-xs sm:text-sm md:text-base font-normal text-neutral-400"
                >
                  {subDesc}
                </p>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mt-4">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <img
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className="rounded-lg w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 hover:scale-110 transition-transform"
                />
              ))}
            </div>
            
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs sm:text-sm md:text-base font-medium cursor-pointer hover:text-white transition-colors"
            >
              View Project
              <img src="assets/arrow-up.svg" className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4" alt="" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;