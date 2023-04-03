import React from 'react';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function SignIn() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  async function handleSignInAnonymously() {
    try {
      const user = await auth().signInAnonymously();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreateUserAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        if (error.code === 'auth/weak-password') {
          console.log('Password is too weak!');
        }

        console.error(error);
      });
  }

  async function handleSignInWhitEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
          console.log("E-mail ou senha incorretos!")
        }
      })
  }

  async function handleForgotPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('Password reset email sent!', email);
      })
      .catch(error => console.log(error));
  }


  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInWhitEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
        <ButtonText title="Logar depois" onPress={handleSignInAnonymously} />
      </Account>
    </Container>
  );
}