import './assets/App.css';
import React , {useState, useEffect} from 'react'
import axios from 'axios';

function App() {
  const[data, setData]=useState('');
  useEffect(()=>{
  async function fetchName() {
    try{ 
       await axios.get('http://localhost:8080/getName')
      .then(result =>{
        setData(result.data.data)
        console.log(result.data)
      }
        )
      .catch(error => console.log(error))
    }
    catch(error){
      console.log(error)
    }
    }
fetchName();
},[]);
  return (
    <div className="App">
             Hello , I am {data} 

    </div>
  );
}

export default App;
