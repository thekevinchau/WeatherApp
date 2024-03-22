import React from "react"

interface SearchProps {
    setSearchResult: (searchResult: string) => void
}

export function SearchBar({setSearchResult}: SearchProps){

    function setLocation(event: React.ChangeEvent<HTMLInputElement>){
        setSearchResult(event.target.value);
    }



    return <div>
        <input type="text" placeholder="Country" onChange={(setLocation)}>
        </input>
        <button>Submit</button>
    </div>
}