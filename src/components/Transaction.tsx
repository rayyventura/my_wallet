import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export default function Transaction({ title, button }: any) {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="100%"
      h="100vh"
      padding="12px"
      bgGradient="linear(to-r,#6e1891 , #8C11BE 50%,  #6e1891 200%)"
      gap="12px"
      as="form"
    >
      <Text
        mb="5pxpx"
        fontFamily="Raleway"
        fontWeight="700"
        fontSize="26px"
        color="white"
      >
        {title}
      </Text>

      <InputGroup w="90%">
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          // eslint-disable-next-line react/no-children-prop
          children="$"
        />
        <Input
          placeholder="Ammount"
          focusBorderColor="white"
          color="#00000090"
          variant="filled"
          fontWeight="bold"
          fontFamily="Raleway"
          fontSize="15px"
          type="number"
          required
          _placeholder={{
            opacity: 0.5,
            color: 'black',
            fontWeight: 'bold',
            fontFamily: 'Raleway',
            fontSize: '15px',
          }}
        />
      </InputGroup>
      <InputGroup w="90%">
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          // eslint-disable-next-line react/no-children-prop
          children=""
        />
        <Input
          placeholder="Description"
          focusBorderColor="white"
          color="#00000090"
          variant="filled"
          fontWeight="bold"
          fontFamily="Raleway"
          fontSize="15px"
          required
          _placeholder={{
            paddingLeft: 10,
            opacity: 0.5,
            color: 'black',
            fontWeight: 'bold',
            fontFamily: 'Raleway',
            fontSize: '15px',
          }}
        />
      </InputGroup>
      <Button
        colorScheme="whiteAlpha"
        variant="solid"
        w="300px"
        mt="15px"
        type="submit"
      >
        {button}
      </Button>
    </Flex>
  );
}
