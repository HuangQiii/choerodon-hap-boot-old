import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { run, get, value } from '../helpers/try'
import { register, getCacheByKey } from './manager'

const __new__lifecycles =
  Number(get(run(React, 'version.match', /^\d*\.\d*/), [0])) >= 16.3

const getDerivedStateFromProps = (nextProps, prevState) => {
  let { match: nextPropsMatch, when = 'forward' } = nextProps

  if (get(nextPropsMatch, '__CacheRoute__computedMatch__null')) {
    nextPropsMatch = null
  }

  if (!prevState.cached && nextPropsMatch) {
    return {
      cached: true,
      matched: true
    }
  }

  if (prevState.matched && !nextPropsMatch) {
    const nextAction = get(nextProps, 'history.action')

    let __cancel__cache = false

    switch (when) {
      case 'always':
        break
      case 'back':
        if (['PUSH', 'REPLACE'].includes(nextAction)) {
          __cancel__cache = true
        }

        break
      case 'forward':
      default:
        if (nextAction === 'POP') {
          __cancel__cache = true
        }
    }

    if (__cancel__cache) {
      return {
        cached: false,
        matched: false
      }
    }
  }

  if (nextProps.cacheKey === 'iframe') {
    return {
      cached: true,
      matched: !!nextPropsMatch
    }
  }

  return {
    matched: !!nextPropsMatch
  }
}

export default class CacheComponent extends Component {
  static propsTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
    className: PropTypes.string,
    when: PropTypes.oneOf(['forward', 'back', 'always']),
    behavior: PropTypes.func
  }

  static defaultProps = {
    when: 'forward',
    behavior: cached =>
      cached
        ? {
            style: {
              display: 'none'
            }
          }
        : undefined
  }

  constructor(props, ...args) {
    super(props, ...args)

    if (props.cacheKey) {
      register(props.cacheKey, this)
    }

    this.state = getDerivedStateFromProps(props, {
      cached: false,
      matched: false
    })
  }

  static getDerivedStateFromProps = __new__lifecycles
    ? getDerivedStateFromProps
    : undefined

  componentWillReceiveProps = !__new__lifecycles
    ? nextProps => {
        const nextState = this.setState(
          getDerivedStateFromProps(nextProps, this.state)
        )
      }
    : undefined

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.cached || !this.state.cached) {
      return
    }

    if (prevState.matched === true && this.state.matched === false) {
      return run(this, 'cacheLifecycles.__listener.didCache')
    }

    if (prevState.matched === false && this.state.matched === true) {
      return run(this, 'cacheLifecycles.__listener.didRecover')
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.matched ||
      nextState.matched ||
      this.state.cached !== nextState.cached
    )
  }

  cacheLifecycles = {
    __listener: {},
    didCache: listener => {
      this.cacheLifecycles.__listener['didCache'] = listener
    },
    didRecover: listener => {
      this.cacheLifecycles.__listener['didRecover'] = listener
    },
    register: cacheKey => {
      register(cacheKey, this)
    }
  }

  render() {
    const { className: behavior__className = '', ...behaviorProps } = value(
      this.props.behavior(!this.state.matched),
      {}
    )
    const { className: props__className = '' } = this.props
    const className = run(`${props__className} ${behavior__className}`, 'trim')
    const hasClassName = className !== ''

    return this.state.cached ? (
      <div className={hasClassName ? className : undefined} {...behaviorProps}>
        {
          getCacheByKey(this.props.location.pathname) 
            ? React.createElement(getCacheByKey(this.props.location.pathname))
            : run(this.props, 'children', this.cacheLifecycles)
        }
      </div>
    ) : null
  }
}
