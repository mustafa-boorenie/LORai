import './App.css'
import { useState } from 'react';
import axios from 'axios'
import logo from './assets/logo.svg';

function App() {

  const [response, setResponse] = useState('');
  const [formData , setformData] = useState(null);


  async function handleClick(e) {
    e.preventDefault();
    if (!formData) {
      console.log('No file selected');
      setResponse('Please select a file first.');
      return;
    }
    try {
      const data = await axios.post(
         "http://localhost:3000/upload",
        formData, {
          headers : {
          "Content-Type" :"multipart/formData",
        }
      });
      console.log(data.data);
      setResponse(data.data);
    } catch (error) {
      console.log(error)
      setResponse(error.toString());
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    const pdf = e.target.files[0];
    const formData = new FormData();
    formData.append("pdf", pdf);
    setformData(formData);
  }

  return (
    <>
    <img className='logo' src={logo}/>
    <h1>lets begin...</h1>
    <form>
      <input type='file' accept='.pdf' onChange={(e) => handleUpload(e)}/>
      <button className='uploadBtn' onClick={(e) => handleClick(e)}>Upload</button>
      {response && <h4>{response.response}</h4>}
    </form>
    </>
  )
}

export default App
