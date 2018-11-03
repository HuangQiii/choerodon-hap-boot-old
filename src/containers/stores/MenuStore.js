import { action, computed, observable } from 'mobx';
import CacheRoute, { dropByCacheKey, getCachingKeys } from 'react-router-cache-route';
import axios from 'axios';
import _ from 'lodash';
import { observer } from 'mobx-react';

class MenuStore {
  @observable collapsed = false;

  @observable menus = [];

  @observable treeNodeMenus = [];

  @observable tabs = [];

  @observable openKeys = [];

  @observable selectedKeys = [];

  @observable activeMenu = {};

  @observable expanded = false;

  @computed
  get getMenus() {
    return this.menus.slice();
  }

  @computed
  get getTabs() {
    return this.tabs.slice();
  }

  @computed
  get getSelectedKeys() {
    return this.selectedKeys.slice();
  }

  @action
  setCollapsed(data) {
    this.collapsed = data;
  }

  @action
  setTabs(data) {
    this.tabs = data;
  }

  @action
  setTreeNodeMenus(data) {
    this.treeNodeMenus = data;
  }

  @action
  setMenus(data) {
    this.menus = data;
  }

  @action
  setActiveMenu(data) {
    this.activeMenu = data;
  }

  @action
  setOpenKeys(data) {
    this.openKeys = data;
  }

  @action
  setSelectedKeys(data) {
    this.selectedKeys = data;
  }

  @action
  setMenuExpanded(data) {
    this.expanded = data;
  }

  @action
  closeTab(value, prop = 'functionCode') {
    const { tabs } = this;
    _.remove(tabs, v => v[prop] === value);
    this.setTabs(tabs);
  }

  @action
  clearCacheByCacheKey(cacheKey) {
    dropByCacheKey(cacheKey);
  }

  @action
  closeTabAndClearCacheByCacheKey(obj) {
    let val;
    let prop;
    if (obj.symbol === '1') {
      val = obj.url;
      prop = 'url';
    } else {
      val = obj.functionCode;
      prop = 'functionCode';
    }
    this.closeTab(val, prop);
    dropByCacheKey(obj.functionCode);
  }

  getSubmenuByCode(code) {
    const menus = this.getMenus;
    let target = {};
    menus.forEach((submenu) => {
      if (submenu && submenu.children.length) {
        submenu.children.forEach((menuList) => {
          if (menuList.functionCode === code) {
            target = submenu;
          }
        });
      }
    });
    return target;
  }

  /* eslint-disable */
  getPathById(functionCode, tree, isReact, cb, noMatchCb = () => {}) {
    const key = isReact ? 'url' : 'functionCode';
    const path = [];
    let targetNode;
    try {
      function getNodePath(node) {
        path.push(node.functionCode);

        if (node[key] === functionCode) {
          targetNode = node;
          throw ("Get Target Node!");
        }
        if (node.children && node.children.length > 0) {
          for (let i = 0; i < node.children.length; i++) {
            getNodePath(node.children[i]);
          }
          path.pop();
        }
        else {
          path.pop();
        }
      }
      tree.forEach(v => getNodePath(v));
      noMatchCb();
    } catch (e) {
      cb(path, targetNode);
    }
  };

  getTreeNodeMenus(tree, cb, key = 'functionCode') {
    const treeNodes = [];
    try {
      function getNodePath(node) {
        if (!node.children) {
          treeNodes.push(node);
        }

        if (node.children && node.children.length > 0) {
          for (let i = 0; i < node.children.length; i++) {
            getNodePath(node.children[i]);
          }
        }
      }
      tree.forEach(v => getNodePath(v));
      cb(treeNodes);
    } catch (e) {
    }
  };
  /* eslint-enable */

  getMenuItemByCode(code) {
    const menus = this.getMenus;
    let target = {};
    menus.forEach((submenu) => {
      if (submenu && submenu.children.length) {
        submenu.children.forEach((menuList) => {
          if (menuList.functionCode === code) {
            target = menuList;
          }
        });
      }
    });
    return target;
  }

  getNextTab(tab) {
    const tabs = this.getTabs;
    const len = tabs.length;
    const idx = tabs.findIndex(t => t.functionCode === tab.functionCode);
    if (idx === 0 && len === 1) return {};
    if (idx === 0 && len > 1) return tabs[1];
    return tabs[idx - 1];
  }

  loadMenus() {
    return axios.get('/sys/function/menus').then((res) => {
      this.setMenus(res.data);
    });
  }
}

const menuStore = new MenuStore();
export default menuStore;
