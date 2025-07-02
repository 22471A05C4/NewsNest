import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiDislike, BiLike } from 'react-icons/bi';
import { PiShareFat } from 'react-icons/pi';
import { FaRegComment } from 'react-icons/fa';

const News = ({ searchQuery, language, city }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});

  const API_KEY = '12adc00e56994abca74826e67315ac85';

  const langCodeMap = {
    English: 'en',
    Telugu: 'te',
    Hindi: 'hi',
  };

  const langCode = langCodeMap[language] || 'en';

  const decodeHTML = (str) => {
    const parser = new DOMParser();
    return parser.parseFromString(`<!doctype html><body>${str}`, 'text/html').body.textContent;
  };

  const translateText = async (text, targetLang) => {
    if (!text || targetLang === 'en') return text;

    try {
      const res = await axios.post(
        'https://libretranslate.de/translate',
        {
          q: text,
          source: 'en',
          target: targetLang,
          format: 'text',
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000,
        }
      );
      return decodeHTML(res.data.translatedText);
    } catch (error) {
      console.error('Translation failed:', error.message);
      return text;
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      if (!searchQuery) {
        setArticles([]);
        return;
      }

      setLoading(true);
      try {
        const query = `${searchQuery} ${city}`;
        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&apiKey=${API_KEY}`;
        const response = await axios.get(url);
        const rawArticles = response.data.articles || [];

        const translatedArticles = await Promise.all(
          rawArticles.map(async (article) => ({
            ...article,
            title: await translateText(article.title || 'No title', langCode),
            description: await translateText(article.description || 'No description', langCode),
          }))
        );

        setArticles(translatedArticles);
      } catch (error) {
        console.error('Error fetching the news:', error.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [searchQuery, language, city]);

  const handleLike = (index) => {
    setLikes((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
  };

  const handleDislike = (index) => {
    setDislikes((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
  };

  const handleShare = (url) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert('Article link copied to clipboard!');
    } else {
      alert('Clipboard not supported on your browser.');
    }
  };

  const handleComment = () => {
    const comment = prompt('Enter your comment:');
    if (comment) alert(`You commented: ${comment}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>News Search</h1>
      {loading ? (
        <p>Loading news...</p>
      ) : (
        <div style={styles.cardContainer}>
          {articles.length === 0 && <p>No news to display. Please search for something.</p>}
          {articles.map((article, index) => (
            <div key={index} style={styles.card}>
              {article.urlToImage && (
                <img src={article.urlToImage} alt="Article" style={styles.image} />
              )}
              <h2 style={styles.title}>{article.title}</h2>
              <p style={styles.description}>{article.description}</p>

              <div style={styles.buttonContainer}>
                <button style={styles.iconButton} onClick={() => handleLike(index)}>
                  <BiLike /> {likes[index] || ''}
                </button>
                <button style={styles.iconButton} onClick={() => handleDislike(index)}>
                  <BiDislike /> {dislikes[index] || ''}
                </button>
                <button style={styles.iconButton} onClick={() => handleShare(article.url)}>
                  <PiShareFat />
                </button>
                <button style={styles.iconButton} onClick={handleComment}>
                  <FaRegComment />
                </button>
              </div>

              <a href={article.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    width: '300px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '18px',
    margin: '10px 0',
  },
  description: {
    fontSize: '14px',
    color: '#555',
    flexGrow: 1,
  },
  buttonContainer: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
    alignItems: 'center',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: '#1e90ff',
  },
  link: {
    marginTop: '10px',
    textDecoration: 'none',
    color: '#1e90ff',
    fontWeight: 'bold',
  },
};

export default News;