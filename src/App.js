import './App.css';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogsPage from "./pages/Blogs"
import PostBlogPage from './pages/PostBlogPage';
import BlogManager from './pages/BlogManager';

const urlEndpoint ="http://localhost:4000";
function App() {
  const [serverJSON,setServerJSON] = useState({message: [], success: true})
  const [sortField,setSortField] = useState('title') //'title'
  const [sortOrder,setSortOrder] = useState('ASC')
  const [filterField,setFilterField] = useState('title')//'title'
  const [filterValue,setFilterValue] = useState('')//''
  const [limit,setLimit] = useState(10)
  //set page to instead of zero otherwise you will get BSON error
  const [page,setPage] = useState(1)
  const [adminBlogList,setAdminBlogList] = useState([])
  const [adminBlogsLoading,setAdminBlogsLoading] = useState(false)
  //useEffects
  useEffect(()=> {
    const fetchAdminBlogList = async () => {
      const apiRes = await fetch(`${urlEndpoint}/admin/blog-list`);
      const apiData = await apiRes.json()
      setAdminBlogList(apiData.message)
      return apiData;
    }
    fetchAdminBlogList()
  },[adminBlogsLoading])
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
  const deleteBlog = async(blogId) => {
    const url = `${urlEndpoint}/admin/delete-blog/${blogId}`
    const response = await fetch(url , {method:'DELETE'})
    const responseJSON = await response.json()
    setAdminBlogsLoading(false)
    
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
          <Route path='/blog-manager' element={<BlogManager adminBlogList={adminBlogList} deleteBlog={deleteBlog}/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
