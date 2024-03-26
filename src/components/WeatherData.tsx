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

    //Time related states
    const [retrievedTime, setRetrievedTime] = useState<string>("");
    const [date, setDate] = useState<string>("");


    //function to split and parse the time into clock time and date
    async function splitRetrievedTime(timeData: string){
        const splitTimeData = await timeData.split(" ");

        //Inner asynchronous function to split the date and reconstructs it based on MM/DD/YYYY format
        async function splitDate(date: string){            
            const dateObject = new Date(date);
            const month = dateObject.toLocaleString('default', {month: 'long'});

            console.log(month);
        }
        splitDate(splitTimeData[0]);
    }
    splitRetrievedTime(retrievedTime);

    //Queries the API for the particular location entered into the searchbar
    function retrieveQuery(location: string){
        return `https://api.weatherapi.com/v1/current.json?key=2aba150aac6549a981514758242902&q=${location}`
    }

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
            setRetrievedTime(response.location.localtime)
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