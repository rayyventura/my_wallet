import type { NextPage } from 'next';
import { BiHide } from 'react-icons/bi';
import { BiShowAlt } from 'react-icons/bi';
import { Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import {
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import styled from 'styled-components';
import React, { useMemo, useState } from 'react';
import FormFooter from '../components/FormFooter';
import * as api from '../requests/api';
import { useAppContext } from '../contexts/state';
import { ThreeDots } from 'react-loader-spinner';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import InutWarning from '../components/InutWarning';

const Login: NextPage = () => {
  const { signin } = useAppContext();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => setShow(!show);
  const auth = typeof window !== 'undefined' && localStorage.getItem('auth');
  const router = useRouter();

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
    email: { required: 'Email is required', type: 'email' },
    password: {
      required: 'Password is required',
    },
  };

  useMemo(() => {
    if (auth) {
      typeof window !== 'undefined' && router.push('/register');
    }
  }, []);

  async function handleRegistration(data: any) {
    try {
      const token = await api.signIn(data);

      await signin(token);
      router.push('/register');
    } catch (error: any) {
      if (error.response.status === 500) {
        Swal.fire({
          text: 'Login failed. Try again!',
          background: '#d66767',
          confirmButtonColor: '#a48bc4',
          color: '#fff',
        });
      } else {
        Swal.fire({
          text: `${error.response.data}`,
          background: '#d66767',
          confirmButtonColor: '#a48bc4',
          color: '#fff',
        });
      }
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
          isLoading={loading}
          spinner={<ThreeDots height={13} width={200} color="white" />}
          colorScheme="whiteAlpha"
          variant="solid"
          w="300px"
          mt="5px"
          type="submit"
        >
          Submit
        </Button>
        <FormFooter
          path="/signup"
          text="Still don't have an account? Sign-up"
        />
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
  }

  .error {
    color: red;
  }
`;
