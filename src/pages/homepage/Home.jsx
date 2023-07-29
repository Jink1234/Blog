import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import "./home.css"
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from "axios"
import { useLocation } from 'react-router-dom'

const Home = () => {

  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search)
      setPosts(res.data);
    }
    fetchPosts();
  }, [search])
  return (
    <div >
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </div>
  )
}

export default Home