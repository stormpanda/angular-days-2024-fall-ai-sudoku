import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  createEmptyBoard,
  removeNumbers,
  validateInput,
  waveFunctionCollapse,
} from './sudoku-helpers';

@Component({
  standalone: true,
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss'],
  imports: [NgFor, FormsModule, NgClass],
})
export class SudokuComponent {
  board: number[][] = createEmptyBoard();
  solution: number[][] = createEmptyBoard();
  userInputs: number[][] = createEmptyBoard();
  givenNumbers: number = 24;

  constructor() {
    this.generatePuzzle();
  }

  generatePuzzle() {
    this.board = createEmptyBoard();
    this.board = waveFunctionCollapse(this.board);
    this.solution = this.board.map((row) => row.slice()); // Save the solution
    this.board = removeNumbers(this.board, 81 - this.givenNumbers); // Adjusted to reflect the number of given numbers
    this.userInputs = createEmptyBoard(); // Reset user inputs
  }

  onInputChange(row: number, col: number, value: string) {
    const numValue = +value;
    if (numValue >= 1 && numValue <= 9) {
      this.board[row][col] = numValue;
      this.userInputs[row][col] = numValue;
    } else {
      this.board[row][col] = 0;
      this.userInputs[row][col] = 0;
    }
  }

  validateInput(event: KeyboardEvent) {
    validateInput(event);
  }

  getCellClass(row: number, col: number): { [key: string]: boolean } {
    return {
      'right-border': (col + 1) % 3 === 0 && col !== 8,
      'bottom-border': (row + 1) % 3 === 0 && row !== 8,
      'correct-cell':
        this.board[row][col] !== 0 &&
        this.board[row][col] === this.solution[row][col],
      'wrong-cell':
        this.board[row][col] !== 0 &&
        this.board[row][col] !== this.solution[row][col],
      'empty-cell': this.board[row][col] === 0,
      'given-cell':
        this.board[row][col] !== 0 && this.userInputs[row][col] === 0,
    };
  }

  solve() {
    this.board = this.solution.map((row) => row.slice()); // Copy the solution to the board
    this.userInputs = this.solution.map((row) => row.slice()); // Mark all cells as user inputs
  }
}
