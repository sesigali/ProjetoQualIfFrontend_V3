import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes, FaRegPlusSquare, FaRegWindowClose, FaRegListAlt } from 'react-icons/fa';
//import { AiFillHome } from "react-icons/ai";
import '../../Navbar/navbar-style.css';
import EmpresasLista from '../../../controllers/EmpresasLista/empresasLista.js';
import HomeTeste from '../../../controllers/Home/homeTeste.js';


export default function NavbarHome() {

    const [hamburguerIcon, setHamburguerIcon] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);


    const toggleSidebar = () => {
        setHamburguerIcon(!hamburguerIcon);
        setSidebarOpen(!sidebarOpen);
    };


    return (

        <div className='navbar1'>

            <div className='navbar2'>

                {hamburguerIcon ? (
                    <FaBars className='btn-hamburguer1' onClick={toggleSidebar} title='Empresas Cadastradas' />
                ) : (

                    < FaTimes className='btn-close1' onClick={toggleSidebar} title='Fechar' />

                )}
                <div className={`sidebar1 ${sidebarOpen ? 'active' : ''}`}>

                    <EmpresasLista />

                </div>


                {/* <div>

                    <Link to='/navbarHome'>
                        <AiFillHome className='btn-home1' title='Página Principal' />
                    </Link>

                </div> */}


                <div>
                    <Link to='/cadastro'>
                        <FaRegPlusSquare className='btn-cadastro-abrir1' title='Cadastrar Empresa' />
                    </Link>

                </div>


                <div>
                    <Link to='/listaCredor'>
                        <FaRegListAlt className='btn-listaCredor' title='Lista Credor' />
                    </Link>

                </div>


                <div className='exit-container'>
                    <Link to='/'>
                        <FaRegWindowClose className='btn-exit2' title='Sair' />
                    </Link>

                </div>

            </div>

            <div className='navbar-home'>
                <HomeTeste/>
            </div>

        </div>
        

    )

}