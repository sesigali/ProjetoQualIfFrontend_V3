import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/footer';
import "./StyleListaCredor.css";
import { FaRegMinusSquare } from 'react-icons/fa';


export default function listaCredor() {



  return (
    <div className='container-lista'>

      <div>
        <Link to='/navbarHome'>
          < FaRegMinusSquare className='btn-lista-fechar' title='Voltar página principal' />
        </Link>
      </div>

      <div className=''>

        <h3 className='lista1'>Lista Credor</h3>

      </div>

      <Footer />

    </div>
  )
}
