import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa';
import '../../Navbar/navbar.css'
import Home from '../../../controllers/Home/home';


export default function NavbarLogin() {

    
    return (

        <div className='navbar'>
            
            <div >
                <Link to='/login'>
                    <FaUser className='login-icon2'/>
                    <h3 className='login-navbar2'>Login</h3>
                </Link>
            </div>

            <Home/>

        </div>

    )

}

