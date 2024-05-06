import React, {useState} from 'react'
import Input from "../../components/Input/input"
import Button from "../../components/Button/button"
import '../Login/loginRegisterUser.css'

export default function RecoverUser() {

    const [resetEmail, setResetEmail] = useState('');
    const [errorReset, setErrorReset] = useState('');
    const [resetSucess, setResetSucess] = useState(false);
    const [showResetSenha, setShowResetSenha] = useState(false);

    const handleResetSenha = () => {

        if (!resetEmail) {
            setErrorReset('Por favor, forneça um e-mail.');
            return;
        }

        if (resetEmail === 'email@email.com') {
            setErrorReset('E-mail já cadastrado');
            return;

        }
        setResetSucess(true);

    };

    return (
        <div>

            <label >
                {!showResetSenha && (

                    <span onClick={() => setShowResetSenha(true)} className='span-resetSenha'>Esqueceu sua senha?</span>

                )}
                {showResetSenha && !resetSucess && (

                    <div className='content-resetSenha'>
                        <p className='title1'>ESQUECEU SUA SENHA</p>

                        <Input
                            type="email"
                            placeholder="Digite seu E-mail para recuperar a senha"
                            value={resetEmail}
                            onChange={(e) => [setResetEmail(e.target.value), setErrorReset("")]}
                        />

                        <label className="label-erro">{errorReset}</label>

                        <Button Text="Recuperar Senha" onClick={handleResetSenha} />

                        <span onClick={() => setShowResetSenha(false)} className='span-cancelar'>Cancelar</span>

                    </div>
                )}
                {resetSucess && (
                    <p>E-mail de recuperação de senha enviado com sucesso!</p>
                )}

            </label>

        </div>
    )
}
