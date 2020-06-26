import React from "react"

import { CoreCube } from "./CoreCube"
import "./styles.css"

export default function App() {
  let coreCube

  return (
    <div className="App">
      <h2>toio Core Cube コントローラー</h2>

      <button onClick={async () => (coreCube = await CoreCube.discover())}>接続</button>
      <br />

      <button onClick={async () => await coreCube.move(30, 30, 250)}>前進</button>
      <button onClick={async () => await coreCube.move(-30, 30, 250)}>左回転</button>
      <button onClick={async () => await coreCube.move(30, -30, 250)}>右回転</button>
      <button onClick={async () => await coreCube.move(-30, -30, 250)}>後進</button>
    </div>
  )
}
