import './App.css';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [error, setError] = useState('');
  const [data, setData] = useState({
    celcius: 0,
    name: 'City',
    humidity: '--',
    icon: '01d',
    speed: '',
    description: '--',
  });
  const [name, setName] = useState('');
  const [iconUrl, setIconUrl] = useState('');

  const handleClick = () => {
    if (name.trim() !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=c361200132d2585e69a0ba9cecae8517&units=metric`;

      axios
        .get(apiUrl)
        .then(response => {
            // console.log(response.data);
          const newIconUrl = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

          setData({
            celcius: response.data.main.temp,
            name: response.data.name,
            humidity: response.data.main.humidity,
            speed: response.data.wind.speed,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
          });

          setError('');
          setIconUrl(newIconUrl);
        })
        .catch(err => {
        //   console.log(err.message);

          if (err.response && err.response.status === 404) {
            setError("Invalid City Name");
          } else {
            setError("");
          }
        });
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={e => setName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleClick}>
            <img
              className="search button img"
              src=".\public\images\searchbtn.png"
              alt="search"
            />
          </button>
        </div>
        <div className="winfo">
          <div className="error">
            <p>{error}</p>
          </div>
          <img src={iconUrl} alt="cloud_img" className="icon" />
          <div className="data">
            <h1>{Math.round(data.celcius)}°C</h1>
            <p className="description">{data.description}</p>
            <h2>{data.name}</h2>
          </div>
          <div className="details">
            <div className="col">
              <img src="./images/humidity.png" alt="" />
              <div className="humidity">
                <p>{data.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="./images/wind.png" alt="" />
              <div className="wind">
                <p>{Math.round(data.speed)} kmph</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
