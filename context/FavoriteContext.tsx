import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

interface FavoriteContextType {
    favorites: ArtItem[];
    addFavorite: (item: ArtItem) => void;
    removeFavorite: (id: string) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<ArtItem[]>([]);

    useEffect(() => {
        const loadFavorites = async () => {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        };
        loadFavorites();
    }, []);

    const saveFavorites = async (newFavorites: ArtItem[]) => {
        setFavorites(newFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const addFavorite = (item: ArtItem) => {
        if (!favorites.some(fav => fav.id === item.id)) {
            const newFavorites = [...favorites, item];
            saveFavorites(newFavorites);
        }
    };

    const removeFavorite = (id: string) => {
        const newFavorites = favorites.filter(item => item.id !== id);
        saveFavorites(newFavorites);
    };

    return (
        <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoriteContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoriteProvider');
    }
    return context;
};