import React from 'react'
import "./Modal.css"

const Modal = (props) => {
    if(!props.show) {
        return <></>
    }
    return (
    <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
                <h4 className="modal-title">{props.title}</h4>
            </div>
            <div className="modal-body">{props.children}</div>
            <div className="modal-footer">
                <button className="button" onClick={props.onClose}>Close</button>
                <button onClick={() => {
                    props.putUpdatedBlog()
                }}>Update Blog</button>
            </div>
        </div>
    </div>
  )
}

export default Modal