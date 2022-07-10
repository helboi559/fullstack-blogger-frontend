import './App.css';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogsPage from "./pages/Blogs"

const urlEndpoint ="http://localhost:4000";
function App() {
  const [serverJSON,setServerJSON] = useState({message: [], success: true})
  const [sortField,setSortField] = useState('title') //'title'
  const [sortOrder,setSortOrder] = useState('ASC')
  const [filterField,setFilterField] = useState('title')//'title'
  const [filterValue,setFilterValue] = useState('')//''
  const [limit,setLimit] = useState(10)
  const [page,setPage] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      const apiRes = await fetch(`${urlEndpoint}/blogs/all-blogs?sortField=${sortField}&sortOrder=${sortOrder}&filterField=${filterField}&filterValue=${filterValue}&limit=${limit}&page=${page}`)
      const apiData = await apiRes.json()
      // console.log('app in frontend',apiData)
      setServerJSON(apiData)
      return apiData;
    }
    fetchData()
  },[sortField, sortOrder, filterField, filterValue, limit, page])
  console.log(serverJSON)
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/blogs' element={<BlogsPage sortField={sortField} sortOrder={sortOrder} filterField={filterField} 
          filterValue={filterValue} limit={limit} page={page} setSortField={setSortField} setSortOrder={setSortOrder} 
          setFilterField={setFilterField} setFilterValue={setFilterValue} setLimit={setLimit} setPage={setPage}serverJSON={serverJSON} />}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
