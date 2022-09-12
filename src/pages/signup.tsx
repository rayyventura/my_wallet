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

const Login: NextPage = () => {
  const [show, setShow] = React.useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleClick = () => setShow(!show);

  function handleChange({ name, value }: { name: string; value: string }) {
    setFormData({ ...formData, [name]: [value] });
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(formData);
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
          placeholder="Name"
          name="name"
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
          colorScheme="whiteAlpha"
          variant="solid"
          w="300px"
          mt="5px"
          type="submit"
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
  }
`;
