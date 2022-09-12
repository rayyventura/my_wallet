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

const Login: NextPage = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const handleClick = () => setShow(!show);
  const { signin } = useAppContext();
  const auth = typeof window !== 'undefined' && localStorage.getItem('auth');
  const router = useRouter();

  useMemo(() => {
    if (auth) {
      typeof window !== 'undefined' && router.push('/register');
    }
  }, []);

  function handleChange({ name, value }: { name: string; value: string }) {
    setFormData({ ...formData, [name]: value });
  }
  async function handleSubmit(e: any) {
    try {
      e.preventDefault();
      const token = await api.signIn(formData);
      signin(token);
      router.push('/register');
    } catch (error: any) {
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
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="E-mail"
          name="email"
          w="100%"
          focusBorderColor="white"
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
          onChange={(e) =>
            handleChange({ name: e.target.name, value: e.target.value })
          }
        />
        <InputGroup size="md" w="100%">
          <Input
            placeholder="Password"
            name="password"
            focusBorderColor="white"
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
            onChange={(e) =>
              handleChange({ name: e.target.name, value: e.target.value })
            }
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <Icon as={BiHide} /> : <Icon as={BiShowAlt} />}
            </Button>
          </InputRightElement>
        </InputGroup>
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
`;
