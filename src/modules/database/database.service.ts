import { Injectable } from '@nestjs/common';
import { Favorites } from '../favorite/models/interfaces/favorites.interface';
import { FavoriteType } from '../favorite/models/types/favorite-type';

@Injectable()
export class DatabaseService<T> {
  private items: T[] = [];
  private favoriteItems: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  public getAllItems(): T[] {
    return this.items;
  }

  public getItem(id: string): T | undefined {
    return this.items.find((item) => item['id'] === id);
  }

  public createItem(item: T) {
    this.items.push(item);
    return item;
  }

  public updateItem(id: string, updatedItem: T): T | undefined {
    const itemIndex = this.items.findIndex((item) => item['id'] === id);
    if (itemIndex === -1) return undefined;
    this.items[itemIndex] = { ...updatedItem };
    return this.items[itemIndex];
  }

  public deleteItem(id: string): boolean {
    const itemIndex = this.items.findIndex((item) => item['id'] === id);
    if (itemIndex === -1) return false;
    this.items.splice(itemIndex, 1);
    return true;
  }

  public createFavoriteItem(id: string, favoriteType: FavoriteType): Favorites {
    this.favoriteItems[favoriteType].push(id);
    return this.favoriteItems;
  }

  public getAllFavoriteItems(): Favorites {
    return this.favoriteItems;
  }

  public removeFavoriteItem(id: string, favoriteType: FavoriteType): boolean {
    this.favoriteItems[favoriteType] = this.favoriteItems[favoriteType].filter(
      (item) => item !== id,
    );

    return true;
  }
}