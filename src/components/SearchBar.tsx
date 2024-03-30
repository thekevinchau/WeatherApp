import React from "react"

interface searchBarProps{
    setLocation: (location: string) => void;
}

export function SearchBar({setLocation}: searchBarProps){

    function handleInput(event: React.ChangeEvent<HTMLInputElement>){
        setLocation(event.target.value);
    }


    return <div>
        <input type="text" placeholder="Enter your location" onChange={handleInput} required>
        </input>
    </div>
}