import "./publish.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";

export default function Publish() {
  return (
    <div className="publish">
        <div className="publishCovering">
            <div className="publishTop">
                <img className="publishProfileImg" src="/assets/photoprofil/profil1.webp" alt="" />
                <input placeholder="Exprimez-vous" className="publishInput" />
            </div>
            <hr className="publishHr" />
            <div className="publishBottom">
              <div className="publishOptions">
                <div className="publishOption">
                <FontAwesomeIcon icon = {faImage} className="publishIcon"/>
                 <span className="publishOptionText">Ajouter une photo</span>
                </div>
              </div>
              <button className="publishButton">Publier</button>
            </div>
        </div>
    </div>
  );
}
