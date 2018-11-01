import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Icon } from 'choerodon-ui';
import classNames from 'classnames';
import './style';

@withRouter
@inject('MenuStore')
@observer
export default class MenuBar extends Component {
  componentWillMount() {
    this.loadTabbar(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadTabbar(nextProps);
  }

  loadTabbar(props) {
    const { location, MenuStore } = props;
    const { pathname } = location;
    const { menus } = MenuStore;
    const isReact = !pathname.startsWith('/iframe/');
    const key = isReact
      ? pathname.split('/')[1]
      : pathname.split('/')[2];

    MenuStore.getPathById(
      key, menus, isReact,
      (temppath, targetNode) => {
        this.insertTabs(key, isReact, targetNode);
      },
      () => {
        if (pathname === '/') return;
        const construct_tab = {
          "children":null,
          "expand":false,
          "functionCode":key,
          "icon":"",
          "id":-1,
          "ischecked":null,
          "score":-1,
          "shortcutId":null,
          "text":key,
          "url":key,
          "symbol": isReact ? '1' : '0',
        };
        this.insertTabs(key, isReact, construct_tab);
      });
  }

  insertTabs(key, isReact, tab) {
    const { MenuStore } = this.props;
    const tabs = MenuStore.getTabs;
    if (!tabs.find(v => v && v[isReact ? 'url' : 'functionCode'] === key)) {
      tabs.push(tab);
      MenuStore.setTabs(tabs);
    }
  }

  handleLink(tab) {
    const { MenuStore: { selectedKeys } } = this.props;
    const isReact = tab.symbol === '1';

    if (selectedKeys.length && selectedKeys[0] === tab.functionCode) return;

    const link = isReact
      ? `/${tab.url}`
      : `/iframe/${tab.functionCode}`;
    this.props.history.push(link);
  }

  handleCloseTab(tab, event) {
    const { MenuStore } = this.props;
    const { selectedKeys } = MenuStore;
    event.stopPropagation();
    if (selectedKeys.length && selectedKeys[0] === tab.functionCode) {
      const desTab = MenuStore.getNextTab(tab);
      let desUrl;
      if (desTab.functionCode) {
        if (desTab.symbol === '1') {
          desUrl = `/${desTab.url}`;
        } else {
          desUrl = `/iframe/${desTab.functionCode}`;
        }
      } else {
        desUrl = '/';
      }
      this.props.history.push(desUrl);
    }
    MenuStore.closeTabAndClearCacheByCacheKey(tab);
  }

  render() {
    const { location : { pathname }, MenuStore } = this.props;
    const { tabs } = MenuStore;
    return (
      <div className="tab-bar-wrap">
        <ul className="tab-bar-list">
          {
            tabs.filter(v => !!v).map(tab => (
              <li
                key={tab.functionCode}
                className={classNames({
                  tab: true,
                  'tab-active': pathname === `/${tab.url}` || pathname === `/iframe/${tab.functionCode}`,
                })}
                onClick={this.handleLink.bind(this, tab)}
              >
                  {tab.text}
                  <Icon
                    type="close"
                    style={{ fontSize: 14, marginLeft: 20 }}
                    onClick={this.handleCloseTab.bind(this, tab)}
                  />
              </li>
              )
            )
          }
        </ul>
    </div>
    );
  }
}
