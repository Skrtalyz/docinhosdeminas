export const FloatingBlobs = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10 bg-clay-canvas">
      <div className="absolute -top-[10%] -left-[10%] h-[60vh] w-[60vh] rounded-full bg-clay-accent/10 blur-3xl animate-clay-float" />
      <div className="absolute top-[20%] -right-[10%] h-[50vh] w-[50vh] rounded-full bg-clay-accent-secondary/10 blur-3xl animate-clay-float-delayed animation-delay-2000" />
      <div className="absolute -bottom-[10%] left-[20%] h-[55vh] w-[55vh] rounded-full bg-clay-accent-tertiary/10 blur-3xl animate-clay-float-slow animation-delay-4000" />
      <div className="absolute bottom-[10%] right-[10%] h-[40vh] w-[40vh] rounded-full bg-clay-warning/5 blur-3xl animate-clay-breathe" />
    </div>
  );
};
