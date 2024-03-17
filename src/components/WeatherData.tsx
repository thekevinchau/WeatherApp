import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";


export function WeatherData(){
    const [weather, setWeather] = useState<number>(0);
    useEffect(() => {
        const fetchData = async () => {
          const fetchData = await fetch("https://api.weatherapi.com/v1/current.json?key=2aba150aac6549a981514758242902&q=afghanistan")
          const response = await fetchData.json();
          console.log(response);
          setWeather(response.current.humidity)
        };
        fetchData();
       }, [])
      
    return (
        <div className="">
            <SearchBar></SearchBar>
            <h1>Humidity :{weather}</h1>
        </div>
    )
}