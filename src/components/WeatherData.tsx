import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";

export function WeatherData(){
    const [country, setCountry] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [temp, setTemp] = useState<number>(0);
    const [humidity, setHumidity] = useState<number>(0);
    const [wind, setWind] = useState<number>(0);
    const [windDir, setWindDir] = useState<string>("");
    const [region, setRegion] = useState<string>("");
    const [location, setLocation] = useState<string>("philadelphia");

    function retrieveURL(location: string){
        return `https://api.weatherapi.com/v1/current.json?key=2aba150aac6549a981514758242902&q=${location}`
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = retrieveURL(location)
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
                setRegion(response.location.region)
            }
            catch{
                console.log("Error receiving data!");
            }
        
        };
        fetchData();
       }, [])
      
    return (
        <div className="flex flex-col items-center">
            <img src={image}></img>
            <p>{`Current Temperature: ${temp}°F`}</p>
            <p>{`Humidity: ${humidity}%`}</p>
            <div>
            <p>{`Wind Speed: ${wind} mph`}</p>
            <p>{`Wind Direction: ${windDir}`}</p>
            </div>
            <h3>{`${city}, ${region}, ${country}`}</h3>
            <SearchBar setLocation={setLocation}></SearchBar>
        </div>
    )
}