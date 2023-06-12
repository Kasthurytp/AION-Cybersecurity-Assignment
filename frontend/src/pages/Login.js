import { useState } from 'react'
import {useLogin} from '../hooks/useLogin'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import exampleImage from '../assets/private-key-generator.gif';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="loginContainer">
            <Navbar />
            <form className="login" onSubmit={handleSubmit}>
                <h3 className="loginTitle">Log in</h3>

                 <img className="keyGif" src={exampleImage} alt="Example" /><br></br>

                <label>Email: </label>
                <input className="loginEmail" type="email" onChange={(e) => setEmail(e.target.value)} value= {email}/>

                <label>Password</label>
                <input className="loginPassword" type="password" onChange={(e) => setPassword(e.target.value)} value= {password}/>
            
                <button className="loginBtn" disabled={isLoading}>Log in</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Login