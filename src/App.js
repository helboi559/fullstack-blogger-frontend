import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogsPage from "./pages/Blogs"

const urlEndpoint ="http://localhost:4000";
function App() {
  const [serverJSON,setServerJSON] = useState({message:null})
  useEffect(() => {
    const fetchData = async () => {
      const apiRes = await fetch(`${urlEndpoint}/blogs/hello-blogs`)
      const apiData = await apiRes.json()
      serverJSON(apiData)
      return;
    }
    fetchData()
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/blogs' element={<BlogsPage message={serverJSON.message}/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
