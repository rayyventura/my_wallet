import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import router from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAppContext } from '../contexts/state';
import * as api from '../requests/api';
import InutWarning from './InutWarning';

export default function Transaction({ title, button, type }: any) {
  const [error, setError] = useState<any>(null);
  const { auth } = useAppContext();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleError = (errors: any) => {
    setError(errors);
  };

  const registerOptions = {
    ammount: { required: 'Ammount is required', type: 'number' },
    description: {
      required: 'description is required',
      type: 'text',
    },
  };
  async function handleRegistration(data: any) {
    try {
      const res = await api.transaction(
        {
          type: type,
          ammount: Number(data.ammount) * 100,
          description: data.description,
        },
        auth.token
      );
      setValue('ammount', '');
      setValue('description', '');
      Swal.fire({
        text: `${res.message}`,
        background: '#10d378',
        confirmButtonColor: '#af50d4',
        color: '#fff',
      });
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
    }
  }
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
      onSubmit={handleSubmit(handleRegistration, handleError)}
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
          {...register('ammount', registerOptions.ammount)}
        />
      </InputGroup>
      {error?.ammount && <InutWarning error={error} name="ammount" />}
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
          {...register('description', registerOptions.description)}
        />
      </InputGroup>
      {error?.description && <InutWarning error={error} name="description" />}
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
