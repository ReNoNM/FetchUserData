import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  ListRenderItem,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useFetchUsers} from '../hooks/useFetchUser';
import {User} from '../types/user';
import UserCard from '../components/UserCard';
import {useUserStore} from '../store/useUserStore';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '../types/navigation';
import {useTheme} from '../context/ThemeContext';
import {useBackButtonHandler} from '../hooks/useBackButtonHandler';

const UserList: React.FC = () => {
  const {navigate} = useNavigation<NavigationProp>();

  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<User[]>(() => []);

  const saveUserToSotre = useUserStore(state => state.actions.setUsers);
  const {fetchUsers, isLoading, error} = useFetchUsers();
  const {theme, onChangeTmeme} = useTheme();

  useBackButtonHandler();

  useEffect(() => {
    fetchUsers().then(data => {
      if (data?.length) {
        setUsers(data);
        saveUserToSotre(data);
      }
    });
  }, [fetchUsers, saveUserToSotre]);

  const renderItem: ListRenderItem<User> = useCallback(
    ({item}) => <UserCard userId={item.id} />,
    [],
  );

  const filteredUsers = useMemo(
    () =>
      users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, users],
  );

  const goToFavourites = () => {
    navigate('Favorites');
  };

  const themeText = useMemo(
    () => ({color: theme === 'dark' ? '#fff' : '#000'}),
    [theme],
  );

  const themeInput = useMemo(
    () => ({
      borderColor: theme === 'dark' ? '#fff' : '#000',
      color: theme === 'dark' ? '#fff' : '#000',
    }),
    [theme],
  );

  return (
    <View style={S.container}>
      <View style={S.anyBtnContainer}>
        <TouchableOpacity onPress={onChangeTmeme}>
          <Text style={[S.text, themeText]}>сменить тему</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToFavourites}>
          <Text style={[S.text, themeText]}>в избранное</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={[S.inputContainer, themeInput]}
        placeholder="Имя"
        value={search}
        onChangeText={setSearch}
        placeholderTextColor={theme === 'dark' ? '#fff' : '#000'}
      />
      {!!error && <Text>Произошла ошика</Text>}
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList // в jsonplaceholder всего 10 юзеров оказалось. пришлось вырезать код который был сделан для подгрузки с лимитом оффсетом. флетлист оставил
          contentContainerStyle={S.listContiner}
          data={filteredUsers}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const S = StyleSheet.create({
  container: {flex: 1},
  inputContainer: {margin: 8, borderWidth: 1},
  listContiner: {
    paddingBottom: 72,
  },
  anyBtnContainer: {
    paddingTop: 12,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {fontSize: 18, fontWeight: 'bold'},
});

export default UserList;
