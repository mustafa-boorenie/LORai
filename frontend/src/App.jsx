import './App.css'
import { useState } from 'react';
import axios from 'axios'
import logo from './assets/logo.svg';
// import Pdfparser from 'pdf2json';

function App() {

  const [response, setReponse] = useState('');
  const [formData , setformData] = useState(null);


  async function handleClick(e) {
    e.preventDefault();
    try {
      const data = await axios.post(`http://localhost:3000/pdf` , {formData});
      setReponse(data.data);
    } catch (error) {
      console.log(error)
      setReponse(error.toString());
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
    <image className='logo' src={logo}/>
    <h1>lets begin...</h1>
    <form>
      <input type='file' accept='.pdf' onChange={(e) => handleUpload(e)}/>
      <button className='uploadBtn' onClick={(e) => handleClick(e)}>Upload</button>
      {response && <h3>{response}</h3>}
    </form>
    </>
  )
}

export default App
