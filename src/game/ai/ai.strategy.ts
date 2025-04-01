export interface AIStrategy {
    getMove(board: string[][]): Promise<[number, number]>;
  }
  
  
export const AIStrategyToken = Symbol('AIStrategy');