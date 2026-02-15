interface PhoneMockupProps {
  src: string;
  alt: string;
  width?: number;
  className?: string;
  tilt?: number;
}

export default function PhoneMockup({
  src,
  alt,
  width = 180,
  className = '',
  tilt = 0,
}: PhoneMockupProps) {
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        width,
        transform: tilt ? `rotate(${tilt}deg)` : undefined,
      }}
    >
      <div
        className="rounded-[24px] overflow-hidden border-2"
        style={{
          borderColor: 'rgba(139, 92, 246, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>
    </div>
  );
}
