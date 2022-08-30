import React from 'react'
import { UilSearchAlt, UilLocationPinAlt } from '@iconscout/react-unicons'

const Inputs = ({ setSearch, setUnit, setTempSearch, tempSearch, setUserLocation, unit, userLocation }) => {

    const configureUserLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            setUserLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
            const response= await fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.0adeeac972122377f9329e050b7a94b0&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);
            const data= await response.json();
            const {city, state, country}= data.address;
            if(city){
                setSearch(city);
                setTempSearch(city);
            } else if(state){
                setSearch(state);
                setTempSearch(state);
            } else if(country){
                setSearch(country);
                setTempSearch(country);
            }
        })
    }

    return <>
        <div className='flex items-center justify-center my-6'>
            <div className='flex w-3/4 items-center justify-center space-x-4'>
                <input onKeyDown={e => e.key === 'Enter' && setSearch(tempSearch)} value={tempSearch} onChange={e => setTempSearch(e.target.value)} className='rounded focus:outline-none p-2 capitalize text-xl font-light w-full shadow-xl' type="text" placeholder='Search for city' />
                <UilSearchAlt onClick={() => setSearch(tempSearch)} size={25} className='text-white cursor-pointer transition-all ease-out hover:scale-125' />
                <UilLocationPinAlt onClick={configureUserLocation} size={25} className='text-white cursor-pointer transition-all ease-out hover:scale-125' />
            </div>
            <div className='flex w-1/4 text-white text-xl justify-end items-center font-light'>
                <button onClick={() => setUnit('metric')} className='transition-all ease-out hover:scale-125' name='metric'>°C</button>
                <p className='mx-2 text-3xl'>|</p>
                <button onClick={() => setUnit('imperial')} className='transition-all ease-out hover:scale-125' name='imperial'>°F</button>
            </div>
        </div>
    </>
}

export default Inputs