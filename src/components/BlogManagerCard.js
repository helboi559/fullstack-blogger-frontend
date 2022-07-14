import React from 'react'

const BlogManagerCard = (props) => {
    const {blog,deleteBlog,fetchBlogAndShow} = props
    return (
    <>
    <p>Id: {blog.id}</p>
    <p>Title: {blog.title}</p>
    <p>Created At: {blog.createdAt}</p>
    <p>Last Modified: {blog.lastModified}</p>
    <button onClick={(e)=> {
        deleteBlog(Number(blog.id))
    }}>Delete Blog</button>
    <button onClick={(e)=> {
      fetchBlogAndShow()
    }}>Edit</button>
    </>
  )
}

export default BlogManagerCard