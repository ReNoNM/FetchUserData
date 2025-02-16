import {useState, useCallback} from 'react';
import {User} from '../types/user';

export const useFetchUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<number | null>(null);

  const fetchUsers = useCallback(async (): Promise<User[] | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );

      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(500);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {fetchUsers, isLoading, error};
};
