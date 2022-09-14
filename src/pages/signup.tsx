import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
  Flex,
  Text,
  Input,
  Box,
  InputGroup,
  InputRightElement,
  Button,
  Icon,
} from '@chakra-ui/react';
import { BiHide } from 'react-icons/bi';
import { BiShowAlt } from 'react-icons/bi';
import styled from 'styled-components';
import React, { useState } from 'react';
import FormFooter from '../components/FormFooter';
import { useForm } from 'react-hook-form';
import * as api from '../requests/api';
import router from 'next/router';
import Swal from 'sweetalert2';
import InutWarning from '../components/InutWarning';

const Login: NextPage = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleError = (errors: any) => {
    setError(errors);
  };

  const registerOptions = {
    name: { required: 'Name is required' },
    email: { required: 'Email is required', type: 'email' },
    password: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
    },
  };
  async function handleRegistration(data: any) {
    try {
      await api.signUp(data);
      router.push('/');
    } catch (error: any) {
      Swal.fire({
        text: `${error.response.data}`,
        background: '#d66767',
        confirmButtonColor: '#a48bc4',
        color: '#fff',
      });
      setLoading(false);
    }
  }

  return (
    <Container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      gap="12px"
      bgGradient="linear(to-r,#6e1891 , #b132e4 50%,  #6e1891 200%)"
    >
      <Text
        fontSize="32px"
        fontWeight={400}
        fontFamily={'Saira Stencil One'}
        color="#f0e9e9"
      >
        My Wallet
      </Text>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        w="500px"
        gap="5px"
        className="input-box"
        as="form"
        onSubmit={handleSubmit(handleRegistration, handleError)}
      >
        <Input
          placeholder="Name"
          w="100%"
          focusBorderColor="#ffffff00"
          color="#00000090"
          variant="filled"
          fontWeight="bold"
          fontFamily="Raleway"
          fontSize="15px"
          _placeholder={{
            opacity: 0.5,
            color: 'black',
            fontWeight: 'bold',
            fontFamily: 'Raleway',
            fontSize: '15px',
          }}
          {...register('name', registerOptions.name)}
          onClick={() => setError(null)}
        />
        {error?.name && <InutWarning error={error} name="name" />}
        <Input
          placeholder="E-mail"
          w="100%"
          focusBorderColor="#ffffff00"
          color="#00000090"
          variant="filled"
          fontWeight="bold"
          fontFamily="Raleway"
          fontSize="15px"
          _placeholder={{
            opacity: 0.5,
            color: 'black',
            fontWeight: 'bold',
            fontFamily: 'Raleway',
            fontSize: '15px',
          }}
          {...register('email', registerOptions.email)}
          onClick={() => setError(null)}
        />
        {error?.email && <InutWarning error={error} name="email" />}
        <InputGroup size="md" w="100%">
          <Input
            placeholder="Password"
            focusBorderColor="#ffffff00"
            color="#00000090"
            fontWeight="bold"
            fontFamily="Raleway"
            variant="filled"
            type={show ? 'text' : 'password'}
            _placeholder={{
              opacity: 0.5,
              color: 'black',
              fontWeight: 'bold',
              fontFamily: 'Raleway',
              fontSize: '15px',
            }}
            {...register('password', registerOptions.password)}
            onClick={() => setError(null)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <Icon as={BiHide} /> : <Icon as={BiShowAlt} />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {error?.password && <InutWarning error={error} name="password" />}
        <Button
          colorScheme="whiteAlpha"
          variant="solid"
          w="300px"
          mt="5px"
          type="submit"
          isLoading={loading}
          className="button-submit"
        >
          Submit
        </Button>
        <FormFooter path="/" text="Already has an account? Log-in" />
      </Flex>
    </Container>
  );
};

export default Login;

const Container = styled(Flex)`
  .input-box {
    @media (max-width: 500px) {
      width: 300px;
    }
    @media (max-width: 300px) {
      width: 250px;
    }
  }
  .button-submit {
    @media (max-width: 300px) {
      width: 250px;
    }
  }
`;
