import {useNavigationState} from '@react-navigation/native';
import {useEffect} from 'react';
import {Alert, BackHandler} from 'react-native';

export const useBackButtonHandler = () => {
  const routesLength = useNavigationState(state => state.routes.length);

  useEffect(() => {
    const onBackPress = () => {
      if (routesLength === 1) {
        Alert.alert('Выход', 'Выйти?', [
          {text: 'нет', style: 'cancel'},
          {text: 'Да', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => backHandler.remove();
  }, [routesLength]);
};
