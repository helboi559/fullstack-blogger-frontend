import './App.css';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogsPage from "./pages/Blogs"
import PostBlogPage from './pages/PostBlogPage';

const urlEndpoint ="http://localhost:4000";
function App() {
  const [serverJSON,setServerJSON] = useState({message: [], success: true})
  const [sortField,setSortField] = useState('title') //'title'
  const [sortOrder,setSortOrder] = useState('ASC')
  const [filterField,setFilterField] = useState('title')//'title'
  const [filterValue,setFilterValue] = useState('')//''
  const [limit,setLimit] = useState(10)
  const [page,setPage] = useState(1)
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
  const blogSubmit = async (blog) => {
    const url = `${urlEndpoint}/blogs/blog-submit`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blog) 
    });
    const responseJSON = await response.json();
    }
  // console.log(serverJSON)
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route index element={<BlogsPage sortField={sortField} sortOrder={sortOrder} filterField={filterField} 
          filterValue={filterValue} limit={limit} page={page} setSortField={setSortField} setSortOrder={setSortOrder} 
          setFilterField={setFilterField} setFilterValue={setFilterValue} setLimit={setLimit} setPage={setPage} serverJSON={serverJSON} blogSubmit={blogSubmit}/>}/>
          <Route path='/post-blog' element={<PostBlogPage blogSubmit={blogSubmit} />}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
