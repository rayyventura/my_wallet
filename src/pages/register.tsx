import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import TransactionButton from '../components/TransactionButton';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { BiMinusCircle } from 'react-icons/bi';
import { useAppContext } from '../contexts/state';
import { useRouter } from 'next/router';
import { Transaction } from '@prisma/client';
import * as api from '../requests/api';
import Entries from '../components/Entries';

export default function Register() {
  const [registerStatus, setRegisterStatus] = useState<string>();
  const { auth, setAuth } = useAppContext();
  const [transactions, setTransaction] = useState<Transaction[]>();

  const router = useRouter();

  console.log(transactions);
  useEffect(() => {
    if (!auth) {
      router.replace('/');
      setAuth(null);
      return;
    }
    getData();

    setRegisterStatus('filled');
  }, []);

  async function getData() {
    const data = await api.getUserTransaction(auth?.token);
    setTransaction(data);
  }
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
        flexDirection="column"
      >
        <Flex
          flexDirection="column"
          w="100%"
          h="300px"
          justifyContent={transactions?.length ? 'flex-start' : 'center'}
        >
          {transactions?.length ? (
            transactions.map((item: any) => {
              return (
                <Entries
                  key={item.id}
                  type={item.type}
                  ammount={item.ammount}
                  description={item.description}
                  date={item.date}
                  id={item.id}
                  getData={getData}
                />
              );
            })
          ) : (
            <Text alignSelf="center" color="#000000a8">
              There is no entries yet
            </Text>
          )}
        </Flex>
        <Flex w="100%" className="sum" alignItems="center">
          <p className="balance">Balance</p>

          {transactions &&
          transactions.reduce((prev, current) => {
            return current.type === 'income'
              ? prev + current.ammount
              : prev - current.ammount;
          }, 0) >= 0 ? (
            <p className={`totalPositive`}>
              R${' '}
              {transactions &&
                transactions.reduce((prev, current) => {
                  return current.type === 'income'
                    ? prev + current.ammount
                    : prev - current.ammount;
                }, 0) / 100}
              ,00
            </p>
          ) : (
            <p className={`totalNegative`}>
              R${' '}
              {transactions
                ? transactions.reduce((prev, current) => {
                    return current.type === 'income'
                      ? prev + current.ammount
                      : prev - current.ammount;
                  }, 0) / 100
                : 0}
              ,00
            </p>
          )}
        </Flex>
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
  .totalPositive {
    color: #03ac00;
    font-weight: bold;
  }

  .totalNegative {
    color: #c70000;
    font-weight: bold;
  }
  .balance {
    font-weight: bold;
    font-size: 20px;
    color: #000000e0;
  }

  .sum {
    justify-content: flex-start;
    gap: 20px;
    @media (max-width: 700px) {
      justify-content: space-between;
    }
  }
`;
