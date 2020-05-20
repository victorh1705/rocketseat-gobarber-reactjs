import React, { useCallback, useContext } from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';

import { FormContext, useForm } from 'react-hook-form';
import { DevTool } from 'react-hook-form-devtools';
import * as yup from 'yup';
import { sign } from 'crypto';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/AuthContext';

import { Background, Container, Content } from './styles';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const methods = useForm({
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
  });

  const { register, handleSubmit, control } = methods;

  const onSubmit = useCallback(
    handleSubmit((data) => {
      const { password, email } = data;
      signIn({ email, password });
    }),
    [signIn],
  );

  return (
    <FormContext {...methods}>
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
        <DevTool control={control} />
      </Container>
    </FormContext>
  );
};

export default SignIn;
