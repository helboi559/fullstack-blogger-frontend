import React from "react";


// const sortField = ["title", "author", "createdAt"]
// const sortOrder = ["ASC", "DESC"]
// const filterField = ["title", "author"]
// const filterValue = "text"
// const page = "text"
// const limit = 1
const optionsSortF = ["title", "author", "createdAt"]
// const optionsSortF = [{sortField:["title", "author", "createdAt"]}]
const optionsSortO = ["ASC", "DESC"]
const optionsfilterF = ["title", "author"]
// const filterValue = "text"
// const page = "text"
// const limit = 1
const BlogsPage = (props) => {
  
  const {
    serverJSON: { message, success },
  } = props;
  
  const {sortField,sortOrder,filterField,filterValue,limit,page,setSortField,setSortOrder,
  setFilterField,setFilterValue,setLimit,setPage} = props;
  return (
    <>
      <h3>Blogs</h3>
      <select value={sortField} onChange={(e) => {
        setSortField(e.target.value)
      }}> {optionsSortF.map((ele)=>{
        return (
          <option value={ele}>{ele}</option>
        )
      })}
      </select>
      <select value={sortOrder} onChange={(e) => {
        setSortOrder(e.target.value)
      }}> {optionsSortO.map((ele)=>{
        return (
          <option value={ele}>{ele}</option>
        )
      })}
      </select>
      <select value={filterField} onChange={(e) => {
        setFilterField(e.target.value)
      }}> {optionsfilterF.map((ele)=>{
        return (
          <option value={ele}>{ele}</option>
        )
      })}
      </select>
      <input type="text" value={filterValue} onChange={(e)=> {
        const value = e.target.value
        setFilterValue(value)
      }}/>
      <input type="number" value={limit} onChange={(e)=> {
        const value = e.target.value
        setLimit(Number(value))
      }}/>
      <input type="number" value={page} onChange={(e)=> {
        const value = e.target.value
        setPage(Number(value))
      }}/>
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
  );
};

export default BlogsPage;