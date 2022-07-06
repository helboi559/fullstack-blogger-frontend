import React from 'react'

const BlogsPage = (props) => {
  // console.log(props.serverJSON)
  // const blog = props.serverJSON.map
  return (
    <>
      <h3>Blogs</h3>
      <ul>
        {props.serverJSON.map((post,index) => {
                // console.log(post)
                return (
                    <li key={`blog-${index + 1}`}>Id#({post.id})-   Author({post.author})-  Title({post.title})<br/>Created At({post.createdAt})</li>
                )
            })}
      </ul>

    </>
  )
}

export default BlogsPage