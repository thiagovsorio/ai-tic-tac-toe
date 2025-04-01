import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidBoard', async: false })
export class IsValidBoard implements ValidatorConstraintInterface {
  validate(board: any[][]): boolean {
    if (!Array.isArray(board) || board.length === 0) return false;

    const boardLength = board.length;

    // each row length must equal board length
    return board.every(
      (row) =>
        Array.isArray(row) &&
        row.length === boardLength &&
        row.every((cell) => 
          typeof cell === 'string' && ['', 'X', 'O'].includes(cell)
      )
    );
  }

  defaultMessage(): string {
    return 'Board must be a square matrix of strings (e.g. 3x3, 4x4, etc.)';
  }
}
