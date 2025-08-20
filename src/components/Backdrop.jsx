export default function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Мягкие градиенты */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-30"
           style={{background: "radial-gradient(50% 50% at 50% 50%, #E4C39B 0%, rgba(228,195,155,0) 70%)"}} />
      <div className="absolute top-1/3 -right-48 h-[620px] w-[620px] rounded-full blur-3xl opacity-25"
           style={{background: "radial-gradient(50% 50% at 50% 50%, #9BC6C2 0%, rgba(155,198,194,0) 70%)"}} />
      <div className="absolute -bottom-64 left-1/4 h-[560px] w-[560px] rounded-full blur-3xl opacity-25"
           style={{background: "radial-gradient(50% 50% at 50% 50%, #D6D2CB 0%, rgba(214,210,203,0) 70%)"}} />

      {/* Едва заметная «плёнка» */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            `url("data:image/svg+xml;utf8,` +
            encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'>
              <filter id='n'>
                <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/>
                <feColorMatrix type='saturate' values='0'/>
                <feComponentTransfer>
                  <feFuncA type='linear' slope='0.5'/>
                </feComponentTransfer>
              </filter>
              <rect width='120' height='120' filter='url(%23n)' opacity='0.6'/>
            </svg>`)+`")`
        }}
      />
    </div>
  );
}
