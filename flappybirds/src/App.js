import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function GridCell(props) {
  var style = {
    width: 20,
    height: 20,
    border: '1px solid black',
    backgroundColor: props.cell
  }

  return (
    <div style={style}></div>
  )
}

function GridRow(props) {
  var style =  {
    display: "flex"
  }

  return (
    <div style={style}>
      {
        props.row.map( (cell) => {
          return <GridCell cell={cell}/>
        })
      }
    </div>
  )
}

function Grid(props) {
  return (
    <div>
      {
        props.grid.map( (row) => {
          return <GridRow row={row}/>
        })
      }
    </div>
  )
}

class Game extends React.Component {
  constructor(props) {
    super(props)

    var grid = []
    for(let i = 0; i < 20; i++) {
      grid.push(new Array(30).fill('red'))
    }

    var bird = {
      height: 10,
      position: 2
    }
    grid[bird.height][bird.position] = 'yellow'

    var towers = [
      {position: 3, height: 5, upright: true},
      {position: 7, height: 6, upright: false},
      {position: 10, height: 7, upright: true},
      {position: 14, height: 6, upright: false},
      {position: 18, height: 7, upright: true},
      {position: 22, height: 3, upright: false},
      {position: 26, height: 8, upright: true},
      {position: 29, height: 2, upright: false},
    ]

    this.state = {grid:grid, bird:bird, towers:towers}

    this.timerID = setInterval( () => {
      var gridCopy = []
      for(let i = 0; i < 20; i++) {
        gridCopy.push(new Array(30).fill('red'))
      }

      var birdCopy = this.state.bird
      birdCopy.height++
      if (birdCopy.height > 19 || birdCopy.height < 0) {
        birdCopy.height = 10
      }
      gridCopy[birdCopy.height][birdCopy.position] = 'yellow'

      var towersCopy = this.state.towers.slice()

      for(let i = 0; i < towersCopy.length; i++) {
        towersCopy[i].position--
        if (towersCopy[i].position < 0) {
          towersCopy[i].position = 29
          towersCopy[i].height = Math.floor(Math.random() * 7) + 3
        }
      }

      for(let i = 0; i < towersCopy.length; i++) {        
        for(let j = 0; j < towersCopy[i].height; j++) {
          if (towersCopy[i].upright)
            gridCopy[19-j][towersCopy[i].position] = 'blue'
          else
            gridCopy[j][towersCopy[i].position] = 'blue'
        }
      }

      this.setState({grid:gridCopy, bird:birdCopy})
    }, 200)
  }

  handleClick() {
    var birdCopy = this.state.bird
    birdCopy.height -= 3
    this.setState({bird:birdCopy})
  }

  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>
        <Grid grid={this.state.grid}/>
      </div>
    )
  }
}

export default Game;
