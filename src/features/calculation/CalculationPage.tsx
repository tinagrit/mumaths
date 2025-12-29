import { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { lang } from '../../data/lang';
import { GameMode, getDigitOptions, getGameModeOptions, getQuestionCompetitiveOptions } from './hooks/typerOptions';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useTyper } from '../../components/typer/TyperProvider';
import {
  ClockIcon,
  CompIcon,
  CounterIcon,
  ExitIcon,
  InfinityIcon,
  QuestionIcon,
  RestartIcon,
  ScoreFailureIcon,
  ScoreSuccessIcon,
  ShuffleIcon,
  TimerStatIcon,
  PlayIcon
} from '../../components/icons';
import { CalculationSettings, Operation, useCalculationGame } from './hooks/useCalculationGame';

const numberFormatter = new Intl.NumberFormat('en-US');

const initialSettings: CalculationSettings = {
  mode: 'question',
  questionLimit: 10,
  timeLimitSeconds: 60,
  digitRange: '1-2',
  operation: 'addition'
};

const operationButtons: Array<{ id: Operation; label?: string; type: 'text' | 'shuffle' }> = [
  { id: 'addition', label: '+', type: 'text' },
  { id: 'subtraction', label: '-', type: 'text' },
  { id: 'multiplication', label: '×', type: 'text' },
  { id: 'division', label: '÷', type: 'text' },
  { id: 'shuffle', type: 'shuffle' }
];

const modeIcons: Record<GameMode, JSX.Element> = {
  question: <QuestionIcon />,
  time: <ClockIcon />,
  infinity: <InfinityIcon />,
  competitive: <CompIcon />
};

// ms to hh:mm:ss
const formatTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export default function CalculationPage() {
  useDocumentTitle(lang.metadata.CustomTitle.replace('{page}', lang.features.CalculationMode));

  const [answer, setAnswer] = useState('');
  const { openTyper } = useTyper();

  const [settings, setSettings] = useState<CalculationSettings>(initialSettings);
  const game = useCalculationGame(settings);

  const questionsRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);

  // displayed string value
  const questionValue = useMemo(() => {
    if (settings.mode === 'time') {
      return `${settings.timeLimitSeconds}s`;
    }
    if (settings.mode === 'infinity') {
      return lang.gamemode.QuestionNotAvailable;
    }
    return String(settings.questionLimit);
  }, [settings.mode, settings.questionLimit, settings.timeLimitSeconds]);

  // user chooses new operation
  const handleOperationChange = (operation: Operation) => {
    if (settings.mode === 'competitive' || game.isPlaying) return;

    setSettings((prev) => ({ ...prev, operation }));
  };

  // user clicks to change mode
  const handleModeChange = () => {
    if (game.isPlaying) return;

    openTyper({
      type: 'list',
      label: 'Choose Mode',
      options: getGameModeOptions(settings.mode),
      onSelect: (option) => {
        setSettings((prev) => ({
          ...prev,
          mode: option.id as GameMode
        }));

        if (option.id === 'competitive') {
          setSettings((prev) => ({ ...prev, digitRange: '2-3', questionLimit: 10, operation: 'shuffle' }));
        }
      }
    });
  };

  // user clicks to choose question limit
  const handleQuestionConfig = () => {
    if (settings.mode === 'infinity' || game.isPlaying) return;

    if (settings.mode == 'competitive') {
      openTyper({
        type: 'list',
        label: lang.gamemode.QuestionTitle,
        options: getQuestionCompetitiveOptions(settings.questionLimit),
        onSelect: (option) => {
          setSettings((prev) => ({ ...prev, questionLimit: Number(option.id) }));
        }
      });

      return;
    }

    const isTime = settings.mode === 'time';
    openTyper({
      type: 'input',
      label: isTime ? lang.gamemode.TimeTitle : lang.gamemode.QuestionTitle,
      helperText: isTime ? lang.gamemode.TimeAsk : lang.gamemode.QuestionAsk,
      numbersOnly: true,
      integerOnly: true,
      min: 1,
      max: isTime ? 3600 : 1000,
      initialValue: String(isTime ? settings.timeLimitSeconds : settings.questionLimit),
      onSubmit: (value) => {
        setSettings((prev) => ({
          ...prev,
          timeLimitSeconds: isTime ? value : prev.timeLimitSeconds,
          questionLimit: !isTime ? value : prev.questionLimit
        }));
      }
    });
  };

  const handleDigitChange = () => {
    if (game.isPlaying) return;

    openTyper({
      type: 'list',
      label: lang.gamemode.DigitTitle,
      options: getDigitOptions(settings.digitRange, settings.mode),
      onSelect: (option) => {
        setSettings((prev) => ({ ...prev, digitRange: option.id }));
      }
    });
  };

  const submitAnswer = () => {
    if (answer.trim() === '') return;

    const value = Number(answer);
    if (Number.isNaN(value)) {
      setAnswer('');
      return;
    }

    game.submitAnswer(value);
    setAnswer('');
  };

  const questionProgressDisplay = game.questionProgress.target
    ? `${game.questionProgress.answered}/${game.questionProgress.target}`
    : `${game.questionProgress.answered}`;

  const handleAnswerKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitAnswer();
    }
  };

  const handleInputFocus = () => {
    if (!game.isPlaying) {
      game.startGame();
    }

    if (questionsRef.current && answerRef.current) {
      const dynamicWidth = Number(answerRef.current.offsetWidth / 2) - Number(questionsRef.current.offsetWidth / 2);
      document.documentElement.style.setProperty('--padding-right-answer-box', `${dynamicWidth}px`);
    }
  };

  const operationSymbol = (operation: Operation) => {
    switch (operation) {
      case 'addition':
        return '+';
      case 'subtraction':
        return '-';
      case 'multiplication':
        return '×';
      case 'division':
        return '÷';
      default:
        return '';
    }
  }

  return (
    <>
      <div id="configbar">
        <div className="menubar" id="chooseoper">
          {operationButtons.map((operation) => {
            const className =
              operation.type === 'shuffle'
                ? `svg${settings.operation === 'shuffle' ? ' active' : ''}`
                : `opsym${settings.operation === operation.id ? ' active' : ''}`;

            if (operation.type === 'shuffle') {
              return (
                <a
                  key={operation.id}
                  data-menu={operation.id}
                  className={game.isPlaying ? className + ' inactive' : className}
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    handleOperationChange(operation.id);
                  }}
                >
                  <ShuffleIcon />
                  <div className="texts">Shuffle</div>
                </a>
              );
            }

            return (
              <a
                key={operation.id}
                data-menu={operation.id}
                className={settings.mode === 'competitive' || game.isPlaying ? className + ' inactive' : className}
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  handleOperationChange(operation.id);
                }}
              >
                {operation.label}
              </a>
            );
          })}
        </div>
        <div className="spacer">
          <div
            className={"config" + (game.isPlaying ? ' inactive' : '')}
            id="chooseModeBtn"
            role="button"
            tabIndex={0}
            onClick={handleModeChange}
          >
            <h1 className="input mono">{modeIcons[settings.mode]}</h1>
            <p className="desc">{lang.gamemode.ModeSmall}</p>
          </div>
          <div
            className={"config" + (settings.mode === 'infinity' || game.isPlaying ? ' inactive' : '')}
            id="chooseQuesBtn"
            role="button"
            tabIndex={0}
            onClick={handleQuestionConfig}
          >
            <h1 className="input mono">{questionValue}</h1>
            <p className="desc">
              {settings.mode === 'time'
                ? lang.gamemode.TimeSmall
                : settings.mode === 'question'
                ? lang.gamemode.QuestionSmall
                : lang.gamemode.InfinitySmall}
            </p>
          </div>
          <div
            className={"config" + (game.isPlaying ? ' inactive' : '')}
            id="chooseDigitBtn"
            role="button"
            tabIndex={0}
            onClick={handleDigitChange}
          >
            <h1 className="input mono">{settings.digitRange}</h1>
            <p className="desc">{lang.gamemode.DigitSmall}</p>
          </div>
        </div>
      </div>

      <div id="ingame" className={game.isPlaying ? 'active' : ''}>
        <div id="ingamestat" className="onWhenActive">
          <div id="counter" className="valNextToImg">
            <CounterIcon className="statsvg" />
            <p className="statvalue">{questionProgressDisplay}</p>
          </div>

          <div id="timer" className="valNextToImg">
            <TimerStatIcon className="statsvg" />
            <p className="statvalue">{formatTime(game.elapsedMs)}</p>
          </div>

          <div id="score" className="valNextToImg">
            <ScoreSuccessIcon className="statsvg keepOnSmall" />
            <p className="statvalue mgright">{game.score.correct}</p>

            <ScoreFailureIcon className="statsvg" />
            <p className="statvalue hideOnSmall">{game.score.incorrect}</p>
          </div>
        </div>

        <div id="question" className="fullWhenActive" ref={questionsRef}>
          <h1 id="firstNumber" className="questionNumber firstNumber mono">
            {numberFormatter.format(game.operands[0])}
          </h1>
          <p id="operationSymbol" className="mono">{operationSymbol(game.operation)}</p>
          <h1 id="secondNumber" className="questionNumber secondNumber mono">
            {numberFormatter.format(game.operands[1])}
          </h1>
        </div>

        <div className="answerHolder">
          <input
            type="number"
            id="answer"
            autoComplete="off"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            onKeyDown={handleAnswerKeyDown}
            onFocus={handleInputFocus}
            ref={answerRef}
          />
          <div className="answerCta"><PlayIcon /><p className="hideOnSmall">START</p></div>
        </div>

        <div id="ingameactions" className="onWhenActive">
          <div
            className="actionbutton"
            role="button"
            tabIndex={0}
            onClick={() => {
              game.stopGame();
              setAnswer('');
            }}
          >
            <ExitIcon className="buttonsvg" />
            <p className="buttontext">Exit</p>
          </div>
          <div
            className="actionbutton"
            role="button"
            tabIndex={0}
            onClick={() => {
              game.restartGame();
              setAnswer('');
            }}
          >
            <RestartIcon className="buttonsvg" />
            <p className="buttontext">Restart</p>
          </div>
        </div>
      </div>
    </>
  );
}
