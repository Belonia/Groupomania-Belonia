import "./feed.css"
import Publish from "../publish/Publish"
import Post from "../post/Post"
export default function Feed() {
  return (
    <div className="feed"> 
        <div className="feedCovering">
        <Publish/>
        <Post/>
        </div>
    </div>
  )
}
