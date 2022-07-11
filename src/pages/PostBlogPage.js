import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

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
        // const now = new(Date)
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