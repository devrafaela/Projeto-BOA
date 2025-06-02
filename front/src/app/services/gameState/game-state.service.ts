import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  array: number[] = [];
  currentIndex = 0;

  getArray() {
    return this.array;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }

  startGame() {
    this.array = this.generateRandomArray(5, 1, 9); // 5 números de 1 a 9
    this.currentIndex = 0;
  }
  private generateRandomArray(
    length: number,
    min: number,
    max: number
  ): number[] {
    const result: number[] = [];

    while (result.length < length) {
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!result.includes(rand)) {
        result.push(rand);
      }
    }

    return result;
  }

  getCurrentComparison(): [number, number] {
    return [this.array[this.currentIndex], this.array[this.currentIndex + 1]];
  }

  isSorted(): boolean {
    for (let i = 0; i < this.array.length - 1; i++) {
      if (this.array[i] > this.array[i + 1]) {
        return false;
      }
    }
    return true;
  }

  checkAnswer(userAnswer: number): { correct: boolean; expected: number } {
    const [left, right] = this.getCurrentComparison();
    const shouldSwap = left > right;
    const expected = shouldSwap ? right : left;

    const correct = userAnswer === expected;

    if (correct && shouldSwap) {
      // faz a troca
      this.array[this.currentIndex] = right;
      this.array[this.currentIndex + 1] = left;
    }

    this.advanceStep();

    return { correct, expected };
  }

  advanceStep() {
    this.currentIndex++;
    if (this.currentIndex >= this.array.length - 1) {
      this.currentIndex = 0;
    }
  }
}
