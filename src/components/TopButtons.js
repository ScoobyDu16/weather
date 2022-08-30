import React from 'react'

const cities = [
    { id: 1, name: 'London' },
    { id: 2, name: 'Paris' },
    { id: 3, name: 'Tokyo' },
    { id: 4, name: 'Toronto' },
    { id: 5, name: 'Delhi' },
]

const TopButtons = ({setSearch, setTempSearch}) => {
    return <>
        <div className='flex items-center justify-between my-6'>
            {cities.map(city => <button onClick={() =>{
                setSearch(city.name);
                setTempSearch(city.name);
            }} className='text-white md:text-lg sm:text-sm font-medium transition-all ease-in-out hover:scale-125' key={city.id}>{city.name}</button>)}
        </div>
    </>
}

export default TopButtons