import React, {memo, useMemo} from 'react';
import {Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {User} from '../types/user';
import {useTheme} from '../context/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '../types/navigation';
import {useUserStore} from '../store/useUserStore';

type UserCardProps = {
  userId: User['id'];
};

const UserCard: React.FC<UserCardProps> = ({userId}) => {
  const {navigate} = useNavigation<NavigationProp>();

  const addFavourite = useUserStore(state => state.actions.addFavourite);
  const removeFavourite = useUserStore(state => state.actions.removeFavourite);
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

  const themeCard = useMemo(
    () => ({
      borderColor: theme === 'dark' ? '#fff' : '#000',
    }),
    [theme],
  );

  const themeText = useMemo(
    () => ({color: theme === 'dark' ? '#fff' : '#000'}),
    [theme],
  );

  const onPress = () => {
    navigate('UserDetail', {userId});
  };

  return (
    <TouchableOpacity style={[S.card, themeCard]} onPress={onPress}>
      <Text style={[S.text, themeText]}>имя: {user?.name}</Text>
      <Text style={[S.text, themeText]}>почта: {user?.email}</Text>
      <Text style={[S.text, themeText]}>город: {user?.address?.city}</Text>
      {isFavorite && <Text style={[S.text, themeText]}>в избранном</Text>}
      <Button
        title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        onPress={onFavourite}
      />
    </TouchableOpacity>
  );
};

const S = StyleSheet.create({
  card: {padding: 16, margin: 8, borderWidth: 1, borderRadius: 8},
  text: {fontSize: 18},
});

export default memo(UserCard);
