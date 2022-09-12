import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { BiExit } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { signOut } from '../requests/api';
import { useAppContext } from '../contexts/state';

export default function Header({ title }: any) {
  const router = useRouter();
  const { auth } = useAppContext();

  async function signout() {
    signOut(auth);
    localStorage.removeItem('auth');
    router.replace('/');
  }

  return (
    <Flex justifyContent="space-between" p="5px" w="90%" pt="9px">
      <Text fontFamily="Raleway" fontWeight="700" color="white" fontSize="26px">
        {' '}
        {title}{' '}
      </Text>
      <Icon
        as={BiExit}
        color="white"
        fontSize="26px"
        cursor="pointer"
        onClick={() => {
          signout();
        }}
      />
    </Flex>
  );
}
