import { User } from '../models/types/user.type';

export const isUserValid = (object: unknown): object is Omit<User, 'id'> => {
  if (!object || typeof object !== 'object') return false;
  const { username, age, hobbies } = object as Record<string, unknown>;
  if (typeof username !== 'string') return false;
  if (typeof age !== 'number' || Number.isNaN(age)) return false;
  return !(
    !Array.isArray(hobbies) ||
    !hobbies.every((hobby) => typeof hobby === 'string')
  );
};