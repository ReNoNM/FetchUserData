import React, {useEffect} from 'react';
import {ThemeProvider} from './src/context/ThemeContext';
import Main from './src/navigation/Main';
import {useUserStore} from './src/store/useUserStore';

const App = () => {
  const loadFavourites = useUserStore(state => state.actions.loadFavourites);

  useEffect(() => {
    loadFavourites();
  }, [loadFavourites]);

  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
};

export default App;
