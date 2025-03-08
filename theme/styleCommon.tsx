import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffff',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0a0a0a',
        marginTop: 30,
    },
    filterBtn: {
        justifyContent: 'center',
        marginTop: 30,
    },
    productContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 35,
    },
    productCard: {
        flex: 1,
        width: 190,
        height: 300,
        marginBottom: 30,
        elevation: 2,
        backgroundColor: 'white',
    },
    productImage: {
        width: '100%',
        height: 150,
    },
    productPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ef4444',
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    detailContainer: {
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    artName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0a0a0a',
        marginTop: 20,
    },
    artPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ef4444',
    },
    dealContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        gap: 8,
    },
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 4,
    },
    progressBar: {
        height: 8,
        width: 200,
        borderRadius: 10,
    },
    dealPercentage: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4A90E2',
    },
    detailImageContainer: {
        position: 'relative',
    },
    detailFavorite: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    searchRow: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 10,
        marginTop: 10,
    },
    searchContainer: {
        flex: 1,
        marginVertical: 10,
    },
    searchBar: {
        backgroundColor: '#fff',
        borderRadius: 100,
    },
    filterContainer: {
        marginLeft: 10,
        padding: 8,
    },
    feedbackContainer: {
        marginBottom: 10,
        padding: 10,
        marginHorizontal: 10,
    },
    feedbackAuthor: {
        fontWeight: 'bold',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    feedbackDate: {
        fontSize: 12,
        color: 'gray',
    },
    
});
