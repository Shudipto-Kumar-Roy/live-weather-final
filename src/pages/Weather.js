import React, { useEffect, useState } from 'react';
import "./Weather.css";
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { getCurrentLocationData, getData } from '../api';
import { BsThermometerSun, BsCloud } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { GiWindTurbine } from "react-icons/gi";

const Weather = () => {

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [cityname, setCityName] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [weatherinfo, setWeatherInfo] = useState(null);
    const handleSearch = async () => {
        if (cityname) {
            const data = await getData(cityname,date);// API call
            setWeatherInfo({ ...data });
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                });
                const data = await getCurrentLocationData(latitude, longitude,date);// API call
                setWeatherInfo({ ...data });
            }
            else {
                alert("The browser does not support geo location");
            }
        }
        fetchData();
    }, [latitude,longitude,date]);

    return (
        <>
            <Container fluid className='weatherpage'>
                <Row className='siteheading'>
                    <Col md={6} sm={12}>
                        <div className="weathersearch">
                            <Stack gap={3}>
                                <input type="text" onChange={(e) => setCityName(e.target.value)} value={cityname} placeholder='City name (Required)' className="searchinput" />
                                <input type="date" title={date} onChange={(e) => setDate(e.target.value)} value={date} placeholder='Date (Optional)' className="searchinput" />
                                <button className="searchbutton" onClick={handleSearch}>Search</button>
                            </Stack>
                        </div>
                    </Col>
                    <Col md={6} sm={12}>
                        {
                            weatherinfo ?
                                <div className="weatherviewmain">
                                    <h3 className='maintemp_text'>Country : {weatherinfo.location.country}</h3>
                                    <h3 className='maintemp_text'>City : {weatherinfo.location.name}</h3>
                                    <h3 className='maintemp_text'>Localtime : {weatherinfo.location.localtime}</h3>
                                    <h3 className='maintemp_text'>Possibility : {weatherinfo.current.condition.text}</h3>
                                    <h3 className="maintemp_subtext"><BsThermometerSun className='icon' /> {weatherinfo.current.temp_c}°C/{weatherinfo.current.temp_f}°F</h3>
                                    <h3><BsCloud className='icon' /> {weatherinfo.current.cloud}%</h3>
                                    <h3 className="maintemp_subtext"><WiHumidity className='icon' /> humidity {weatherinfo.current.humidity}%</h3>
                                    <h3 className="maintemp_subtext"><GiWindTurbine className='icon' /> wind {weatherinfo.current.wind_kph} kph/{weatherinfo.current.wind_mph} mph</h3>
                                    <img src={weatherinfo.current.condition.icon} alt="ICON" />
                                </div>

                                :
                                <div>
                                    <h2>No data found</h2>
                                </div>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {
                            weatherinfo &&
                            <div className="weather_day_view">
                                {
                                    weatherinfo.forecast.forecastday.map((item, index) => (
                                        <div key={index}>
                                            <h4>Date : {item.date}</h4>
                                            <h4>Max temp : {item.day.maxtemp_c}°C / {item.day.maxtemp_f}°F</h4>
                                            <h4>Min temp : {item.day.mintemp_c}°C / {item.day.mintemp_f}°F</h4>
                                            <h4>Avg temp : {item.day.avgtemp_c}°C / {item.day.avgtemp_f}°F</h4>
                                            <h4>Max Wind Speed : {item.day.maxwind_kph} kph / {item.day.maxwind_mph} mph</h4>
                                            <h4>Min Wind Speed : {item.day.minwind_kph} kph / {item.day.minwind_mph} mph</h4>
                                            <h4>Average humidity : {item.day.avghumidity} %</h4>
                                            <h4>Chance of rain : {item.day.daily_chance_of_rain} %</h4>
                                            <h4>Chance of snow : {item.day.daily_chance_of_snow} %</h4>
                                            <h4>UV : {item.day.uv}</h4>
                                            <h4>Possibility : {item.day.condition.text}</h4>
                                            <img src={item.day.condition.icon} alt="ICON" />
                                            <h4>Sunrise : {item.astro.sunrise}</h4>
                                            <h4>Sunrise : {item.astro.sunset}</h4>
                                            <h4>Moonrise : {item.astro.moonrise}</h4>
                                            <h4>Moonset : {item.astro.moonset}</h4>
                                            <h4>Moon Phase : {item.astro.moon_phase}</h4>
                                            <div className="weather_hour_view">
                                                {
                                                    item.hour.map((item_inner, index) => (
                                                        <div key={index}>
                                                            <h4>Time : {item_inner.time}</h4>
                                                            <h4>Temperature : {item_inner.temp_c}°C / {item_inner.temp_f}°F</h4>
                                                            <h4>Wind Speed : {item_inner.wind_kph} kph / {item_inner.wind_mph} mph</h4>
                                                            <h4>Wind Direction : {item_inner.wind_dir}</h4>
                                                            <h4>UV : {item_inner.uv}</h4>
                                                            <h4>Possibility : {item_inner.condition.text}</h4>
                                                            <h4>Humidity : {item_inner.humidity}%</h4>
                                                            <h4>Cloud : {item_inner.cloud}%</h4>
                                                            <h4>Chance of rain : {item_inner.chance_of_rain}%</h4>
                                                            <h4>Chance of snow : {item_inner.chance_of_snow}%</h4>
                                                            <img src={item_inner.condition.icon} alt="ICON" />

                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                        }
                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default Weather;