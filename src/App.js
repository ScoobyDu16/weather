import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Forecast from './components/Forecast'
import Inputs from './components/Inputs'
import TimeAndLocation from './components/TimeAndLocation'
import TopButtons from './components/TopButtons'
import WeatherDetails from './components/WeatherDetails'

import { fetchWeatherApi } from './api/weatherApi'

const App = () => {
  const [tempSearch, setTempSearch]= useState('');
  const [search, setSearch] = useState('ashoknagar');
  const [weather, setWeather] = useState({current: null, daily: null, hourly: null});
  const [unit, setUnit] = useState('metric');
  const [userLocation, setUserLocation]= useState({lat: '', lon: ''});

  // const weatherBg= {
  //   morning: 'from-red-900 to-yellow-600',
  //   afternoon: 'from-yellow-600 to-orange-500',
  //   evening: 'from-orange-700 to-red-700',
  //   night: 'from-gray-900 to-blue-700'
  //   coldDay: 'from-cyan-700 to-blue-300',
  //   hotDay: 'from-cyan-700 to-blue-300',
  //   coldNight: 'from-cyan-700 to-blue-300',
  //   hotNight: 'from-cyan-700 to-blue-300',
  //   rainyDay: 'from-cyan-700 to-blue-300',
  //   rainyNight: 'from-cyan-700 to-blue-300'
  // }

  const fetchWeather = async () => {
    toast.info(`Fetching weather for ${search.toUpperCase()}`);
    try{
      const data = await fetchWeatherApi({q: search, units: unit});
      if(!data.current){
        toast.error(`Unable to fetch data for ${search}`);
      } else{
        setWeather(data);
        toast.success(`Weather fetched successfully for ${search.toUpperCase()}`);
      }
      console.log('Data : ', data);
    } catch(error){
      console.log(error);
      toast.error(`Unable to fetch data for ${search.toUpperCase()}`);
    }
  }

  const formatBg= ()=>{
    if(!weather.current){
      return 'from-cyan-700 to-blue-300';
    }
    // const threshold= unit==='metric' ? 20 : 60;
    const date= Date(weather.current.dt);
    const time= parseInt(moment(date).utc(date/60).utcOffset((weather.current.timezone)/60).format("HH"));
    console.log(time);
    if(time>=6 && time<=9){
      console.log('morning');
      return 'from-red-700 to-yellow-600';
    }
    if(time>9 && time<=16){
      console.log('afternoon');
      return 'from-cyan-700 to-blue-300';
      // return 'from-yellow-600 to-orange-500';
    }
    if(time>16 && time<=19){
      console.log('evening');
      return 'from-orange-700 to-red-700';
    }
    if(time>19 || time<6){
      console.log('night');
      return 'from-gray-900 to-blue-700';
    }
    return 'from-cyan-500 to-blue-500';
    // morning: 'from-red-900 to-yellow-600',
    // afternoon: 'from-yellow-600 to-orange-500',
    // evening: 'from-orange-700 to-red-700',
    // night: 'from-gray-900 to-blue-700'
  }

  useEffect(()=>{
    fetchWeather();
    // eslint-disable-next-line
  }, [search, unit])

  return <>
    <div className={`mx-auto max-w-sm md:max-w-3xl md:mt-2 py-2 px-8 md:px-16 bg-gradient-to-br ${formatBg()} h-fit md:shadow-lg md:shadow-gray-400 rounded`}>
      <TopButtons setSearch={setSearch} setTempSearch={setTempSearch} />
      <Inputs userLocation={userLocation} unit={unit} tempSearch={tempSearch} setTempSearch={setTempSearch} setSearch={setSearch} setUnit={setUnit} setUserLocation={setUserLocation} />
      <hr />
      {
        weather.current && weather.daily && weather.hourly ?
          (
            <>
              <TimeAndLocation weather={weather.current} />
              <WeatherDetails weather={weather.current} unit={unit} />
              <Forecast weather={weather.hourly} title="Hourly" />
              <Forecast weather={weather.daily} title="Daily" />
            </>
          ) :
          (
            <div style={{minHeight:'70vh'}} className='flex items-center justify-center'>
              <h1 className='text-red-500 font-bold text-3xl'>No results found.</h1>
            </div>
          )
      }
      <div className='sm:w-100 flex items-center justify-center'>
      <footer className='text-sm font-bold my-3 mt-6 text-cyan-700 bg-white p-2 rounded-md'>Developed by @Amarpal_Singh @2022</footer>
    </div>
    </div>
    <ToastContainer autoClose={1500} theme='colored' newestOnTop={true} />
  </>
}

export default App;