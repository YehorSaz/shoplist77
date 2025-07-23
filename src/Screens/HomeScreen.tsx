import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState } from '../store';
import { HomeStackParamList, RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../theme';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

interface HomeScreenProps {
    navigation: HomeScreenNavigationProp;
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {

    const { lists, loading, error } = useSelector((state: RootState) => state.lists);


    if (loading) return <Text>Завантаження...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Мої списки покупок</Text>
            {lists.length === 0 ? (
                <Text>Списків поки немає</Text>
            ) : (
                lists.map((list) => (
                    <Text key={list._id} style={styles.listItem}>
                        {list.name}
                    </Text>
                ))
            )}
            <TouchableOpacity onPress={() => navigation.navigate('ListDetail', { listId: 'some-list-id' })}>
                <Text style={styles.link}>Переглянути деталі списку</Text>
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.medium,
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.large,
    },
    link: {
        color: theme.colors.primary,
    },
    listItem: {
        fontSize: 16,
        color: theme.colors.text,
        padding: theme.spacing.small,
    },
});

export default HomeScreen;
