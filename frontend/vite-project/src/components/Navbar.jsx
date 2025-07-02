import React, { useState, useEffect, useRef } from 'react';



const categories = [];


const Navbar = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const menuRef = useRef(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearchClick = () => {
    if (input.trim()) {
      onSearch(input.trim(), selectedLanguage);
      setIsMenuOpen(false);
    }
  };

  const handleCategoryClick = (category) => {
    onSearch(category.toUpperCase(), selectedLanguage);
    setInput('');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <span className="logo-white">News</span>
          </div>
          <button className="navbar-toggle" onClick={toggleMenu}>
            {isMenuOpen ? '×' : '☰'}
          </button>
        </div>

        <div ref={menuRef} className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="navbar-links">
            {categories.map((cat) => (
              <a
                key={cat}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(cat);
                }}
              >
                {cat}
              </a>
            ))}
          </div>

          <div className="navbar-search">
            <input
              type="text"
              placeholder="Explore news..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchClick();
              }}
            />
            <button onClick={handleSearchClick}>Search</button>
          </div>

          
        </div>
      </nav>
      
    </>
  );
};

export default Navbar;