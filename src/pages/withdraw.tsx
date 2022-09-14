import React from 'react';
import Transaction from '../components/Transaction';

export default function withdraw() {
  return (
    <Transaction title="New Withdraw" button="Save Changes" type="withdraw" />
  );
}
