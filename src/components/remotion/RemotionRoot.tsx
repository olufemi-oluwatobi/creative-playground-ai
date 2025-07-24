import React from 'react';
import { Composition } from 'remotion';

// Simplified emotion video component
const SimpleEmotionVideo: React.FC<{
  emotion?: string;
  color?: string;
}> = ({ emotion = 'Happy', color = '#FF6B6B' }) => {
  return (
    <div
      style={{
        background: `linear-gradient(45deg, ${color}, ${color}88)`,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '4rem',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <div style={{ fontSize: '8rem' }}>
          {emotion === 'Happy' ? '😊' : emotion === 'Excited' ? '🤩' : '❤️'}
        </div>
        <div style={{ fontSize: '3rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          {emotion}
        </div>
      </div>
    </div>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EmotionVideo"
        component={SimpleEmotionVideo}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          emotion: 'Happy',
          color: '#FF6B6B',
        }}
      />
    </>
  );
};