import Footer from "../../components/Footer/footer";
import './home.css'; 
import Image from "./Imagem.png"; 

export default function Home() {

   
    return (
        <div>
            
            <div className="content">
                <div className="text">
                <img src={Image} alt="Imagem" className="image" />
                    <p>
                    Bem-vindo ao QualiF, o sistema de Qualificação Econômico-Financeira que simplifica e agiliza o processo de avaliação de licitantes. O QualiF é uma solução completa e eficiente que permite aos analistas de licitações cadastrar empresas, analisar documentos econômico-financeiros, e verificar a conformidade com os requisitos de licitação. Com uma interface intuitiva e ferramentas poderosas, o QualiF automatiza o cálculo de índices financeiros e a análise de balanços patrimoniais. 
                    Além disso, o sistema oferece suporte à declaração de compromissos assumidos, garantindo transparência e conformidade. 
                    O QualiF é a escolha ideal para agilizar e otimizar o processo de qualificação econômico-financeira em licitações públicas e privadas, economizando tempo e recursos.
                    </p>
                </div>
                <div className="video">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/video_id"
                        title="Vídeo Qualif"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}
