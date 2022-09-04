import "./topbar.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faUser, faMessage,faBell} from "@fortawesome/free-solid-svg-icons";


export default function Topbar() {
  return (
    <div className="topbarContainer">
    <div className="topbarLeft">
    <span className="logo">Groupomania</span>
    </div>
    <div className="topbarCenter">
    <div className="searchbar">
      <FontAwesomeIcon icon = {faMagnifyingGlass} className="searchIcon"/>
      <input placeholder="Rechercher" className="searchInput" />
    </div>
    </div>
    <div className="topbarRight">
      <div className="topbarLinks">
        <span className="topbarLink">Accueil</span>
        
      </div>
      <div className="topbarIcons">
        <div className="topbarIconItem">
        <FontAwesomeIcon icon = {faUser}/>
        <span className="topbarIconMark">1</span>
        </div>
        <div className="topbarIconItem">
        <FontAwesomeIcon icon = {faMessage}/>
        <span className="topbarIconMark">2</span>
        </div>
        <div className="topbarIconItem">
        <FontAwesomeIcon icon = {faBell}/>
        <span className="topbarIconMark">4</span>
        </div>
      </div>
      <img src="/assets/photoprofil/profil1.webp" alt="" className="topbarImage" />
    </div>


    </div>
  )
}
