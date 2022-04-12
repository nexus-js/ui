type MatrixValue = number;
type MatrixPattern = MatrixValue[][];
type MatrixCell = { row: number; column: number };

export default class Matrix {
  constructor(rows: number, columns: number);
  pattern: MatrixPattern;
  toggle: {
    cell: (column: number, row: number) => void;
    all: () => void;
    row: (row: number) => void;
    column: (column: number) => void;
  };
  set: {
    cell: (column: number, row: number, value: MatrixValue) => void;
    all: (values: MatrixValue[][]) => void;
    row: (row: number, values: MatrixValue[]) => void;
    column: (column: number, values: MatrixValue[]) => void;
  };
  rotate: {
    all: (amount: number) => void;
    row: (row: number, amount: number) => void;
    column: (column: number, amount: number) => void;
  };
  populate: {
    all: (odds: number | number[]) => void;
    row: (row?: number, odds?: number | number[]) => void;
    column: (column?: number, odds?: number | number[]) => void;
  };
  erase: {
    all: () => void;
    row: (row: number) => void;
    column: (column: number) => void;
  };
  create(rows: number, columns: number): void;
  iterate(
    f: (row: number) => void,
    f2: (row: number, column: number, index: number) => void
  ): void;
  formatAsText(): string;
  log(): void;
  update(pattern: MatrixPattern): void;
  get length(): number;
  locate(index: number): MatrixCell;
  indexOf(row: number, column: number): number;
  row(row: number): number[];
  column(column: number): number[];
  set rows(rows: number);
  get rows(): number;
  set columns(columns: number);
  get columns(): number;
}
