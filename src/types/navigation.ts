import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type ScreenList = {
  UserList: undefined;
  UserDetail: {userId: number};
  Favorites: undefined;
};

export type NavigationProp = NativeStackNavigationProp<ScreenList>;
