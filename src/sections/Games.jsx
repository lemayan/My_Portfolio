import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ChessBoard = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [validMoves, setValidMoves] = useState([]);
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });
  const [moveHistory, setMoveHistory] = useState([]);
  const [waitingForDennis, setWaitingForDennis] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

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

  function getPieceType(piece) {
    const pieceMap = {
      '♔': 'king', '♚': 'king',
      '♕': 'queen', '♛': 'queen',
      '♖': 'rook', '♜': 'rook',
      '♗': 'bishop', '♝': 'bishop',
      '♘': 'knight', '♞': 'knight',
      '♙': 'pawn', '♟': 'pawn'
    };
    return pieceMap[piece];
  }

  function getValidMoves(board, row, col) {
    const piece = board[row][col];
    if (!piece) return [];

    const moves = [];
    const isWhite = isWhitePiece(piece);
    const type = getPieceType(piece);

    const addIfValid = (r, c) => {
      if (r < 0 || r > 7 || c < 0 || c > 7) return false;
      const target = board[r][c];
      if (!target) return true;
      if (isWhitePiece(target) !== isWhite) return true;
      return false;
    };

    switch(type) {
      case 'pawn':
        const direction = isWhite ? -1 : 1;
        const startRow = isWhite ? 6 : 1;
        
        if (!board[row + direction]?.[col]) {
          moves.push([row + direction, col]);
          if (row === startRow && !board[row + 2 * direction]?.[col]) {
            moves.push([row + 2 * direction, col]);
          }
        }
        
        [-1, 1].forEach(dc => {
          const target = board[row + direction]?.[col + dc];
          if (target && isWhitePiece(target) !== isWhite) {
            moves.push([row + direction, col + dc]);
          }
        });
        break;

      case 'knight':
        [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]].forEach(([dr, dc]) => {
          if (addIfValid(row + dr, col + dc)) moves.push([row + dr, col + dc]);
        });
        break;

      case 'bishop':
        [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([dr, dc]) => {
          for (let i = 1; i < 8; i++) {
            const r = row + dr * i, c = col + dc * i;
            if (r < 0 || r > 7 || c < 0 || c > 7) break;
            const target = board[r][c];
            if (!target) {
              moves.push([r, c]);
            } else {
              if (isWhitePiece(target) !== isWhite) moves.push([r, c]);
              break;
            }
          }
        });
        break;

      case 'rook':
        [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dr, dc]) => {
          for (let i = 1; i < 8; i++) {
            const r = row + dr * i, c = col + dc * i;
            if (r < 0 || r > 7 || c < 0 || c > 7) break;
            const target = board[r][c];
            if (!target) {
              moves.push([r, c]);
            } else {
              if (isWhitePiece(target) !== isWhite) moves.push([r, c]);
              break;
            }
          }
        });
        break;

      case 'queen':
        [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(([dr, dc]) => {
          for (let i = 1; i < 8; i++) {
            const r = row + dr * i, c = col + dc * i;
            if (r < 0 || r > 7 || c < 0 || c > 7) break;
            const target = board[r][c];
            if (!target) {
              moves.push([r, c]);
            } else {
              if (isWhitePiece(target) !== isWhite) moves.push([r, c]);
              break;
            }
          }
        });
        break;

      case 'king':
        [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(([dr, dc]) => {
          if (addIfValid(row + dr, col + dc)) moves.push([row + dr, col + dc]);
        });
        break;
    }

    return moves;
  }

  function evaluateBoard(board) {
    const pieceValues = {
      'pawn': 10, 'knight': 30, 'bishop': 30, 'rook': 50, 'queen': 90, 'king': 900
    };
    
    let score = 0;
    board.forEach(row => {
      row.forEach(piece => {
        if (piece) {
          const value = pieceValues[getPieceType(piece)];
          score += isWhitePiece(piece) ? -value : value;
        }
      });
    });
    return score;
  }

  function handleSquareClick(row, col) {
    if (waitingForDennis) return;

    const piece = board[row][col];

    if (selectedSquare) {
      const [fromRow, fromCol] = selectedSquare;
      const isValidMove = validMoves.some(([r, c]) => r === row && c === col);
      
      if (isValidMove) {
        makeMove(fromRow, fromCol, row, col, board);
      } else if (piece && isWhitePiece(piece)) {
        setSelectedSquare([row, col]);
        setValidMoves(getValidMoves(board, row, col));
      } else {
        setSelectedSquare(null);
        setValidMoves([]);
      }
    } else {
      if (piece && isWhitePiece(piece)) {
        setSelectedSquare([row, col]);
        setValidMoves(getValidMoves(board, row, col));
      }
    }
  }

  function makeMove(fromRow, fromCol, toRow, toCol, currentBoard) {
    const newBoard = currentBoard.map(r => [...r]);
    const capturedPiece = newBoard[toRow][toCol];
    
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = null;
    
    if (capturedPiece) {
      const capturedColor = isWhitePiece(capturedPiece) ? 'white' : 'black';
      setCapturedPieces(prev => ({
        ...prev,
        [capturedColor]: [...prev[capturedColor], capturedPiece]
      }));
    }
    
    setBoard(newBoard);
    setSelectedSquare(null);
    setValidMoves([]);
    setMoveHistory(prev => [...prev, { from: [fromRow, fromCol], to: [toRow, toCol] }]);
    setWaitingForDennis(true);
    setShowMessage(true);
    
    // Hide message after 5 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  }

  function resetGame() {
    setBoard(initializeBoard());
    setSelectedSquare(null);
    setCurrentPlayer('white');
    setValidMoves([]);
    setCapturedPieces({ white: [], black: [] });
    setMoveHistory([]);
    setWaitingForDennis(false);
    setShowMessage(false);
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Chess with Dennis</h2>
          <p className="text-white/60 text-sm">
            {waitingForDennis 
              ? "Waiting for Dennis's move..." 
              : 'Your turn - Make a move!'
            }
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-white/60 mb-1">Captured</div>
          <div className="flex gap-1">
            {capturedPieces.black.map((piece, i) => (
              <span key={i} className="text-lg">{piece}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Dennis Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">♟️</span>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Nice move!</p>
                <p className="text-white/80 text-sm">
                  Dennis will make the next move. In the meantime, chat with my AI agent! 💬
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Chess Board */}
      <div className="relative mb-6">
        {/* Coordinate Labels */}
        <div className="flex mb-2">
          <div className="w-8"></div>
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((letter) => (
            <div key={letter} className="flex-1 text-center text-white/60 text-sm font-semibold">
              {letter}
            </div>
          ))}
          <div className="w-8"></div>
        </div>
        
        <div className="flex">
          {/* Left numbers */}
          <div className="flex flex-col-reverse w-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className="flex-1 flex items-center justify-center text-white/60 text-sm font-semibold">
                {num}
              </div>
            ))}
          </div>
          
          {/* Chess Board */}
          <div className="grid grid-cols-8 gap-0 aspect-square rounded-xl overflow-hidden shadow-2xl border-4 border-amber-900/50">
            {board.map((row, rowIdx) =>
              row.map((piece, colIdx) => {
                const isLight = (rowIdx + colIdx) % 2 === 0;
                const isSelected = selectedSquare && selectedSquare[0] === rowIdx && selectedSquare[1] === colIdx;
                const isValidMove = validMoves.some(([r, c]) => r === rowIdx && c === colIdx);
                const isLastMove = moveHistory.length > 0 && 
                  ((moveHistory[moveHistory.length - 1].from[0] === rowIdx && moveHistory[moveHistory.length - 1].from[1] === colIdx) ||
                   (moveHistory[moveHistory.length - 1].to[0] === rowIdx && moveHistory[moveHistory.length - 1].to[1] === colIdx));
                
                return (
                  <motion.button
                    key={`${rowIdx}-${colIdx}`}
                    onClick={() => handleSquareClick(rowIdx, colIdx)}
                    className={`
                      aspect-square flex items-center justify-center text-4xl md:text-5xl relative
                      transition-all duration-200
                      ${isLight 
                        ? 'bg-[#f0d9b5]' 
                        : 'bg-[#b58863]'
                      }
                      ${isSelected ? 'ring-4 ring-yellow-400 ring-inset' : ''}
                      ${isLastMove ? 'bg-yellow-300/40' : ''}
                      hover:brightness-110
                    `}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      textShadow: piece ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
                    }}
                  >
                    {isValidMove && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        {piece ? (
                          <div className="w-full h-full bg-red-500/30 border-4 border-red-600/80" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-black/30" />
                        )}
                      </motion.div>
                    )}
                    <span className="relative z-10" style={{ 
                      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                    }}>{piece}</span>
                  </motion.button>
                );
              })
            )}
          </div>
          
          {/* Right numbers */}
          <div className="flex flex-col-reverse w-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className="flex-1 flex items-center justify-center text-white/60 text-sm font-semibold">
                {num}
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom coordinate labels */}
        <div className="flex mt-2">
          <div className="w-8"></div>
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((letter) => (
            <div key={letter} className="flex-1 text-center text-white/60 text-sm font-semibold">
              {letter}
            </div>
          ))}
          <div className="w-8"></div>
        </div>
      </div>

      <button onClick={resetGame} className="btn-primary w-full">
        New Game
      </button>
    </div>
  );
};

const ChatSection = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Dennis's AI assistant. I can help you learn about his skills, projects, and experience - plus answer general programming questions. What would you like to know? 😊"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function generateResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Extract key information for smarter matching
    const words = message.split(/\s+/);
    const hasName = /\b(dennis|lemayan|leleina)\b/.test(message);
    const isQuestion = /\b(what|who|where|when|why|how|which|can|do|does|is|are)\b/.test(message);
    
    // WHO IS questions
    if (message.match(/who (is|are|am|was)/) || message.match(/tell me about/) || message.match(/introduce/)) {
      if (hasName || message.includes('you') || message.includes('he') || message.includes('him')) {
        return "👋 **Meet Dennis Lemayan Leleina!**\n\nA passionate full-stack developer and software engineer who turns ideas into reality through code.\n\n🎯 **What he does:**\n• Builds modern web applications\n• Creates blockchain solutions\n• Develops scalable systems\n• Solves complex problems\n\n💡 **Specialties:**\nFull-stack development, Blockchain/Web3, Healthcare tech, Fintech\n\n🚀 He's built everything from drone delivery platforms to blockchain crowdfunding systems!\n\nWant to know about his skills or projects?";
      }
    }
    
    // SKILLS & TECH STACK
    if (message.match(/skill|tech|stack|know|language|framework|tool|can he|proficient|expert|good at|work with/)) {
      const detailed = message.includes('detail') || message.includes('explain') || message.includes('more');
      
      if (detailed) {
        return "💻 **Dennis's Complete Tech Arsenal**\n\n**Frontend Development:**\n• React, Next.js - Modern UI frameworks\n• HTML5, CSS3 - Web foundations\n• Tailwind CSS - Utility-first styling\n• Framer Motion - Smooth animations\n• Vite - Lightning-fast builds\n\n**Backend Development:**\n• Django, Flask - Python frameworks\n• Node.js, Express - JavaScript runtime\n• RESTful APIs - API design\n• Authentication & Security\n\n**Blockchain & Web3:**\n• Solidity - Smart contracts\n• Web3.js - Blockchain integration\n• Ethereum - Primary blockchain\n• DApp development\n\n**Databases:**\n• MySQL, PostgreSQL - SQL databases\n• MongoDB - NoSQL\n• SQLite - Lightweight DB\n• Prisma - Modern ORM\n\n**Languages:**\n• JavaScript/TypeScript - Primary\n• Python - Backend & scripting\n• C++ - Performance-critical\n• Solidity - Smart contracts\n\n**DevOps & Tools:**\n• Git - Version control\n• Docker - Containerization\n• CI/CD pipelines\n• Cloud deployment\n\nTrue full-stack expertise! 🎯";
      }
      
      return "🛠️ **Dennis's Tech Stack**\n\n**Languages:** JavaScript/TypeScript, Python, C++, Solidity\n\n**Frontend:** React, HTML5, CSS3, Tailwind, Framer Motion\n\n**Backend:** Django, Node.js, Express, Flask\n\n**Blockchain:** Solidity, Web3, Smart Contracts\n\n**Databases:** MySQL, PostgreSQL, MongoDB, SQLite\n\n**Tools:** Git, Docker, Prisma, Vite\n\nHe's a complete full-stack developer! Want details on any specific technology?";
    }
    
    // PROJECTS - Overall
    if (message.match(/project|portfolio|work|built|created|made|develop/) && !message.match(/specific|tell|about|detail/)) {
      return "🚀 **Dennis's Portfolio Projects**\n\n**1. 🚁 Duma Drones**\nDrone delivery platform for meals & groceries\nTech: Django, Python\n\n**2. 📝 Assessly**\nExam & testing app with real-time analytics\nTech: React, TypeScript, Node.js\n\n**3. 🏥 Hospital Management System**\nComplete digital healthcare solution\nTech: Modern web stack\n\n**4. 💎 Genesis**\nBlockchain crowdfunding platform\nTech: Solidity, React, Web3\n\n**5. 🏦 Banking Application**\nSecure banking with transactions\nTech: Full-stack solution\n\nEach project solves real problems! Ask about any specific one for details. 🎯";
    }
    
    // Individual projects
    if (message.includes('duma') || message.includes('drone') || (message.includes('delivery') && message.includes('project'))) {
      return "🚁 **Duma Drones - Sky-High Innovation**\n\nRevolutionizing last-mile delivery with autonomous drones!\n\n**What it does:**\nDelivers meals, groceries, and essential packages via drones\n\n**Key Features:**\n✅ Real-time GPS tracking\n✅ Secure payment gateway\n✅ Route optimization\n✅ Weather-aware scheduling\n✅ User-friendly interface\n✅ Delivery notifications\n\n**Tech Stack:**\n• Django & Python (Backend)\n• RESTful APIs\n• Real-time data processing\n• GPS integration\n\n**Impact:**\nMaking deliveries faster, cheaper, and more eco-friendly!\n\nThe future of delivery is here! 🌟";
    }
    
    if (message.includes('assessly') || (message.includes('exam') && message.includes('project')) || (message.includes('test') && message.includes('app'))) {
      return "📝 **Assessly - Smart Testing Platform**\n\nModern examination system for the digital age!\n\n**What it does:**\nEnables educators to create, conduct, and analyze exams seamlessly\n\n**Key Features:**\n✅ Exam builder with multiple question types\n✅ Real-time test conducting\n✅ Instant grading & analytics\n✅ Student performance tracking\n✅ Detailed reports & insights\n✅ Zero setup required\n\n**Tech Stack:**\n• React & TypeScript (Frontend)\n• Node.js (Backend)\n• Real-time processing\n• Data analytics\n\n**Impact:**\nSimplifying education assessment for teachers and students!\n\nEducation made efficient! 🎓";
    }
    
    if (message.includes('hospital') || message.includes('hms') || (message.includes('healthcare') && message.includes('project'))) {
      return "🏥 **Hospital Management System**\n\nDigital transformation for healthcare facilities!\n\n**What it does:**\nComplete hospital administration & patient care management\n\n**Key Features:**\n✅ Patient records & history\n✅ Appointment scheduling\n✅ Billing & invoicing\n✅ Staff management\n✅ Inventory tracking\n✅ Report generation\n✅ HIPAA compliance\n\n**Benefits:**\n• Streamlined workflows\n• Reduced paperwork\n• Better patient care\n• Data security\n• Efficient operations\n\n**Tech Stack:**\nModern web technologies with security focus\n\n**Impact:**\nImproving healthcare delivery and patient outcomes!\n\nHealthcare, digitized! 💊";
    }
    
    if (message.includes('genesis') || (message.includes('blockchain') && message.includes('project')) || (message.includes('crowdfund') && message.includes('project'))) {
      return "💎 **Genesis - Decentralized Crowdfunding**\n\nThe future of transparent fundraising on blockchain!\n\n**What it does:**\nEnables verified, transparent crowdfunding using smart contracts\n\n**Key Features:**\n✅ Smart contract powered transactions\n✅ Immutable transaction records\n✅ Verified campaign launching\n✅ Real-time fund tracking\n✅ Automated fund release\n✅ Zero intermediaries\n✅ Complete transparency\n\n**Tech Stack:**\n• Solidity (Smart Contracts)\n• React (Frontend)\n• Web3.js (Blockchain integration)\n• Ethereum blockchain\n\n**Why it's revolutionary:**\n• 100% transparent\n• Can't be manipulated\n• Lower fees\n• Global accessibility\n• Trust through code\n\n**Impact:**\nDemocratizing fundraising with blockchain technology!\n\nTransparency meets innovation! ⛓️";
    }
    
    if (message.includes('bank') && message.includes('project')) {
      return "🏦 **Banking Application**\n\nModern, secure digital banking for everyone!\n\n**What it does:**\nComplete banking operations in a secure web application\n\n**Key Features:**\n✅ Account management\n✅ Money transfers\n✅ Transaction history\n✅ Bill payments\n✅ Audit logs\n✅ Multi-factor authentication\n✅ Real-time balance updates\n\n**Security Features:**\n• Encrypted data\n• Secure authentication\n• Session management\n• Activity logging\n• Fraud detection\n\n**Tech Stack:**\nFull-stack with enterprise-grade security\n\n**Impact:**\nMaking banking accessible, secure, and user-friendly!\n\nFinance, simplified! 💰";
    }
    
    // CONTACT & HIRING
    if (message.match(/contact|reach|email|phone|hire|available|freelance|work|job|collaborate|connect|get in touch/)) {
      return "📬 **Let's Connect!**\n\nDennis is open to exciting opportunities!\n\n**Contact Information:**\n📱 WhatsApp: **+254715197671**\n💼 LinkedIn: **linkedin.com/in/dennis-leleina-500a01201**\n📸 Instagram: **@__lemayan__**\n\n**He's interested in:**\n✅ Freelance projects\n✅ Full-time positions\n✅ Contract work\n✅ Collaboration opportunities\n✅ Startup ventures\n✅ Consulting gigs\n\n**Expertise available:**\n• Full-stack development\n• Blockchain solutions\n• System architecture\n• Technical consulting\n\nDon't hesitate to reach out - he'd love to hear about your project! 🚀";
    }
    
    // PROGRAMMING HELP
    if (message.match(/react|jsx|component|hook|state|props|frontend/) && !hasName) {
      return "⚛️ **React Development**\n\nDennis is a React expert! Here's what you should know:\n\n**Core Concepts:**\n• **Components** - Reusable UI building blocks\n• **Hooks** - useState, useEffect, useContext\n• **Props** - Pass data between components\n• **State** - Manage component data\n• **JSX** - Write HTML in JavaScript\n\n**Best Practices:**\n✓ Keep components small & focused\n✓ Use functional components\n✓ Leverage hooks properly\n✓ Optimize with React.memo\n✓ Follow naming conventions\n\n**This portfolio** is built with React, Vite, and Framer Motion!\n\nNeed specific React help?";
    }
    
    if (message.match(/python|django|flask/) && !hasName) {
      return "🐍 **Python Development**\n\nDennis uses Python extensively!\n\n**Frameworks:**\n• **Django** - Full-featured, batteries included\n  - ORM, admin panel, authentication\n  - Great for complex applications\n• **Flask** - Lightweight, flexible\n  - Minimal, easy to learn\n  - Perfect for APIs and small apps\n\n**Why Python?**\n✓ Clean, readable syntax\n✓ Huge ecosystem of libraries\n✓ Great for rapid development\n✓ Excellent for APIs\n✓ Strong typing with TypeScript\n\n**Use cases:**\n• Backend APIs\n• Data processing\n• Automation\n• Web scraping\n\nWhat Python topic interests you?";
    }
    
    if (message.match(/blockchain|crypto|web3|smart contract|solidity|ethereum|nft|defi/) && !hasName) {
      return "⛓️ **Blockchain & Web3**\n\nDennis has real blockchain experience!\n\n**Technologies:**\n• **Solidity** - Smart contract language\n• **Web3.js** - Blockchain JavaScript library\n• **Ethereum** - Primary blockchain platform\n• **DApps** - Decentralized applications\n\n**Real Project:**\n**Genesis** - Decentralized crowdfunding platform\n- Smart contracts for transparency\n- Immutable transaction records\n- No intermediaries needed\n\n**Blockchain Benefits:**\n✓ Transparency\n✓ Security\n✓ Decentralization\n✓ Immutability\n✓ Lower costs\n\n**Learning Resources:**\n• Solidity docs\n• Ethereum.org\n• CryptoZombies\n\nInterested in building on blockchain?";
    }
    
    // GENERAL QUESTIONS
    if (message.match(/^(hi|hello|hey|sup|yo|greetings)/)) {
      return "Hey there! 👋 Welcome to Dennis's portfolio!\n\nI'm his AI assistant and I can help you with:\n\n💼 **About Dennis:**\n• Skills & expertise\n• Portfolio projects\n• Professional background\n\n📧 **Contact & Hiring:**\n• How to reach him\n• Availability\n• Opportunities\n\n💻 **Tech Help:**\n• React, Python, Blockchain\n• Web development\n• Programming concepts\n\nWhat would you like to explore?";
    }
    
    if (message.match(/thank|thanks|appreciate|awesome|great|cool/)) {
      return "You're welcome! 😊\n\nGlad I could help! Feel free to ask anything else about:\n• Dennis's projects\n• His tech stack\n• How to contact him\n• Programming topics\n\nI'm here anytime! 🚀";
    }
    
    if (message.match(/help|what can you|capabilities|can you/)) {
      return "🤖 **I'm here to help!**\n\n**I can tell you about:**\n\n👤 **Dennis:**\n• Background & skills\n• All 5 portfolio projects (detailed)\n• Tech stack & expertise\n• Contact information\n• Career opportunities\n\n💻 **Programming:**\n• React & frontend\n• Python & backend\n• Blockchain & Web3\n• Full-stack development\n• Best practices\n\n💬 **General:**\n• Project explanations\n• Technology discussions\n• Career advice\n• Time & date\n• Even jokes!\n\n**Just ask naturally!** I understand questions like:\n- \"What did Dennis build?\"\n- \"Tell me about Genesis\"\n- \"How do I contact him?\"\n- \"Explain React hooks\"\n\nWhat can I help you with?";
    }
    
    if (message.match(/time|date|today|now/)) {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      return `🕐 **Current Time:** ${time}\n📅 **Today's Date:** ${date}\n\nHow else can I assist you?`;
    }
    
    if (message.match(/joke|funny|laugh|humor/)) {
      const jokes = [
        "Why do programmers prefer dark mode?\n\nBecause light attracts bugs! 🐛😄",
        "Why do Java developers wear glasses?\n\nBecause they can't C#! 😎👓",
        "How many programmers does it take to change a light bulb?\n\nNone, that's a hardware problem! 💡🔧",
        "Why did the programmer quit?\n\nBecause they didn't get arrays! 📊😂",
        "What's a programmer's favorite place?\n\nThe Foo Bar! 🍺💻",
        "Why did the developer go broke?\n\nBecause he used up all his cache! 💸",
        "What do you call a programmer from Finland?\n\nNerdic! 🇫🇮😄",
        "Why don't programmers like nature?\n\nIt has too many bugs! 🌲🐛"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)] + "\n\nWant to know about Dennis's projects?";
    }
    
    // SMART FALLBACK - Try to understand intent
    if (isQuestion) {
      return "🤔 **I can help with that!**\n\nI might have information on this topic. Try asking:\n\n**About Dennis:**\n• \"What projects has he built?\"\n• \"What are his skills?\"\n• \"Tell me about Genesis/Duma Drones/Assessly\"\n• \"How can I contact him?\"\n\n**Technical:**\n• \"Explain React hooks\"\n• \"Tell me about blockchain\"\n• \"What is Python good for?\"\n\n**General:**\n• \"What time is it?\"\n• \"Tell me a joke\"\n\nOr just ask me anything about Dennis's work! 😊";
    }
    
    // FINAL FALLBACK
    return "💭 **Hmm, let me help you better!**\n\nI'm specialized in:\n\n✨ **Dennis Lemayan Leleina's Portfolio:**\n• Skills & technologies\n• 5 impressive projects\n• Contact & opportunities\n\n💻 **Programming Topics:**\n• React & frontend\n• Python & backend\n• Blockchain & Web3\n\n💬 **Quick Tips:**\nTry asking:\n- \"Tell me about Dennis\"\n- \"What projects has he built?\"\n- \"Explain the Genesis project\"\n- \"How do I contact him?\"\n- \"What is React?\"\n\nWhat would you like to know? 🚀";
  }

  async function handleSend() {
    
    // Dennis's names
    if (lowerMessage.match(/who is (dennis|lemayan|leleina)|tell me about (dennis|lemayan|leleina)/)) {
      return "Dennis Lemayan Leleina is a talented full-stack developer and software engineer! 🚀\n\nYou can call him Dennis, Lemayan, or Leleina - all three names refer to the same person. He's passionate about creating innovative solutions using modern technologies and specializes in:\n• Web development (frontend & backend)\n• Blockchain technology\n• Building scalable applications\n\nWant to know more about his skills or projects?";
    }

    // Skills
    if (lowerMessage.match(/skill|technology|stack|what (does|can) (he|dennis|lemayan)/)) {
      return "Dennis has an impressive tech stack! 💻\n\n**Languages:**\nPython • JavaScript • TypeScript • C++ • Solidity\n\n**Frontend:**\nReact • HTML5 • CSS3 • Tailwind CSS • Framer Motion • Vite\n\n**Backend:**\nDjango • Node.js • Express • Flask\n\n**Blockchain:**\nSolidity • Web3 • Smart Contracts • DApps\n\n**Databases:**\nMySQL • PostgreSQL • SQLite • MongoDB\n\n**Tools:**\nGit • Docker • Prisma\n\nHe's a true full-stack developer! What specific technology interests you?";
    }

    // Projects
    if (lowerMessage.match(/project|portfolio|built|created|made|work/)) {
      if (lowerMessage.includes('duma') || lowerMessage.includes('drone')) {
        return "🚁 **Duma Drones** - Innovation in Delivery!\n\nAn advanced drone delivery platform that transports essentials like meals, groceries, and care packages.\n\n**Tech Stack:** Django, Python\n**Features:**\n• Real-time delivery tracking\n• Secure payment integration\n• Intuitive user interface\n• GPS-based routing\n\nIt's designed to redefine convenience in last-mile delivery!";
      }
      
      if (lowerMessage.includes('assessly') || lowerMessage.includes('exam') || lowerMessage.includes('test')) {
        return "📝 **Assessly** - Smart Testing Platform\n\nA lightweight exam and testing application for modern education.\n\n**Tech Stack:** React, TypeScript, Node.js\n**Features:**\n• Create & manage exams\n• Real-time test conducting\n• Instant analytics & grading\n• Student performance tracking\n• Zero-setup required\n\nPerfect for educators and institutions!";
      }
      
      if (lowerMessage.includes('hospital') || lowerMessage.includes('hms') || lowerMessage.includes('healthcare')) {
        return "🏥 **Hospital Management System**\n\nA comprehensive digital solution for hospitals and clinics.\n\n**Features:**\n• Patient records management\n• Appointment scheduling\n• Billing & invoicing\n• Staff workflow automation\n• HIPAA compliance focused\n• Security-first architecture\n\nStreamlining healthcare administration!";
      }
      
      if (lowerMessage.includes('genesis') || lowerMessage.includes('blockchain') || lowerMessage.includes('crowdfund')) {
        return "💎 **Genesis** - Decentralized Crowdfunding\n\nA revolutionary blockchain-based crowdfunding platform!\n\n**Tech Stack:** Solidity, React, Web3\n**Features:**\n• Smart contract powered transactions\n• Transparent & immutable records\n• Verified campaigns\n• Secure supporter tracking\n• Full blockchain integration\n\nThe future of transparent fundraising!";
      }
      
      if (lowerMessage.includes('bank')) {
        return "🏦 **Banking Application**\n\nA modern, secure banking system for digital financial operations.\n\n**Features:**\n• Account management\n• Secure transactions\n• Transaction history tracking\n• Audit logs\n• Robust authentication\n• Intuitive dashboard\n\nEnterprise-grade security meets user-friendly design!";
      }
      
      return "Dennis has built 5 impressive projects! 🚀\n\n1. 🚁 **Duma Drones** - Drone delivery platform\n2. 📝 **Assessly** - Exam & testing app with analytics\n3. 🏥 **Hospital Management System** - Digital healthcare\n4. 💎 **Genesis** - Blockchain crowdfunding platform\n5. 🏦 **Banking Application** - Secure banking system\n\nAsk me about any specific project for more details!";
    }

    // Contact
    if (lowerMessage.match(/contact|reach|email|phone|hire|available|collaborate/)) {
      return "📬 **Get in Touch with Dennis!**\n\n📱 WhatsApp: +254715197671\n💼 LinkedIn: linkedin.com/in/dennis-leleina-500a01201\n📸 Instagram: @__lemayan__\n\nDennis is open to:\n✅ Freelance projects\n✅ Full-time positions\n✅ Collaboration opportunities\n✅ Innovative startup ideas\n\nFeel free to reach out - he'd love to hear from you!";
    }

    // Programming help - React
    if (lowerMessage.match(/react|jsx|component|hook/)) {
      return "⚛️ **React Development**\n\nDennis is a React expert! Key concepts:\n\n**Components:** Building blocks of React apps\n**Hooks:** useState, useEffect, useContext for state management\n**Props:** Pass data between components\n**JSX:** Write HTML in JavaScript\n**Virtual DOM:** Efficient rendering\n\nThis portfolio itself is built with React!\n\nNeed help with a specific React concept?";
    }

    // Programming help - Python
    if (lowerMessage.match(/python|django|flask/)) {
      return "🐍 **Python Development**\n\nDennis uses Python extensively!\n\n**Web Frameworks:**\n• Django - Full-featured, batteries-included\n• Flask - Lightweight, flexible\n\n**Use Cases:**\n• Backend APIs\n• Data processing\n• Automation scripts\n• Machine learning integration\n\n**Why Python?**\n✓ Clean, readable syntax\n✓ Huge ecosystem\n✓ Great for rapid development\n\nWhat Python topic interests you?";
    }

    // Blockchain
    if (lowerMessage.match(/blockchain|crypto|web3|smart contract|solidity|ethereum|nft|defi/)) {
      return "⛓️ **Blockchain & Web3**\n\nDennis has hands-on blockchain experience!\n\n**Skills:**\n• Solidity smart contract development\n• Web3.js integration\n• DApp (Decentralized App) creation\n• Ethereum blockchain\n• NFT & DeFi concepts\n\n**Real Project:**\nHe built **Genesis** - a decentralized crowdfunding platform using smart contracts for transparent fund management!\n\nInterested in blockchain development?";
    }

    // General greetings
    if (lowerMessage.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
      return "Hello! 👋 Welcome to Dennis's portfolio!\n\nI'm his AI assistant. I can help you learn about:\n\n💼 His skills & expertise\n🚀 Portfolio projects\n📧 Contact information\n💻 Programming topics\n🎯 Career opportunities\n\nWhat would you like to know?";
    }

    // Thanks
    if (lowerMessage.match(/thank|thanks|appreciate/)) {
      return "You're very welcome! 😊\n\nFeel free to ask anything else about Dennis's work, skills, or projects. I'm here to help!\n\nWant to get in touch with him? Just ask!";
    }

    // Help
    if (lowerMessage.match(/help|what can you|capabilities/)) {
      return "🤖 **I can help you with:**\n\n👤 About Dennis:\n• His background & skills\n• Portfolio projects (detailed info)\n• Contact information\n• Career availability\n\n💻 Programming Topics:\n• React & frontend development\n• Python & backend\n• Blockchain & Web3\n• Full-stack development\n• Technology recommendations\n\n💬 General:\n• Project explanations\n• Technology discussions\n• Career advice\n\nJust ask me anything!";
    }

    // Time/Date
    if (lowerMessage.match(/time|date|today/)) {
      const now = new Date();
      const time = now.toLocaleTimeString();
      const date = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      return `🕐 Current time: ${time}\n📅 Today's date: ${date}\n\nHow else can I help you today?`;
    }

    // Jokes
    if (lowerMessage.match(/joke|funny|laugh/)) {
      const jokes = [
        "Why do programmers prefer dark mode?\nBecause light attracts bugs! 🐛😄",
        "Why do Java developers wear glasses?\nBecause they can't C#! 😎",
        "How many programmers does it take to change a light bulb?\nNone, that's a hardware problem! 💡",
        "Why did the programmer quit their job?\nBecause they didn't get arrays! 📊😂",
        "What's a programmer's favorite place?\nThe Foo Bar! 🍺",
        "Why did the developer go broke?\nBecause he used up all his cache! 💸"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)] + "\n\nWant to know about Dennis's projects?";
    }
  }

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    // Simulate thinking time for more natural feel
    setTimeout(async () => {
      try {
        const response = await generateResponse(userMessage);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      } catch (error) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: '❌ Sorry, something went wrong. Please try again.' 
        }]);
      } finally {
        setIsTyping(false);
      }
    }, 600);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="glass-card p-6 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">AI Assistant</h2>
          <p className="text-xs text-white/60">Ask me anything</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 min-h-0">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[85%] px-4 py-2 rounded-2xl whitespace-pre-line text-sm
                ${message.role === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white/10 text-white'
                }
              `}
            >
              {message.content}
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/10 text-white px-4 py-2 rounded-2xl">
              <div className="flex gap-1">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                >●</motion.span>
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                >●</motion.span>
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                >●</motion.span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
};

const Games = () => {
  return (
    <section className="relative min-h-screen py-20 c-space">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[120px]"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Game Zone
          </h1>
          <p className="text-white/60 text-lg">
            Play chess and chat with AI while you're here!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Chess Game */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ChessBoard />
          </motion.div>

          {/* AI Chatbot */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="h-[600px] lg:h-auto"
          >
            <ChatSection />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Games;
