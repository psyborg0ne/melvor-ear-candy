// [PSY] Ear Candy | /src/audiomng.mjs
class AudioManager {
    constructor() {
        if (AudioManager.instance == null) {
            this.mVol = 3; // Master volume
            this.hasDelay = false; // Enable sound delay
            this.sDelay = 1; // Sound delay in seconds
            this.activeSkill = '' // Active skill playing music

            this.lastSoundTime = 0;

            AudioManager.instance = this; // Save the singleton instance
        }
        return AudioManager.instance;
    }

    enableSoundDelay(hasDelay){
        this.hasDelay = hasDelay;
        console.log('Sound delay enabled:', this.hasDelay);
    }

    setMasterVolume(volume) {
        if (volume >= 0 && volume <= 100) {
            this.mVol = volume;
            console.log('Master volume set to:', this.mVol);
        }
    }

    setSoundDelay(delay) {
        if (this.hasDelay && (delay >= 1 && delay <= 10)) {
            this.sDelay = delay;
            console.log('Sound delay set to:', this.sDelay);
        }
    }

    setLastSoundTime(time) {
        if (time != 0) {
            this.lastSoundTime = time;
            console.log('Last sound time set to:', this.lastSoundTime);
        }
    }

    playActionSound(skillname, url) {
        this.play(url);
        this.activeSkill = skillname;
    }

    playMusic(url){
        this.play(url);
    }

    play(url){
        if (this.mVol > 0) {
            const currentTime = Date.now();
            const lastTime = this.lastSoundTime || 0;

            if (this.hasDelay && ((currentTime - lastTime) <= (this.sDelay * 1000))) {
                // Early return in case delay is enabled and not enough time passed
                return;
            }

            try {
                let audio = new Audio(url);
                audio.volume = this.mVol / 100;
                audio.play();
                this.setLastSoundTime(currentTime);
                console.log('Playing sound:', url);
            } catch (e) {
                console.log('Error playing sound:', e);
            }
        }
    }
}

const audioManagerInstance = new AudioManager();
Object.seal(audioManagerInstance); // Prevent modifications to the instance
export default audioManagerInstance; // Export the singleton instance