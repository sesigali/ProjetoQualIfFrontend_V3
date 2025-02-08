import Footer from "../../components/Footer/footer";
import './homeTeste.css';
import Image from "./Imagem3.png";
export default function HomeTeste() {


    return (
        <div className="content1">

            <div className="content2">
                <div className="text1">
                    <img src={Image} alt="Imagem" className="image1" />
                    <p className="text2">
                        Bem-vindo ao Qualif, o sistema de Qualificação Econômico-Financeira que simplifica e agiliza o processo de avaliação de licitantes. O Qualif é uma solução completa e eficiente que permite aos analistas de licitações cadastrar empresas, analisar documentos econômico-financeiros, e verificar a conformidade com os requisitos de licitação. Com uma interface intuitiva e ferramentas poderosas, o Qualif automatiza o cálculo de índices financeiros e a análise de balanços patrimoniais.
                        Além disso, o sistema oferece suporte à declaração de compromissos assumidos, garantindo transparência e conformidade.
                        O Qualif é a escolha ideal para agilizar e otimizar o processo de qualificação econômico-financeira em licitações públicas e privadas, economizando tempo e recursos.
                    </p>
                </div>
                <div className="video1">
                    <iframe 
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/pGykxhx6DsE?si=Aujnt3GOsztbYgLE" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
                    </iframe>
                </div>
            </div>
            <Footer />
        </div>
    );
}