import React, { useState } from "react"

import { CoreCube } from "./CoreCube"
import "./styles.css"

function CoreCubeState(props) {
  const [state, setState] = useState({ x: 0, y: 0, direction: 0 })

  const moveForward = async () => await props.target.move(30, 30, 250)
  const moveBackward = async () => await props.target.move(-30, -30, 250)
  const turnLeft = async () => await props.target.move(-30, 30, 250)
  const turnRight = async () => await props.target.move(30, -30, 250)

  setInterval(() => {
    setState({
      x: props.target.x,
      y: props.target.y,
      direction: props.target.direction
    })
  }, 1000)

  return (
    <>
      <button onClick={moveForward}>前進</button>
      <button onClick={moveBackward}>後進</button>
      <button onClick={turnLeft}>左回転</button>
      <button onClick={turnRight}>右回転</button>

      <span style={{ marginLeft: 16 }}>
        ({state.x}, {state.y}) {state.direction}
      </span>
    </>
  )
}

export default function App() {
  const [coreCubes, setCoreCubes] = useState([])

  return (
    <div className="App">
      <h2>toio Core Cube コントローラー</h2>

      <button
        onClick={async () => {
          const coreCube = await CoreCube.discover()
          setCoreCubes(coreCubes.concat(coreCube))
        }}
      >
        接続
      </button>
      <br />

      {coreCubes.map((coreCube, index) => (
        <>
          <CoreCubeState target={coreCube} key={index} />
          <br />
        </>
      ))}
    </div>
  )
}
