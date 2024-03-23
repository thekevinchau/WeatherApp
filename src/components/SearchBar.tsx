import React, { useState } from "react"

export function SearchBar(){
    const [input ,setInput] = useState<string>("");

    function setLocation(event: React.ChangeEvent<HTMLInputElement>){
        setInput(event.target.value);
    }



    return <div>
        <input type="text" placeholder="Country" onChange={setLocation} value={input}>
        </input>
        <button>Submit</button>
        <p>{input}</p>
    </div>
}