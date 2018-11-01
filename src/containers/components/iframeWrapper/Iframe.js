import React, { Component } from 'react';

export default class Iframe extends Component {
  render(){
    const { tab } = this.props;
    return (
      <div style={{ width: '100%', height: 'calc(100vh - 103px)', overflow: 'hidden' }}>
        <iframe
          id="iframe"
           src={`/${tab.url}`}
          // src="http://localhost:8080/hr/org_unit.html"
        //   src="http://baidu.com"
          width='100%'
          height='100%'
        />
      </div>
    )
  }
}
