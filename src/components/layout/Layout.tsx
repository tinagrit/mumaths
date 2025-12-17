import { PropsWithChildren } from 'react';
import TopBar from './TopBar';
import { TyperProvider } from '../typer/TyperProvider';
import TyperModal from '../typer/TyperModal';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <TyperProvider>
      <div id="pagecontent">
        <div id="app">
          <div id="paintful">
            <div id="mainWidthcontroller" className="widthcontroller">
              <TopBar />
              <div id="game" className="blockelem">
                {children}
              </div>
            </div>
          </div>
          <TyperModal />
        </div>
      </div>
    </TyperProvider>
  );
}
