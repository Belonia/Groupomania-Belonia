import "./signup.css"
import { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
// import Login from "../src/pages/login/Login";



export default function SignUp() {
    const navigate = useNavigate()
	const [name, setName] = useState('')
	const [lastName, setlastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isAdmin, setisAdmin] = useState('')


	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:8080/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
                lastName,
				email,
				password,
                isAdmin,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			navigate('/')
            alert("Inscription réussie!")
		}
	}
  return (
    <div className="login">
        <div className="loginCovering">
            <div className="loginLeft">
                <h3 className="loginLogo">Groupomania</h3>
                <span className="loginDescription">Echangez avec vos collègues sur Groupomania</span>
                </div>
            <div className="loginRight">
                <div className="loginBox">
                    <input value={lastName}
					onChange={(e) => setlastName(e.target.value)} placeholder="Nom"className="loginInput" />
                    <input value={name}
					onChange={(e) => setName(e.target.value)} placeholder="Prénom"className="loginInput" />
                    <input  value={email}
					onChange={(e) => setEmail(e.target.value)}placeholder="Email" className="loginInput" />
                    <input value={password}
					onChange={(e) => setPassword(e.target.value)} type = "password" placeholder="Mot de passe" className="loginInput" />
                    <button onClick={registerUser} className="loginButton"> S'inscrire</button>
                    <button onClick={event => window.location.href='/login'} className="loginRegisterButton"> Vous avez déjà un compte</button>

                </div>
            </div>
        </div>
    </div>
  )
}
