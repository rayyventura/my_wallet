import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import TransactionButton from '../components/TransactionButton';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { BiMinusCircle } from 'react-icons/bi';
import { useAppContext } from '../contexts/state';
import { useRouter } from 'next/router';
import { signOut } from '../requests/api';

export default function Register() {
  const [registerStatus, setRegisterStatus] = useState<string>();
  const { auth, setAuth } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    setRegisterStatus('filled');
    if (!auth) {
      setAuth(null);
      router.replace('/');
    }
  }, []);

  return (
    <Container
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      width="100%"
      height="100vh"
      bgGradient="linear(to-r,#6e1891 , #b132e4 50%,  #6e1891 200%)"
    >
      {auth && <Header title={`Hi, ${auth.userName}`} />}
      <Flex
        backgroundColor="white"
        w="90%"
        borderRadius="5px"
        className={registerStatus}
        p="12px"
        h="500px"
      >
        <Text> Ola </Text>
      </Flex>
      <Flex gap="5px" mt="16px">
        <TransactionButton
          text="New income"
          symbol={IoMdAddCircleOutline}
          path="/income"
        />
        <TransactionButton
          text="New withdraw"
          symbol={BiMinusCircle}
          path="/withdraw"
        />
      </Flex>
    </Container>
  );
}

const Container = styled(Flex)`
  .empty {
    justify-content: center;
    align-items: center;
  }
  .filled {
    justify-content: center;
    align-items: center;
    color: #868686;
  }
`;
