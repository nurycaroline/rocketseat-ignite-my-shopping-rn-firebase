import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import storage from '@react-native-firebase/storage';

import { Container, PhotoInfo } from './styles';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';
import { File, FileProps } from '../../components/File';

export function Receipts() {
  const [photos, setPhotos] = React.useState<FileProps[]>([]);
  const [photoSelected, setPhotoSelected] = React.useState<string>('');
  const [photoInfo, setPhotoInfo] = React.useState<string>('');

  useEffect(() => {
    storage()
      .ref('images')
      .list()
      .then((result) => {
        const files: FileProps[] = [];

        result.items.forEach((item) => {
          files.push({
            name: item.name,
            path: item.fullPath,
          });
        });

        setPhotos(files);
      })
      .catch((error) => console.log(error));
  }, []);

  async function handleShowImage(path: string) {
    const urlImage = await storage()
      .ref(path)
      .getDownloadURL()
    setPhotoSelected(urlImage)

    const info = await storage().ref(path).getMetadata()
    setPhotoInfo(`
    Tamanho: ${info.size} bytes
    Upload realizado em: ${info.timeCreated}
    `)
  }

  async function handleDeleteImage(path: string) {
    await storage().ref(path).delete()
    setPhotos(photos.filter(photo => photo.path !== path))
  }

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={photoSelected} />

      <PhotoInfo>
        {photoInfo}
      </PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => handleDeleteImage(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', padding: 24 }}
      />
    </Container>
  );
}
