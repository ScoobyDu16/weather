import React from 'react';
import moment from 'moment';

const TimeAndLocation = ({weather}) => {
    const date= Date(weather.dt);
    return <>
        <div className='text-white'>
            <div className='flex items-center justify-center mt-6 text-xl font-extralight'>
                <p>{moment(date).utc(date/60).utcOffset((weather.timezone)/60).format("dddd[, ]MMMM Do YYYY [||] hh:mm A")}</p>
            </div>
            <div className='flex items-center justify-center text-3xl font-medium my-3'>
                <h3>{weather.name}, {weather.sys.country}</h3>
            </div>
        </div>
    </>
}

export default TimeAndLocation