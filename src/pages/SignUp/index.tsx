import React from 'react';
import { FormContext, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';

import { DevTool } from 'react-hook-form-devtools';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Background, Container, Content } from './styles';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const methods = useForm({
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
  });
  const { register, handleSubmit, control, errors } = methods;
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormContext {...methods}>
      <Container>
        <Background />

        <Content>
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

          <a href="create-user">
            <FiArrowLeft />
            Voltar para logon
          </a>
        </Content>
        <DevTool control={control} />
      </Container>
    </FormContext>
  );
};

export default SignUp;
