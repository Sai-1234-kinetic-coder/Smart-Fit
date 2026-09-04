import React, { useState } from 'react';
import { ChevronRight, Check, Sparkles } from 'lucide-react';
import { INITIAL_CHESS_PUZZLE, ChessPiece } from '../lib/chessService';

export const BrainFitness: React.FC = () => {
  const [puzzle, setPuzzle] = useState(INITIAL_CHESS_PUZZLE);
  const [selectedPiece, setSelectedPiece] = useState<ChessPiece | null>(null);
  const [moveStatus, setMoveStatus] = useState<string | null>(null);

  // 8x8 board rows: 0 to 7, cols: 0 to 7
  const boardRows = 8;
  const boardCols = 8;

  const handleSquareClick = (row: number, col: number) => {
    // If a piece is already on this square
    const piece = puzzle.pieces.find((p) => p.row === row && p.col === col);

    if (piece && piece.color === 'white') {
      setSelectedPiece(piece);
      return;
    }

    // If a piece was selected and clicking on a target square to move
    if (selectedPiece) {
      // Move the piece to (row, col)
      const isForkSquare = row === puzzle.targetForkSquare.row && col === puzzle.targetForkSquare.col;
      
      const updatedPieces = puzzle.pieces.map((p) =>
        p.id === selectedPiece.id ? { ...p, row, col } : p
      );

      setPuzzle((prev) => ({
        ...prev,
        pieces: updatedPieces,
      }));

      setSelectedPiece(null);
      setMoveStatus('Move noted');
    }
  };

  return (
    <div className="content-feed fade-in">
      <div className="section-label" style={{ color: 'var(--accent-terracotta)' }}>BRAIN FITNESS</div>
      <h1 className="hero-title">Give your mind a<br />good puzzle.</h1>
      <p className="hero-subtitle">
        Pattern, patience, play. A few deliberate moves can sharpen the same attention you bring to everything else.
      </p>

      {/* Daily Puzzle Card Header */}
      <div className="card-elevated" style={{ marginBottom: 20 }}>
        <div className="section-label">{puzzle.badge}</div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, marginBottom: 6 }}>
          {puzzle.title}
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
          {puzzle.instructions}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--accent-terracotta)',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
            Show your move <ChevronRight size={14} />
          </button>
          {moveStatus && (
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--accent-sage)',
              backgroundColor: 'var(--accent-sage-soft)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)'
            }}>
              {moveStatus}
            </span>
          )}
        </div>
      </div>

      {/* Tactile Board Card */}
      <div className="card-elevated">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div className="section-label" style={{ marginBottom: 0 }}>TACTILE BOARD</div>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.06em',
            padding: '3px 8px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--accent-sage-soft)',
            color: 'var(--accent-sage)'
          }}>
            {puzzle.turn}
          </span>
        </div>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, marginBottom: 18 }}>
          Find the fork
        </h3>

        {/* 8x8 Chess Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          border: '1px solid #D6DED9',
          maxWidth: 420,
          margin: '0 auto'
        }}>
          {Array.from({ length: boardRows }).map((_, r) =>
            Array.from({ length: boardCols }).map((_, c) => {
              const isEven = (r + c) % 2 === 0;
              const piece = puzzle.pieces.find((p) => p.row === r && p.col === c);
              const isSelected = selectedPiece?.row === r && selectedPiece?.col === c;
              const isTargetFork = selectedPiece && r === puzzle.targetForkSquare.row && c === puzzle.targetForkSquare.col;

              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => handleSquareClick(r, c)}
                  style={{
                    aspectRatio: '1 / 1',
                    backgroundColor: isSelected
                      ? 'rgba(215, 90, 48, 0.25)'
                      : isTargetFork
                      ? 'rgba(215, 90, 48, 0.15)'
                      : isEven
                      ? '#FFFFFF'
                      : '#E8EFEA',
                    border: isTargetFork
                      ? '2px dashed var(--accent-terracotta)'
                      : '1px solid rgba(0,0,0,0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    userSelect: 'none'
                  }}
                >
                  {piece && (
                    <span style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 18,
                      fontWeight: 700,
                      color: piece.color === 'white' ? 'var(--accent-terracotta)' : '#33413B',
                      transform: isSelected ? 'scale(1.18)' : 'scale(1)',
                      transition: 'transform 0.15s ease'
                    }}>
                      {piece.type}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div style={{
          textAlign: 'center',
          fontSize: 12,
          color: 'var(--text-muted)',
          marginTop: 16
        }}>
          Tap any white piece to select, then tap your destination square.
        </div>
      </div>
    </div>
  );
};
