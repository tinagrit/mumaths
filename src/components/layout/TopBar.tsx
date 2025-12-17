import { Link, NavLink } from 'react-router-dom';
import { lang } from '../../data/lang';
import { AboutIcon, CalculationIcon, FactorIcon, FormulaIcon, Game24Icon, PreferencesIcon } from '../icons';

const quickLinks = [
  { id: 'about', label: lang.features.AboutPage, path: '/about', icon: AboutIcon },
  { id: 'preferences', label: lang.features.PreferencesPage, path: '/preferences', icon: PreferencesIcon }
];

const modeLinks = [
  { id: 'calculation', label: lang.features.CalculationMode, path: '/calculation', icon: CalculationIcon },
  { id: 'twentyfour', label: lang.features.TwentyFourMode, path: '/twentyfour', icon: Game24Icon },
  { id: 'factor', label: lang.features.FactorMode, path: '/factor', icon: FactorIcon }
];

export default function TopBar() {
  return (
    <div id="topbar" className="blockelem">
      <div className="section left">
        <div className="logo">
          <Link to="/">
            <h1 className="title">{lang.metadata.NameDisplay}</h1>
          </Link>
        </div>
        <div className="menubar nowrap" id="titlemenu">
          {quickLinks.map((item) => (
            <NavLink key={item.id} to={item.path} className={({ isActive }) => `svg${isActive ? ' active' : ''}`}>
              <item.icon />
              <div className="texts">{item.label}</div>
            </NavLink>
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
