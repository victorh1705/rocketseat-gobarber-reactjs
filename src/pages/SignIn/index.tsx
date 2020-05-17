import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { useForm } from 'react-hook-form';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <form onSubmit={onSubmit}>
          <h1>Faça seu logon</h1>

          <Input
            name="email"
            icon={FiMail}
            type="text"
            register={register}
            placeholder="E-mail"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            register={register}
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </form>

        <a href="create-user">
          <FiLogIn />
          Criar Conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
