import React, { useContext, useState } from 'react'
import "./write.css"
import { Context } from '../../context/Context'
import axios from 'axios'

const Write = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const { user } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file)
            newPost.photo = filename

            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err)
            }
        }
        try {
            const res = await axios.post("/posts", newPost)
            window.location.replace("/post/"+res.data._id)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='write'>
            {file && <img
                src={URL.createObjectURL(file)}
                alt="" className="writeimg" />}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input type="file" id='fileInput'
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }} />
                    <input type="text" className="writeInput"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title' />
                </div>
                <div className="writeFormGroup">
                    <textarea className="writeInput writeText"
                        placeholder="Tell your story..."
                        type="text"
                        onChange={(e) => setDesc(e.target.value)}
                        autoFocus={true}></textarea>
                </div>
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    )
}

export default Write