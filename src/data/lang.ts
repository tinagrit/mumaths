export const lang = {
  metadata: {
    Name: 'MUMATHS',
    NameDisplay: 'MUMATHS',
    NameDisplayTiny: 'MM',
    Title: 'MUMATHS',
    SocialTile: 'MUMATHS — Quick Math Games',
    SocialDesc: 'Practice your math skills',
    HomeTitle: 'MUMATHS — Quick Math Games',
    CustomTitle: '{page} — MUMATHS',
    PagePrefix: '',
    PageSuffix: ' — MUMATHS'
  },
  features: {
    AboutPage: 'About',
    PreferencesPage: 'Preferences',
    NotFoundPage: 'Error',
    CalculationMode: 'Calculation',
    TwentyFourMode: '24 Game',
    FactorMode: 'Factor'
  },
  error: {
    UnknownTitle: 'An Unknown Error Has Occurred',
    UnknownDesc:
      'Tap here or press ENTER to refresh. If the problem persists, please clear your browser cache and try again',
    NothingInList: 'There is nothing on the list',
    NotFoundFor: 'No results found for {query}',
    NumbersOnly: 'Value can only be numbers',
    ExceedNumbers: 'Value cannot exceed {query}',
    SmallNumbers: 'Value cannot be lower than {query}'
  },
  typer: {
    TypeHerePlaceHolder: '> Type here',
    SetToInput: 'Set to'
  },
  gamemode: {
    ModeSmall: 'MODE',
    QuestionTitle: 'Questions',
    QuestionDesc: 'The game stops after a specific number of questions is completed',
    QuestionSearch: 'Questions Number',
    QuestionSuffixSingular: 'question',
    QuestionSuffixPlural: 'questions',
    QuestionAsk: 'Please enter the number of questions',
    QuestionNotAvailable: 'N/A',
    QuestionSmall: 'QUES',
    TimeTitle: 'Time',
    TimeDesc: 'The game stops after a time limit',
    TimeSearch: 'Time Seconds Countdown',
    TimeAsk: 'Please enter the countdown duration in seconds',
    TimeSmall: 'TIME',
    InfinityTitle: 'Infinity',
    InfinityDesc: 'The game only stops manually',
    InfinitySearch: 'Infinity Infinite NonStop',
    InfinitySmall: 'QUES',
    DigitTitle: 'Digits',
    DigitSuffixSingular: 'digit',
    DigitSuffixPlural: 'digits',
    DigitSmall: 'DIGITS',
    CompTitle: 'Competitive',
    CompDesc: 'Make the best time for 10 questions, 1-2 digits',
    CompSearch: 'Competitive Comp Fixed',
    CompDefault: 'Default'
  }
} as const;

export type Lang = typeof lang;
