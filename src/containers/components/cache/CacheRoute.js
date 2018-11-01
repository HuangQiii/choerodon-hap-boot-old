import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { getCacheByKey } from './core/manager';

import CacheComponent from './core/CacheComponent'

const isEmptyChildren = children => React.Children.count(children) === 0

export default class CacheRoute extends Component {
  static componentName = 'CacheRoute'

  static propTypes = {
    component: PropTypes.func,
    render: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    className: PropTypes.string,
    when: PropTypes.oneOf(['forward', 'back', 'always']),
    behavior: PropTypes.func
  }

  static defaultProps = {
    when: 'forward'
  }

  render() {
    let {
      children,
      render,
      component,
      className,
      when,
      behavior,
      cacheKey,
      ...rest_props
    } = this.props

    if (React.isValidElement(children) || !isEmptyChildren(children)) {
      render = () => children
    }

    const pn = this.props.location.pathname;

    cacheKey = pn;

    return (
      <Route
        {...rest_props}
        children={props => (
          <CacheComponent
            {...props}
            {...{ when, className, behavior, cacheKey }}
          >
            {cacheLifecycles => 
              {
                if (!getCacheByKey(pn)) {
                  cacheLifecycles.register(pn);
                }
                Object.assign(props, { cacheLifecycles })

                return React.createElement(component, props)
              }
            }
          </CacheComponent>
        )}
      />
    )
  }
}
