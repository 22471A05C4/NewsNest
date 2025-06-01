// Menu.jsx
import React, { useState, useEffect } from "react";
import "./Menu.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { key: "top", label: "General News", icon: "📰" },
  { key: "world", label: "World", icon: "🌍" },
  { key: "sports", label: "Sports", icon: "🏆" },
  { key: "business", label: "Business", icon: "💼" },
  { key: "entertainment", label: "Entertainment", icon: "🎬" },
  { key: "technology", label: "Technology", icon: "💻" },
  { key: "health", label: "Health", icon: "🏥" },
];

const languageMap = {
  en: "English",
  te: "తెలుగు",
  hi: "हिंदी",
  ta: "Tamil",
};

export default function SidebarMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage") || "en";
    setLanguage(languageMap[savedLang] || "English");

    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocation) setLocation(savedLocation);
  }, []);

  const fetchNews = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsdata.io/api/1/news?apikey=pub_8782530366ddc859bb37ac5aa45e40114cc20&category=${category}&language=en`
      );
      const data = await response.json();
      setArticles(Array.isArray(data.results) ? data.results : []);
    } catch (error) {
      console.error("Error fetching news:", error);
      setArticles([]);
    }
    setLoading(false);
  };

  return (
    <div className="menu-container">
      {!isOpen && (
        <button className="menu-toggle" onClick={() => setIsOpen(true)}>
          ☰
        </button>
      )}

      {isOpen && (
        <div className="sidebar">
          <button className="close-toggle" onClick={() => navigate('/home')}>
             ✖
          </button>
          <div className="settings-section" style={{ marginTop: "40px" }}>
            <div className="setting-item">
              🌐 Language:
              <div
                className="custom-input"
                onClick={() => navigate("/languageselector")}
              >
                <span>{language}</span>
                <span className="arrow">&#9654;</span>
              </div>
            </div>
            <div className="setting-item">
              📍 Location:
              <div
                className="custom-input"
                onClick={() => navigate("/locationselector")}
              >
                <span>{location}</span>
                <span className="arrow">&#9654;</span>
              </div>
            </div>
          </div>
          <h2>Categories</h2>
          <ul>
            {categories.map((cat, index) => (
              <li key={index} onClick={() => fetchNews(cat.key)}>
                <span className="icon">{cat.icon}</span>
                <span className="label">{cat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="news-section">
        <h3>News</h3>
        {loading ? (
          <p>Loading...</p>
        ) : Array.isArray(articles) && articles.length > 0 ? (
          <div className="news-cards">
            {articles.map((article, index) => (
              <div className="news-card" key={index}>
                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt="news"
                    style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                  />
                )}
                <h4>{article.title}</h4>
                <p>{article.description}</p>
                <a href={article.link} target="_blank" rel="noreferrer">
                  Read More →
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No news available.</p>
        )}
      </div>
    </div>
  );
}
