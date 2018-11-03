import React from 'react';
import { HashRouter } from 'react-router-dom';
import Header from '../header';
import Menu from '../menu';
import Tabbar from '../tabbar';
import AutoRouter from '../../../AutoRouter';

export default class Index extends React.Component {
  render() {
    return (
      <HashRouter>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
          <Header />
          <div style={{ flex: 1, display: 'flex' }}>
            <Menu />
            <div style={{ flex: 1 }}>
              <Tabbar />
              <AutoRouter />
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}
