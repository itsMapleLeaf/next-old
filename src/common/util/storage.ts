import * as forage from 'localforage'

/**
 * A utility class for saving and restoring a single persistent value
 *
 * Usage:
 * ```ts
 * const storedUsername = new StoredValue<string>('app_username')
 *
 * // loading a value on app initialized
 * this.username = await storedUsername.restore()
 *
 * // storing a value
 * storedUsername.save(this.username)
 * ```
 */
export class StoredValue<T> {
  constructor(private storageKey: string) {}

  async save(value: T): Promise<T> {
    return forage.setItem(this.storageKey, value)
  }

  async restore(): Promise<T | null> {
    return forage.getItem<T | null>(this.storageKey)
  }
}
