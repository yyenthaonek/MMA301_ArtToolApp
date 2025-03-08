import React from 'react';
import { View, Text, Image, Pressable, FlatList } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/route';
import { Appbar, Card, ProgressBar } from 'react-native-paper';
import { styles } from '../theme/styleCommon';
import { AntDesign } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoriteContext';

export default function Detail() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'DetailScreen'>>();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.some(fav => fav.id === route.params?.id);

  const toggleFavorite = () => {
    isFavorite ? removeFavorite(route.params.id) : addFavorite(route.params);
  };

  return (
    <FlatList
      data={route.params?.feedbacks}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
          </Appbar.Header>

          <View style={styles.detailImageContainer}>
            <Image source={{ uri: route.params?.image }} style={{ width: '100%', height: 400 }} />
            <Pressable style={styles.detailFavorite} onPress={toggleFavorite}>
              <AntDesign
                name={isFavorite ? 'heart' : 'hearto'}
                size={24}
                color={isFavorite ? "red" : "black"} />
            </Pressable>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.artName}>{route.params?.artName}</Text>
            <Text style={styles.artPrice}>{route.params?.price} VNĐ</Text>

            <View style={styles.dealContainer}>
              <Text>Limit Time Deal:</Text>
              <View style={styles.progressBarContainer}>
                <ProgressBar
                  progress={route.params?.limitedTimeDeal / 100}
                  color="red"
                  style={styles.progressBar}
                />
                <Text style={styles.dealPercentage}>{route.params?.limitedTimeDeal}%</Text>
              </View>
            </View>

            <Text>Brand: {route.params?.brand}</Text>
            <Text>Description: {route.params?.description}</Text>
          </View>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, padding: 10 }}>Feedbacks</Text>
        </View>
      }
      renderItem={({ item }) => (
        <Card style={styles.feedbackContainer}>
          <Text style={styles.feedbackAuthor}>{item.author}</Text>
          <View style={styles.rating}>
            {Array.from({ length: item.rating }, (_, index) => (
              <AntDesign key={index} name="star" size={16} color="gold" />
            ))}
          </View>
          <Text>{item.comment}</Text>
          <Text style={styles.feedbackDate}>{new Date(item.date).toLocaleDateString()}</Text>
        </Card>
      )}
      ListEmptyComponent={<Text style={{ textAlign: 'center', padding: 20 }}>No feedbacks available.</Text>}
    />
  );
}
