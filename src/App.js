import './App.css';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogsPage from "./pages/Blogs"

const urlEndpoint ="http://localhost:4000";
function App() {
  const [serverJSON,setServerJSON] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const apiRes = await fetch(`${urlEndpoint}/blogs/all-blogs`)
      const apiData = await apiRes.json()
      // console.log('app in frontend',apiData)
      setServerJSON(apiData)
      return apiData;
    }
    fetchData()
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/blogs' element={<BlogsPage serverJSON={serverJSON}/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
