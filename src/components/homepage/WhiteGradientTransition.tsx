export default function WhiteGradientTransition() {
  return (
    <div className="relative w-full h-14 md:h-16 xl:h-24 pointer-events-none -mt-2 z-30">
      {/* Fading white gradient goes from transparent (top) to full white (bottom) */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(100,100,20,100.0) 10%, #fff 20%)"
        }}
      />
    </div>
  );
}
