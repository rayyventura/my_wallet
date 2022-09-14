import axios from 'axios';
interface SignUp {
  name: string;
  email: string;
  password: string;
}
interface SignIn {
  email: string;
  password: string;
}
interface Transaction {
  type: string;
  ammount: number;
  description: string;
}

function createConfig(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function signUp(data: SignUp) {
  const res = await axios.post('/api/auth/signup', data);

  return res.data;
}
async function signIn(data: SignIn) {
  const res = await axios.post('/api/auth/signin', data);

  return res.data;
}
async function signOut(data: SignIn) {
  const res = await axios.post('/api/auth/signout', data);
  return res.data;
}
async function transaction(data: Transaction, token: string) {
  const config = createConfig(token);
  const res = await axios.post('/api/transactions', data, config);
  return res.data;
}
async function getUserTransaction(token: string) {
  const config = createConfig(token);
  const res = await axios.get('/api/transactions', config);
  return res.data;
}
async function deleteTransaction(id: number) {
  const res = await axios.delete(`/api/transactions/${id}`);
  return res.data;
}

export {
  signUp,
  signIn,
  signOut,
  transaction,
  getUserTransaction,
  deleteTransaction,
};
