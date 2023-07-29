import React, { useContext, useEffect, useState } from 'react'
import "./singlePost.css"
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import { Context } from '../../context/Context';

const SinglePost = () => {
    const PF = "http://localhost:5000/images/";
    const location = useLocation();
    const path = (location.pathname.split("/")[2])
    const [post, setPost] = useState({})
    const { user } = useContext(Context)
    const [updateMode, setUpdateMode] = useState(false)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get("/posts/" + path)
            setTitle(res.data.title)
            setPost(res.data)
            setDesc(res.data.desc)
        }
        fetchPost();
    }, [path])

    const handleDelete = async () => {
        try {
            await axios.delete("/posts/" + post._id, { data: { username: user.username } })
            window.location.replace("/")
        } catch (err) {
            console.log(err)
        }
    }
    const handleUpdate = async () => {
        try {
          await axios.put(`/posts/${post._id}`, {
            username: user.username,
            title,
            desc,
          });
          setUpdateMode(false)
        } catch (err) {}
      };
    
    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo && <img
                    className="singlePostImg"
                    src={PF + post.photo}
                    alt=""
                />}
                <div className='text'>

                    {updateMode ?
                        (<input type='text'
                            className='singlePostTitleInput'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title} />)
                        :
                        (<h1 className="singlePostTitle">
                            {title}
                            {post.username === user.username &&
                                (<div className="singlePostEdit">
                                    <i className="singlePostIcon far fa-edit"
                                        onClick={() => setUpdateMode(true)}></i>
                                    <i className="singlePostIcon far fa-trash-alt"
                                        onClick={handleDelete}></i>
                                </div>)}
                        </h1>)}
                    <div className="singlePostInfo">
                        <span>
                            Author:
                            <b className="singlePostAuthor">
                                <Link to={`/?user=${post.username}`} className='link'>
                                    {post.username}
                                </Link>
                            </b>
                        </span>
                        <span>{new Date(post.createdAt).toDateString()}</span>
                    </div>
                    {updateMode ?
                        (<textarea
                            className="singlePostDescInput"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        >

                        </textarea>)
                        :
                        (<p className="singlePostDesc">
                            {desc}
                        </p>)}
                    {updateMode && <button className='singlePostUpdate' onClick={handleUpdate}>Update</button>}
                </div>
            </div>
        </div>
    )
}

export default SinglePost