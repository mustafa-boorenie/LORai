import './App.css'
import { useState } from 'react';
import axios from 'axios'
// import Pdfparser from 'pdf2json';

function App() {

  const [response, setReponse] = useState('');

  async function handleUpload(e) {
    e.preventDefault();

    try {
      const data = await axios.post(`http://localhost:3000/}`);
      setReponse(data.data);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <h1>Lets Begin...</h1>
    <form>
      <input type='file' accept='.pdf' onChange={(e) => this.handleUpload(e)}/>
      {response && <h3>{response}</h3>}
    </form>
    </>
  )
}

export default App
