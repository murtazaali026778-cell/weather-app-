import { useEffect, useState, useCallback } from "react";
import Style from "./Weather.module.css";

const Weather = ({ city = "Karachi" }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const getData = useCallback(async () => {
    setSpinning(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=e9147ef99eaf4038bb660248262205&q=Karachi&aqi=yes`
      );
      if (!response.ok) throw new Error("Failed to fetch weather");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setSpinning(false);
    }
  }, [city]);

  useEffect(() => {
    getData();
  }, [getData]);

  const formatDate = () =>
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

  const getAqiInfo = (pm25) => {
    if (pm25 == null) return null;
    const val = Math.round(pm25);
    if (val <= 12) return { text: "Good", cls: Style.good, val };
    if (val <= 35) return { text: "Moderate", cls: Style.moderate, val };
    return { text: "Unhealthy", cls: Style.unhealthy, val };
  };

  const getUvColor = (uv) => {
    if (uv <= 2) return "#4ade80";
    if (uv <= 5) return "#facc15";
    if (uv <= 7) return "#fb923c";
    return "#f87171";
  };

  return (
    <div className={Style.shell}>
      <div className={Style.orb1} />
      <div className={Style.orb2} />

      <div className={Style.card}>
        {loading ? (
          <div className={Style.skeletons}>
            <div className={`${Style.skeleton} ${Style.skRow1}`} />
            <div className={`${Style.skeleton} ${Style.skRow2}`} />
            <div className={`${Style.skeleton} ${Style.skRow3}`} />
            <div className={`${Style.skeleton} ${Style.skRow4}`} />
          </div>
        ) : error ? (
          <div className={Style.errorBox}>
            <span className={Style.errorIcon}>⚠</span>
            <p>Couldn't load weather</p>
            <small>{error}</small>
            <button className={Style.retryBtn} onClick={getData}>
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className={Style.header}>
              <div className={Style.location}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <p className={Style.cityName}>
                    {weather.location.name}, {weather.location.country}
                  </p>
                  <p className={Style.dateText}>{formatDate()}</p>
                </div>
              </div>
              <button
                className={`${Style.refreshBtn} ${spinning ? Style.spinning : ""}`}
                onClick={getData}
                title="Refresh"
                aria-label="Refresh weather"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
                </svg>
              </button>
            </div>

            {/* Main temp */}
            <div className={Style.main}>
              <div className={Style.tempBlock}>
                <div className={Style.temp}>
                  {Math.round(weather.current.temp_c)}
                  <span className={Style.deg}>°</span>
                </div>
                <p className={Style.feelsLike}>
                  Feels like {Math.round(weather.current.feelslike_c)}°C
                </p>
              </div>
              <div className={Style.condBlock}>
                <img
                  src={`https:${weather.current.condition.icon}`}
                  alt={weather.current.condition.text}
                  className={Style.condIcon}
                />
                <p className={Style.condText}>{weather.current.condition.text}</p>
              </div>
            </div>

            <div className={Style.divider} />

            {/* Stats row */}
            <div className={Style.stats}>
              <div className={Style.stat}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#82b4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
                </svg>
                <span className={Style.statVal}>{weather.current.humidity}%</span>
                <span className={Style.statLabel}>Humidity</span>
              </div>
              <div className={Style.stat}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#82b4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/>
                </svg>
                <span className={Style.statVal}>{Math.round(weather.current.wind_kph)}</span>
                <span className={Style.statLabel}>km/h Wind</span>
              </div>
              <div className={Style.stat}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#82b4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                <span className={Style.statVal}>{Math.round(weather.current.vis_km)}</span>
                <span className={Style.statLabel}>km Vis.</span>
              </div>
            </div>

            <div className={Style.divider} />

            {/* AQI */}
            {weather.current.air_quality?.pm2_5 != null && (() => {
              const aqi = getAqiInfo(weather.current.air_quality.pm2_5);
              return (
                <div className={Style.aqiBar}>
                  <div className={Style.aqiLeft}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#82ffbe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 22V12m0 0C12 6 7 3 7 3s1 5 5 5m0-5c0-0 5 3 5 9"/><path d="M5 22h14"/>
                    </svg>
                    <div>
                      <p className={Style.aqiTitle}>Air Quality · PM2.5</p>
                      <p className={Style.aqiVal}>{aqi.val} µg/m³</p>
                    </div>
                  </div>
                  <span className={`${Style.aqiBadge} ${aqi.cls}`}>{aqi.text}</span>
                </div>
              );
            })()}

            {/* UV Index */}
            <div className={Style.uvRow}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffd264" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              <div className={Style.uvInfo}>
                <p className={Style.uvLabel}>UV Index</p>
                <div className={Style.uvTrack}>
                  <div
                    className={Style.uvFill}
                    style={{
                      width: `${Math.min((weather.current.uv / 12) * 100, 100)}%`,
                      background: getUvColor(weather.current.uv),
                    }}
                  />
                </div>
              </div>
              <span className={Style.uvVal}>{weather.current.uv}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
