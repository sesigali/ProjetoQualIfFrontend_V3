import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes, FaRegPlusSquare, FaRegWindowClose } from 'react-icons/fa';
import { AiFillHome } from "react-icons/ai";
import '../../Navbar/navbar.css'
import EmpresasLista from '../../../controllers/EmpresasLista/empresasLista';
import Home from '../../../controllers/Home/home';


export default function Navbar() {

    const [hamburguerIcon, setHamburguerIcon] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);


    const toggleSidebar = () => {
        setHamburguerIcon(!hamburguerIcon);
        setSidebarOpen(!sidebarOpen);
    };


    return (

        <div className='navbar'>

            <div>
                <Link to='/'>
                    <FaRegWindowClose className='btn-exit' title='Sair' />
                </Link>

            </div>

            <div>

                {hamburguerIcon ? (
                    <FaBars className='btn-hamburguer' onClick={toggleSidebar} title='Empresas Cadastradas' />
                ) : (

                    < FaTimes className='btn-close' onClick={toggleSidebar} title='Fechar' />

                )}
                <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>

                    <EmpresasLista />

                </div>

            </div>

            <div>

                <div>

                    <Link to='/home'>
                        <AiFillHome className='btn-home' title='Página Principal' />
                    </Link>

                </div>

                <div>
                    <Link to='/cadastro'>
                        <FaRegPlusSquare className='btn-cadastro-abrir' title='Cadastrar Empresa' />
                    </Link>

                </div>

                <Home />

            </div>

        </div>

    )

}

