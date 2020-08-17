import React from 'react';
import ReactDOM from 'react-dom'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { width, height } from './consts';

export default class TicTacToeBoard extends React.Component {
  onClick(id) {
    if (this.isActive(id)) {
      this.props.moves.clickCell(id);
    }
  }

  isActive(id) {
    if (!this.props.isActive) return false;
    if (this.props.G.cells[id] !== null) return false;
    return true;
  }

  render() {
    let winner = '';
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
        ) : (
          <div id="winner">Draw!</div>
        );
    }

    let tbody = [];
    for (let i = 0; i < height; i++) {
      let cells = [];
      for (let j = 0; j < width; j++) {
        const id = width * i + j;
        const edge = [
          i === 0,
          j === 0,
          i === height - 1,
          j === width - 1,
        ];
        const edgeCount = edge.filter(x => x).length;
        let type = 'empty-square';
        if (edgeCount > 0) {
          type = 'game-square';
        }
        if (edgeCount === 2) {
          type = 'corner-game-square';
        }
        if ((i + j) % 2 === 1 && edgeCount === 1) {
          type = 'darker-game-square';
        }
        cells.push(
          <td
            className={type}
            key={id}
            onClick={() => this.onClick(id)}
          >
            {this.props.G.cells[id]}
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <div>
        <h1>Open Oubliette!</h1>
        <DndProvider backend={Backend}>
          <table id="board">
            <tbody>{tbody}</tbody>
          </table>
        </DndProvider>
        {winner}
        <h1 class="end-header">Open Oubliette!</h1>
      </div>
    );
  }
}

