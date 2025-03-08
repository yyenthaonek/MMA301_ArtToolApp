import { createNativeStackNavigator } from '@react-navigation/native-stack';

type Feedback = {
    rating: number;
    comment: string;
    author: string;
    date: string;
};

type ArtItem = {
    id: string;
    image: string;
    artName: string;
    price: number;
    limitedTimeDeal: number;
    brand: string;
    description: string;
    feedbacks: Feedback[];
};

type RootStackParamList = {
    HomeScreen: undefined;
    DetailScreen: ArtItem;
    Favorite: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
