export const api = {
    key: '21029c526be061639870719dd972a91a',
    base: 'https://api.openweathermap.org/data/2.5/'
}

export const fetchWeatherApi= async (searchParams)=>{
    const weather= {
        current: {},
        hourly: [],
        daily: []
    }
    let url= new URL(api.base + '/weather');
    url.search= new URLSearchParams({...searchParams, appid: api.key});
    const response1= await fetch(url);
    const data1= await response1.json();
    weather.current= data1;

    const {lat, lon}= data1.coord;
    // url= new URL(api.base + '/onecall');
    // url.search= new URLSearchParams({lat, lon, appid: api.key, units: searchParams.units, exclude: "current,minutely,alerts"});
    // const response2= await fetch(url);
    // const data2= await response2.json();
    const data2= await fetchWeatherOnecall({lat, lon, appid: api.key, units: searchParams.units, exclude:"current,minutely,alerts"});
    weather.daily= data2.daily;
    weather.hourly= data2.hourly;
    return weather;
}

export const fetchWeatherOnecall= async ({lat, lon, appid, units, exclude})=>{
    const url= new URL(api.base + '/onecall');
    url.search= new URLSearchParams({lat, lon, appid, units, exclude});
    const response= await fetch(url);
    const data= await response.json();
    return data;
}