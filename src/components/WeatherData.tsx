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
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");

    async function processRetrievedDate(timeData: string){
        const splitTime = await timeData.split(" ");
        
        function parseDate(date: string): string{
            const dateObject = new Date(date);
            const dayString = dateObject.toLocaleDateString('default', {weekday: 'long'})
            const month = dateObject.toLocaleString('default', {month: 'long'});
            const dayNumber = dateObject.getDate() + 1;
            const year = dateObject.getFullYear();
            
            const reconstructedString = `${dayString} ${month} ${dayNumber}, ${year}`
            return reconstructedString;
        }
        
        function parseClockTime(clockTime: string){
            const splitTime = clockTime.split(":");
            
            const minutes = splitTime[1]
            const hours = (Number(splitTime[0]) % 12 )

            /*
            Logic for checking for AM or PM.
            If splitTime[0] (hours before I parsed it into 12hr time) is less than 12, it's AM.
            If splitTime[1] (hours before I parsed it inot 12hr time) is greater than equal to 12, then it's PM
            */
           const reconstructedTime = Number(splitTime[0]) < 12 ? `${String(hours)}: ${minutes} AM` : `${String(hours)}:${minutes} PM`
            setTime(reconstructedTime);
        }


        const parsedDate = parseDate(splitTime[0]);
        setDate(parsedDate);
        parseClockTime(splitTime[1]);
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

            //State setters for each weather conidition
            setImage(response.current.condition.icon);
            setHumidity(response.current.humidity);
            setWind(response.current.wind_mph);
            setWindDir(response.current.wind_dir)
            setTemp(response.current.temp_f)

            //State setters for geographical location
            setCountry(response.location.country);
            setCity(response.location.name);
            setRegion(response.location.region)

            //State setter for chronological states
            const retrievedTime = response.location.localtime;
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
            <p>{time}</p>
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