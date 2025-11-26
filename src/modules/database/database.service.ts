import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService<T> {
  private items: T[] = [];

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
}