import React, { useCallback, useState } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import { FiLogIn, FiMail } from 'react-icons/fi';
import { DevTool } from 'react-hook-form-devtools';
import * as yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Background, Container, Content, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.svg';
import { useToast } from '../../hooks/ToastContext';
import api from '../../services/api';

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();
  const history = useHistory();

  const methods = useForm({
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
    }),
  });

  const { register, handleSubmit, control } = methods;

  const onSubmit = useCallback(
    handleSubmit(async ({ email }) => {
      try {
        setLoading(true);
        await api.post('/password/forgot-password', { email });

        addToast({
          type: 'success',
          title: 'E-mail de recuperção enviado',
          description: 'Enviamos um e-mail para a recupereção de senha',
        });
      } catch (e) {
        if (e instanceof yup.ValidationError) {
          console.error(e);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na recuperação de Senha',
          description: 'Ocorreu um erro ao recuperar senha',
        });
      } finally {
        setLoading(false);
      }
    }),
    [addToast, history, api],
  );

  return (
    <FormContext {...methods}>
      <Container>
        <Content>
          <AnimationContainer>
            <img src={logoImg} alt="GoBarber" />

            <form onSubmit={onSubmit}>
              <h1>Esqueci a senha</h1>

              <Input
                name="email"
                icon={FiMail}
                type="text"
                register={register}
                placeholder="E-mail"
              />

              <Button type="submit" loading={loading}>
                Recuperar
              </Button>
            </form>

            <Link to="/">
              <FiLogIn />
              Voltar ao login
            </Link>
          </AnimationContainer>
        </Content>
        <Background />
        <DevTool control={control} />
      </Container>
    </FormContext>
  );
};

export default ForgotPassword;
