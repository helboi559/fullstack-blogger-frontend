# _Fullstack Blogger__Frontend

## Requirements (Front-End Part 1B)

### Install React & Reactrouter(frontend routing)
- Create a new github repo called fullstackbloggerfrontend, clone the repo to your computer.
- Initialize the repo with create-react-app.
  >$ npx create-react-app .
- Install react-router *CHECK VERSION*
  >$ npm i react-router-dom@6
- Configure react-router by adding <BrowserRouter> to index.js.
  ```js
  import {BrowserRouter} from "react-router-dom"

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </React.StrictMode>
  );
  ```
### Route frontend & create components
- Create a new folder ./src/Pages
- Create a new file ./src/Pages/Blogs.js
- Create and default export a new react component BlogsPage in ./src/Pages/Blogs.js.
  ```js
  import React from 'react'

  const BlogsPage = () => {
    
    return (
      <>
        <h3>Blogs</h3>
      </>
    )
  }

  export default BlogsPage

  ```
- In ./src/App.js, import the <Routes></Routes> component from react-router and add it to the JSX (HTML) of the App component.
- Add a state variable to App called serverJSON, initialized to: {message: null}
- Add the following string as a global variable in ./src/App.js above the App component:
  - const urlEndpoint =
    "http://localhost:4000";
- Add the following useEffect method to App:
  - useEffect(() => {
    const fetchData = async () => {
    const apiResponse = await fetch(`${urlEndpoint}/blogs/hello-blogs`);
    const apiJSON = await apiResponse.json();
    setServerJSON(apiJSON);
    return;
    };
    fetchData();
    }, []);
- In ./src/App.js, import the <Route> component from react-router and the BlogsPage component from ./src/Pages/Blogs.
- In the JSX of App, nest a new <Route> in <Routes> with the path="/blogs" with the element={<BlogsPage message={serverJSON.message}/>}.
  ```js
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
            <Route path='/blogs' element={<BlogsPage message={serverJSON.message}/>}/>
          </Routes>
        </header>
      </div>
    );
  }

  export default App;
  ```
- In ./src/Pages/BlogsPage, display the prop variable message in the JSX of the BlogsPage component.
  ```js
  const BlogsPage = (props) => {
    return (
      <div className="blogs-page">
        <h1>Blogs Page</h1>
        <p>Server Message: {props.message}</p>
      </div>
    )
  }
  ```
- Run npm start in ./ and navigate to "localhost:3000/blogs" and if everything has been set up correctly, you should see the following on page:
  - Blogs Page
    Server Message: hello from express

## Requirements Frontend (Part 2B)

### Connect Mongo/Express to React
* In the (Client) repo:
  * Modify the useEffect method in the App component to be:
    ```js
    useEffect(() => {
    const fetchData = async () => {
      const url = `${urlEndpoint}/blogs/all-blogs`
      const apiResponse = await fetch(url);
      const apiJSON = await apiResponse.json();
      setServerJSON(apiJSON);
      return;
    };
    fetchData();
    }, []);
    ```
  * Modify the BlogsPage component to be:
     ```js
    const BlogsPage = (props) => {
      const {serverJSON: { message, success },
      } = props;
      return (
       <>
       <p>{!success && message}</p>
      {!!success && (
        <ul>
          {message.map((post, index) => {
            // console.log(post)
            return (
              <li key={`blog-${index + 1}`}>
                <p>Id#({post.id})- Author({post.author})- Title({post.title})</p>
                <p>Created At({post.createdAt})</p>
              </li>
            );
          })}
        </ul>
      )}
      </>
      )
    }
    ```
* Navigate to "localhost:3000/blogs"
  * It should display the titles of all the blogs in your database to the page.
* Stretch Goal: Display the other blog fields to the page along with title. Add css to improve the readability of the page.


### Requirements (Fullstack Frontend Part 3A)

## Add Params on frontend
* Implement the following in the Client
  * Add the following state variables to <App />
    * sortField {string} initialized to null
    * sortOrder {string} initialized to "ASC"
    * filterField {string} initialized to null
    * filterValue {string} initialized to null
    * limit {number} initialized to 10
    * page {number} initialized to 0
  * Pass these state variables as well as their setter functions as props into <BlogsPage />
  ```js
  const [serverJSON,setServerJSON] = useState({message: [], success: true})
  const [sortField,setSortField] = useState('title') //'title'
  const [sortOrder,setSortOrder] = useState('ASC')
  const [filterField,setFilterField] = useState('title')//'title'
  const [filterValue,setFilterValue] = useState('')//''
  const [limit,setLimit] = useState(10)
  //set page to instead of zero otherwise you will get BSON error
  const [page,setPage] = useState(1)

  // Route
  <Route index element={<BlogsPage sortField={sortField} sortOrder={sortOrder} filterField={filterField} 
          filterValue={filterValue} limit={limit} page={page} setSortField={setSortField} setSortOrder={setSortOrder} 
          setFilterField={setFilterField} setFilterValue={setFilterValue} setLimit={setLimit} setPage={setPage} serverJSON={serverJSON} blogSubmit={blogSubmit}/>}/>
  ```
 
  * Add the following input fields to the <BlogsPage />
    * sortField
      * Should be a <select> dropdown with the following <options>, ["title", "author", "createdAt"]
    * sortOrder 
      * Should be a <select> dropdown with the following <options>, ["ASC", "DESC"]
    * filterField 
      * Should be a <select> dropdown with the following <options>, ["title", "author"]
    * filterValue 
      * Should be a text input field
    * limit 
      * Should be a number input field
    * page 
      * Should be a number input field
    ```js
    const optionsSortF = ["title", "author", "createdAt"]
    const optionsSortO = ["ASC", "DESC"]
    const optionsfilterF = ["title", "author"]
    const BlogsPage = (props) => {
      
      const {
        serverJSON: { message, success },
      } = props;
      
      const {sortField,sortOrder,filterField,filterValue,limit,page,setSortField,setSortOrder,
      setFilterField,setFilterValue,setLimit,setPage} = props;
      return (
        <>
      <h3>Blogs</h3>
      <label>Sort Field</label>
      <select value={sortField} onChange={(e) => {
        setSortField(e.target.value)
      }}> {optionsSortF.map((ele)=>{
        return (
          <option value={ele}>{ele}</option>
        )
      })}
      </select>
      <label>Sort Order</label>
      <select value={sortOrder} onChange={(e) => {
        setSortOrder(e.target.value)
      }}> {optionsSortO.map((ele)=>{
        return (
          <option value={ele}>{ele}</option>
        )
      })}
      </select>
      <label>Filter Field</label>
      <select value={filterField} onChange={(e) => {
        setFilterField(e.target.value)
      }}> {optionsfilterF.map((ele)=>{
        return (
          <option value={ele}>{ele}</option>
        )
      })}
      </select>
      <label>Filter Value</label>
      <input placeholder="filter value" type="text" value={filterValue} onChange={(e)=> {
        const value = e.target.value
        setFilterValue(value)
      }}/>
      <label>Limit</label>
      <input type="number" value={limit} onChange={(e)=> {
        const value = e.target.value
        setLimit(Number(value))
      }}/>
      <label>Page</label>
      <input type="number" value={page} onChange={(e)=> {
        const value = e.target.value
        setPage(Number(value))
      }}/>
    ```
  * All input fields on the <BlogsPage /> should be hooked up to the state variables in <App />
  * Modify the useEffect method in the <App /> component to be:
    * useEffect(() => {
      const fetchData = async () => {
        const url = `${urlEndpoint}/blogs/all-blogs?sortField=${sortField}&sortOrder=${sortOrder}&filterField=${filterField}&filterValue=${filterValue}&limit=${limit}&page=${page}`
        const apiResponse = await fetch(url);
        const apiJSON = await apiResponse.json();
        setServerJSON(apiJSON);
        return;
      };
      fetchData();
    }, [sortField, sortOrder, filterField, filterValue, limit, page]);
  * Note: The idea here is that the input fields on the <BlogsPage /> will update the state variables in <App />. Since the useEffect hook in <App /> is watching the state variables [sortField, sortOrder, filterField, filterValue, limit, page] for changes, every time the user inputs a new value into any <BlogsPage /> input field, the useEffect will trigger. The new fetch url will be calculated with the most up to date query params and will in turn refetch the new list of blogs from the server.
## Front end POST request(part 4B)

### Create a new route 
* Implement the following in the Client
  * Create a new page <PostBlogPage />
  * Create a new route in <App /> "/post-blog" with the element as <PostBlogPage /> 
### Add POST functionality
  * Add the following function in <App />
    * const blogSubmit = async (blog) => {
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
  * Modify the "/blogs" route to be the index route of <App /> so that it shows by default at localhost:3000
    * <Route index element={<BlogsPage message={serverJSON.message} blogSubmit={blogSubmit} />} />
  * pass info as props to PostBlogPage
    ```js
    <Route path='/post-blog' element={<PostBlogPage blogSubmit={blogSubmit} />}/>
    ```
  * Implement the following in <PostBlogPage />
    * Add three new state variables:
      * title {string}
      * author {string}
      * text {string}
    * Add the following input fields:
      * title 
        * Should be a text input field
      * author 
        * Should be a text input field
      * text 
        * Should be a <textarea> field
    * Hook up all input fields to their corresponding state variables
    * Add a <button> called Submit
    * The Submit button should call props.blogSubmit(blogData) onClick and then programatically redirect to the home page.
      * const navigate = useNavigate()
      * navigate(`/`)
     * Note: blogData is going to be an object containing the current values of title, author, and text in the <PostBlogPage /> state. This data will be received by the server through the POST request, which will then in turn generate a new blog post with the added fields such as createdAt. The server will then save the new post using the mongo insert() method.
  ```js
    const PostBlogPage = (props) => {
      const[title,setTitle] = useState('')
      const[author,setAuthor] = useState('')
      const[text,setText] = useState('')
      const navigate = useNavigate()
      return (
      <>
      <h1>Post Blog Page</h1>
      <label>Title</label>
      <input type="text" value={title} onChange={(e)=> {
          const value = e.target.value
          setTitle(value)
      }}/>
      <label>Author</label>
      <input type="text" value={author} onChange={(e)=> {
          const value = e.target.value
          setAuthor(value)
      }}/>
      <label>Text</label>
      <textarea  value={text} cols="30" rows="10" placeholder='type text here' onChange={(e)=> {
          const value = e.target.value
          setText(value)
      }}></textarea>
      <button onClick={(e)=> {
          //no need of other inputs from client as server will add it.
          const newPost = {
          
              title:title,
              text:text,
              author:author,
          }
          // console.log('newPost',newPost)
          // console.log('newPost type',typeof newPost)
          
          props.blogSubmit(newPost)
          navigate('/')
          

      }}>Make Post</button>
      </>
    )
  }

  export default PostBlogPage
  ```
 

* Not Done Stretch Goal: Add a debounce in the Front-End to the text input fields
  * https://usehooks.com/useDebounce/
* Not Done Stretch Goal: Modify the mongo method for "all-blogs" so that you can do a text match search in a blog post text field for a specific string. Additionally, update the filter options dropdown on the Front-End to include the "text" option.
  * Note: This will NOT check for partial searches
  * db.articles.find( { $text: { $search: "coffee" } } )
  * https://www.mongodb.com/docs/manual/reference/operator/query/text/#examples
* Super Stretch Goal: 
  * elemMatch may be able to do a partial string match
  * https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/

## Requirements (Fullstack Part 5B - Blog Post Manager - Client)
### Create Front-end interface for admin
* Implement the following Client-Side:
  * Create a new page <BlogManager />
  * In <App /> implement the following:
    * Add a new route "/blog-manager" in <App /> with <BlogManager /> as the element
      * <Route path="/blog-manager" element={<BlogManager />}>
    * Create a new state variable adminBlogList and initialize it to an empty array
    * Create a new state variable adminBlogsLoading and initialize it to false
    * Create a new useEffect for fetching the admin blog list from "admin/blog-list"
      * useEffect(() => {
          const fetchAdminBlogList = async () => {
            const apiResponse = await fetch(`${urlEndpoint}/admin/blog-list`);
            const json = await data.json();
            setAdminBlogList(json);
            return json;
          }
          fetchAdminBlogList()
        }, [adminBlogsLoading]);
    * Add the following function for sending the blog DELETE request to backend.
      * const deleteBlog = async (blogId) => {
          setAdminBlogsLoading(true)
          const url = `${urlEndpoint}/admin/delete-blog/${blogId}`
          const response = await fetch(url, {
            method: 'DELETE'
          });
          const responseJSON = await response.json();
          setAdminBlogsLoading(false)
        }
    * Pass adminBlogList and deleteBlog and as props into <BlogManager />
  ### Create Modal for blogs.
  * Create a new component <BlogManagerCard /> in ./src/components and import it into <BlogManager />
  * In <BlogManager />, map through the props.adminBlogList array and return a <BlogManagerCard /> component for each blog, with the blog variable and props.deleteBlog passed in as a prop to <BlogManagerCard /> :
    * {props.adminBlogList.map((blog)=>{
        return (
          <BlogManagerCard blog={blog} deleteBlog={props.deleteBlog}/> 
        )
      })}
    
    ```js
    const BlogManager = (props) => {
    return (
      <ul>{props.adminBlogList.map((blog)=> {
          return (
              <li>
                  <BlogManagerCard blog={blog} deleteBlog={props.deleteBlog}/>
              </li>
          )
      })}
      </ul>
      )
    }
    ```
  * Implement the following in <BlogManagerCard />:
    * Display the blog id, title, author, createdAt, and lastModified in the <BlogManagerCard />
    * Add a button called Delete to the <BlogManagerCard /> which calls props.deleteBlog in the onClick handler with the props.blog.id passed in as the argument
      * <button onClick={()=>{
        await props.deleteBlog(props.blog.id)
      }}>Delete</button>
    ```js
    const BlogManagerCard = (props) => {
        const {blog,deleteBlog} = props
        return (
        <>
        <p>Id: {blog.id}</p>
        <p>Title: {blog.title}</p>
        <p>Created At: {blog.createdAt}</p>
        <p>Last Modified: {blog.lastModified}</p>
        <button onClick={(e)=> {
            deleteBlog(Number(blog.id))
        }}>Delete Blog</button>
        </>
      )
    }
    ```
    * Apply css to <BlogManagerCard /> so that each card has a margin between other cards as well as a simple line outline around each card.
  * Test the delete functionality implemented above to verify everything is hooked up correctly.