import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {ScreenList} from '../types/navigation';
import UserList from '../screens/UserList';
import UserDetail from '../screens/UserDetail';
import Favourites from '../screens/Favourites';
import {useTheme} from '../context/ThemeContext';

const Stack = createNativeStackNavigator<ScreenList>();

const Main = () => {
  const {theme} = useTheme();

  const themeContainer = useMemo(
    () => ({backgroundColor: theme === 'dark' ? '#000' : '#fff'}),
    [theme],
  );

  return (
    <View style={[S.container, themeContainer]}>
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="UserList"
            component={UserList}
            options={{title: 'Пользователи'}}
          />
          <Stack.Screen
            name="UserDetail"
            component={UserDetail}
            options={{title: 'Информация о юзере'}}
          />
          <Stack.Screen
            name="Favorites"
            component={Favourites}
            options={{title: 'Избранное'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const S = StyleSheet.create({
  container: {flex: 1},
});

export default Main;
