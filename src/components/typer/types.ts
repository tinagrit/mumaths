import { ReactNode } from 'react';

export type TyperListOption = {
  id: string;
  title?: string;
  description?: string;
  icon?: ReactNode;
  selected?: boolean;
  searchTerms?: string[];
  expandable?: boolean;
  expansion?: () => TyperListOption[];
  callback?: () => void;
};

export type TyperListRequest = {
  type: 'list';
  label: string;
  keepTyperOnSelect?: boolean;
  options: TyperListOption[];
  allowSearch?: boolean;
  onSelect: (option: TyperListOption) => void;
};

export type TyperInputRequest = {
  type: 'input';
  label: string;
  helperText?: string;
  placeholder?: string;
  initialValue?: string;
  numbersOnly?: boolean;
  integerOnly?: boolean;
  min?: number;
  max?: number;
  unit?: string;
  onSubmit: (value: number) => void;
};

export type TyperRequest = TyperListRequest | TyperInputRequest;
