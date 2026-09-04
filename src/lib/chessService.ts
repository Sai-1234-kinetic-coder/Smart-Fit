export interface ChessPiece {
  id: string;
  type: 'R' | 'P' | 'N' | 'B' | 'Q' | 'K' | 'r' | 'p' | 'n' | 'b' | 'q' | 'k';
  row: number; // 0-7
  col: number; // 0-7
  color: 'white' | 'black';
}

export interface ChessPuzzleState {
  title: string;
  badge: string;
  dailyNumber: string;
  instructions: string;
  turn: string;
  pieces: ChessPiece[];
  targetForkSquare: { row: number; col: number };
}

export const INITIAL_CHESS_PUZZLE: ChessPuzzleState = {
  title: 'The quiet advantage',
  badge: 'DAILY PUZZLE · 04/12',
  dailyNumber: '04/12',
  instructions: 'One position. Find the move that changes the shape of the board.',
  turn: 'YOUR TURN',
  pieces: [
    { id: 'wr1', type: 'R', row: 1, col: 6, color: 'white' },
    { id: 'bp1', type: 'p', row: 2, col: 5, color: 'black' },
    { id: 'bp2', type: 'p', row: 3, col: 3, color: 'black' },
    { id: 'br1', type: 'r', row: 2, col: 5, color: 'black' },
    { id: 'wn1', type: 'N', row: 5, col: 4, color: 'white' },
    { id: 'wp1', type: 'P', row: 6, col: 6, color: 'white' },
    { id: 'bk1', type: 'k', row: 1, col: 3, color: 'black' },
  ],
  targetForkSquare: { row: 3, col: 5 }, // Square to fork king & rook
};
