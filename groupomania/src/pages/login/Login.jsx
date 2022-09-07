import "./login.css"

export default function Login() {
  return (
    <div className="login">
        <div className="loginCovering">
            <div className="loginLeft">
                <h3 className="loginLogo">Groupomania</h3>
                <span className="loginDescription">Echangez avec vos collègues sur Groupomania</span>
                </div>
            <div className="loginRight">
                <div className="loginBox">
                    <input placeholder="Email" className="loginInput" />
                    <input placeholder="Mot de passe" className="loginInput" />
                    <button className="loginButton"> Se connecter</button>
                    <button className="loginRegisterButton"> Créer un compte</button>

                </div>
            </div>
        </div>
    </div>
  )
}
