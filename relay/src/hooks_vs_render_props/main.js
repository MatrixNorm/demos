import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './styles.css'

const body = document.getElementsByTagName('body')[0]
const appContainer = document.createElement('div')
body.insertBefore(appContainer, body.firstChild)

ReactDOM.render(
  <App />,
  appContainer
)