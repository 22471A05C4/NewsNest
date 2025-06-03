import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(false); // Trigger exit animation
      setTimeout(() => navigate('/login'), 1000); // Wait for animation to finish
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AnimatePresence>
      {showPage && (
        <motion.div
          className="welcome-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="welcome-content"
            initial={{ scale: 0.7, y: -60 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <motion.h1
              className="welcome-title"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Welcome to <span className="highlight">HyperLocal News</span>
            </motion.h1>

            <motion.p
              className="welcome-subtext"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
            >
              Stay connected with real-time updates from your neighborhood
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePage;