import React, { useEffect, useState } from "react";
import coin from "../assets/img/coin-loading.png"; 
import { useNavigate } from "react-router-dom";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate("/"), 500); // Redirect after loading
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval); // Clean up on unmount
  }, [navigate]);

  return (
    <div className="loading-container">
      <img src={coin} alt="loading" className="coin-bounce" />
      <div className="progress-wrapper">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-text">{progress}%</div>
    </div>
  );
};

export default Loader;
