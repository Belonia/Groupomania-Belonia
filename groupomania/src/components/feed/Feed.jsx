import "./feed.css"
import Publish from "../publish/Publish"
import Post from "../post/Post"
import { useState, useEffect } from 'react'


export default function Feed() {
  const [posts, setPosts] = useState({})
  useEffect(() => {
    fetch(`http://localhost:8080/api/posts`,{
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    })
         .then((response) => response.json()
         .then(postsData => console.log(postsData))
         .catch((error) => console.log(error))
     )
 }, [])
  return (
    <div className="feed"> 
        <div className="feedCovering">
        <Publish/>
        <Post/>
        </div>
    </div>
  )
}
