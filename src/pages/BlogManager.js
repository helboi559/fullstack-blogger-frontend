import React from 'react'
import BlogManagerCard from '../components/BlogManagerCard'

const BlogManager = (props) => {
    return (
    <ul >{props.adminBlogList.map((blog)=> {
        return (
            <li key={`blog-id-${blog.id}`} className={`admin-blog id-${blog.id}`}>
                <BlogManagerCard blog={blog} deleteBlog={props.deleteBlog}/>
            </li>
        )
    })}
    </ul>
  )
}

export default BlogManager