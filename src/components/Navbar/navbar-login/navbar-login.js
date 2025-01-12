import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa';
import '../../Navbar/navbar-style.css';
import { useEffect, useState } from 'react';
import HomeTeste from '../../../controllers/Home/homeTeste';

export default function NavbarLogin() {
    const [position, setPosition] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setPosition(true);
            } else {
                setPosition(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (

        <div className={`navbar1 ${position ? 'sticky' : ''}`}>

            <div className='navbar2'>
                <Link to='/login'>
                    <FaUser className='login-icon1' />
                    <h3 className='login-navbar1'>Login</h3>
                </Link>
            </div>

            <div className='navbar-home'>

                <HomeTeste />

            </div>



        </div>

    )

}

