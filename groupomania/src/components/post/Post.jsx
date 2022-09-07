import "./post.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";

export default function Post() {
  return (
    <div className="post">
        <div className="postCovering">
            <div className="postTop">
            <div className="postTopLeft">
                <img  className="postProfileImage" src="/assets/photoprofil/profil1.webp" alt="" />
                <span className="postUserName"> Izaac Powell</span>
                <span className="postDate"> Il y a 10 minutes</span>
            </div>
            <div className="postRight"></div>
            <FontAwesomeIcon icon = {faEllipsisVertical} className="searchIcon"/>
            </div>

            <div className="postCenter">
                <span className="postTxt"> Jolie vue !</span>
                <img className="postImage" src="/assets/post/post1.jpeg" alt="" />
            </div>
            <div className="postBottom">
            <div className="postBottomLeft">
                <img className="likeIcon" src="/assets/heart.png" alt="" />
                <span className="postNumberOfLikes">10</span>
            </div>
            <div className="postBottomRight">
                <span className="postCommentsTxt"> 3 commentaires</span>
            </div>

            </div>

        </div>
    </div>
  )
}
