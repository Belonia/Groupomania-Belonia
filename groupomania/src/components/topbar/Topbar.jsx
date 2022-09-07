import "./topbar.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";


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
        <span className="topbarLink">Déconnexion</span>
      </div>
      
      <img src="/assets/photoprofil/profil1.webp" alt="" className="topbarImage" />
    </div>


    </div>
  )
}
