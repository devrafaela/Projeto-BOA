import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Nivel } from '../../pages/home-niveis/enum/nivel.enum';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  apiUrl: string = "http://localhost:8080";
  constructor (private router: Router, private httpClient: HttpClient) {}
  
  array: number[] = [];
  currentIndex: number = 0;
  totalSteps: number = 0;
  currentStep: number = 1;
  errorMessage: string = '';
  faseAtual: any = null; 

  getArray() {
    return this.array;
  }
  getCurrentStep () {
    return this.currentStep;
  }

  getCurrentIndex () {
    return this.currentIndex;
  }

  getTotalSteps(): number {
    return this.totalSteps;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
  setFaseAtual(fase: any) {
    this.faseAtual = fase;
  }

  getFaseAtual(): any {
    return this.faseAtual;
  }

  startGame () {
    this.array = this.generateRandomArray(5, 1, 9); // 5 números de 1 a 9
    this.currentIndex = 0;
    this.totalSteps = this.calculateActualBubbleSortSteps(this.array); 
  }

  private generateRandomArray (
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

  getCurrentComparison (): [number, number] {
    return [this.array[this.currentIndex], this.array[this.currentIndex + 1]];
  }

  isSorted (): boolean {
    for (let i = 0; i < this.array.length - 1; i++) {
      if (this.array[i] > this.array[i + 1]) {
        return false;
      }
    }
    return true;
  }

  checkAnswer (userAnswer: number): {
    correct: boolean; 
    expected: number, 
    errorMessage?: string; 
  } | null {
    const [left, right] = this.getCurrentComparison();

    // ✅ Verificação: se o número digitado não for nenhum dos dois
    if (userAnswer !== left && userAnswer !== right) {
      this.errorMessage = `Escolha um dos dois números que estão sendo comparados: ${left} ou ${right}.`;
      return null; // não avança
    }

    this.errorMessage = ''; 

    const shouldSwap = left > right;
    const expected = shouldSwap ? right : left;
    const correct = userAnswer === expected;

    if (!correct) {
      return { correct, expected, errorMessage: `Resposta incorreta. Tente novamente.` };
    }

    if (correct && shouldSwap) {
      // faz a troca
      this.array[this.currentIndex] = right;
      this.array[this.currentIndex + 1] = left;
    }

    this.advanceStep ();

    return { correct, expected };
  }

  advanceStep () {
    this.currentIndex++;
    if(!this.isSorted()) {
      this.currentStep++;
    }
    if (this.currentIndex >= this.array.length - 1) {
      this.currentIndex = 0;
    }
  }

  calculateMaxBubbleSortSteps (n: number): number {
    return (n * (n - 1) / 2);
  }

  private calculateActualBubbleSortSteps(array: number[]): number {
    const copy = [...array];
    let steps = 0;
    let n = copy.length;
    let currentIndex = 0;

    while (true) {
      steps++; // Cada passo visual conta

      // Comparação + possível troca
      if (copy[currentIndex] > copy[currentIndex + 1]) {
        [copy[currentIndex], copy[currentIndex + 1]] = [
          copy[currentIndex + 1],
          copy[currentIndex],
        ];
      }

      // Após cada passo, verifica se está ordenado
      let isSorted = true;
      for (let i = 0; i < copy.length - 1; i++) {
        if (copy[i] > copy[i + 1]) {
          isSorted = false;
          break;
        }
      }

      if (isSorted) break;

      // Avança para próxima comparação
      currentIndex++;

      // Se chegou ao fim da lista, volta para o início
      if (currentIndex >= n - 1) {
        currentIndex = 0;
      }
    }

    return steps;
  }

  restartCurrentStep () {
    this.currentStep = 1;
  }

}