import { Counter } from './components'
import { map, scan } from 'most'
import ActionTypes from './actions/actionTypes'
import reducer from './reducers'
import {
  createStream,
  dispatch,
  enableLogging,
  renderChanges,
  run,
} from './utils'
// import curry from 'ramda'
import curry from 'lodash/fp/curry'
import 'inferno-devtools'

// Create stream of actions
const actions$ = createStream()

// Create counter props
const counterProps = {
  title: 'Inferno + Most',
  subtitle: 'Counter Demo',
  decrement: _ => dispatch(ActionTypes.Decrement(), actions$),
  increment: _ => dispatch(ActionTypes.Increment(), actions$),
  reset: _ => dispatch(ActionTypes.Reset(), actions$),
  alert: _ => dispatch(ActionTypes.Alert(), actions$),
}

// Apply props to Counter, returning a view function which takes a state
const view = curry(Counter)(counterProps)

// Set initial state of Counter
const initialState = 0

// Data flow for the entire app
const state$ = scan(reducer, initialState, actions$)
const vTree$ = map(view, state$)

// NOTE: Effectful code must always disable fp/no-unused-expression
// This is fine. Use the linter to help you be vigilant.

/* eslint-disable fp/no-unused-expression */

// Logging
enableLogging(state$)

// Run app
run(renderChanges(vTree$), document.getElementById('root'))

/* eslint-enable fp/no-unused-expression */
