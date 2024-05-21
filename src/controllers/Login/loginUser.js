import React, { useState } from 'react';
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import '../Login/loginRegisterUser.css';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegWindowClose } from 'react-icons/fa';
import RecoverUser from './recoverUser';
import axios from 'axios';

export default function LoginUser() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8888/usuario/login', {
        email: email,
        senha: senha,
      });

      if (response.status === 200) {
        const userData = response.data;
        // Redirecionar o usuário para a página inicial ou dashboard
        navigate('/Home');
        console.log('Login successful', userData);
      }
    } catch (error) {
      console.error('Error during login', error);
      setError('E-mail ou senha incorretos. Por favor, tente novamente.');
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
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />

          <Input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />

          <label className="label-erro">{error}</label>

          <Button Text="Entrar" onClick={handleLogin} />

          <label className="label-registrar">
            <span className="span-registrar1">Não tem uma conta?</span>
            <Link to='/register' className='span-registrar2'>
              <span>&nbsp;Registre-se</span>
            </Link>
          </label>
        </div>

        <RecoverUser />
      </div>
    </div>
  );
}