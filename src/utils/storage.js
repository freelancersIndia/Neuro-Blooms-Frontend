import { STORAGE_KEYS } from '../features/auth/constants/auth.constants';

const storage = {
  get: (key) => {
    try {
      const val = localStorage.getItem(key) || sessionStorage.getItem(key);
      if (!val) return null;
      return JSON.parse(val);
    } catch (e) {
      console.error('Error reading from storage:', e);
      return null;
    }
  },

  set: (key, value, persist = true) => {
    try {
      const serialized = JSON.stringify(value);
      if (persist) {
        localStorage.setItem(key, serialized);
        sessionStorage.removeItem(key);
      } else {
        sessionStorage.setItem(key, serialized);
        localStorage.removeItem(key);
      }
    } catch (e) {
      console.error('Error writing to storage:', e);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from storage:', e);
    }
  },

  getAccessToken: () => storage.get(STORAGE_KEYS.ACCESS_TOKEN),
  setAccessToken: (token, persist) => storage.set(STORAGE_KEYS.ACCESS_TOKEN, token, persist),
  removeAccessToken: () => storage.remove(STORAGE_KEYS.ACCESS_TOKEN),

  getRefreshToken: () => storage.get(STORAGE_KEYS.REFRESH_TOKEN),
  setRefreshToken: (token, persist) => storage.set(STORAGE_KEYS.REFRESH_TOKEN, token, persist),
  removeRefreshToken: () => storage.remove(STORAGE_KEYS.REFRESH_TOKEN),

  getUser: () => storage.get(STORAGE_KEYS.USER),
  setUser: (user, persist) => storage.set(STORAGE_KEYS.USER, user, persist),
  removeUser: () => storage.remove(STORAGE_KEYS.USER),

  getRole: () => storage.get(STORAGE_KEYS.ROLE),
  setRole: (role, persist) => storage.set(STORAGE_KEYS.ROLE, role, persist),
  removeRole: () => storage.remove(STORAGE_KEYS.ROLE),

  getRememberDevice: () => {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.REMEMBER);
      return val ? JSON.parse(val) : false;
    } catch {
      return false;
    }
  },
  setRememberDevice: (value) => {
    try {
      localStorage.setItem(STORAGE_KEYS.REMEMBER, JSON.stringify(value));
    } catch {}
  },

  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      storage.remove(key);
    });
  }
};

export default storage;
