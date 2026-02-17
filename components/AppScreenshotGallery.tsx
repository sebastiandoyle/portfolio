'use client';

interface AppScreenshot {
  src: string;
  appName: string;
}

interface AppScreenshotGalleryProps {
  screenshots: AppScreenshot[];
}

export default function AppScreenshotGallery({ screenshots }: AppScreenshotGalleryProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {screenshots.map((app) => (
        <div key={app.appName}>
          <div className="rounded-xl overflow-hidden border border-[#27272a] bg-[#18181b] shadow-sm">
            <img
              src={app.src}
              alt={`${app.appName} screenshot`}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <p className="text-xs text-[#71717a] mt-2 text-center">{app.appName}</p>
        </div>
      ))}
    </div>
  );
}
