import React, { useState } from 'react';
import './LocationSelector.css';
import { useNavigate } from 'react-router-dom';

const LocationSelector = () => {
  const [manualLocation, setManualLocation] = useState('');
  const navigate = useNavigate();

  const handleLocationSelect = (location) => {
    if (location && location.trim() !== '') {
      localStorage.setItem('selectedLocation', location.trim());
      navigate('/home');
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.county ||
              '';
            if (city) {
              localStorage.setItem('selectedLocation', city);
              navigate('/home');
            } else {
              alert('Could not detect city from your location. Please enter manually.');
            }
          } catch {
            alert('Error detecting location. Please enter manually.');
          }
        },
        () => {
          alert('Location permission denied or unavailable. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="location-selector-container">
      <h1>Select Your Location</h1>
      <div className="location-input-section">
        <input
          type="text"
          placeholder="Enter city or location"
          value={manualLocation}
          onChange={(e) => setManualLocation(e.target.value)}
        />
        <button onClick={() => handleLocationSelect(manualLocation)}>Search Location</button>
      </div>
      <div className="or-divider">OR</div>
      <button className="location-enable-btn" onClick={handleUseCurrentLocation}>
        Use Current Location
      </button>
    </div>
  );
};

export default LocationSelector;
