import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Apple Touch Icon metadata
export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#4338CA', // Solid background for iOS (no transparency/rounded corners)
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
          <path d="M328 128L152 304h104l-32 128 176-192h-104l32-112z" fill="white"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
