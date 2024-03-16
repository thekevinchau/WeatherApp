import {useEffect,useState} from "react";
import './App.css';

function App() {
  const [count, setCount] = useState<number>(0);
  const [country, setCountry] = useState("");

  useEffect(() => {
    fetch("https://api.weatherapi.com/v1/current.json?key=2aba150aac6549a981514758242902&q=london")
    .then(response => response.json())
    .then(apiData => {console.log(apiData), setCountry(apiData.location.country)})
    ;
  }, [])



  return (
    <div className="flex justify-items-center items-center flex-col">
      <section className="bg-green-500 h-screen w-screen flex justify-center items-center flex-col text-center text-2xl p-12 md:p-14 lg:p-16 xl:p-20">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, magnam aspernatur nesciunt nostrum laboriosam quisquam sit commodi ut dolores impedit.
        </p>
        <button className="bg-red-500" onClick={() => setCount(count+1)}>Add 1</button>
        <div>{count}</div>
        <div>{country}</div>
      </section>
    </div>
  )
  
}

export default App
