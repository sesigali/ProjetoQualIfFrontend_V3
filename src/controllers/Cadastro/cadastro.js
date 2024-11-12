import React, { useState, useEffect } from 'react';
import NavbarCadastro from '../../components/Navbar/navbar-cadastro/navbar-cadastro';
import Footer from '../../components/Footer/footer';
import './cadastro.css';
import axios from 'axios';
import host from '../../components/Host/host';
import { Link } from 'react-router-dom';
import MaskInput from '../../components/MaskInput/maskInput';
import { NumericFormat } from 'react-number-format';

export default function Cadastro() {
    // Recupera o idUsuario do localStorage
    const idUsuario = localStorage.getItem('idUsuario') || ''; // Obter idUsuario do localStorage ou definir como ''

    const [formData, setFormData] = useState({
        razaoSocial: '',
        cnpj: '',
        contatoEmpresa: '',
        tipoServico: '',
        valorEstimadoContrato: '',
        idUsuario: idUsuario,
    });

    useEffect(() => {
        if (idUsuario) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                idUsuario: idUsuario,
            }));
        }
    }, [idUsuario]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleValueChange = (values) => {
        const { value } = values;
        setFormData((prevFormData) => ({
            ...prevFormData,
            valorEstimadoContrato: value
        }));
    };

    const RequisicaoCadastroEmpresa = (empresa) => {
        return axios.post(`${host.API_BASE_URL}/empresa/adicionar`, empresa)
            .then((response) => {
                if (response.status === 201) {
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

        console.log("Dados enviados para o backend:", formData); // Adicione este console.log

        RequisicaoCadastroEmpresa(formData)
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
                                name="razaoSocial"
                                placeholder="Razão social"
                                required
                                value={formData.razaoSocial}
                                onChange={handleChange}
                            />

                            <MaskInput
                                name="cnpj"
                                mask="99.999.999/9999-99"
                                value={formData.cnpj}
                                onChange={handleChange}
                                placeholder="CNPJ"
                                required
                            />

                            <input
                                className='input'
                                type="text"
                                name="contatoEmpresa"
                                placeholder="Contato da empresa: Digite seu E-mail"
                                required
                                value={formData.contatoEmpresa}
                                onChange={handleChange}
                            />
                            <input
                                className='input'
                                type="text"
                                name="tipoServico"
                                placeholder="Número do pregão - Tipo de serviço"
                                required
                                value={formData.tipoServico}
                                onChange={handleChange}
                            />

                            <NumericFormat
                                className='input'
                                type="text"
                                name="valorEstimadoContrato"
                                placeholder="Valor estimado do contrato"
                                required
                                value={formData.valorEstimadoContrato}
                                onValueChange={handleValueChange}
                                allowNegative={false}
                                decimalScale={2}
                                decimalSeparator=','
                                thousandSeparator='.'
                                prefix='R$ '
                                fixedDecimalScale={true}
                            />
  
                            <div className='button-container'>
                                <button className='button-submit' type='submit'>
                                    Cadastrar
                                </button>

                                <Link to='/home'>
                                    <button className='button-cancelar' type="button">
                                        Cancelar
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
