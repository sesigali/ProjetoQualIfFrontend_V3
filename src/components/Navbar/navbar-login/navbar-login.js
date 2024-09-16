import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa';
import '../../Navbar/navbar.css'
import Home from '../../../controllers/Home/home';
import { useEffect, useState } from 'react';

export default function NavbarLogin() {
    const [position, setPosition] = useState(false);

    useEffect(()=> {
        const handleScroll = () => {
            if (window.scrollY > 100) { 
                setPosition(true);
              } else {
                setPosition(false);
              }
        };

        window.addEventListener('scroll',handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },[]);

    
    return (

        <div className={`navbar ${position ? 'sticky' : ''}`}>
            
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

