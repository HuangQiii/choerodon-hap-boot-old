import React from 'react'
import PropTypes from 'prop-types'
import { Switch, matchPath } from 'react-router-dom'

import { isNull } from './helpers/is'

export default class CacheSwitch extends Switch {
  static contextTypes = {
    router: PropTypes.shape({
      route: PropTypes.object.isRequired
    }).isRequired
  }

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object
  }

  render() {
    const { route } = this.context.router
    const { children } = this.props
    const location = this.props.location || route.location

    let MATHED = false

    return React.Children.map(children, element => {
      if (!React.isValidElement(element)) return null

      const { path: pathProp, exact, strict, sensitive, from } = element.props
      const path = pathProp || from
      const match = MATHED
        ? null
        : matchPath(
            location.pathname,
            { path, exact, strict, sensitive },
            route.match
          )

      const child = React.cloneElement(element, {
        location,
        computedMatch: isNull(match)
          ? { __CacheRoute__computedMatch__null: true }
          : match
      })

      if (!MATHED) {
        MATHED = !!match
      }

      return child
    })
  }
}
