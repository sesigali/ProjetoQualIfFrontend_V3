import React, { useState } from 'react';
import NavbarCadastro from '../../components/Navbar/navbar-cadastro/navbar-cadastro';
import Footer from '../../components/Footer/footer';
import './cadastro.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MaskInput from '../../components/MaskInput/maskInput';

export default function Cadastro() {

    const [formData, setFormData] = useState({
        razaoSocial: '',
        //cnpj: '',
        contatoEmpresa: '',
        tipoServico: '',
        valorEstimadoContrato: '',
    });

    const[cnpj, setCnpj] = useState('');

    function handleChange(e){
        setCnpj(e.target.value);
      }

    const RequisicaoCadastroEmpresa = (empresa) => {
        return axios.post('http://localhost:8888/empresa/adicionar', empresa)
            .then((response) => {
                if (response.status === 200) {
                    return response.data; // Retorna a nova empresa criada
                }
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    };

    const handleCadastroEmpresa = (event) => {
        event.preventDefault();

        const empresa = {
            razaoSocial: formData.razaoSocial,
            //cnpj: formData.cnpj,
            cnpj: cnpj,
            contatoEmpresa: formData.contatoEmpresa,
            tipoServico: formData.tipoServico,
            valorEstimadoContrato: formData.valorEstimadoContrato,
        };

    
        RequisicaoCadastroEmpresa(empresa)
            .then((novaEmpresa) => {
                // Redireciona o usuário para a página empresaInfo após o cadastro
                window.location.href = '/empresaInfo';
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <NavbarCadastro />
            <Footer />
            <main>
                <div className='background'>
                    <div className='form-container'>
                        <form className='form' onSubmit={handleCadastroEmpresa}>
                            <h1 className='title'>Cadastro da Empresa</h1>
                            <input
                                className='input'
                                type="text"
                                placeholder="Razão social"
                                required
                                value={formData.razaoSocial}
                                onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
                            />

                            {/* <input
                                className='input'
                                type="string"
                                placeholder="CNPJ"
                                required
                                value={formData.cnpj}
                                onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                            /> */}

                            <MaskInput 
                                name="cnpj"
                                mask="99.999.999/9999-99"
                                value={cnpj}
                                onChange={handleChange}
                                placeholder="CNPJ"
                                required
                            />

                            <input
                                className='input'
                                type="text"
                                placeholder="Contato da empresa: Digite seu E-mail"
                                required
                                value={formData.contatoEmpresa}
                                onChange={(e) => setFormData({ ...formData, contatoEmpresa: e.target.value })}
                            />
                            <input
                                className='input'
                                type="text"
                                placeholder="Número do pregão - Tipo de serviço "
                                required
                                value={formData.tipoServico}
                                onChange={(e) => setFormData({ ...formData, tipoServico: e.target.value })}
                            />
                            <input
                                className='input'
                                type="string"
                                placeholder="Valor estimado do contrato"
                                required
                                value={formData.valorEstimadoContrato}
                                onChange={(e) => setFormData({ ...formData, valorEstimadoContrato: e.target.value })}
                            />
                            <div className='button-container'>
                                <button className='button-submit' type='submit' >
                                    Cadastrar
                                </button>

                                <Link to='/home'>
                                    <button className='button-cancelar'>Cancelar</button>
                                </Link>

                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}