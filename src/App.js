import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-dat-gui/build/react-dat-gui.css';
import { Stage, FastLayer, Circle, Line } from 'react-konva';
import Konva from 'konva';

import DatGui, { DatBoolean, DatNumber, DatColor } from 'react-dat-gui';

class App extends Component {
  constructor(props) {
    super(props);
    const { innerWidth, innerHeight } = window;
    this.state = {
      drawPlanets: true,
      clearBeforeDraw: false,
      color: Konva.Util.getRandomColor(),
      cx: innerWidth / 2,
      cy: innerHeight / 2,
      radius: 100,
      pause: false,
      x: 0,
      y: 0,
      dist: 100,
      speed: 1,

      angle: 0,
      x2: 0,
      y2: 0,
      dist2: 150,
      speed2: 1.5,
      angle2: 50
    };
  }

  componentDidMount() {
    this.step();
  }

  step = () => {
    const {
      pause,
      angle,
      angle2,
      dist,
      dist2,
      speed,
      speed2,
      cx,
      cy,
      radius
    } = this.state;
    if (pause) {
      requestAnimationFrame(this.step);
      return;
    }
    /// calc x and y position with radius of center +
    const newX = cx + (radius + dist) * Math.cos((angle * Math.PI) / 180);
    const newY = cy + (radius + dist) * Math.sin((angle * Math.PI) / 180);

    const newX2 = cx + (radius + dist2) * Math.cos((angle2 * Math.PI) / 180);
    const newY2 = cy + (radius + dist2) * Math.sin((angle2 * Math.PI) / 180);

    this.setState({
      x: newX,
      y: newY,
      angle: this.state.angle > 360 ? 0 : this.state.angle + speed,
      x2: newX2,
      y2: newY2,
      angle2: this.state.angle2 > 360 ? 0 : this.state.angle2 + speed2
    });

    requestAnimationFrame(this.step);
  };

  update = data => this.setState(data);

  render() {
    const {
      x,
      y,
      x2,
      y2,
      radius,
      color,
      clearBeforeDraw,
      drawPlanets
    } = this.state;
    const { innerWidth, innerHeight } = window;
    return (
      <div>
        <Stage width={innerWidth} height={innerHeight} fill="green">
          <FastLayer clearBeforeDraw={clearBeforeDraw}>
            <Line
              closed={true}
              points={[x, y, x2, y2]}
              stroke={color}
              strokeWidth={0.1}
            />
          </FastLayer>
          {drawPlanets ? (
            <FastLayer>
              <Circle x={x} y={y} radius={5} fill="red" />
              <Circle x={x2} y={y2} radius={5} fill="blue" />
            </FastLayer>
          ) : null}
        </Stage>
        <DatGui data={this.state} onUpdate={this.update}>
          <DatNumber
            path="dist"
            label="dist first ball"
            min={0}
            max={200}
            step={1}
          />
          <DatNumber
            path="speed"
            label="speed first ball"
            min={0}
            max={3}
            step={0.1}
          />

          <DatNumber
            path="dist2"
            label="dist second ball"
            min={0}
            max={200}
            step={1}
          />
          <DatNumber
            path="speed2"
            label="speed second ball"
            min={0}
            max={3}
            step={0.1}
          />
          <DatColor path="color" label="Color" />
          <DatBoolean path="clearBeforeDraw" label="clearBeforeDraw" />
          <DatBoolean path="pause" label="pause" />
          <DatBoolean path="drawPlanets" label="drawPlanets" />
        </DatGui>
      </div>
    );
  }
}

export default App;
