import React, { useCallback } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';

import { DevTool } from 'react-hook-form-devtools';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import { Background, Container, Content, AnimationContainer } from './styles';
import { useToast } from '../../hooks/ToastContext';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const methods = useForm({
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
  });

  const { register, handleSubmit, control } = methods;

  const onSubmit = useCallback(
    handleSubmit(async (data) => {
      try {
        await api.post('/users', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no GoBarber',
        });

        history.push('/');
      } catch (e) {
        addToast({
          type: 'error',
          title: 'Erro no Cadastro',
          description: 'Erro no cadastro, tente novamente',
        });
      }
    }),
    [history, addToast],
  );

  return (
    <FormContext {...methods}>
      <Container>
        <Background />

        <Content>
          <AnimationContainer>
            <img src={logoImg} alt="GoBarber" />

            <form onSubmit={onSubmit}>
              <h1>Faça seu cadastro</h1>

              <Input
                name="name"
                icon={FiUser}
                type="text"
                placeholder="Nome"
                register={register}
              />
              <Input
                name="email"
                icon={FiMail}
                type="text"
                placeholder="E-mail"
                register={register}
              />
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
                register={register}
              />

              <Button type="submit">Cadastrar</Button>

              <a href="forgot">Esqueci minha senha</a>
            </form>

            <Link to="/">
              <FiArrowLeft />
              Voltar para logon
            </Link>
          </AnimationContainer>
        </Content>
        <DevTool control={control} />
      </Container>
    </FormContext>
  );
};

export default SignUp;
