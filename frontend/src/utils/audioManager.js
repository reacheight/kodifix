import gemSound from '../assets/sounds/gem.mp3';
import walkingSound from '../assets/sounds/walking.mp3';
import hitSound from '../assets/sounds/hit.mp3';
import victorySound from '../assets/sounds/victory.mp3';
import leverSound from '../assets/sounds/lever.mp3';
import fireballSound from '../assets/sounds/fireball.mp3';

/**
 * Centralized audio manager for game sounds
 * Implements singleton pattern to ensure efficient audio resource management
 */
class AudioManager {
  constructor() {
    if (AudioManager.instance) {
      return AudioManager.instance;
    }

    this.sounds = {
      gem: new Audio(gemSound),
      walking: new Audio(walkingSound),
      hit: new Audio(hitSound),
      victory: new Audio(victorySound),
      lever: new Audio(leverSound),
      fireball: new Audio(fireballSound),
    };

    // Configure walking sound for looping
    this.sounds.walking.loop = false;

    AudioManager.instance = this;
  }

  /**
   * Play a sound effect
   * @param {string} soundName - Name of the sound to play
   * @param {Object} options - Playback options
   */
  play(soundName, options = {}) {
    const sound = this.sounds[soundName];
    if (!sound) {
      console.warn(`Sound "${soundName}" not found`);
      return;
    }

    try {
      // Reset to beginning if already playing
      sound.currentTime = 0;
      
      if (options.volume !== undefined) {
        sound.volume = Math.max(0, Math.min(1, options.volume));
      }

      const playPromise = sound.play();
      
      // Handle play promise for browsers that require user interaction
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn(`Failed to play sound "${soundName}":`, error);
        });
      }
    } catch (error) {
      console.warn(`Error playing sound "${soundName}":`, error);
    }
  }

  /**
   * Stop a currently playing sound
   * @param {string} soundName - Name of the sound to stop
   */
  stop(soundName) {
    const sound = this.sounds[soundName];
    if (!sound) {
      console.warn(`Sound "${soundName}" not found`);
      return;
    }

    try {
      sound.pause();
      sound.currentTime = 0;
    } catch (error) {
      console.warn(`Error stopping sound "${soundName}":`, error);
    }
  }

  /**
   * Set volume for a specific sound
   * @param {string} soundName - Name of the sound
   * @param {number} volume - Volume level (0-1)
   */
  setVolume(soundName, volume) {
    const sound = this.sounds[soundName];
    if (!sound) {
      console.warn(`Sound "${soundName}" not found`);
      return;
    }

    sound.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Set volume for all sounds
   * @param {number} volume - Volume level (0-1)
   */
  setMasterVolume(volume) {
    Object.values(this.sounds).forEach(sound => {
      sound.volume = Math.max(0, Math.min(1, volume));
    });
  }

  /**
   * Preload all sounds (useful for better performance)
   */
  preloadAll() {
    Object.values(this.sounds).forEach(sound => {
      sound.load();
    });
  }

  /**
   * Clean up audio resources
   */
  dispose() {
    Object.values(this.sounds).forEach(sound => {
      sound.pause();
      sound.src = '';
    });
    this.sounds = {};
  }
}

export const SOUND_NAMES = {
  GEM: 'gem',
  WALKING: 'walking',
  HIT: 'hit',
  VICTORY: 'victory',
  LEVER: 'lever',
  FIREBALL: 'fireball',
};


// Export a singleton instance
export const audioManager = new AudioManager();
audioManager.setMasterVolume(0.5);
audioManager.setVolume(SOUND_NAMES.FIREBALL, 0.3);
