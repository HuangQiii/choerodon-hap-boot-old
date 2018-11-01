import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Select, Icon } from 'choerodon-ui';

const { Option } = Select;

@withRouter
@inject('MenuStore')
@observer
export default class SearchInput extends Component {

  onChange = (code) => {
    const { MenuStore } = this.props;
    const { treeNodeMenus, activeMenu } = MenuStore;
    const target = treeNodeMenus.find(node => node.functionCode === code);
    if (target && target.functionCode !== activeMenu.functionCode) {
      const isReact = !!target.symbol;
      const desUrl = isReact 
        ? `/${target.url}`
        : `/iframe/${target.functionCode}`;
      this.props.history.push(desUrl);
    }
  }

  render() {
    const { MenuStore } = this.props;
    return (
      <div className="search-input-wrap">
        <Icon type="search" />
        <Select
          style={{ width: 400 }}
          placeholder="输入功能代码或功能名称"
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          filter
          onChange={this.onChange}
        >
          {
            MenuStore.treeNodeMenus.map(node => (
              <Option 
                key={node.functionCode}
                value={node.functionCode}
              >
                {node.text}
              </Option>
            ))
          }
        </Select>
      </div>
    );
  }
}
