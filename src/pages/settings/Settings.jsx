import axios from "axios"
import Sidebar from "../../components/sidebar/Sidebar"
import { Context } from "../../context/Context"
import "./settings.css"

import React, { useContext, useState } from 'react'

const Settings = () => {
    const PF = "http://localhost:5000/images/";
    const { user, dispatch } = useContext(Context)
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" })
        const updateUser = {
            userId: user._id,
            username,
            email,
            password
        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file);
            updateUser.profilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err)
            }
        }
        try {
           const res= await axios.put("/users/" + user._id, updateUser)
            dispatch({ type: "UPDATE_SUCCESS", payload:res.data })
            setSuccess(true)
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE"})
        }
    }
    console.log(user._id)
    return (
        <div className="seetings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsTitleUpdate">Update Your Account</span>
                    <span className="settingsTitleDelete">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : PF+user.profilePic}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>{" "}
                        </label>
                        <input onChange={(e) => setFile(e.target.files[0])}
                            id="fileInput"
                            type="file"
                            style={{ display: "none" }}
                            className="settingsPPInput"
                        />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} name="name"
                        onChange={(e) => setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder={user.email} name="email"
                        onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" placeholder="Password" name="password"
                        onChange={(e) => setPassword(e.target.value)} />
                    <button className="settingsSubmitButton" type="submit">
                        Update
                    </button>
                    {success && <span style={{ marginTop: "20px", textAlign: "center", color: "green" }}>Profile has been updated successfully....</span>}
                </form>
            </div>
            <Sidebar />
        </div>

    )
}

export default Settings