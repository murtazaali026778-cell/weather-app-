import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Style from './Weather.module.css'


const Weather = () => {

  const { city } = useParams()

  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  let getData = async () => {
    try {

      let response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=e9147ef99eaf4038bb660248262205&q=Karachi&aqi=yes`
      )

      let data = await response.json()

      setWeather(data)
      console.log(data);
      setLoading(false)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [city])

  return (
    <>
 
    <div className ={Style.container}>


      {
        loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className={Style.card}>
      

            <img
              src={weather.current.condition.icon}
              alt=""
            />
          
            <h2 className={Style.temp}>{weather.current.temp_c}°C</h2>

            <p className={Style.s}>{weather.current.condition.text}</p>
         <div className={Style.info}>
             
            <p>Humidity : {weather.current.humidity}%</p>

            <p>Wind : {weather.current.wind_kph} KPH</p>
            
         </div>
            </div>
         
        )
      }

    </div>
    </>
  )
}

export default Weather