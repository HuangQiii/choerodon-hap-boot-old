import React, { Component } from 'react';
// import { CacheRoute, CacheSwitch } from './containers/components/cache';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import IFRAMEINDEX from './containers/components/iframeWrapper';
import REACTINDEX from './test/REACTINDEX';

export default class AutoRouter extends Component {
  render() {
    return (
      <CacheSwitch>
        <CacheRoute exact path='/iframe/:name' cacheKey="iframe" component={IFRAMEINDEX} />
        <CacheRoute exact path='/test' cacheKey="REACT_TEST" component={REACTINDEX} />
      </CacheSwitch>
    );
  }
}
