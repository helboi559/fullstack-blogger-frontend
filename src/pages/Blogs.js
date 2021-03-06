import React from "react";



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