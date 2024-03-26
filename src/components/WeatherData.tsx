import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";

export function WeatherData(){

    //State related to query of location
    const [country, setCountry] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [location, setLocation] = useState<string>("Cupertino");
    const [region, setRegion] = useState<string>("");

    //States related to weather condition
    const [image, setImage] = useState<string>("");
    const [temp, setTemp] = useState<number>(0);
    const [humidity, setHumidity] = useState<number>(0);
    const [wind, setWind] = useState<number>(0);
    const [windDir, setWindDir] = useState<string>("");

    //State related to time
    const [time, setTime] = useState<string>("");


    function processTime(time: string){
        const splitTime = time.split(" ");
        console.log(splitTime);
        function parseDate(date: string){
            const splitDate = date.split("-");
            console.log(splitDate);
        }
        parseDate(splitTime[0]);
    }

    //Retrieves the URL and passes the location into the API.
    function retrieveURL(location: string){
        return `https://api.weatherapi.com/v1/current.json?key=2aba150aac6549a981514758242902&q=${location}`
    }

    //Asynchronous function to fetch the data from the API.
    async function fetchData() {
        try{
            const url = retrieveURL(location);
            const fetchedData = await fetch (url);
            const response = await fetchedData.json();
            console.log(response);
            setImage(response.current.condition.icon);
            setTemp(response.current.temp_f)
            setCountry(response.location.country);
            setCity(response.location.name);
            setHumidity(response.current.humidity);
            setWind(response.current.wind_mph);
            setWindDir(response.current.wind_dir)
            setRegion(response.location.region)
            setTime(response.location.localtime);
        }
        catch{
            console.log("Error receiving data!");
        }
    }

    useEffect(() => {
        fetchData();
       }, []);

    processTime(time);
      
    return (
        <div className="flex flex-col justify-center items-center border rounded-3xl w-4/5 h-96">

            <div className="flex items-center">
                <SearchBar setLocation={setLocation}></SearchBar>
                <button className="bg-blue-400 w-16" onClick={fetchData}>Search</button>
            </div>
            <p>{time}</p>

            <img src={image}></img>
            {region !== '' ? <h3 className="font-bold">{`${city}, ${region}, ${country}`}</h3> : <h3 className="font-bold">{`${city},${country}`}</h3>}
            <p>{`Current Temperature: ${temp}°F`}</p>
            <p>{`Humidity: ${humidity}%`}</p>
            <div>
                <p>{`Wind Speed: ${wind} mph`}</p>
                <p>{`Wind Direction: ${windDir}`}</p>
            </div>
        </div>
    )
}