import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Popover, Avatar, Button } from 'choerodon-ui';

@inject('MenuStore', 'HeaderStore')
@observer
export default class UserPreferences extends Component {
  render() {
    const AppBarIconRight = (
      <div className="user-preference-popover-content">
        <Avatar src="https://avatars3.githubusercontent.com/u/11797760?s=460&v=4" className="user-preference-avatar">
          {'H'}
        </Avatar>
        <div className="popover-title">
          {'Qyellow'}
        </div>
        <div className="popover-text">
          {'qihuang@ghy.cn'}
        </div>
        <div className="popover-msg-wrapper">
          <div className="popover-text">
            {'用户信息'}
          </div>
          <div className="popover-text">
            {'用户密码'}
          </div>
        </div>
        <div className="popover-button-wrapper">
          <Button
            funcType="raised"
            type="primary"
            // onClick={this.preferences.bind(this)}
          >
            {'首选项'}
          </Button>
          <Button
            funcType="raised"
            // onClick={() => logout()}
          >
            {'退出登录'}
          </Button>
        </div>
      </div>
    );

    return (
      <Popover
        overlayClassName="user-preference-popover"
        content={AppBarIconRight}
        trigger="click"
        // visible={HeaderStore.userPreferenceVisible}
        placement="bottomRight"
        // onVisibleChange={this.handleVisibleChange}
      >
        <div className="user-preference">
          <Avatar src="https://avatars3.githubusercontent.com/u/11797760?s=460&v=4">
            {'H'}
          </Avatar>
          <div className="user-preference-name">祁煌</div>
        </div>
      </Popover>
    );
  }
}
