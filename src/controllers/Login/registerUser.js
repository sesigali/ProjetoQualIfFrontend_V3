import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button/button';
import Input from '../../components/Input/input';
import './loginRegisterUser.css'
import { FaRegWindowClose } from 'react-icons/fa';


export default function RegisterUser() {
    const [email, setEmail] = useState('');
    const [emailConf, setEmailConf] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConf, setSenhaConf] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //****PRECISO DECLARAR UMA VARIAVEL PARA TRAZER O HOOKS CRIADO ****/
    // const {registar} = useAutenticacao();

    const handleRegister = () => {

        if (!email || !emailConf || !senha || !senhaConf) {
            setError('Preencha todos os campos');
            return;

        } else if (email !== emailConf) {
            setError("Os e-mails não são iguais");
            return;
        } else if (senha !== senhaConf) {
            setError("Senhas não são iguais");
            return;
        }

        //****SE ESTIVER TUDO CERTO SENHA E EMAIL, IRÁ REGISTAR OS DADOS DO LOGIN****
        // const resp = registrar(email, senha);

        //****SE TIVER ALGUM ERRO AO FAZER O REGISTRO, RETORNA O ERRO ****
        // if(resp){
        //     setError(resp);
        //     return;
        // }


        alert("Usuário Cadastrado com sucesso!");
        navigate("/Home")

    };


    return (
        <div>
            <Link to='/'>
                <FaRegWindowClose className='btn-exit1' title='Voltar página principal' />

            </Link>

            <div className="container-login">

                <div className="content-login">

                    <label className="label-login">SISTEMA DE LOGIN</label>
                    
                    <Input
                        type="email"
                        placeholder="Digite seu E-mail"
                        value={email}
                        onChange={(e) => [setEmail(e.target.value), setError("")]}
                    />
                    <Input
                        type="email"
                        placeholder="Confirme seu E-mail"
                        value={emailConf}
                        onChange={(e) => [setEmailConf(e.target.value), setError("")]}
                    />

                    <Input
                        type="senha"
                        placeholder="Digite sua Senha"
                        value={senha}
                        onChange={(e) => [setSenha(e.target.value), setError("")]}
                    />
                    <Input
                        type="senha"
                        placeholder="Confirme sua Senha"
                        value={senhaConf}
                        onChange={(e) => [setSenhaConf(e.target.value), setError("")]}
                    />

                    <label className="label-erro">{error}</label>

                    <Button Text="Inscrever-se" onClick={handleRegister} />

                    <label className="label-registrar">
                        <span className="span-registrar1">Já tem uma conta?</span>
                        <Link to='/login' className="span-registrar2" >
                            <span >&nbsp;Entre</span>
                        </Link>
                    </label>


                </div>

            </div>

        </div>
    )
}