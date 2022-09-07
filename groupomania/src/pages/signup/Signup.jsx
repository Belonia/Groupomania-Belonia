import "./signup.css"

export default function SignUp() {
  return (
    <div className="login">
        <div className="loginCovering">
            <div className="loginLeft">
                <h3 className="loginLogo">Groupomania</h3>
                <span className="loginDescription">Echangez avec vos collègues sur Groupomania</span>
                </div>
            <div className="loginRight">
                <div className="loginBox">
                    <input placeholder="Nom"className="loginInput" />
                    <input placeholder="Prénom"className="loginInput" />
                    <input placeholder="Email" className="loginInput" />
                    <input placeholder="Mot de passe" className="loginInput" />
                    <button className="loginButton"> S'inscrire</button>
                    <button className="loginRegisterButton"> Vous avez déjà un compte</button>

                </div>
            </div>
        </div>
    </div>
  )
}
