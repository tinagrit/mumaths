import { TyperListOption } from '../components/typer/types';
import { Preferences, subscribeToPreferences, getPreferences, savePreferences } from './preferences';
import { lang } from '../data/lang';

export type PreferencesOption = {
  id: string;
  label: string;
  searchTerms: string[];
  preferenceKey?: keyof Preferences;
  selected?: boolean;
  expandable?: boolean;
  expansion?: () => TyperListOption[];
  callback?: () => void;
}

export const setPreference = <K extends keyof Preferences>(
  key: K,
  value: Preferences[K]
): void => {
  const current = getPreferences();
  const updated = { ...current, [key]: value };
  savePreferences(updated);
};

export const rightPadAnswerBoxOption: PreferencesOption[] = [
  { 
    id: 'true', 
    label: lang.preferences.Yes, 
    searchTerms: ['yes', 'true'], 
    expandable: false,
    callback: () => setPreference('RightPadAnswerBox', true)
  },
  { 
    id: 'false', 
    label: lang.preferences.No, 
    searchTerms: ['no', 'false'], 
    expandable: false,
    callback: () => setPreference('RightPadAnswerBox', false)
  }
];

export const getExpansion = (expansion?: PreferencesOption[], preferenceKey?: keyof Preferences): TyperListOption[] => {
  if (!expansion) return [];
  const prefs = getPreferences();
  return expansion.map((option) => ({
    id: option.id,
    title: undefined,
    description: option.label,
    searchTerms: option.searchTerms,
    selected: preferenceKey ? (option.id === 'true' ? prefs[preferenceKey] : prefs[preferenceKey] === false) : false,
    expandable: option.expandable,
    expansion: option.expansion,
    callback: option.callback
  }))
};
  
export const mainOptions: PreferencesOption[] = [
  {
    id: 'RightPadAnswerBox',
    label: lang.preferences.RightPadAnswerBox,
    searchTerms: ['right pad answer box padding'],
    expandable: true,
    expansion: () => getExpansion(rightPadAnswerBoxOption, 'RightPadAnswerBox')
  }
];

export const getMainOptions = (): TyperListOption[] => {
  return mainOptions.map((option) => ({
    id: option.id,
    title: undefined,
    description: option.label,
    searchTerms: option.searchTerms,
    selected: option.selected ? option.selected : false,
    expandable: option.expandable,
    expansion: option.expansion,
    callback: option.callback
  }))
}