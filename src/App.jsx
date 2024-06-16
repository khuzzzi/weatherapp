import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const API_KEY = "1c3398653f5b06c17c888fd34eb0a693";
  const [cityname, setCityName] = useState("");
  const [weatherDetails, setWeatherDetails] = useState(null);

  const handleOnChange = (e) => {
    setCityName(e.target.value);
  };

  const fetchWeatherData = async () => {
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    if (data.cod === '404') {
      setWeatherDetails("Weather Data Not Found");
    } else {
      const weatherNeededDetails = {
        mainWeather: data.weather[0].main,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        country: data.sys.country,
      };
      setWeatherDetails(weatherNeededDetails);
    }
  };

  const handleWeather = () => {
    fetchWeatherData();
  };

  return (
    <>
      <center>
        <form style={{ width: "20%", margin: "60px" }}>
          <div className="mb-3">
            <label htmlFor="cityInput" className="form-label">Add Your City:</label>
            <input
              type="text"
              className="form-control"
              id="cityInput"
              onChange={handleOnChange}
            />
          </div>
        </form>
        <div className="card" style={{ width: '18rem', margin: '40px' }}>
          <div className="card-body">
            <h5 className="card-title">{cityname}</h5>
            {weatherDetails ? (
              typeof weatherDetails === "string" ? (
                <p className="card-text">{weatherDetails}</p>
              ) : (
                <>
                  <p className="card-text">Weather: {weatherDetails.mainWeather}</p>
                  <p className="card-text">Temperature: {(weatherDetails.temperature)} K</p>
                  <p className="card-text">Humidity: {weatherDetails.humidity}%</p>
                  <p className="card-text">Country: {weatherDetails.country}</p>
                </>
              )
            ) : (
              <p className="card-text">Enter a city and search for weather details.</p>
            )}
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleWeather}>
          Search Weather
        </button>
      </center>
    </>
  );
}

export default App;
