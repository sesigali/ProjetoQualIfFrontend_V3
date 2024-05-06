import React, { useState } from 'react'
import Input from "../../components/Input/input"
import Button from "../../components/Button/button"
import '../Login/loginRegisterUser.css'
import { useNavigate, Link } from 'react-router-dom'
import { FaRegWindowClose } from 'react-icons/fa';
import RecoverUser from './recoverUser'

export default function LoginUser() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {

    if (!email || !senha) {
      setError('Por favor, forneça um e-mail e uma senha');
      return;
    }

    if (email === 'email@email.com' && senha === '123') {
      navigate('/Home');


    } else {
      setError('E-mail ou senha incorretos.')
    }

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
            placeholder="Digite seu E-mail:(email@email.com)"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />

          <Input
            type="senha"
            placeholder="Digite sua Senha:(123)"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />

          <label className="label-erro">{error}</label>

          <Button Text="Entrar" onClick={handleLogin} />

          <label className="label-registrar">
            <span className="span-registrar1">Não tem uma conta?</span>
            <Link to='/register' className='span-registrar2'>
              <span >&nbsp;Registre-se</span>
            </Link>
          </label>

        </div>

        <RecoverUser />

      </div>

    </div>

  )
}
