import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, RotateCcw } from 'lucide-react';

// Simple Emotion Video Component for the Player
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
          {emotion === 'Happy' ? '😊' : 
           emotion === 'Excited' ? '🤩' : 
           emotion === 'Love' ? '❤️' :
           emotion === 'Sad' ? '😢' :
           emotion === 'Cool' ? '😎' :
           emotion === 'Surprised' ? '😮' : '😊'}
        </div>
        <div style={{ fontSize: '3rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          {emotion}
        </div>
        <div style={{ fontSize: '1.5rem', opacity: 0.8, fontWeight: 'normal' }}>
          Feeling {emotion} today!
        </div>
      </div>
    </div>
  );
};

const emotions = [
  { name: 'Happy', color: '#FF6B6B', emoji: '😊' },
  { name: 'Excited', color: '#4ECDC4', emoji: '🤩' },
  { name: 'Love', color: '#FF69B4', emoji: '❤️' },
  { name: 'Sad', color: '#74B9FF', emoji: '😢' },
  { name: 'Cool', color: '#A29BFE', emoji: '😎' },
  { name: 'Surprised', color: '#FD79A8', emoji: '😮' },
];

export const RemotionPlayer = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(emotions[0]);
  const [playerRef, setPlayerRef] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (playerRef) {
      playerRef.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (playerRef) {
      playerRef.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    if (playerRef) {
      playerRef.seekTo(0);
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Remotion Emotion Videos
        </h2>
        <p className="text-muted-foreground">
          Create programmatic videos with React and Remotion
        </p>
      </div>

      <Card className="p-6 bg-gradient-secondary border-border/50">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Video Controls</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRestart}
                className="h-8 w-8 p-0"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={isPlaying ? handlePause : handlePlay}
                className="h-8 w-8 p-0"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Emotion:</label>
            <Select
              value={selectedEmotion.name}
              onValueChange={(value) => {
                const emotion = emotions.find(e => e.name === value);
                if (emotion) setSelectedEmotion(emotion);
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span>{selectedEmotion.emoji}</span>
                    <span>{selectedEmotion.name}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {emotions.map((emotion) => (
                  <SelectItem key={emotion.name} value={emotion.name}>
                    <div className="flex items-center gap-2">
                      <span>{emotion.emoji}</span>
                      <span>{emotion.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden bg-gradient-secondary border-border/50">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold">Video Preview</h3>
          <p className="text-sm text-muted-foreground">
            Current emotion: {selectedEmotion.name} {selectedEmotion.emoji}
          </p>
        </div>
        <div className="p-4">
          <div className="aspect-video bg-editor-bg rounded-lg overflow-hidden shadow-card">
            <Player
              ref={setPlayerRef}
              component={SimpleEmotionVideo}
              inputProps={{
                emotion: selectedEmotion.name,
                color: selectedEmotion.color,
              }}
              durationInFrames={150}
              fps={30}
              compositionWidth={1280}
              compositionHeight={720}
              style={{
                width: '100%',
                height: '100%',
              }}
              controls
              loop
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {emotions.map((emotion) => (
          <Button
            key={emotion.name}
            variant={selectedEmotion.name === emotion.name ? "default" : "secondary"}
            onClick={() => setSelectedEmotion(emotion)}
            className="h-16 flex flex-col items-center gap-1"
          >
            <span className="text-2xl">{emotion.emoji}</span>
            <span className="text-xs">{emotion.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};