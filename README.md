# react-native-context-logger
A very very basic logger for the `useReducer` function in the [React Hooks API](https://reactjs.org/docs/hooks-reference.html#usereducer). Inspired by [redux-logger](https://github.com/LogRocket/redux-logger).

# Usage
1. Install with `npm install react-native-context-logger --save-dev` or `yarn add react-native-context-logger -D`
2. Import logger with

```javascript
import {useLogger} from 'react-native-context-logger';
```

3. Wrap your reducer with logger before passing it to `useReducer`

```javascript
const [state, dispatch] = useReducer(useLogger(reducer), initialState);
```

See [Example](https://github.com/jefflombard/react-native-context-logger-example)

## In a Dev Environment
You should only use this in a `dev` environment. So you could do something like this to apply the logger based on the `env`.

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

const [state, dispatch] = (
  process.env.NODE_ENV === 'development' ? useLogger(reducer) : reducer,
  initialState
);
```

# Contributing
Contributions are welcome.
