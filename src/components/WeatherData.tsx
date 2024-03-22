import { useEffect, useState } from "react";

export function WeatherData(){
    const [country, setCountry] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [temp, setTemp] = useState<number>(0);
    const [humidity, setHumidity] = useState<number>(0);
    const [wind, setWind] = useState<number>(0);
    const [windDir, setWindDir] = useState<string>("");

    function retrieveURL(country: string){
        return `https://api.weatherapi.com/v1/current.json?key=2aba150aac6549a981514758242902&q=${country}`
    }


    useEffect(() => {
        const fetchData = async () => {
            const url = retrieveURL("pakistan")
          const fetchData = await fetch(url);
          const response = await fetchData.json();
          console.log(response);
          setImage(response.current.condition.icon);
          setTemp(response.current.temp_f)
          setCountry(response.location.country);
          setCity(response.location.name);
          setHumidity(response.current.humidity);
          setWind(response.current.wind_mph);
          setWindDir(response.current.wind_dir)
        };
        fetchData();
       }, [])
      
    return (
        <div>
            <img src={image}></img>
            <p>{`Current Temperature: ${temp}`}</p>
            <p>{`Humidity: ${humidity}`}</p>
            <div>
            <p>{`Wind Speed: ${wind}`}</p>
            <p>{`Wind Direction: ${windDir}`}</p>
            </div>
            <h3>{`${city},${country}`}</h3>
        </div>
    )
}