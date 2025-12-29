import { ClockIcon, InfinityIcon, CompIcon, QuestionIcon } from '../../../components/icons';
import { TyperListOption } from '../../../components/typer/types';
import { lang } from '../../../data/lang';

export type GameMode = 'question' | 'time' | 'infinity' | 'competitive';

export type DigitRangeOption = {
  id: string;
  label: string;
  searchTerms: string[];
};

export const digitRangeOptions: DigitRangeOption[] = [
  { id: '1', label: '1', searchTerms: ['1'] },
  { id: '1-2', label: '1-2', searchTerms: ['1-2'] },
  { id: '2', label: '2', searchTerms: ['2'] },
  { id: '2-3', label: '2-3', searchTerms: ['2-3'] },
  { id: '3', label: '3', searchTerms: ['3'] },
  { id: '3-4', label: '3-4', searchTerms: ['3-4'] },
  { id: '4', label: '4', searchTerms: ['4'] }
];

export const digitRangeCompetitiveOptions: DigitRangeOption[] = [
  { id: '1-2', label: '1-2', searchTerms: ['1-2'] },
  { id: '2-3', label: `(${lang.gamemode.CompDefault}) 2-3`, searchTerms: ['2-3'] },
  { id: '3-4', label: '3-4', searchTerms: ['3-4'] }
];

export const questionRangeCompetitiveOptions: DigitRangeOption[] = [
  { id: '10', label: `(${lang.gamemode.CompDefault}) 10`, searchTerms: ['10'] },
  { id: '20', label: `20`, searchTerms: ['20'] },
  { id: '50', label: `50`, searchTerms: ['50'] }
];

export const getGameModeOptions = (current: GameMode): TyperListOption[] => [
  {
    id: 'question',
    title: lang.gamemode.QuestionTitle,
    description: lang.gamemode.QuestionDesc,
    icon: <QuestionIcon />,
    selected: current === 'question',
    searchTerms: lang.gamemode.QuestionSearch.split(' ')
  },
  {
    id: 'time',
    title: lang.gamemode.TimeTitle,
    description: lang.gamemode.TimeDesc,
    icon: <ClockIcon />,
    selected: current === 'time',
    searchTerms: lang.gamemode.TimeSearch.split(' ')
  },
  {
    id: 'infinity',
    title: lang.gamemode.InfinityTitle,
    description: lang.gamemode.InfinityDesc,
    icon: <InfinityIcon />,
    selected: current === 'infinity',
    searchTerms: lang.gamemode.InfinitySearch.split(' ')
  },
  {
    id: 'competitive',
    title: lang.gamemode.CompTitle,
    description: lang.gamemode.CompDesc,
    icon: <CompIcon />,
    selected: current === 'competitive',
    searchTerms: lang.gamemode.CompSearch.split(' ')
  }
];

export const getDigitOptions = (current: string, mode: GameMode): TyperListOption[] => {
  if (mode === 'competitive') {
    return digitRangeCompetitiveOptions.map((option) => ({
      id: option.id,
      title: undefined,
      description: `${option.label} ${lang.gamemode.DigitSuffixPlural}`.trim(),
      selected: option.id === current,
      searchTerms: option.searchTerms
    }));
  }

  return digitRangeOptions.map((option) => ({
    id: option.id,
    title: undefined,
    description: `${option.label} ${lang.gamemode.DigitSuffixPlural}`.trim(),
    selected: option.id === current,
    searchTerms: option.searchTerms
  }));
}

export const getQuestionCompetitiveOptions = (current: number): TyperListOption[] =>
  questionRangeCompetitiveOptions.map((option) => ({
    id: option.id,
    title: undefined,
    description: `${option.label} ${lang.gamemode.QuestionSuffixPlural}`.trim(),
    selected: Number(option.id) === current,
    searchTerms: option.searchTerms
  }));
