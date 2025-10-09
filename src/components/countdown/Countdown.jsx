import React, { useEffect, useState } from 'react';
import './Countdown.css'; // Ensure you import the CSS

const Countdown = ({ initialTimeInSeconds = 4907 }) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return [hrs, mins, secs];
  };

  const [hours, minutes, seconds] = formatTime(timeLeft);

  return (
    <div className="countdown-wrapper">
      <div className="countdown-area">
        <p className="countdown-title">Next Round</p>
        <div className="countdown-timer">
          <span className="countdown-box">{hours}</span>
          <span className="countdown-separator">:</span>
          <span className="countdown-box">{minutes}</span>
          <span className="countdown-separator">:</span>
          <span className="countdown-box">{seconds}</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
