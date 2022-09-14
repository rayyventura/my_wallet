import { Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import * as api from '../requests/api';

export default function Entries({
  type,
  ammount,
  description,
  date,
  id,
  getData,
}: any) {
  return (
    <Container w="90%">
      <Flex gap="10px">
        <p className="date">{date}</p>
        <p className="description">{description}</p>
      </Flex>
      <Flex gap="10px">
        <p className={`${type}`}>$ {ammount / 100},00</p>
        <p
          className="delete"
          style={{ alignSelf: 'flex-end' }}
          onClick={() => {
            Swal.fire({
              title: 'Sure you want to delete this entry?',
              showDenyButton: true,
              confirmButtonText: 'Yes, Delete',
              denyButtonText: `No, Cancel`,
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire('Deleted!', '', 'success');
                api.deleteTransaction(id);
                getData();
              } else if (result.isDenied) {
                Swal.fire('Changes were not saved', '', 'info');
              }
            });
          }}
        >
          {' '}
          x{' '}
        </p>
      </Flex>
    </Container>
  );
}

const Container = styled(Flex)`
  cursor: pointer;
  .income {
    color: #03ac00;
  }
  .withdraw {
    color: #c70000;
  }
  .date {
    color: #c6c6c6;
  }
  .description {
    color: #000000e0;
    font-weight: bold;
  }
  .delete {
    font-weight: bold;
    color: #3333334b;
  }
  justify-content: flex-start;

  gap: 20px;
  @media (max-width: 700px) {
    justify-content: space-between;
    align-items: center;
  }
`;
