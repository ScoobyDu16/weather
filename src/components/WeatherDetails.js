import React from 'react'
import { UilArrowUp, UilArrowDown, UilSun, UilSunset, UilTemperature, UilTear, UilWindsock } from '@iconscout/react-unicons'
import moment from 'moment'

const degToCompass= (num)=> {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

const WeatherDetails = ({weather}) => {

    return <>
        <div className='text-white'>
            <div className='flex justify-center items-center my-6 text-xl text-cyan-300'>
                <p>{weather.weather[0].main}</p>
            </div>
            <div className='flex items-center justify-between my-3'>
                <img className='w-11' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="sun" />
                <p className='md:text-5xl text-2xl'>{Math.round(weather.main.temp)}°C</p>
                <div className='flex flex-col space-y-2'>
                    <div className='flex items-center font-light text-sm'>
                        <UilTemperature size={18} />
                        <p className='ml-1'>Real Feel: <strong>{Math.round(weather.main.feels_like)}°C</strong></p>
                    </div>
                    <div className='flex items-center'>
                        <UilTear size={18} />
                        <p className='ml-1'>Humidity: <strong>{Math.round(weather.main.humidity)}%</strong></p>
                    </div>
                    <div className='flex items-center'>
                        <UilWindsock size={18} />
                        <p className='ml-1'>Wind: <strong>{Math.round(weather.wind.speed)}km/h</strong> <span className='text-cyan-200'>{degToCompass(weather.wind.deg)}</span></p>
                    </div>
                </div>
            </div>
            <div className='flex items-center text-sm my-5 space-x-2'>
                <div className='flex items-center'>
                    <UilSun />
                    <p className='ml-1 font-light'>Rise: <span className='font-medium'>{moment(new Date(weather.sys.sunrise*1000)).format('HH:mm')}</span></p>
                </div>
                <p className='font-medium text-xl text-cyan-300'>|</p>
                <div className='flex items-center'>
                    <UilSunset />
                    <p className='ml-1 font-light'>Set: <span className='font-medium'>{moment(new Date(weather.sys.sunset*1000)).format('HH:mm')}</span></p>
                </div>
                <p className='font-medium text-xl text-cyan-300'>|</p>
                <div className='flex items-center'>
                    <UilArrowUp />
                    <p className='font-light'>High: <span className='font-medium'>{Math.round(weather.main.temp_max)}°C</span></p>
                </div>
                <p className='font-medium text-xl text-cyan-300'>|</p>
                <div className='flex items-center'>
                    <UilArrowDown />
                    <p className='font-light'>Low: <span className='font-medium'>{Math.round(weather.main.temp_min)}°C</span></p>
                </div>
            </div>
        </div>
    </>
}

export default WeatherDetails