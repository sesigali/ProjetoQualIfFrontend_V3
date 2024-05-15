import React, { useEffect, useState } from "react";
import Footer from "../../../components/Footer/footer";
import CertidaoInfo from "../CertidaoInfo/certidaoInfo";
import axios from "axios";
import "../style/formStyle.css";
import "./empresaInfo.css"
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

export default function EmpresaInfo() {
    const [ultimoCadastro, setUltimoCadastro] = useState({
        idEmpresa: '',
        razaoSocial: '',
        cnpj: '',
        contatoEmpresa: '',
        tipoServico: '',
        valorEstimadoContrato: '',
    });

    useEffect(() => {
        async function fetchUltimoCadastro() {
            try {
                const response = await axios.get('http://localhost:8888/empresa/ultimoCadastro');
                const data = response.data;

                if (data) {

                    // Formatando o CNPJ
                    const cnpjFormatted = formatarCnpj(data.cnpj);
                    data.cnpj = cnpjFormatted;

                    setUltimoCadastro(data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchUltimoCadastro();
    }, []);

    // Função para formatar o CNPJ
    const formatarCnpj = (cnpj) => {
        return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    };

    return (
        <div className="container">

            <div>
                <Link to='/Home'>
                    <AiFillHome className="link-icon" title="Página Principal" />

                </Link>
            </div>

            <Footer />
            <div className="container-form">
                <h1 className="title-info">Empresa</h1>
                {/* <p>ID: {ultimoCadastro.idEmpresa}</p> */}
                <p>Razão Social: {ultimoCadastro.razaoSocial}</p>
                <p>CNPJ: {ultimoCadastro.cnpj}</p>
                <p>Contato da empresa: {ultimoCadastro.contatoEmpresa}</p>
                <p>Número do pregão - Tipo de Serviço: {ultimoCadastro.tipoServico}</p>
                {/**Não pode por .toFixed(2) no final do valor estimado contrato q da PAUUUUU*/}
                <p>Valor estimado do Contrato: R$ {ultimoCadastro.valorEstimadoContrato.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <hr />
                <CertidaoInfo
                    idEmpresa={ultimoCadastro.idEmpresa}
                    valorEstimadoContrato={ultimoCadastro.valorEstimadoContrato}
                />
                <hr />
            </div>
        </div>
    );
}


