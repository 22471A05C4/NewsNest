import React, { useEffect, useState } from 'react';
import './HomePage.css';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom'; // 👈 Required for navigation

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [liked, setLiked] = useState({});
  const [disliked, setDisliked] = useState({});
  const [showShareIndex, setShowShareIndex] = useState(null);
  // const [showPostForm, setShowPostForm] = useState(false);

  const location = localStorage.getItem('selectedLocation') || '';
  const language = localStorage.getItem('preferredLanguage') || 'en';

  const navigate = useNavigate(); // 👈

  const handleToggleClick = () => {
    navigate('/menu'); // 👈 You can replace this with the actual path you want to navigate to
  };
  const handlePostSubmit = () => {
    navigate('/menu'); // 👈 You can replace this with the actual path you want to navigate to
  };

  const fetchNews = async (query = '') => {
    if (!location) {
      setNews([]);
      return;
    }

    try {
      const apiKey = 'pub_85009107ae904fa5276af049c9627d856e390';
      const combinedQuery = `${location} ${query}`.trim();

      const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(
        combinedQuery
      )}&language=${language}`;

      const res = await fetch(url);
      const data = await res.json();
      console.log(data)

      if (data.status === 'success') {
        setNews(data.results || []);
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews([]);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [location, language]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(searchTerm);
  };

  const handleDownload = (index) => {
    const element = document.getElementById(`news-card-${index}`);
    html2canvas(element).then((canvas) => {
      const link = document.createElement('a');
      link.download = `news-${index}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const toggleLike = (index) => {
    setLiked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleDislike = (index) => {
    setDisliked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleShareOptions = (index) => {
    setShowShareIndex(showShareIndex === index ? null : index);
  };

  // const handlePostSubmit = (e) => {
  //   e.preventDefault();
  //   alert("Your post has been submitted!");
  //   setShowPostForm(false);
  // };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-left">
          <button className="toggle-btn" onClick={handleToggleClick}>
            ☰
          </button>
          <div className="logo">📰 NewsNest</div>
        </div>
        <div className="nav-heading">
          Today's News in {location} ({language.toUpperCase()})
        </div>
        <button className="post-button" onClick={handlePostSubmit}>📝 Post</button>
        {/* <button className="post-button" onClick={({handlePostSubmit}) => setShowPostForm(true)}>📝 Post</button> */}
      </nav>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="news-grid">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div className="news-card" id={`news-card-${index}`} key={index}>
              {article.image_url && <img src={article.image_url} alt={article.title} />}
              <div className="news-content">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
              <div className="news-footer">
                <button
                  className={liked[index] ? 'active-like' : ''}
                  onClick={() => toggleLike(index)}
                >
                  ❤️
                </button>
                <button
                  className={disliked[index] ? 'active-dislike' : ''}
                  onClick={() => toggleDislike(index)}
                >
                  👎
                </button>
                <div className="share-wrapper">
                  <button onClick={() => toggleShareOptions(index)}>📤</button>
                  {showShareIndex === index && (
                    <div className="share-options">
                      <a href="https://wa.me/" target="_blank">WhatsApp</a>
                      <a href="https://www.facebook.com/sharer/sharer.php" target="_blank">Facebook</a>
                      <a href="https://twitter.com/share" target="_blank">Twitter</a>
                    </div>
                  )}
                </div>
                <button onClick={() => handleDownload(index)}>⬇️</button>
                <button onClick={() => window.open(article.link, '_blank')}>🔗</button>
              </div>
            </div>
          ))
        ) : (
          <p>No news found for "{location}" in "{language.toUpperCase()}".</p>
        )}
      </div>

      </div>
  );
};

export default HomePage;
