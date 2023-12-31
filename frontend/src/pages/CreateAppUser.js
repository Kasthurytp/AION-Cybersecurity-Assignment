import { useState } from 'react'
import { useSignup } from "../hooks/useSignup"
import Navbar from '../components/Navbar'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <div className="signupContainer">
            <Navbar />
            <form className="signup" onSubmit={handleSubmit}>
                <h3 className="signupTitle">Create New User</h3>

                <label>Email: </label>
                <input className="signupEmail" type="email" onChange={(e) => setEmail(e.target.value)} value= {email}/>

                <label>Password</label>
                <input className="signupPassword" type="password" onChange={(e) => setPassword(e.target.value)} value= {password}/>
            
                <button className="signupBtn" disabled={isLoading}>Create User</button>

                {error && <div className="error">{error}</div>}
            
            </form>
        </div>
    )
}

export default Signup