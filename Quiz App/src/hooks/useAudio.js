import { useContext, useCallback } from 'react';
import { UserContext } from '../context/UserContext';

export const useAudio = () => {
  const { soundEnabled, volume } = useContext(UserContext);

  const playSynthesizedSound = useCallback((type) => {
    if (!soundEnabled) return;

    try {
      // Create audio context
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Master volume node
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(volume * 0.3, ctx.currentTime); // keep it soft
      gainNode.connect(ctx.destination);

      if (type === 'click') {
        // Clean quick woodblock-like click
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

        osc.connect(gainNode);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'tick') {
        // Short high-pitched tick for countdown warning
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        
        gainNode.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

        osc.connect(gainNode);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'correct') {
        // Chime: Two pleasant high tones in quick succession
        const now = ctx.currentTime;
        
        // Tone 1
        const osc1 = ctx.createOscillator();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(523.25, now); // C5
        osc1.connect(gainNode);
        osc1.start(now);
        gainNode.gain.setValueAtTime(volume * 0.25, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc1.stop(now + 0.15);

        // Tone 2
        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(659.25, now + 0.1); // E5
        
        const gainNode2 = ctx.createGain();
        gainNode2.gain.setValueAtTime(volume * 0.35, now + 0.1);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        gainNode2.connect(ctx.destination);

        osc2.connect(gainNode2);
        osc2.start(now + 0.1);
        osc2.stop(now + 0.35);
      } else if (type === 'incorrect') {
        // Low buzzing fail chord
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.3);

        gainNode.gain.setValueAtTime(volume * 0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'success') {
        // Rising arpeggio chord for victory
        const now = ctx.currentTime;
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
        
        notes.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + (index * 0.1));
          
          oscGain.gain.setValueAtTime(volume * 0.2, now + (index * 0.1));
          oscGain.gain.exponentialRampToValueAtTime(0.01, now + (index * 0.1) + 0.4);
          
          osc.connect(oscGain);
          oscGain.connect(ctx.destination);
          
          osc.start(now + (index * 0.1));
          osc.stop(now + (index * 0.1) + 0.4);
        });
      }
    } catch (e) {
      console.warn('Web Audio API is not supported or blocked in this browser tab context.', e);
    }
  }, [soundEnabled, volume]);

  return { playSound: playSynthesizedSound };
};
export default useAudio;
