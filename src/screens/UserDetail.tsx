import React, {useMemo} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {ScreenList} from '../types/navigation';
import {useUserStore} from '../store/useUserStore';
import {useTheme} from '../context/ThemeContext';

const UserDetail: React.FC = () => {
  const route = useRoute<RouteProp<ScreenList, 'UserDetail'>>();
  const {userId} = route.params;
  const {addFavourite, removeFavourite} = useUserStore(state => state.actions);

  const user = useUserStore(state => state.getters.getUserById(userId));
  const isFavorite = useUserStore(state =>
    state.getters.getIsFavourites(userId),
  );

  const onFavourite = () => {
    if (user?.id) {
      isFavorite ? removeFavourite(user.id) : addFavourite(user);
    }
  };

  const {theme} = useTheme();

  const themeText = useMemo(
    () => ({color: theme === 'dark' ? '#fff' : '#000'}),
    [theme],
  );

  return !!user?.id ? (
    <View style={S.container}>
      <Text style={[S.text, themeText]}>Имя: {user.name}</Text>
      <Text style={[S.text, themeText]}>Почта: {user.email}</Text>
      <Text style={[S.text, themeText]}>Телефон: {user.phone}</Text>
      <Text style={[S.text, themeText]}>Компания: {user.company.name}</Text>
      <Button
        title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        onPress={onFavourite}
      />
    </View>
  ) : (
    <Text>Пользователь не найден</Text>
  );
};

const S = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 8},
  text: {fontSize: 18},
});

export default UserDetail;
