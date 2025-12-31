export interface Preferences {
  RightPadAnswerBox: boolean;
}

const STORAGE_KEY = 'mumaths_preferences';

const defaultPreferences: Preferences = {
  RightPadAnswerBox: true
};

type PreferenceSubscriber = (prefs: Preferences) => void;
const subscribers: Set<PreferenceSubscriber> = new Set();

let preferencesCache: Preferences | null = null;

export const getDefaultPreferences = (): Preferences => defaultPreferences;

export const getPreferences = (): Preferences => {
  if (!preferencesCache) {
    preferencesCache = loadPreferences();
  }
  return preferencesCache;
};

export const loadPreferences = (): Preferences => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultPreferences, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load preferences from localStorage:', error);
  }
  return defaultPreferences;
};

export const savePreferences = (preferences: Preferences): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    preferencesCache = preferences;
    notifySubscribers(preferences);
  } catch (error) {
    console.error('Failed to save preferences to localStorage:', error);
  }
};

export const updatePreference = <K extends keyof Preferences>(
  key: K,
  value: Preferences[K]
): Preferences => {
  const current = getPreferences();
  const updated = { ...current, [key]: value };
  savePreferences(updated);
  return updated;
};

const notifySubscribers = (prefs: Preferences): void => {
  subscribers.forEach((subscriber) => subscriber(prefs));
};

export const subscribeToPreferences = (callback: PreferenceSubscriber): (() => void) => {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
};
