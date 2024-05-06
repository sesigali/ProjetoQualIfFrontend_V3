import React, { useState } from "react";
import axios from 'axios';
import BalancoInfo from "../BalancoInfo/balancoInfo";

export default function CertidaoInfo({
    idEmpresa,
    valorEstimadoContrato
}) {
    const [formData, setFormData] = useState({
        certidao: '',
        docRecuperacao: 'N/A',
        anexoCertidao: '',
        idEmpresa: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        //console.log('Estado Atual do Formulário CERTIDAO1:', formData);
    };

    const handleAnexoChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, anexoCertidao: file });
        //console.log('Estado Atual do Formulário CERTIDAO2:', formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { certidao, docRecuperacao, anexoCertidao } = formData;

        if (docRecuperacao === 'não') {
            alert('Você selecionou "Não" para recuperação judicial. Entre em contato com o pregoeiro para solicitar a documentação pendente.');
            return;
        }

        if (!anexoCertidao) {
            alert('Você não anexou a Certidão.');
            return;
        }

        const data = {
            certidaoFalencia: anexoCertidao,
            naturezaCertidao: certidao,
            planoRecuperacao: docRecuperacao,
            idEmpresa: idEmpresa,
        };

        // Enviar dados para o backend
        enviarDadosParaBackend(data);
    }

    const enviarDadosParaBackend = (data) => {
        axios.post('http://localhost:8888/certidao/adicionar', data) 
            .then((response) => {
                if (response.status === 200) {
                    return response.data; 
                }
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    return (
        <div>
            <h1 className="title-info">Certidão de Falência/Recuperação Judicial</h1>
            <form onSubmit={handleSubmit}>
                {/* Validar certidão */}
                <h3 className="sub-title">Certidão é ?</h3>
                <label className="label-certidaoInfo">
                    <input
                        type="radio"
                        name="certidao"
                        value="positiva"
                        checked={formData.certidao === 'positiva'}
                        onChange={handleInputChange}
                    />Positiva
                </label>

                <label className="label-certidaoInfo">
                    <input
                        type="radio"
                        name="certidao"
                        value="negativa"
                        checked={formData.certidao === 'negativa'}
                        onChange={handleInputChange}
                    />Negativa
                </label>

                {formData.certidao === 'positiva' && (
                    <div>
                        {/* Doc de recuperação judicial */}
                        <h3 className="sub-title">Empresa encaminhou documento de acolhimento  judicial?</h3>
                        <label className="label-certidaoInfo">
                            <input
                                type="radio"
                                name="docRecuperacao"
                                value="sim"
                                checked={formData.docRecuperacao === 'sim'}
                                onChange={handleInputChange}
                            />Sim
                           { /**SE SIM ANEXAR O COMPRAVANTE, SOMENTE PARA OS CASOS DE RECURAÇÃO JUDICIAL*/}
                        </label>

                        <label className="label-certidaoInfo">
                            <input
                                type="radio"
                                name="docRecuperacao"
                                value="não"
                                checked={formData.docRecuperacao === 'não'}
                                onChange={handleInputChange}
                            />Não
                        </label>
                    </div>
                    
                )}

                {(formData.certidao === 'negativa' || formData.docRecuperacao === 'sim' || formData.docRecuperacao === 'não') && (
                    <div>
                        {/* Anexar Documento de Recuperação Judicial */}
                        <h3 className="sub-title">Anexar Certidão Negativa:</h3>
                        <label className="label-certidaoInfo">
                            <input type="file" onChange={handleAnexoChange} />
                        </label>
                    </div>
                )}
                {/* {<button type="submit">Enviar</button>} */}
               
                <hr />
                <BalancoInfo 
                    idEmpresa={idEmpresa}
                    valorEstimadoContrato={valorEstimadoContrato}
                    docRecuperacaoCertidao={formData.docRecuperacao}
                    certidaoNaturezaCertidao={formData.certidao}
                    anexoCertidao={formData.anexoCertidao}
                />
            </form>
        </div>
    )
}