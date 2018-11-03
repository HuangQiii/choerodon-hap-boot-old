import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { observer, Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import stores from './containers/stores/index';
import Master from './containers/components/master';

@observer
class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <div>
          <Router hashHistory={createBrowserHistory}>
            <Switch>
              <Route path="/" component={Master} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
