import { useCallback, useEffect, useMemo, useState } from 'react';
import { GameMode } from './typerOptions';

export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'shuffle';

export interface CalculationSettings {
  mode: GameMode;
  questionLimit: number;
  timeLimitSeconds: number;
  digitRange: string;
  operation: Operation;
}

export interface CalculationScore {
  correct: number;
  incorrect: number;
}

const baseOperations: Operation[] = ['addition', 'subtraction', 'multiplication', 'division'];

const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const parseDigitRange = (range: string) => {
  if (!range.includes('-')) {
    const digits = Number(range);
    return { minDigits: digits, maxDigits: digits };
  }
  const [min, max] = range.split('-').map((value) => Number(value));
  return { minDigits: min, maxDigits: max };
};

const randomValueForDigits = (digits: number) => {
  if (digits <= 1) {
    return randomBetween(0, 9);
  }
  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;
  return randomBetween(min, max);
};

const generateOperands = (digitRange: string): [number, number] => {
  const { minDigits, maxDigits } = parseDigitRange(digitRange);
  const firstDigits = randomBetween(minDigits, maxDigits);
  const secondDigits = randomBetween(minDigits, maxDigits);
  const first = randomValueForDigits(firstDigits);
  let second = randomValueForDigits(secondDigits);
  if (second === 0) {
    second = 1;
  }
  return [first, second];
};

const pickOperation = (operation: Operation): Operation => {
  if (operation !== 'shuffle') {
    return operation;
  }
  return baseOperations[randomBetween(0, baseOperations.length - 1)];
};

const calculateAnswer = (operation: Operation, [a, b]: [number, number]) => {
  switch (operation) {
    case 'addition':
      return a + b;
    case 'subtraction':
      return a - b;
    case 'multiplication':
      return a * b;
    case 'division':
      return a / b;
    default:
      return 0;
  }
};

export function useCalculationGame(settings: CalculationSettings) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [operands, setOperands] = useState<[number, number]>(() => generateOperands(settings.digitRange));
  const [currentOperation, setCurrentOperation] = useState<Operation>(pickOperation(settings.operation));
  const [score, setScore] = useState<CalculationScore>({ correct: 0, incorrect: 0 });
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);

  const targetQuestions = settings.mode === 'question' ? settings.questionLimit : Infinity;

  const prepareNextQuestion = useCallback(() => {
    setCurrentOperation(pickOperation(settings.operation));
    setOperands(generateOperands(settings.digitRange));
  }, [settings.digitRange, settings.operation]);

  const stopGame = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const startGame = useCallback(() => {
    setScore({ correct: 0, incorrect: 0 });
    setQuestionsAnswered(0);
    setElapsedMs(0);
    prepareNextQuestion();
    setIsPlaying(true);
  }, [prepareNextQuestion]);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  const submitAnswer = useCallback(
    (value: number) => {
      if (!isPlaying) {
        return null;
      }
      const expected = calculateAnswer(currentOperation, operands);
      const isCorrect = Math.abs(value - expected) < 0.0001;
      setScore((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (isCorrect ? 0 : 1)
      }));
      setQuestionsAnswered((prev) => prev + 1);
      prepareNextQuestion();
      return { correct: isCorrect, expected };
    },
    [currentOperation, isPlaying, operands, prepareNextQuestion]
  );

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const interval = setInterval(() => {
      setElapsedMs((ms) => ms + 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    if (settings.mode === 'time' && elapsedMs >= settings.timeLimitSeconds * 1000) {
      stopGame();
    }
    if (settings.mode === 'question' && questionsAnswered >= targetQuestions) {
      stopGame();
    }
  }, [elapsedMs, isPlaying, questionsAnswered, settings.mode, settings.timeLimitSeconds, stopGame, targetQuestions]);

  useEffect(() => {
    if (!isPlaying) {
      prepareNextQuestion();
    }
  }, [isPlaying, prepareNextQuestion]);

  const questionProgress = useMemo(() => ({
    answered: questionsAnswered,
    target: Number.isFinite(targetQuestions) ? targetQuestions : null
  }), [questionsAnswered, targetQuestions]);

  return {
    isPlaying,
    operands,
    operation: currentOperation,
    score,
    elapsedMs,
    questionProgress,
    startGame,
    stopGame,
    restartGame,
    submitAnswer
  };
}
