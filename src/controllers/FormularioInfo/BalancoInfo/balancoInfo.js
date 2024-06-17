import React, { useState } from "react";
import axios from 'axios';
import host from "../../../components/Host/host";
import IndiceInfo from "../IndiceInfo/indiceInfo";

export default function BalancoInfo({ 
    idEmpresa,
    valorEstimadoContrato,
    docRecuperacaoCertidao,
    certidaoNaturezaCertidao,
    anexoCertidao,
}) {
    const [formData, setFormData] = useState({
        balancoConfLei: '-',
        anexoBalanco: null,
        idEmpresa: '',
    });

    const [mensagem, setMensagem] = useState(null);

    const handleBalancoChange = (e) => {
        setFormData({ ...formData, balancoConfLei: e.target.value });
        if (e.target.value === 'Não') {
            alert('Você selecionou "Não" para Balanço em conformidade com a lei. Entre em contato com o pregoeiro para solicitar a documentação necessária ao licitante.');
        }
    };

    const handleAnexoChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, anexoBalanco: file });
    };

    const validarFormulario = () => {
        if (formData.balancoConfLei === '' || formData.anexoBalanco === null) {
            setMensagem('Por favor, preencha todos os campos.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        const data = {
            conformidadeLei: formData.balancoConfLei,
            balanco: formData.anexoBalanco,
            idEmpresa: idEmpresa,
        };

        try {
            const response = await enviarDadosParaBackend(data);
            setMensagem('Dados enviados com sucesso!');
            console.log('Empresa adicionada com sucesso:', response);
        } catch (error) {
            setMensagem('Erro ao enviar os dados. Por favor, tente novamente.');
            console.error('Erro ao adicionar empresa:', error);
        }
    };

    const enviarDadosParaBackend = async (data) => {
        const response = await axios.post(`${host.API_BASE_URL}/balanco/adicionar`, data);
        return response.data;
    };

    return (
        <div>
            <h1 className="title-info">Balanço Patrimonial</h1>
            <form onSubmit={handleSubmit}>
                <div className="balancoInfo">
                    {/* Validar balanço */}
                    <h3 className="sub-title">Balanço está em conformidade com a lei?</h3>
                    <label className="label-balancoInfo">
                        <input type="radio" value="Sim"
                            checked={formData.balancoConfLei === 'Sim'}
                            onChange={handleBalancoChange} />Sim
                    </label>

                    <label className="label-balancoInfo">
                        <input type="radio" value="Não"
                            checked={formData.balancoConfLei === 'Não'}
                            onChange={handleBalancoChange} />Não
                    </label>
                </div>

                <div>
                    {/* Anexar Balanço Patrimonial */}
                    <h3 className="sub-title">Anexar Balanço Patrimonial:</h3>
                    <label className="label-balancoInfo">
                        <input type="file"
                            onChange={handleAnexoChange} />
                    </label>
                </div>
                {/* {<button type="submit">Enviar</button>} */}

                <div>{mensagem && <p>{mensagem}</p>}</div>
                
                <hr />
                <IndiceInfo 
                    idEmpresa={idEmpresa}
                    valorEstimadoContrato={valorEstimadoContrato}
                    
                    docRecuperacaoCertidao={docRecuperacaoCertidao}
                    certidaoNaturezaCertidao={certidaoNaturezaCertidao}
                    anexoCertidao={anexoCertidao}

                    balancoConfLeiBalanco={formData.balancoConfLei}
                    anexoBalanco={formData.anexoBalanco}
                />
            </form>
        </div>
    )
}
