import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Tabs } from 'choerodon-ui';
import Iframe from './Iframe';
import './style.less';

const { TabPane } = Tabs;

@withRouter
@inject('MenuStore')
@observer
export default class Main extends Component {
  render() {
    const { MenuStore } = this.props;
    const { activeMenu: { functionCode }, tabs } = MenuStore;

    return (
      <div>
        <Tabs activeKey={functionCode} animated={false}>
          {
            tabs.map(tab => (
              <TabPane
                tab="TAB_IFRAME"
                key={tab.functionCode}
                forceRender={false}
              >
                <Iframe tab={tab} />
              </TabPane>
            ))
          }
        </Tabs>
      </div>
    );
  }
}
