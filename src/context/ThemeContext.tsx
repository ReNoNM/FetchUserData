import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';

type ThemeTypes = 'light' | 'dark';
type ThemeContextProps = {
  theme: ThemeTypes;
  onChangeTmeme: () => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeTypes>('light');

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = (await AsyncStorage.getItem(
        'theme',
      )) as ThemeTypes | null;
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };
    loadTheme();
  }, []);

  const onChangeTmeme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{theme, onChangeTmeme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('Нужен провайдер');
  }
  return context;
};
