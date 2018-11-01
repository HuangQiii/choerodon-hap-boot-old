import React, { Component } from 'react';
import Logo from './Logo';
import SearchInput from './SearchInput';
import UserPreferences from './UserPreferences';
import './style';

export default class Header extends Component {
  render() {
    return (
      <div className="master-head-wrap">
        <div className="master-head-left">
          <Logo />
        </div>
        <div className="master-head-center">
          <SearchInput />
        </div>
        <div className="master-head-right">
          <UserPreferences />
        </div>
      </div>
    );
  }
}
