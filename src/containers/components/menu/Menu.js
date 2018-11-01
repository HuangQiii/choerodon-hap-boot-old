import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon, Tooltip } from 'choerodon-ui';
import classNames from 'classnames';
import './style';

const { SubMenu } = Menu;

@withRouter
@inject('MenuStore')
@observer
export default class MenuBar extends Component {
  componentWillMount() {
    this.loadMenu(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadMenu(nextProps);
  }

  loadMenu(props) {
    const { location: { pathname }, MenuStore } = props;
    const { menus } = MenuStore;
    const isReact = !pathname.startsWith('/iframe/');
    const key = isReact
      ? pathname.split('/')[1]
      : pathname.split('/')[2];

      MenuStore.loadMenus().then(() => {
        MenuStore.getPathById(key, menus, isReact, (temppath, targetNode) => {
          MenuStore.setOpenKeys(temppath);
          MenuStore.setSelectedKeys([targetNode.functionCode]);
          MenuStore.setActiveMenu(targetNode);
        }, () => {
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
          MenuStore.setSelectedKeys([construct_tab.functionCode]);
          MenuStore.setActiveMenu(construct_tab);
        });
      MenuStore.getTreeNodeMenus(menus, (treeNodes) => {
        MenuStore.setTreeNodeMenus(treeNodes);
      });
    });
  }

  onOpenChange = (openKeys) => {
    const { MenuStore } = this.props;
    MenuStore.setOpenKeys(openKeys);
  }

  onCollapsed = () => {
    const { MenuStore } = this.props;
    const { collapsed } = MenuStore;
    MenuStore.setCollapsed(!collapsed);
  }

  renderMenu(menu) {
    if (menu.children) {
      return (
        <SubMenu
          key={menu.functionCode}
          title={(
            <span>
              <Icon type="quality" />
              <span>{menu.text}</span>
            </span>
          )}
        >
          {menu.children.map(submenu => this.renderMenu(submenu))}
        </SubMenu>
      )
    }
    return this.renderMenuItem(menu);
  }


  renderMenuItem(menuItem) {
    const { functionCode, text, symbol, url } = menuItem;
    let link;
    if (symbol === '1') {
      link = `/${url}`;
    } else {
      link = `/iframe/${functionCode}`;
    }
    return (
      <Menu.Item key={functionCode}>
        <Link to={link}>
          <Icon type="relate" />
          <span>{text}</span>
        </Link>
      </Menu.Item>
    );
  }

  render() {
    const { MenuStore } = this.props;
    const { collapsed, openKeys, selectedKeys, menus } = MenuStore;
    return (
      <div className={classNames('menu-content', { 'menu-collapsed': collapsed })}>
        <Tooltip placement="right" title={collapsed ? '首页1' : ''}>
          <div className="menu-head">
            <span>
              <Icon type="home" />
              <span className={classNames({ 'menu-head-collapsed': collapsed })}>首页</span>
            </span>
          </div>
        </Tooltip>
        <div className="menu-body">
          <Menu
            theme="light"
            mode="inline"
            inlineCollapsed={collapsed}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onOpenChange={this.onOpenChange}
          >
            {menus.map(menu => this.renderMenu(menu))}
          </Menu>
        </div>
        <div
          className="menu-footer"
          onClick={this.onCollapsed}
        >
          <Icon type={!collapsed ? "first_page" : "last_page"} />
        </div>
      </div>
    );
  }
}
