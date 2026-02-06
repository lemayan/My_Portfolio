import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ChessGame = ({ onClose }) => {
  const [board, setBoard] = useState(initializeBoard());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [gameStatus, setGameStatus] = useState('playing');

  function initializeBoard() {
    return [
      ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
      ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
      ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
    ];
  }

  function isWhitePiece(piece) {
    return piece && ['♔', '♕', '♖', '♗', '♘', '♙'].includes(piece);
  }

  function handleSquareClick(row, col) {
    if (currentPlayer !== 'white' || gameStatus !== 'playing') return;

    const piece = board[row][col];

    if (selectedSquare) {
      // Try to move
      const [fromRow, fromCol] = selectedSquare;
      const fromPiece = board[fromRow][fromCol];
      
      // Simple validation: can't capture own pieces
      if (piece && isWhitePiece(piece) === isWhitePiece(fromPiece)) {
        setSelectedSquare([row, col]);
        return;
      }

      // Make the move
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = fromPiece;
      newBoard[fromRow][fromCol] = null;
      setBoard(newBoard);
      setSelectedSquare(null);
      setCurrentPlayer('black');

      // Computer's turn after a short delay
      setTimeout(() => makeComputerMove(newBoard), 500);
    } else {
      // Select a piece
      if (piece && isWhitePiece(piece)) {
        setSelectedSquare([row, col]);
      }
    }
  }

  function makeComputerMove(currentBoard) {
    // Find all black pieces
    const blackPieces = [];
    currentBoard.forEach((row, rowIdx) => {
      row.forEach((piece, colIdx) => {
        if (piece && !isWhitePiece(piece)) {
          blackPieces.push([rowIdx, colIdx]);
        }
      });
    });

    if (blackPieces.length === 0) {
      setGameStatus('You won!');
      return;
    }

    // Pick a random black piece
    const [fromRow, fromCol] = blackPieces[Math.floor(Math.random() * blackPieces.length)];
    
    // Find valid moves (simplified - just move one square in any direction)
    const possibleMoves = [
      [fromRow + 1, fromCol],
      [fromRow - 1, fromCol],
      [fromRow, fromCol + 1],
      [fromRow, fromCol - 1],
      [fromRow + 1, fromCol + 1],
      [fromRow + 1, fromCol - 1],
      [fromRow - 1, fromCol + 1],
      [fromRow - 1, fromCol - 1],
    ].filter(([r, c]) => {
      if (r < 0 || r > 7 || c < 0 || c > 7) return false;
      const targetPiece = currentBoard[r][c];
      return !targetPiece || isWhitePiece(targetPiece);
    });

    if (possibleMoves.length > 0) {
      const [toRow, toCol] = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      const newBoard = currentBoard.map(r => [...r]);
      newBoard[toRow][toCol] = currentBoard[fromRow][fromCol];
      newBoard[fromRow][fromCol] = null;
      setBoard(newBoard);
    }

    setCurrentPlayer('white');
  }

  function resetGame() {
    setBoard(initializeBoard());
    setSelectedSquare(null);
    setCurrentPlayer('white');
    setGameStatus('playing');
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card p-6 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Chess Game</h2>
            <p className="text-white/60 text-sm">
              {gameStatus === 'playing' 
                ? `${currentPlayer === 'white' ? 'Your' : "Computer's"} turn`
                : gameStatus
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chess Board */}
        <div className="grid grid-cols-8 gap-0 aspect-square mb-4 border-2 border-white/20 rounded-lg overflow-hidden">
          {board.map((row, rowIdx) =>
            row.map((piece, colIdx) => {
              const isLight = (rowIdx + colIdx) % 2 === 0;
              const isSelected = selectedSquare && selectedSquare[0] === rowIdx && selectedSquare[1] === colIdx;
              
              return (
                <motion.button
                  key={`${rowIdx}-${colIdx}`}
                  onClick={() => handleSquareClick(rowIdx, colIdx)}
                  className={`
                    aspect-square flex items-center justify-center text-4xl
                    ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                    ${isSelected ? 'ring-4 ring-yellow-400' : ''}
                    hover:brightness-110 transition-all
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {piece}
                </motion.button>
              );
            })
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <button
            onClick={resetGame}
            className="btn-primary flex-1"
          >
            New Game
          </button>
          <button
            onClick={onClose}
            className="btn-ghost flex-1"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChessGame;
