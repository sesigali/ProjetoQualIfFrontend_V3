import React, { useState } from 'react'
import { FaBars, FaTimes, FaRegMinusSquare } from 'react-icons/fa';
//import { AiFillHome } from "react-icons/ai";
import '../../Navbar/navbar.css'
import { Link } from 'react-router-dom';
import EmpresasLista from '../../../controllers/EmpresasLista/empresasLista';

export default function NavbarCadastro() {

    const [hamburguerIcon, setHamburguerIcon] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setHamburguerIcon(!hamburguerIcon);
        setSidebarOpen(!sidebarOpen);
    };


    return (

        <div className='navbar'>

            <div>
                {hamburguerIcon ? (
                    <FaBars className='btn-hamburguer' onClick={toggleSidebar} title='Empresas Cadastras' />
                ) : (

                    < FaTimes className='btn-close' onClick={toggleSidebar} title='Fechar' />

                )}
                <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>

                    <EmpresasLista/>

                </div>

            </div>

            {/* <div>
                <Link to='/home'>
                    <AiFillHome className='btn-home' title='Voltar página principal'  />
                </Link>
            </div> */}

            <div>
                <Link to='/home'>
                    < FaRegMinusSquare className='btn-cadastro-fechar' title='Voltar página principal' />
                </Link>
            </div>

        </div>

    )

}