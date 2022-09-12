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

async function signUp(data: SignUp) {
  await axios.post('/api/auth/signup', data);
}
async function signIn(data: SignIn) {
  const res = await axios.post('/api/auth/signin', data);
  return res.data;
}
async function signOut(data: SignIn) {
  const res = await axios.post('/api/auth/signout', data);
  return res.data;
}

export { signUp, signIn, signOut };
