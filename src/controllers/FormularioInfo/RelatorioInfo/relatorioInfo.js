import React, { useState, useEffect } from "react";
import '../RelatorioInfo/relatorioInfoStyle.css';
import Image from '../RelatorioInfo/img/Imagem.png'
import axios from 'axios';
import host from "../../../components/Host/host";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function RelatorioInfo() {

    const { idEmpresa } = useParams();
    const [empresa, setEmpresa] = useState({});
    const [certidao, setCertidao] = useState({});
    const [balanco, setBalanco] = useState({});
    const [indice, setIndice] = useState({});
    const [complementacao, setComplementacao] = useState({});
    const [compromisso, setCompromisso] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchEmpresa();
                await fetchCertidao();
                await fetchBalanco();
                await fetchIndice();
                await fetchComplementacao();
                await fetchCompromisso();
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData(); // Chama a função assíncrona imediatamente
    }, [idEmpresa]);

    const fetchEmpresa = async () => {
        const response = await axios.get(`${host.API_BASE_URL}/empresa/listarempresa/${idEmpresa}`);
        if (response.data !== null && Object.keys(response.data).length !== 0) {
            setEmpresa(response.data);
        } else {
            console.error('Nenhum dado encontrado para o ID da empresa:', idEmpresa);
        }
    };

    const fetchCertidao = async () => {
        const response = await axios.get(`${host.API_BASE_URL}/certidao/listarcertidoes/${idEmpresa}`);
        if (response.data !== null && Object.keys(response.data).length !== 0) {
            setCertidao(response.data);
        } else {
            console.error('Nenhuma certidão encontrada para o ID da empresa:', idEmpresa);
        }
    };

    const fetchBalanco = async () => {
        const response = await axios.get(`${host.API_BASE_URL}/balanco/listarbalancos/${idEmpresa}`);
        if (response.data !== null && Object.keys(response.data).length !== 0) {
            setBalanco(response.data);
        } else {
            console.error('Nenhum balanço encontrado para o ID da empresa:', idEmpresa);
        }
    };

    const fetchIndice = async () => {
        const response = await axios.get(`${host.API_BASE_URL}/indice/listarindices/${idEmpresa}`);
        if (response.data !== null && Object.keys(response.data).length !== 0) {
            setIndice(response.data);
        } else {
            console.error('Nenhuma Índice encontrada para o ID da empresa:', idEmpresa);
        }
    };

    const fetchComplementacao = async () => {
        const response = await axios.get(`${host.API_BASE_URL}/complementacao/listarcomplementacoes/${idEmpresa}`);
        if (response.data !== null && Object.keys(response.data).length !== 0) {
            setComplementacao(response.data);
        } else {
            console.error('Nenhuma Complementação encontrada para o ID da empresa:', idEmpresa);
        }
    };

    const fetchCompromisso = async () => {
        const response = await axios.get(`${host.API_BASE_URL}/compromisso/listarcompromissos/${idEmpresa}`);
        if (response.data !== null && Object.keys(response.data).length !== 0) {
            setCompromisso(response.data);
        } else {
            console.error('Nenhum dado encontrado para o ID da empresa:', idEmpresa);
        }
    };

    //***INDICE***//
    const resultadoLiquidezGeral = ((indice.ativoCirculante + indice.ativoReaLongoPrazo) / (indice.passivoCirculante + indice.passivoNaoCirculante));

    const resultadoSolvenciaGeral = ((indice.ativoTotal) / (indice.passivoCirculante + indice.passivoNaoCirculante));

    const resultadoliquidezCorrente = ((indice.ativoCirculante) / (indice.passivoCirculante));

    //***PATRIMONIO LIQUIDO***//
    // Calcula o requisito mínimo de 10% do valor estimado contrato
    const requisitoMinimo = (10 / 100) * ((empresa.valorEstimadoContrato));
    // Verifica se o Patrimônio Líquido atende ao requisito mínimo
    const atendeRequisitos = ((indice.patrimonioLiquido)) >= requisitoMinimo;
    // Calcula a porcentagem em relação ao valor estimado
    const porcentagemPatrimonio = ((indice.patrimonioLiquido) / empresa.valorEstimadoContrato) * (100);

    //***COMPLEMENTACAO***//
    // Calcula CCL ou CG = (ativoCirculante - passivoCirculante)
    const capitalClCg = ((indice.ativoCirculante) - (indice.passivoCirculante));
    // Calcula o requisito mínimo de 16,66% do valor estimado do contrato
    const requisitoMinimoCcl = (16.66 / 100) * ((empresa.valorEstimadoContrato));
    // Traz a porcentagem do CCL ou CG = (ativoCirculante - passivoCirculante), dividido pelo valor estimado do contrato 
    const porcentagemTotalCg = (capitalClCg / (empresa.valorEstimadoContrato)) * (100);
    // Verifica se capital Cl e Cg (ativoCirculante - passivoCirculante) atende ao requisito mínimo do valor do contrato
    const atendeRequisitosCcl = capitalClCg >= requisitoMinimoCcl;

    //***COMPROMISSOS***/
    //Traz o valor dos compromissos assumidos e divide por 12
    const umDozeAvos = ((complementacao.comprAssumidos) / 12);
    //umDozeAvos é maior que o patrimonio liquido
    const ultraPassaValor = umDozeAvos > ((indice.patrimonioLiquido));
    //valor de porcentage receita bruta menos compromissos assumidos dividido por comp. assumidos.
    const divergenciaPercentual = ((compromisso.receitaBruta - complementacao.comprAssumidos) / (compromisso.receitaBruta)) * (100)

    //TRATAMENTO VALORES NÚMERICOS PARA PONTO E VÍRGULA 
    const formatarNumero = (numero) => {
        // Verifica se o número é undefined ou null antes de chamar toLocaleString
        if (numero === undefined || numero === null) {
            return ''; // Ou qualquer valor padrão que você deseje para valores indefinidos
        }
        return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };


    // Função para formatar o CNPJ
    const formatarCnpj = (cnpj) => {
        if (cnpj && cnpj.length === 14) {
            return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        }
        return cnpj;
    };

    return (
        <div className="containerRelatorio">
            <div className="">
                <div className="relatorio">
                    <div className="relatorioInfo">
                        <img src={Image} alt="Imagem" className="imageRelatorio" />
                        <p className="tituloRelatorio">Relatório</p>
                    </div>

                    <hr className="linhahr" />

                    <div>
                        <p className="subtituloRelatorio">Empresa</p>
                        <ul className="listaRelatorio">
                            <li className="descricao">Razão Social: <span className="span">{empresa.razaoSocial}</span></li>
                            <li className="descricao">CNPJ: <span className="span">{formatarCnpj(empresa.cnpj)}</span> </li>
                            <li className="descricao">Contato da Empresa:  <span className="span">{empresa.contatoEmpresa}</span></li>
                            <li className="descricao">Número do pregão - Tipo de serviço: <span className="span">{empresa.tipoServico}</span></li>
                            <li className="descricao">Valor estimado do contrato: R$ <span className="span">{formatarNumero(empresa.valorEstimadoContrato)}</span></li>
                        </ul>
                    </div>

                    <hr className="linhahr" />

                    <div>
                        <p className="subtituloRelatorio">Certidão de Falência/Recuperação Judicial
                        </p>
                        <ul className="listaRelatorio">
                            <li className="descricao">Certidão: <span className="span">{certidao.naturezaCertidao}</span></li>
                            <li className="descricao">Empresa encaminhou documento de acolhimento judicial: <span className="span">{certidao.planoRecuperacao}</span> </li>
                        </ul>
                    </div>

                    <hr className="linhahr" />

                    <div>
                        <p className="subtituloRelatorio">Balanço Patrimonial
                        </p>
                        <ul className="listaRelatorio">
                            <li className="descricao">Balanço está em conformidade com a lei: <span className="span">{balanco.conformidadeLei}</span></li>
                        </ul>
                    </div>

                    <hr className="linhahr" />

                    <div>
                        <p className="subtituloRelatorio">Índices Financeiros
                        </p>
                        <ul className="listaRelatorio">
                            <li className="descricao">Ativo Circulante: <span className="span">{formatarNumero(indice.ativoCirculante)}</span></li>
                            <li className="descricao">Ativo Realizável a Longo Prazo: <span className="span"> {formatarNumero(indice.ativoReaLongoPrazo)}</span></li>
                            <li className="descricao">Ativo Total: <span className="span"> {formatarNumero(indice.ativoTotal)}</span></li>
                            <li className="descricao">Passivo Circulante: <span className="span"> {formatarNumero(indice.passivoCirculante)}</span></li>
                            <li className="descricao">Passivo Não Circulante: <span className="span"> {formatarNumero(indice.passivoNaoCirculante)}</span></li>
                            <li className="descricao">Patrimônio Líquido: <span className="span"> {formatarNumero(indice.patrimonioLiquido)}</span></li>
                        </ul>

                        <ul className="listaRelatorio">
                            <li className="descricao">Liquidez Geral: <span className={` ${resultadoLiquidezGeral < 1 ? 'vermelho' : 'azul'}`}>{resultadoLiquidezGeral.toFixed(2)}</span></li>

                            <li className="descricao">Solvência Geral: <span className={` ${resultadoSolvenciaGeral < 1 ? 'vermelho' : 'azul'}`}>{resultadoSolvenciaGeral.toFixed(2)}</span></li>

                            <li className="descricao">Liquidez Corrente: <span className={` ${resultadoliquidezCorrente < 1 ? 'vermelho' : 'azul'}`}>{resultadoliquidezCorrente.toFixed(2)}</span></li>
                        </ul>
                    </div>

                    <hr className="linhahr" />

                    <div>
                        <p className="subtituloRelatorio">Patrimônio Líquido (PL)
                        </p>
                        <p>Comprovação de patrimônio líquido de 10% (dez por cento) do valor total estimado da contratação ou do item pertinente.</p>
                        <ul className="listaRelatorio">
                            <li className="descricao">Valor Estimado do Contrato: <span className="span">{formatarNumero(empresa.valorEstimadoContrato)}</span></li>
                            <li className="descricao">Patrimônio Líquido: <span className="span">{formatarNumero(indice.patrimonioLiquido)}</span></li>
                        </ul>

                        <h2 className="h2">Resultados</h2>
                        <ul className="listaRelatorio">
                            <li className="descricao">Requisito Mínimo de 10% do PL: <span className="span">{formatarNumero(requisitoMinimo)}</span></li>
                            <li className="descricao">Atende ao Requisito: <span className={atendeRequisitos ? "azul" : "vermelho"}>{atendeRequisitos ? "Sim" : "Não"}</span></li>
                            <li className="descricao">Taxa da Empresa: <span className="span">{porcentagemPatrimonio.toFixed(2)}% </span></li>
                        </ul>
                    </div>

                    <hr className="linhahr" />

                    <div>
                        <p className="subtituloRelatorio">Complementação da Qualificação Econômico-Financeira
                        </p>
                        <p>Comprovação de possuir Capital Circulante Líquido (CCL) ou Capital de Giro (Ativo Circulante - Passivo Circulante) de, no  mínimo, 16,66% (dezesseis inteiros e sessenta e seis centésimos por cento) do valor estimado do contrato.</p>
                        <ul className="listaRelatorio">
                            <li className="descricao">Capital Circulante Líquido (CCL) ou Capital de Giro: <span className="span">{formatarNumero(capitalClCg)}</span></li>
                            <li className="descricao">Valor Estimado do Contrato: <span className="span">{formatarNumero(empresa.valorEstimadoContrato)}</span></li>
                        </ul>

                        <h2 className="h2">Resultados</h2>
                        <ul className="listaRelatorio">
                            <li className="descricao">Requisito mínimo CCL 16,66% do valor estimado: <span className="span">{formatarNumero(requisitoMinimoCcl)}</span></li>
                            <li className="descricao">Total de Capital de Giro estimado sobre o valor da contratação: <span className="span">{porcentagemTotalCg.toFixed(2)}%</span></li>
                            <li className="descricao">Atende aos Requisitos: <span className={atendeRequisitosCcl ? "azul" : "vermelho"}>{atendeRequisitosCcl ? "Sim" : "Não"}</span></li>
                        </ul>

                        <p>A Declaração de Compromissos Assumidos deve informar que 1/12 (um doze avos) dos contratos firmados pela licitante não é superior ao Patrimônio Líquido da licitante.</p>
                        <ul className="listaRelatorio">
                            <li className="descricao">Compromissos Assumidos: <span className="span">{formatarNumero(complementacao.comprAssumidos)}</span></li>
                            <li className="descricao">1/12 dos Compromissos Assumidos: <span className="span">{formatarNumero(umDozeAvos)}</span></li>
                            <li className="descricao">Patrimonial Líquido: <span className="span">{formatarNumero(indice.patrimonioLiquido)}</span></li>
                            <li className="descricao">1/12 do valor dos compromissos assumidos ultrapassa o Patrimonial Líquido: <span className={ultraPassaValor ? "vermelho" : "azul"}>{ultraPassaValor ? "Sim, ultrapassa o PL " : "Não, ultrapassa o PL"}</span></li>
                        </ul>
                    </div>

                    <hr className="linhahr" />

                    <div>
                        <p className="subtituloRelatorio">Compromissos Assumidos
                        </p>
                        <p>Caso a diferença entre a receita bruta discriminada na Demonstração do Resultado do Exercício (DRE) e a declaração apresentada seja maior que 10% (dez por cento) positivo ou negativo em relação à receita bruta, o licitante deverá apresentar justificativas.</p>
                        <ul className="listaRelatorio">
                            <li className="descricao">Receita Bruta: <span className="span">{formatarNumero(compromisso.receitaBruta)}</span></li>
                            <li className="descricao">Compromissos Assumidos: <span className="span">{formatarNumero(complementacao.comprAssumidos)}</span></li>
                            <li className="descricao">Divergência Percentual: <span className="span">{divergenciaPercentual.toFixed(2)}%</span></li>
                            {/* VERIFICAR */}
                            <li className="descricao">Empresa encaminhou justificativa para Receita Bruta superior ou inferior a 10%: <span className={compromisso.justificativa === "Sim" ? "azul" : "vermelho"}>{compromisso.justificativa}</span></li>
                        </ul>
                    </div>

                    <br></br>
                    <button className="print btn-relatorioInfo" onClick={() => window.print()}>
                        Imprimir
                    </button>

                    <Link to='/home'>
                        <button className="print btn-relatorioInfo">Voltar página inicial</button>
                    </Link>

                </div>

            </div>

        </div>

    )
}
