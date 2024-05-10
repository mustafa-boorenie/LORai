import './App.css'
import { useState } from 'react';
import axios from 'axios'
import logo from './assets/logo.svg';
import Lottie from 'react-lottie';
import loadingAnimation from './assets/loadingAnimation.json';
import ResponseView from './ResponseView';

function App() {

  const [response, setResponse] = useState('');
  const [formData , setformData] = useState(null);
  const [isLoading, setLoading] = useState(false);


  async function handleClick(e) {
    e.preventDefault();
    if (!formData) {
      console.log('No file selected');
      setResponse('Please select a file first.');
      return;
    }
    try {
      setLoading(true);
      const data = await axios.post(
         "http://localhost:3000/upload",
        formData, {
          headers : {
          "Content-Type" :"multipart/formData",
        }
      });
      console.log(data.data);
      setResponse(data.data);
      responseReturned();
    } catch (error) {
      console.log(error)
      setResponse(error.toString());
      responseReturned();
    }
  }
  
  function responseReturned() {
    setLoading(false);
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
    <h2>Rate your letter of recommendation!...</h2>
    <form>
      <input type='file' accept='.pdf' onChange={(e) => handleUpload(e)}/>
      <button className='uploadBtn' onClick={(e) => handleClick(e)}>Upload</button>
      {isLoading && <Lottie 
      options={{loop : true, autoplay : true, animationData : loadingAnimation}}
      style={{width : '120px'}}/>}
      {response && <h4>{response.response}</h4>}
    </form>
    </>
  )
}

export default App
