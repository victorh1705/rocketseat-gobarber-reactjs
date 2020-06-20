import React, { useCallback } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';

import { FiLock } from 'react-icons/fi';
import { DevTool } from 'react-hook-form-devtools';
import * as yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { AnimationContainer, Background, Container, Content } from './styles';
import logoImg from '../../assets/logo.svg';
import { useToast } from '../../hooks/ToastContext';
import api from '../../services/api';

const ResetPassword: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const methods = useForm({
    validationSchema: yup.object().shape({
      password: yup.string().required(),
      password_confirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    }),
  });

  const { register, handleSubmit, control } = methods;

  const onSubmit = useCallback(
    handleSubmit(async ({ password, password_confirmation }) => {
      try {
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/');
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
    [addToast, history, location.search],
  );

  return (
    <FormContext {...methods}>
      <Container>
        <Content>
          <AnimationContainer>
            <img src={logoImg} alt="GoBarber" />

            <form onSubmit={onSubmit}>
              <h1>Resete a sua senha</h1>

              <Input
                name="password"
                icon={FiLock}
                type="password"
                register={register}
                placeholder="Senha"
              />

              <Input
                name="password_confirmation"
                icon={FiLock}
                type="password"
                register={register}
                placeholder="Confirme a sua senha"
              />

              <Button type="submit">Resetar a senha</Button>
            </form>
          </AnimationContainer>
        </Content>
        <Background />
        <DevTool control={control} />
      </Container>
    </FormContext>
  );
};

export default ResetPassword;
