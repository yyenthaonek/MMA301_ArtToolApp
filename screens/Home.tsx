import { View, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Card, Title, Paragraph, Searchbar, Menu, Divider } from 'react-native-paper';
import { styles } from '../theme/styleCommon';
import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/route';
import { useFavorites } from '../context/FavoriteContext';

interface Feedback {
    rating: number;
    comment: string;
    author: string;
    date: string;
};

interface ArtItem {
    id: string;
    image: string;
    artName: string;
    price: number;
    limitedTimeDeal: number;
    brand: string;
    description: string;
    feedbacks: Feedback[];
}

export default function Home() {
    const [items, setItems] = useState<ArtItem[]>([]);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const [searchText, setSearchText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [menuVisible, setMenuVisible] = useState(false);

    const art = process.env.EXPO_PUBLIC_API_URL

    const fetchAPI = () => {
        fetch(art)
            .then(response => response.json())
            .then((data) => {
                setItems(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    const brands = Array.from(new Set(items.map(item => item.brand)));

    const filteredItems = items.filter(item => {
        return (
            item.artName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (!selectedBrand || item.brand === selectedBrand)
        );
    });

    return (
        <>
            <View style={styles.searchRow}>
                <View style={styles.searchContainer}>
                    <Searchbar
                        placeholder="Tìm kiếm sản phẩm"
                        onChangeText={setSearchText} 
                        value={searchText}
                        onSubmitEditing={() => setSearchQuery(searchText)} 
                        style={styles.searchBar}
                    />
                </View>
                <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                        <Pressable style={styles.filterContainer} onPress={() => setMenuVisible(true)}>
                            <AntDesign name="filter" size={24} color="black" />
                        </Pressable>
                    }
                    anchorPosition="bottom"
                >
                    <Menu.Item onPress={() => { setSelectedBrand(null); setMenuVisible(false); }} title="Tất cả" />
                    <Divider />
                    {brands.map((brand) => (
                        <Menu.Item
                            key={brand}
                            onPress={() => { setSelectedBrand(brand); setMenuVisible(false); }}
                            title={brand}
                        />
                    ))}
                </Menu>
            </View>

            <View style={styles.productContainer}>
                <FlatList
                    data={filteredItems}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.productList}
                    renderItem={({ item }) => {
                        const isFavorite = favorites.some(fav => fav.id === item.id);
                        return (
                            <Pressable onPress={() => navigation.navigate('DetailScreen', item)}>
                                <Card style={styles.productCard}>
                                    <Pressable
                                        style={styles.favoriteIcon}
                                        onPress={() => isFavorite ? removeFavorite(item.id) : addFavorite(item)}
                                    >
                                        <AntDesign
                                            name={isFavorite ? "heart" : "hearto"}
                                            size={24}
                                            color={isFavorite ? "red" : "black"}
                                        />
                                    </Pressable>
                                    <Card.Cover source={{ uri: item.image }} style={styles.productImage} />
                                    <Card.Content>
                                        <Title numberOfLines={1} ellipsizeMode="tail">
                                            {item.artName}
                                        </Title>
                                        <Paragraph style={styles.productPrice}>{item.price} VNĐ</Paragraph>
                                    </Card.Content>
                                </Card>
                            </Pressable>
                        );
                    }}
                />
            </View>
        </>
    );
}
