import { windowExists } from '@/utils/functions/windowExists';

export function getLocalStorage(propertyName: string) {
  if (windowExists()) {
    const value = window.localStorage.getItem(propertyName) || null;
    return value ? JSON.parse(value) : null;
  }
}

export function setToLocalStorage(propertyName: string, rawData: any) {
  if (windowExists()) {
    return window.localStorage.setItem(propertyName, JSON.stringify(rawData));
  }
}

