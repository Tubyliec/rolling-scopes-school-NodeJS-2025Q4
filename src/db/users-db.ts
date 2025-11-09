import { User } from '../models/types/user.type';

class db {
  private userStore = new Map<string, User>();

  getAllUsers(): User[] {
    return Array.from(this.userStore.values());
  }

  getUserById(id: string): User | null {
    return this.userStore.get(id) ?? null;
  }

  createUser(user: User): void {
    this.userStore.set(user.id, user);
  }

  updateUser(id: string, user: User): void {
    this.userStore.set(id, user);
  }

  deleteUser(id: string): void {
    this.userStore.delete(id);
  }

  replaceAllUsers(users: User[]): void {
    this.userStore.clear();
    users.forEach((u) => this.userStore.set(u.id, u));
  }
}

export const userDb = new db();
