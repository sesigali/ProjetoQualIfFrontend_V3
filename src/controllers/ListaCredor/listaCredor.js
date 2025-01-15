import React from 'react';
//import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/footer';
import "./StyleListaCredor.css";
import NavbarCadastro from '../../components/Navbar/navbar-cadastro/navbar-cadastro';

export default function listaCredor() {

  return (
    <div className='container-lista1'>

      <NavbarCadastro />

      <div className="container-lista2">

        <div className='lista1'>

          <iframe className='video-lista'
            width="360"
            height="200"
            src="https://www.youtube.com/embed/DD3amWHThKk?si=aWNvh0A1XmRaF1h7" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
          </iframe>

          <label className='label-lista'>
            <input className='input-lista' type="text" placeholder="Excel.xlsx" />
            <button className="button-lista-buscar">Buscar</button>
          </label>

          <button className='button-lista-conf'>Configurar Lista</button>

        </div>


      </div>

      <Footer />

    </div>
  )
}
