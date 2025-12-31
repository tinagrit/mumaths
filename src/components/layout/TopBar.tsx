import { Link, NavLink } from 'react-router-dom';
import { lang } from '../../data/lang';
import { getMainOptions, getExpansion } from '../../hooks/preferencesTyper';
import { useTyper } from '../../components/typer/TyperProvider';
import { AboutIcon, CalculationIcon, FactorIcon, FormulaIcon, Game24Icon, PreferencesIcon } from '../icons';

export default function TopBar() {
  const { openTyper } = useTyper();

  const handleMainOptions = () => {
    openTyper({
      type: 'list',
      label: lang.preferences.Title,
      keepTyperOnSelect: true,
      options: getMainOptions(),
      onSelect: (option) => {
        if (option.expandable) {
          openTyper({
            type: 'list',
            label: option.description || '',
            options: option.expansion ? option.expansion() : [],
            onSelect: (subOption) => {
              subOption.callback?.();
            }
          });
        } else {
          option.callback?.();
        }
      }
    });
    
    return;
  }

  const quickLinks = [
    { id: 'about', label: lang.features.AboutPage, path: '/about', icon: AboutIcon },
    { id: 'preferences', label: lang.features.PreferencesPage, icon: PreferencesIcon, do: handleMainOptions }
  ];

  const modeLinks = [
    { id: 'calculation', label: lang.features.CalculationMode, path: '/calculation', icon: CalculationIcon },
    { id: 'twentyfour', label: lang.features.TwentyFourMode, path: '/twentyfour', icon: Game24Icon },
    { id: 'factor', label: lang.features.FactorMode, path: '/factor', icon: FactorIcon }
  ];

  return (
    <div id="topbar" className="blockelem">
      <div className="section left">
        <div className="logo">
          <Link to="/">
            <h1 className="title hideOnSmall">{lang.metadata.NameDisplay}</h1>
            <h1 className="title showOnSmall">{lang.metadata.NameDisplayTiny}</h1>
          </Link>
        </div>
        <div className="menubar nowrap" id="titlemenu">
          {quickLinks.map((item) => (
            item.path ? (
              <NavLink key={item.id} to={item.path} className={({ isActive }) => `svg${isActive ? ' active' : ''}`}>
                <item.icon />
                <div className="texts">{item.label}</div>
              </NavLink>
            ) : (
              <a
                key={item.id}
                className="svg"
                role="button"
                tabIndex={0}
                onClick={item.do}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') item.do?.();
                }}
              >
                <item.icon />
                <div className="texts">{item.label}</div>
              </a>
            )
          ))}
        </div>
      </div>
      <div className="section right">
        <div className="menubar nowrap" id="mode">
          {modeLinks.map((mode) => (
            <NavLink key={mode.id} to={mode.path} className={({ isActive }) => `svg${isActive ? ' active' : ''}`}>
              {mode.icon ? <mode.icon /> : null}
              <div className="texts">{mode.label}</div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
