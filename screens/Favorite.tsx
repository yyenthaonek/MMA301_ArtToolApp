import { View, FlatList, Pressable } from 'react-native';
import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import Header from '../components/Header';
import { styles } from '../theme/styleCommon';
import { AntDesign } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoriteContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/route';

export default function Favorite() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { favorites, removeFavorite } = useFavorites();

    return (
        <>
            <View style={styles.productContainer}>
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.productList}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => navigation.navigate('DetailScreen', item)}>
                            <Card style={styles.productCard}>
                                <Pressable
                                    style={styles.favoriteIcon}
                                    onPress={() => removeFavorite(item.id)}
                                >
                                    <AntDesign name="heart" size={24} color="red" />
                                </Pressable>
                                <Card.Cover source={{ uri: item.image }} style={styles.productImage} />
                                <Card.Content>
                                    <Title numberOfLines={1} ellipsizeMode="tail">{item.artName}</Title>
                                    <Paragraph style={styles.productPrice}>{item.price} VNĐ</Paragraph>
                                </Card.Content>
                            </Card>
                        </Pressable>

                    )}
                />
            </View>
        </>
    );
}
