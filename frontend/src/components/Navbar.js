import { Link, useNavigate } from 'react-router-dom';
import exampleImage from '../assets/logo.png';
import {useLogout} from '../hooks/useLogout'
import {useAuthContext} from '../hooks/useAuthContext'
import logoutImage from '../assets/logout.png';

const Navbar = () => {

    const { logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate();

    const handleClick = () => {
        logout()
    }

    const handleHiClick = () => {
        navigate('/signup'); // Navigate to Signup page when "Create User" button is clicked
      };
    
    return (
        <header>
            <div className="navcontainer">
                <div className="companyLogo">
                    <img src={exampleImage} alt="Example" />
                    <Link to="/" className="link">
                        <h1>AION Cybersecurity</h1>
                    </Link>
                </div>
                <div>
                    <nav>
                        {user && user.email === 'admin@gmail.com' &&(
                            <div>
                                <span className="logedinEmail">{user.email}</span>
                                <button className="createUserBtn" onClick={handleHiClick}>Create New User</button> {/* Call handleHiClick when "Hi" button is clicked */}
                                <button className="logoutBtn" onClick={handleClick}><img src={logoutImage} alt="logoutImage" className="logoutIcon" /></button>
                            </div>
                        )}
                        {user && user.email !== 'admin@gmail.com' &&(
                            <div>
                                <span className="logedinEmail">{user.email}</span>
                                <button className="logoutBtn" onClick={handleClick}><img src={logoutImage} alt="logoutImage" className="logoutIcon" /></button>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header> 
    )
}

export default Navbar