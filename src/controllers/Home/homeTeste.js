import React from "react";
import Footer from "../../components/Footer/footer";
import './homeTeste.css';
import Image from "./Imagem3.png";

export default function HomeTeste() {
  return (
    <div className="content1">
      <div className="email-template-container">
        {/* Cabeçalho - Título grande */}
        <div className="text1"><br/><br/><br/><br/>
          <img src={Image} alt="Imagem" className="image1" />
        </div>
        <div className="header">
          <h1>Você preparado e por dentro de tudo!</h1>
        </div>

        {/* Seção principal de conteúdo */}
        <div className="content-section">
          <p>
            Descubra como o Sistema QualIF pode revolucionar a gestão de processos financeiros e
            licitatórios com seus módulos de Análise Econômico-Financeira e Lista de Credores.
            Com uma curadoria exclusiva, o QualIF oferece ferramentas poderosas para otimizar suas
            operações e garantir conformidade com as exigências legais.
          </p><br/>

          <p><strong>Módulo de Análise Econômico-Financeira</strong></p>
          <p>
            O módulo de Análise Econômico-Financeira do QualIF foi desenvolvido
            para simplificar e automatizar a avaliação da capacidade financeira de empresas em
            processos licitatórios. Com ele, você pode:
          </p>
          <ul>
            <li>Cadastrar empresas e tipos de serviços de forma rápida e eficiente.</li>
            <li>Anexar certidões negativas de falência, recuperação judicial ou extrajudicial.</li>
            <li>Calcular índices financeiros como Liquidez Geral, Solvência Geral e Liquidez Corrente.</li>
            <li>Comprovar patrimônio líquido e capital circulante líquido.</li>
            <li>Gerar relatórios detalhados para análise e tomada de decisão.</li>
          </ul>
          <p>
            Assista ao vídeo e veja como o módulo funciona na prática:
          </p>
        </div>

        {/* Seção de vídeo */}
        <div className="video-section">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/pGykxhx6DsE?si=ZR5keIsKars40zip"
            title="YouTube Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="content-section">
          <p><strong>Módulo de Lista de Credores</strong></p>
          <p>
            O módulo de Lista de Credores do QualIF automatiza a leitura,
            formatação e exibição de dados financeiros provenientes de planilhas
            Excel, preparando informações para uso no comando ATULC do SIAFI.
            Com ele, você pode:
          </p>
          <ul>
            <li>Processar planilhas com dados de CPF, banco, agência, conta bancária e valores.</li>
            <li>Formatar automaticamente os dados de acordo com as regras do SIAFI.</li>
            <li>Exibir credores em blocos de sete, com espaçamento específico para facilitar a cópia e colagem.</li>
            <li>Copiar dados formatados para a área de transferência com um único clique.</li>
          </ul>
          <p>
            Assista ao vídeo e veja como o módulo funciona na prática:
          </p>
        </div>

        {/* Seção de vídeo */}
        <div className="video-section">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/biLS3js1d1c?si=HbAHjicgofPfOjQu"
            title="YouTube Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="content-section">
          <h1><strong>Por que escolher o QualIF?</strong></h1>
          <ul>
            <li>Automatização completa: Elimine processos manuais e reduza erros.</li>
            <li>Conformidade garantida: Atenda às exigências legais e regulamentares.</li>
            <li>Eficiência operacional: Agilize processos e economize tempo.</li>
            <li>Relatórios detalhados: Tenha visibilidade completa sobre a situação financeira das empresas.</li>
          </ul>
        </div>

        <div className="content-section">
          <h1><strong>Fique por dentro das novidades!</strong></h1>
          <p>
            Acompanhe nossos canais e fique atualizado sobre as últimas
            funcionalidades e melhorias do Sistema QualIF. Não perca a
            oportunidade de otimizar seus processos financeiros e licitatórios
            com as ferramentas mais avançadas do mercado.
          </p>
        </div>

        {/* Rodapé */}
        <div className="footer-section">
          <p><strong>Contato:</strong><br />E-mail: qualif.contato@gmail.com<br />Site: www.qualif.com.br</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
