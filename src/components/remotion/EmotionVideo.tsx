import React from 'react';
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';

export interface EmotionVideoProps {
  emotion: string;
  color: string;
}

export const EmotionVideo: React.FC<EmotionVideoProps> = ({ emotion, color }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animation for the main text
  const titleAnimation = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 0.5,
    },
  });

  // Scale animation for emphasis
  const scale = interpolate(
    frame,
    [0, durationInFrames / 4, durationInFrames / 2, (3 * durationInFrames) / 4, durationInFrames],
    [0, 1.2, 1, 1.1, 0.8],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Opacity animation
  const opacity = interpolate(
    frame,
    [0, 30, durationInFrames - 30, durationInFrames],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Background color animation
  const backgroundColorAnimation = interpolate(
    frame,
    [0, durationInFrames / 2, durationInFrames],
    [0, 1, 0.5]
  );

  const getEmotionEmoji = (emotion: string) => {
    const emotionMap: { [key: string]: string } = {
      happy: '😊',
      sad: '😢',
      excited: '🤩',
      angry: '😠',
      love: '❤️',
      surprised: '😮',
      confused: '🤔',
      cool: '😎',
    };
    return emotionMap[emotion.toLowerCase()] || '😊';
  };

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(45deg, ${color}, ${color}88)`,
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
      <div
        style={{
          transform: `scale(${scale * titleAnimation})`,
          opacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <div style={{ fontSize: '8rem' }}>
          {getEmotionEmoji(emotion)}
        </div>
        <div
          style={{
            fontSize: '3rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
          }}
        >
          {emotion}
        </div>
        <div
          style={{
            fontSize: '1.5rem',
            opacity: 0.8,
            fontWeight: 'normal',
          }}
        >
          Feeling {emotion} today!
        </div>
      </div>
      
      {/* Animated particles */}
      {[...Array(6)].map((_, i) => {
        const particleDelay = i * 10;
        const particleOpacity = interpolate(
          frame,
          [particleDelay, particleDelay + 60, durationInFrames - 30],
          [0, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        
        const particleY = interpolate(
          frame - particleDelay,
          [0, durationInFrames],
          [100, -100],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${20 + i * 10}%`,
              top: '50%',
              transform: `translateY(${particleY}px)`,
              opacity: particleOpacity,
              fontSize: '2rem',
            }}
          >
            ✨
          </div>
        );
      })}
    </AbsoluteFill>
  );
};