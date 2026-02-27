import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

/* ─── Particle helpers ─────────────────────────────────────── */
const rand = (min, max) => Math.random() * (max - min) + min;

const generateParticles = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand(0, 100),
    size: rand(2, 5),
    delay: rand(0, 3),
    duration: rand(3, 7),
    color: ['#a855f7', '#ec4899', '#3b82f6', '#06b6d4', '#8b5cf6'][Math.floor(rand(0, 5))],
  }));

const particles = generateParticles(40);

/* ─── Main component ───────────────────────────────────────── */
const LoadingScreen = ({ onLoadingComplete }) => {
  /*
    Timeline (ms):
    0        — screen appears
    200      — N starts falling
    700      — x starts falling
    1300     — C starts falling
    2100     — C fully landed → show wordmark (safe buffer)
    2200     — typing starts
    ~3500    — typing done → glitch flash
    ~4200    — onLoadingComplete fires
  */
  const [nLanded, setNLanded] = useState(false);
  const [xLanded, setXLanded] = useState(false);
  const [cLanded, setCLanded] = useState(false);
  const [showWord, setShowWord] = useState(false);
  const [typed, setTyped] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [exit, setExit] = useState(false);

  const FULL_TEXT = 'NomadxCoders';

  useEffect(() => {
    // Letters land
    const t1 = setTimeout(() => setNLanded(true), 900);
    const t2 = setTimeout(() => setXLanded(true), 1400);
    const t3 = setTimeout(() => setCLanded(true), 2000); // C lands
    // Show word only well after C has landed and bounced
    const t4 = setTimeout(() => setShowWord(true), 2500);
    const t5 = setTimeout(() => setShowCursor(true), 2600);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, []);

  // Typewriter
  useEffect(() => {
    if (!showCursor) return;
    if (typed.length >= FULL_TEXT.length) {
      const g1 = setTimeout(() => setGlitch(true), 600);
      const g2 = setTimeout(() => setGlitch(false), 800);
      const g3 = setTimeout(() => setGlitch(true), 900);
      const g4 = setTimeout(() => setGlitch(false), 1050);
      const ex = setTimeout(() => setExit(true), 1200);
      const done = setTimeout(() => onLoadingComplete(), 1700);
      return () => [g1, g2, g3, g4, ex, done].forEach(clearTimeout);
    }
    const t = setTimeout(() => {
      setTyped(FULL_TEXT.slice(0, typed.length + 1));
    }, typed.length === 0 ? 0 : 90 + rand(-20, 40));
    return () => clearTimeout(t);
  }, [showCursor, typed]);

  /* Letter fall config */
  const letterConfigs = [
    { char: 'N', delay: 0.2, color: '#a855f7', shadow: 'rgba(168,85,247,0.9)', landed: nLanded },
    { char: 'x', delay: 0.7, color: '#ec4899', shadow: 'rgba(236,72,153,0.9)', landed: xLanded },
    { char: 'C', delay: 1.3, color: '#3b82f6', shadow: 'rgba(59,130,246,0.9)', landed: cLanded },
  ];

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{
            background: 'linear-gradient(135deg, #02020a 0%, #0a0614 40%, #080418 100%)',
          }}
        >
          {/* ── Ambient orbs ── */}
          {[
            { color: '#6d28d9', x: '15%', y: '20%', size: 500 },
            { color: '#be185d', x: '75%', y: '65%', size: 400 },
            { color: '#1d4ed8', x: '55%', y: '15%', size: 350 },
          ].map((orb, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: orb.size, height: orb.size,
                left: orb.x, top: orb.y,
                background: `radial-gradient(circle, ${orb.color}22 0%, transparent 70%)`,
                filter: 'blur(60px)',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
            />
          ))}

          {/* ── Floating particles ── */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: p.size, height: p.size,
                left: `${p.x}%`,
                background: p.color,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              }}
              initial={{ y: '110vh', opacity: 0 }}
              animate={{ y: '-10vh', opacity: [0, 0.8, 0.8, 0] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}

          {/* ── Scanlines overlay ── */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
            }}
          />

          {/* ── Grid lines ── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* ── Falling letters (shown before word assembles) ── */}
          {!showWord && (
            <div className="relative flex items-end justify-center gap-8 h-48 z-20">
              {letterConfigs.map(({ char, color, shadow, landed }) => (
                <motion.span
                  key={char}
                  initial={{ y: -500, opacity: 0, rotate: rand(-30, 30) }}
                  animate={
                    landed
                      ? { y: 0, opacity: 1, rotate: 0, scaleY: [1, 0.7, 1.1, 1] }
                      : { y: -500, opacity: 0 }
                  }
                  transition={
                    landed
                      ? {
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                        scaleY: { duration: 0.35, times: [0, 0.4, 0.7, 1], ease: 'easeOut', delay: 0.55 },
                      }
                      : {}
                  }
                  style={{
                    fontSize: 'clamp(5rem, 14vw, 10rem)',
                    fontFamily: "'Outfit', 'Inter', sans-serif",
                    fontWeight: 900,
                    color,
                    textShadow: `0 0 40px ${shadow}, 0 0 80px ${shadow}55`,
                    lineHeight: 1,
                    display: 'inline-block',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          )}

          {/* ── Landing shockwave ── */}
          {cLanded && !showWord && (
            <motion.div
              className="absolute z-10 rounded-full pointer-events-none"
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{ width: 600, height: 600, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                border: '2px solid rgba(168,85,247,0.6)',
                boxShadow: '0 0 30px rgba(168,85,247,0.4)',
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%',
              }}
            />
          )}

          {/* ── Full wordmark + typewriter ── */}
          {showWord && (
            <motion.div
              className="relative z-20 flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Wordmark */}
              <div
                className="relative"
                style={{
                  fontSize: 'clamp(3rem, 9vw, 7rem)',
                  fontFamily: "'Outfit', 'Inter', sans-serif",
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {/* Glitch layers */}
                {glitch && (
                  <>
                    <span
                      aria-hidden
                      style={{
                        position: 'absolute', left: '4px', top: 0,
                        background: 'linear-gradient(90deg, #a855f7, #ec4899, #3b82f6)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        opacity: 0.7, clipPath: 'inset(30% 0 40% 0)', mixBlendMode: 'screen',
                      }}
                    >{typed}</span>
                    <span
                      aria-hidden
                      style={{
                        position: 'absolute', left: '-4px', top: 0,
                        background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        opacity: 0.5, clipPath: 'inset(60% 0 10% 0)', mixBlendMode: 'screen',
                      }}
                    >{typed}</span>
                  </>
                )}

                {/* Main text */}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 40%, #3b82f6 80%, #06b6d4 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: glitch ? 'blur(1px)' : 'none',
                    display: 'inline-block',
                  }}
                >
                  {typed}
                </span>

                {/* Blinking cursor */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  style={{
                    display: 'inline-block', width: '3px', height: '0.85em',
                    marginLeft: '4px', verticalAlign: 'middle',
                    background: 'linear-gradient(180deg, #a855f7, #ec4899)',
                    borderRadius: '2px', boxShadow: '0 0 12px rgba(168,85,247,0.8)',
                  }}
                />
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: typed.length > 6 ? 1 : 0, y: typed.length > 6 ? 0 : 10 }}
                transition={{ duration: 0.4 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
                  letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: 'rgba(196,181,253,0.6)', fontWeight: 300,
                }}
              >
                crafting the future, one line at a time
              </motion.p>

              {/* Progress bar */}
              <motion.div
                className="relative overflow-hidden rounded-full"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: typed.length > 4 ? 1 : 0, scaleX: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ width: 'clamp(200px, 40vw, 360px)', height: '2px', background: 'rgba(255,255,255,0.07)', marginTop: '8px' }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #a855f7, #ec4899, #3b82f6)',
                    boxShadow: '0 0 10px rgba(168,85,247,0.6)',
                  }}
                  animate={{ width: `${(typed.length / FULL_TEXT.length) * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                    width: '40%',
                  }}
                  animate={{ x: ['-40%', '260%'] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear', repeatDelay: 0.2 }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* ── Corner decorations ── */}
          {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-8 h-8 pointer-events-none z-10`}
              style={{
                borderTop: i < 2 ? '1.5px solid rgba(168,85,247,0.4)' : 'none',
                borderBottom: i >= 2 ? '1.5px solid rgba(168,85,247,0.4)' : 'none',
                borderLeft: i % 2 === 0 ? '1.5px solid rgba(168,85,247,0.4)' : 'none',
                borderRight: i % 2 === 1 ? '1.5px solid rgba(168,85,247,0.4)' : 'none',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
