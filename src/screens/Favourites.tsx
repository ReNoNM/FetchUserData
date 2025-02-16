import React, {useCallback, useMemo} from 'react';
import {View, FlatList, Text, StyleSheet, ListRenderItem} from 'react-native';
import UserCard from '../components/UserCard';
import {useUserStore} from '../store/useUserStore';
import {User} from '../types/user';
import {useTheme} from '../context/ThemeContext';

const Favourites: React.FC = () => {
  const {theme} = useTheme();

  const favourites = useUserStore(state => state.favourites);

  const renderItem: ListRenderItem<User> = useCallback(
    ({item}) => <UserCard userId={item.id} />,
    [],
  );

  const themeText = useMemo(
    () => ({color: theme === 'dark' ? '#fff' : '#000'}),
    [theme],
  );

  return (
    <View style={styles.container}>
      {favourites.length === 0 ? (
        <Text style={[styles.emptyText, themeText]}>
          Нет избранных пользователей
        </Text>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default Favourites;
