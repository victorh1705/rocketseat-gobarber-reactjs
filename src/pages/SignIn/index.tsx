import React, { useCallback } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { DevTool } from 'react-hook-form-devtools';
import * as yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/AuthContext';

import { Background, Container, Content, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.svg';
import { useToast } from '../../hooks/ToastContext';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const methods = useForm({
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
  });

  const { register, handleSubmit, control } = methods;

  const onSubmit = useCallback(
    handleSubmit(async ({ email, password }) => {
      try {
        await signIn({ email, password });
        history.push('/dashboard');
      } catch (e) {
        if (e instanceof yup.ValidationError) {
          console.error(e);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login',
        });
      }
    }),
    [signIn, addToast, history],
  );

  return (
    <FormContext {...methods}>
      <Container>
        <Content>
          <AnimationContainer>
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

              <Link to="/forgot-password">Esqueci minha senha</Link>
            </form>

            <Link to="/signUp">
              <FiLogIn />
              Criar Conta
            </Link>
          </AnimationContainer>
        </Content>
        <Background />
        <DevTool control={control} />
      </Container>
    </FormContext>
  );
};

export default SignIn;
