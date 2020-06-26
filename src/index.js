import React from "react"
import ReactDOM from "react-dom"

// import App from "./App"
import App from "./SimpleApp"
import "./styles.css"

const rootElement = document.getElementById("root")
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
)
