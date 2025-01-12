import React, { useState } from 'react'
import { FaBars, FaTimes, FaRegMinusSquare } from 'react-icons/fa';
import '../../Navbar/navbar-style.css';
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

        <div className='navbar1'>

            <div className='navbar2'>
                {hamburguerIcon ? (
                    <FaBars className='btn-hamburguer1' onClick={toggleSidebar} title='Empresas Cadastras' />
                ) : (

                    < FaTimes className='btn-close1' onClick={toggleSidebar} title='Fechar' />

                )}
                <div className={`sidebar1 ${sidebarOpen ? 'active' : ''}`}>

                    <EmpresasLista />

                </div>


                <div>
                    <Link to='/navbarHome'>
                        < FaRegMinusSquare className='btn-cadastro-fechar1' title='Voltar página principal' />
                    </Link>
                </div>

            </div>

        </div>

    )

}