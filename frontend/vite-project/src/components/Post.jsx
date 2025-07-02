import axios from 'axios';
import React, { useState } from 'react';
import './Post.css';

const PostForm = ({ onSubmitSuccess }) => {
  const [form, setForm] = useState({
    heading: '',
    newscontent: '',
    category: '',
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('heading', form.heading);
    formData.append('newscontent', form.newscontent);
    formData.append('category', form.category);
    if (file) formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/auth/posts', formData);
      alert('Post submitted successfully');

      if (onSubmitSuccess) onSubmitSuccess(); // trigger parent callback if provided

      // Reset form
      setForm({
        heading: '',
        newscontent: '',
        category: '',
      });
      setFile(null);
    } catch (err) {
      console.error('Error submitting post:', err);
      alert('Error submitting form');
    }
  };

  return (
    <div className="registration-card">
      <h2>Post Your Own News</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Heading</label>
          <input
            className="form-input"
            type="text"
            name="heading"
            value={form.heading}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">News Content</label>
          <textarea
            className="form-input"
            name="newscontent"
            value={form.newscontent}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-input"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Technology">Technology</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Upload Image</label>
          <input
            className="form-input"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;