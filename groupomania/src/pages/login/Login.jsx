import "./login.css"
import { useState, useEffect } from 'react'

export default function Login() {
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
   

    async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:8080/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()
        console.log( data)

		if (data.userId) {
			localStorage.setItem('token', data.token)
			localStorage.setItem('userId', data.userId)
			localStorage.setItem('isAdmin', data.isAdmin)


			window.location.href = '/'
		} else {
			alert('Vérifiez votre email et/ou mot de passe')
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
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="loginInput" />
                    <input value={password}
					onChange={(e) => setPassword(e.target.value)} type ="password" placeholder="Mot de passe" className="loginInput" />
                    <button onClick={loginUser} className="loginButton"> Se connecter</button>
                    <button onClick={event => window.location.href='/signup'}className="loginRegisterButton"> Créer un compte</button>

                </div>
            </div>
        </div>
    </div>
  )
}
