import React, { Component } from 'react';

export default class Iframe extends Component {
  render() {
    const { tab } = this.props;
    return (
      <div style={{ width: '100%', height: 'calc(100vh - 103px)', overflow: 'hidden' }}>
        <iframe
          title="iframe"
          id="iframe"
          src={`/${tab.url}`}
          width="100%"
          height="100%"
        />
      </div>
    );
  }
}
