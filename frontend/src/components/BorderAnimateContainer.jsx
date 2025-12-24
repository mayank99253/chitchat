// How to make animated gradient border 👇
// https://cruip-tutorials.vercel.app/animated-gradient-border/
function BorderAnimatedContainer({ children, className = "" }) {
  return (
    <div
      className={`
        backdrop-blur-xl bg-white/10 border border-white/20 
        rounded-3xl shadow-2xl transition-all duration-500 
        hover:bg-white/15 
        [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,
        conic-gradient(from_var(--border-angle),
        theme(colors.slate.600/.48)_80%,
        _theme(colors.cyan.500)_86%,
        _theme(colors.cyan.300)_90%,
        _theme(colors.cyan.500)_94%,
        _theme(colors.slate.600/.48))_border-box]
        animate-border flex overflow-hidden
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default BorderAnimatedContainer;
