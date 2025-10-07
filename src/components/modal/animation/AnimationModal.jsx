import React, { useEffect, useRef, useState } from 'react';
import './AnimationModal.css';
import { CgMiniPlayer } from 'react-icons/cg';
import Lottie from 'lottie-react';

const AnimationModal = ({ 
  isOpen, 
  title, 
  animationSrc, 
  onClose, 
  loopCount, // optional
  footerButtons = [],
 }) => {
  const lottieRef = useRef(null);
  const [currentLoop, setCurrentLoop] = useState(0);

  
  useEffect(() => {
    if (!isOpen) {
      setCurrentLoop(0); // reset on close
      return;
    }
  }, [isOpen]);


  // Manually track loops using a timer based on animation duration
  useEffect(() => {
    if (!loopCount || !animationSrc) return;

    // Estimate duration from animation JSON
    const frames = animationSrc.op - animationSrc.ip; // total frames
    const frameRate = animationSrc.fr || 60; // fallback framerate
    const durationMs = (frames / frameRate) * 1000;

    if (currentLoop >= loopCount) {
      if (onClose) onClose();
      return;
    }

    const timer = setTimeout(() => {
      setCurrentLoop((prev) => prev + 1);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [currentLoop, loopCount, animationSrc, onClose]);


  if (!isOpen) return null;

  return (
    <div className="animation-modal-overlay">
      <div className="animation-modal">
        {/* Close button */}
        {/* <button className="close-btn" onClick={onClose}>
          &times;
        </button> */}

        {/* Title */}
        {title && <h5>{title}</h5>}

        {/* Animation */}
        {animationSrc && (
          <div className="animation-container">
            <Lottie
              lottieRef={lottieRef}
              autoplay
              loop={loopCount ? loopCount : true} // infinite if loopCount not provided
              animationData={animationSrc}
              style={{ height: 150, width: 300, margin: '0 auto' }}
            />
          </div>
        )}

        {/* Footer buttons */}
        {footerButtons.length > 0 && (
          <div className="modal-footer">
            {footerButtons.map((btn, index) => (
              <button
                key={index}
                className={`btn ${btn.className || 'btn-primary'}`}
                onClick={btn.onClick}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimationModal;
