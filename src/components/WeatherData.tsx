import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";

export function WeatherData(){
    //Geographical location related states
    const [country, setCountry] = useState<string>("");
    const [location, setLocation] = useState<string>("Cupertino");
    const [city, setCity] = useState<string>("");
    const [region, setRegion] = useState<string>("");


    //Weather condition related states
    const [image, setImage] = useState<string>("");
    const [temp, setTemp] = useState<number>(0);
    const [humidity, setHumidity] = useState<number>(0);
    const [wind, setWind] = useState<number>(0);
    const [windDir, setWindDir] = useState<string>("");

    const [retrievedTime, setRetrievedTime] = useState<string>("");
    const [date, setDate] = useState<string>("");

    async function processRetrievedDate(timeData: string){
        const splitTime = await timeData.split(" ");
        console.log(splitTime);
        
        function parseDate(date: string){
            const dateObject = new Date(date);
            const dayString = dateObject.toLocaleDateString('default', {weekday: 'long'})
            const month = dateObject.toLocaleString('default', {month: 'long'});
            const dayNumber = dateObject.getDate() + 1;
            const year = dateObject.getFullYear();
            
            const reconstructedString = `${dayString} ${month} ${dayNumber}, ${year}`
            return reconstructedString;
        }
        const parsedDate = parseDate(splitTime[0]);
        setDate(parsedDate);
    }


    //Queries the API for the particular location entered into the searchbar
    function retrieveQuery(location: string){
        return `https://api.weatherapi.com/v1/current.json?key=2aba150aac6549a981514758242902&q=${location}`
    }


    //Asynchronous function to fetch the data from the Weather API.
    async function fetchData() {
        try{
            const url = retrieveQuery(location);
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

            const retrievedTime = response.location.localtime;

            setRetrievedTime(retrievedTime)
            await processRetrievedDate(retrievedTime);
        }
        catch{
            console.log("Error receiving data!");
        }
    }


    useEffect(() => {
        fetchData();
       }, [])

      
    return (
        <div className="flex flex-col items-center">
            <p>{date}</p>
            <img src={image}></img>
            <p>{`Current Temperature: ${temp}°F`}</p>
            <p>{`Humidity: ${humidity}%`}</p>
            <div>
            <p>{`Wind Speed: ${wind} mph`}</p>
            <p>{`Wind Direction: ${windDir}`}</p>
            </div>
            {region !== '' ? <h3>{`${city}, ${region}, ${country}`}</h3> : <h3>{`${city},${country}`}</h3>}
            <SearchBar setLocation={setLocation}></SearchBar>
            <button onClick={fetchData}>Fetch Data</button>
        </div>
    )
}