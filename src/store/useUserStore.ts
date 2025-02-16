import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../types/user';
import {immer} from 'zustand/middleware/immer';

type State = {
  users: Record<number, User>;
  favourites: User[];
};

type Actions = {
  getters: {
    getUserById: (userId: number) => User | undefined;
    getIsFavourites: (userId: number) => boolean;
  };
  actions: {
    setUsers: (users: User[]) => void;
    addFavourite: (user: User) => void;
    removeFavourite: (userId: number) => void;
    loadFavourites: () => void;
    saveFavourites: (favourites: User[]) => void;
  };
};

export const useUserStore = create<State & Actions>()(
  immer((set, get) => ({
    users: {},
    favourites: [],

    getters: {
      getUserById: id => {
        return get()?.users[id];
      },
      getIsFavourites: id => {
        return get().favourites.some(item => item.id === id);
      },
    },
    actions: {
      setUsers: users =>
        set(state => {
          users.forEach(user => (state.users[user.id] = user));
        }),
      addFavourite: async user => {
        set(state => {
          state.favourites.push(user);
        });

        await get().actions.saveFavourites(get().favourites);
      },
      removeFavourite: async userId => {
        const newFavourites = get().favourites.filter(
          user => user.id !== userId,
        );
        await get().actions.saveFavourites(newFavourites);
        set(state => {
          state.favourites = newFavourites;
        });
      },
      loadFavourites: async () => {
        try {
          const storedFavourites = await AsyncStorage.getItem('favourites');
          if (storedFavourites) {
            const favourites = JSON.parse(storedFavourites) as User[];
            set(state => {
              state.favourites = favourites;
            });
          }
        } catch (error) {
          console.error('Ошибка загрузки избранных:', error);
        }
      },
      saveFavourites: async favourites => {
        try {
          await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
        } catch (error) {
          console.error('Избранные не сохранены:', error);
        }
      },
    },
  })),
);
