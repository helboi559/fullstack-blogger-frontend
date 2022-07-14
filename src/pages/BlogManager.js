import React from 'react'
import BlogManagerCard from '../components/BlogManagerCard'
import Modal from '../components/Modal'
import { useState } from 'react'

const BlogManager = (props) => {
    const {fetchSingleBlog} = props
    const [showModal,setShowModal] = useState(false)
    const [editTitle,setEditTitle] = useState('')
    const [editAuthor,setEditAuthor] = useState('')
    const [editText,setEditText] = useState('')
    const [editBlogId,setEditBlogId] = useState(null)
    const putUpdatedBlog = async () => {
        const url = `${props.urlEndpoint}/admin/edit-blog`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                blogId: editBlogId,
                title: editTitle,
                author: editAuthor,
                text:editText
            }),
        });
        const responseJSON = await response.json();
        return responseJSON
    }
    return (
    <>
        <Modal putUpdatedBlog={putUpdatedBlog} title={editTitle} onClose={() => setShowModal(false)} show={showModal}>
            <label>Title</label>
            <input value={editTitle} type="text" onChange={(e) => {
                setEditTitle(e.target.value)
            }}/>
            <label>Author</label>
            <input value={editAuthor} type="text" onChange={(e) => {
                setEditAuthor(e.target.value)
            }}/>
            <label>Text</label>
            <textarea value={editText} onChange={(e) => {
                setEditText(e.target.value)
            }}/>
        </Modal>
        < >{props.adminBlogList.map((blog)=> {
            const fetchBlogAndShow = async () => {
                const backendRes = await fetchSingleBlog(blog.id)
                const blogPost = backendRes.payload
                console.log(blogPost)
                setEditTitle(blogPost.title)
                setEditAuthor(blogPost.author)
                setEditText(blogPost.text)
                setEditBlogId(blog.id)
                setShowModal(true)
            }
            return (
                <div key={`blog-id-${blog.id}`} className={`admin-blog id-${blog.id}`}>
                    <BlogManagerCard blog={blog} deleteBlog={props.deleteBlog} fetchBlogAndShow={fetchBlogAndShow}/>
                </div>
            )
        })}
        </>
    </>
  )
}

export default BlogManager