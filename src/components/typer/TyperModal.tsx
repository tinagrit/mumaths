import { useEffect, useMemo, useRef, useState } from 'react';
import { lang } from '../../data/lang';
import { CheckmarkIcon, CloseIcon } from '../icons';
import { useTyper } from './TyperProvider';
import { TyperInputRequest, TyperListOption, TyperListRequest, TyperRequest } from './types';

// turn all options into one lowercase string
const buildSearchText = (option: TyperListOption) =>
  [option.title, option.description, ...(option.searchTerms ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

export default function TyperModal() {
  // context
  const { request, closeTyper } = useTyper();

  const [displayedRequest, setDisplayedRequest] = useState<TyperRequest | null>(null);
  const [search, setSearch] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [isActive, setIsActive] = useState(false);
  const [hasOpacity, setHasOpacity] = useState(false);

  // ptr to <input>
  const inputRef = useRef<HTMLInputElement | null>(null);

  // handle css animation
  useEffect(() => {
    if (request) {
      setDisplayedRequest(request);
      setIsActive(true);
      window.setTimeout(() => setHasOpacity(true), 10);
      console.log('request', request);
    } else {
      setHasOpacity(false);
      window.setTimeout(() => {
        setIsActive(false);
        setDisplayedRequest(null);
      }, 200);
    }
  }, [request]);

  useEffect(() => {
    if (!displayedRequest) {
      setSearch('');
      setInputValue('');
      return;
    }

    setSearch('');
    if (displayedRequest.type === 'input') {
      setInputValue(displayedRequest.initialValue ?? '');
    } else {
      setInputValue('');
    }

    window.setTimeout(() => {inputRef.current?.focus();}, 10);
  }, [displayedRequest]);

  // esc to close
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (!displayedRequest) return;
      if (event.key === 'Escape') closeTyper();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [displayedRequest, closeTyper]);

  // filter search for lists
  const filteredOptions = useMemo(() => {
    if (!displayedRequest || displayedRequest?.type !== 'list') return [];

    const query = search.trim().toLowerCase();
    if (!query) return displayedRequest.options;

    return displayedRequest.options.filter((option) => buildSearchText(option).includes(query));
  }, [displayedRequest, search]);

  const handleListSelect = (option: TyperListOption) => {
    if (!displayedRequest || displayedRequest?.type !== 'list') return;

    displayedRequest.onSelect(option);

    if (!displayedRequest.keepTyperOnSelect) {
      closeTyper();
    }
  };

  // err msg for bad input
  const getValidationError = () => {
    if (!displayedRequest || displayedRequest?.type !== 'input' || inputValue.trim() === '') return null;

    if (displayedRequest.numbersOnly) {
      const value = Number(inputValue);

      if (Number.isNaN(value)) {
        return lang.error.NumbersOnly;
      }

      if (displayedRequest.integerOnly && !Number.isInteger(value)) {
        return lang.error.NumbersOnly;
      }

      if (typeof displayedRequest.max === 'number' && value > displayedRequest.max) {
        return lang.error.ExceedNumbers.replace('{query}', String(displayedRequest.max));
      }

      if (typeof displayedRequest.min === 'number' && value < displayedRequest.min) {
        return lang.error.SmallNumbers.replace('{query}', String(displayedRequest.min));
      }
    }

    return null;
  };

  const handleInputSubmit = () => {
    if (!displayedRequest || displayedRequest?.type !== 'input' || inputValue.trim() === '') return null;

    if (getValidationError()) return;

    const value = Number(inputValue);
    displayedRequest.onSubmit(value);
    closeTyper();
  };

  const renderList = () => {
    if (!displayedRequest || displayedRequest?.type !== 'list') return null;

    if (filteredOptions.length === 0) {
      return (
        <div className="errlist">
          <em>{lang.error.NotFoundFor.replace('{query}', search || '…')}</em>
        </div>
      );
    }

    return filteredOptions.map((option) => (
      <div
        className={`list${option.selected ? ' check active' : ''}${option.icon ? ' headingimg' : ''}`}
        key={option.id}
        onClick={() => handleListSelect(option)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleListSelect(option);
          }
        }}
      >
        {option.icon ? <div className="svgcontainer">{option.icon}</div> : null}
        <div>
          {option.title ? <h1>{option.title}</h1> : null}
          {option.description ? <p>{option.description}</p> : null}
        </div>
        {option.selected ? <CheckmarkIcon /> : null}
      </div>
    ));
  };

  const renderInput = () => {
    if (!displayedRequest || displayedRequest?.type !== 'input') return null;

    const validationError = getValidationError();
    const hasTypedValue = inputValue.trim() !== '';

    if (!hasTypedValue) {
      return (
        <div className="list">
          <p>{displayedRequest.helperText ?? lang.gamemode.QuestionAsk}</p>
        </div>
      );
    }

    if (validationError) {
      return (
        <div className="errlist">
          <em>{validationError}</em>
        </div>
      );
    }

    return (
      <div 
        className="list" 
        role="button" 
        tabIndex={0} 
        onClick={handleInputSubmit} 
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleInputSubmit();
          }
        }}
      >
        <h1>
          {lang.typer.SetToInput} <strong>{inputValue}</strong>
        </h1>
        {displayedRequest.helperText ? <p>{displayedRequest.helperText}</p> : null}
      </div>
    );
  };

  const topInputValue = displayedRequest ? (displayedRequest.type === 'input' ? inputValue : search) : '';
  const rootClass = `${isActive ? 'active' : ''} ${hasOpacity ? 'opacity' : ''}`.trim();

  const content = !displayedRequest ? null : (displayedRequest?.type === 'list' ? renderList() : renderInput());

  return (
    <div
      id="typer"
      className={rootClass}
      role="dialog"
      aria-modal="true"
      onClick={() => {
        if (isActive) {
          closeTyper();
        }
      }}
    >
      <div id="typerui" onClick={(event) => event.stopPropagation()}>
        <div className="typerholder">
          <input
            type="text"
            id="typerinput"
            placeholder={displayedRequest?.label ? '> ' + displayedRequest.label : lang.typer.TypeHerePlaceHolder}
            autoComplete="off"
            value={topInputValue}
            disabled={!isActive}
            onChange={(event) => {
              if (!isActive) {
                return;
              }
              if (displayedRequest?.type === 'input') {
                setInputValue(event.target.value);
              } else {
                setSearch(event.target.value);
              }
            }}
            onKeyDown={(event) => {
              if (!isActive || !displayedRequest) {
                return;
              }
              if (event.key === 'Enter') {
                if (displayedRequest.type === 'input') {
                  handleInputSubmit();
                } else if (filteredOptions.length > 0) {
                  handleListSelect(filteredOptions[0]);
                }
              }
            }}
            onTouchStart={() => {
              inputRef.current?.focus();
            }}
            ref={inputRef}
          />
          <div
            id="closetyperX"
            role="button"
            tabIndex={0}
            onClick={() => isActive && closeTyper()}
            onKeyDown={(event) => {
              if ((event.key === 'Enter' || event.key === ' ') && isActive) {
                event.preventDefault();
                closeTyper();
              }
            }}
          >
            <CloseIcon />
          </div>
        </div>
        <div id="typercontent">
          <div id="typerlists">{content}</div>
        </div>
      </div>
    </div>
  );
}
