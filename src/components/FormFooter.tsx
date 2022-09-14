import React from 'react';
//import { Link } from '@chakra-ui/react';
import Link from 'next/link';
import { Text } from '@chakra-ui/react';

export default function FormFooter({ path, text }: any) {
  return (
    <Text
      mt="20px"
      color="white"
      fontFamily="Raleway"
      fontWeight="700"
      fontSize="15px"
      textAlign="center"
      _hover={{ color: '#c9defa' }}
    >
      <Link href={path}>{text}</Link>
    </Text>
  );
}
