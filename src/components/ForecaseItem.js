import React from 'react'
import moment from 'moment'

const ForecaseItem = ({ data, type }) => {
    return <div className='flex flex-col items-center justify-center'>
        <p className='font-light text-sm'>{moment(new Date(data.dt * 1000)).format(type === 'Hourly' ? 'HH:mm ddd' : 'ddd')}</p>
        <img className='w-12 my-1' src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
        <p className='font-medium'>{type === 'Hourly' ? Math.round(data.temp) : Math.round((data.temp.day + data.temp.night) / 2)}°C</p>
    </div>
}

export default ForecaseItem