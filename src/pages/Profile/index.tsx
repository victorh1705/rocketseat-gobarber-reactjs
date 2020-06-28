import React, { ChangeEvent, useCallback } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';

import { DevTool } from 'react-hook-form-devtools';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { AvatarInput, Container, Content } from './styles';
import { useToast } from '../../hooks/ToastContext';
import { useAuth } from '../../hooks/AuthContext';

type ProfileData = {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
};

const Profile: React.FC = () => {
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const history = useHistory();

  const methods = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      old_password: null,
      password: null,
      password_confirmation: null,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      old_password: yup.string(),
      password: yup.string().when('old_password', {
        is: (val) => !!val.length,
        then: yup.string().required(),
        otherwise: yup.string,
      }),
      password_confirmation: yup
        .string()
        .when('old_password', {
          is: (val) => !!val.length,
          then: yup.string().required(),
          otherwise: yup.string,
        })
        .oneOf([yup.ref('password'), null], 'Confirmação incorreta'),
    }),
  });

  const { register, handleSubmit, control } = methods;

  const onSubmit = useCallback(
    handleSubmit(
      async ({
        name,
        email,
        old_password,
        password,
        password_confirmation,
      }) => {
        try {
          const formData = {
            name,
            email,
            ...(old_password
              ? {
                  old_password,
                  password,
                  password_confirmation,
                }
              : {}),
          };

          const response = await api.put('/profile', formData);

          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Cadastro realizado!',
            description: 'Você já pode fazer seu logon no GoBarber',
          });

          history.push('/dashboard');
        } catch (e) {
          addToast({
            type: 'error',
            title: 'Erro no Cadastro',
            description: 'Erro no cadastro, tente novamente',
          });
        }
      },
    ),
    [history, addToast],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then((response) => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado!!',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <FormContext {...methods}>
      <Container>
        <header>
          <div>
            <Link to="/dashboard">
              <FiArrowLeft />
            </Link>
          </div>
        </header>

        <Content>
          <form onSubmit={onSubmit}>
            <AvatarInput>
              <img src={user.avatar_url} alt={user.name} />

              <label htmlFor="avatar">
                <FiCamera />
                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </AvatarInput>

            <h1>Meu perfil</h1>

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
              name="old_password"
              containerStyle={{ marginTop: 24 }}
              icon={FiLock}
              type="password"
              placeholder="Senha atual"
              register={register}
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
              register={register}
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="confirmarsenha"
              register={register}
            />

            <Button type="submit">Confirmar mudanças</Button>
          </form>
        </Content>
        <DevTool control={control} />
      </Container>
    </FormContext>
  );
};

export default Profile;
