import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';

import { Icon } from '@chakra-ui/react';

export default function TransactionButton({ text, symbol, path }: any) {
  const router = useRouter();
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      w="155px"
      h="114px"
      bgColor="#A328D6"
      borderRadius="5px"
      padding="12px"
      cursor="pointer"
      _hover={{ backgroundColor: '#9812d1' }}
      onClick={() => router.replace(path)}
    >
      <Icon as={symbol} color="white" w="25px" h="25px" />
      <Text
        fontFamily={'Raleway'}
        fontWeight="700"
        fontSize={'17px'}
        color="white"
      >
        {text}
      </Text>
    </Flex>
  );
}
