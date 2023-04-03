import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';

import { Container, Content, Progress, Transferred } from './styles';

export function Upload() {
  const [image, setImage] = useState('');
  const [progress, setProgress] = useState('0');
  const [bytesTransferred, setBytesTransferred] = useState('');
  

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  async function handleUpload() {
    const filename = new Date().getTime();
    const MIME = image.match(/\.(?:.(?!\.))+$/);
    const reference = storage().ref(`/images/${filename}${MIME}`);

    // reference.putFile(image)
    //   .then(() => {
    //     console.log('Arquivo enviado com sucesso!');
    //   })
    //   .catch((error) => console.log(error));

    const uploadTask = reference.putFile(image);
    uploadTask.on('state_changed', (taskSnapshot) => {
      const percentage = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
      setProgress(percentage.toFixed(0));
      setBytesTransferred(`${taskSnapshot.bytesTransferred}b transferidos de ${taskSnapshot.totalBytes}b`);
    });

    uploadTask.then(() => {
      console.log('Arquivo enviado com sucesso!');
    })
      .catch((error) => console.log(error));
  }


  return (
    <Container>
      <Header title="Upload de Fotos" />

      <Content>
        <Photo uri={image} onPress={handlePickImage} />

        <Button
          title="Fazer upload"
          onPress={handleUpload}
        />

        <Progress>
          {progress}%
        </Progress>

        <Transferred>
          {bytesTransferred}
        </Transferred>
      </Content>
    </Container>
  );
}
