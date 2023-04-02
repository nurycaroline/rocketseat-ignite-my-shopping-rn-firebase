import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

import firestore from '@react-native-firebase/firestore';


export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  // Busca unico id
  // useEffect(() => {
  //   firestore()
  //     .collection('products')
  //     .doc('meu-id')
  //     .get()
  // })

  useEffect(() => {
    const subscribe = firestore()
      .collection('products')
      // .where('quantity', '>', 0)
      // .limit(3)
      .orderBy('quantity')
      // .startAt(1)
      // .endAt(3)
      .onSnapshot(querySnapshot => {
        const productsFirestore: ProductProps[] = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          } as ProductProps;
        });

        setProducts(productsFirestore);
      })
    
    return () => subscribe();
  }, [])

  // useEffect(() => {
  //   firestore()
  //     .collection('products')
  //     .get()
  //     .then(response => {
  //       const productsFirestore: ProductProps[] = response.docs.map(doc => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         } as ProductProps;
  //       });

  //       setProducts(productsFirestore);
  //     })
  //     .catch(error => console.log(error));
  // }, [])

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
