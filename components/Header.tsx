import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { styles } from '../theme/styleCommon'
import { AntDesign } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types/route'

export default function Header() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return (
        <View style={styles.header}>
            <Pressable onPress={() => navigation.navigate('HomeScreen')}>
                <Text style={styles.headerText}>Home</Text>
            </Pressable>
            {/* <Pressable style={styles.filterBtn}>
                <AntDesign name="filter" size={24} color="black" />
            </Pressable> */}
        </View>

    )
}

