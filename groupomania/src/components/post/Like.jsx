import React from 'react'
import "./post.css"
import { useState, useEffect } from 'react'




export default function Like({id, item}) {
    // const [usersLiked, setUsersLiked] = useState(false);
    // const [userId, setUserId] = useState(false);
    // const [data,setData] = useState([])


    //   fetch('http://localhost:8080/api/posts/:id/like', {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         _id:id,
    //     })
    // }).then(res=>res.json()) 
    // .then(result=>{
    //     const newData =data.map(item => {
    //         if (item.id == result.id){
    //             return result
    //         }else {
    //             return item
    //         }
    //     })
    //     setData(newData)
    // }).catch(err=>{
    //     console.log(err)
    // })
    
  return (
  
    <div className="postBottomLeft">
    <img className="likeIcon" src="/assets/heart.png" alt="like" />
    <span className="postNumberOfLikes">1</span>
</div>
  )
}
