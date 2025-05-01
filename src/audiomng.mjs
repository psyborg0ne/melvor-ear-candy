// [PSY] Ear Candy | /src/audiomng.mjs
class AudioManager {
    constructor() {
        if (AudioManager.instance == null) {
            this._masterVol = 30;
            this.hasDelay = false;
            this.sDelay = 1;
            this.petUnlSfx = true;

            this._skillSettings = null;


            this.activeSkill = '' ;// Active skill playing sounds
            this.lastSoundTime = 0;

            Object.defineProperty(this, 'mVol', {
                get() {
                    return this._masterVol;
                },
                set(value) {
                    if (Number.isFinite(value) && value >= 0 && value <= 100) {
                        this._masterVol = value;
                        console.log(`Master volume set to: ${this._masterVol}`);
                    } else {
                        console.error('Volume must be a number between 0 and 100.');
                    }
                }
            });

            Object.defineProperty(this, 'skillSettings', {
                get() {
                    return this._skillSettings;
                },
                set(value) {
                    if (value) {
                        this._skillSettings = value;
                        console.log('Skill settings updated.');
                    } else {
                        console.error('Invalid skill settings object.');
                    }
                }
            });this._masterVol,


            // Initialize the audio pool with a custom properties | Might extend audio in the future?
            this.audioPool = Array.from({ length: 5 }, () => {
                const audio = new Audio();
                audio.gamesource = '';
                audio.lastUsedTime = 0; // Initialize `lastUsedTime` to 0
                return audio;
            });

            AudioManager.instance = this; // Save the singleton instance

        }
        return AudioManager.instance;
    }

    get freeAudio() {
        // Find the first available audio object in the pool
        if(!loadingOfflineProgress)
        {
            const freeAudio = this.audioPool.find(audio => {
                return audio.paused && audio.ended && !audio.src; // Conditions for being "free"
            });

            if (freeAudio) {
                return freeAudio; // Return the free audio object
            } else {
                // No free audio objects available, find and release the oldest one
                console.warn('No free audio objects available. Releasing the oldest one.');
                const oldestAudio = this.audioPool.reduce((oldest, current) => {
                    return current.lastUsedTime < oldest.lastUsedTime ? current : oldest;
                });

                // Reset the oldest audio object for reuse
                oldestAudio.pause();
                oldestAudio.currentTime = 0;
                oldestAudio.src = '';
                return oldestAudio;
            }
        }
    }

    setLastSoundTime(time) {
        if (time != 0) {
            this.lastSoundTime = time;
            console.log('Last sound time set to:', this.lastSoundTime);
        }
    }

    playMusic(url){
        this.play(url);
    }

    playActionSound(skillname, url){
        const audio = this.freeAudio;
        if (audio) {
            audio.src = url;
            audio.gamesource = skillname; // Set the media group to the skill name

            if((this.skillSettings[skillname]['volume'] == 0    ||
                this.mVol == 0)                                 ||
                !this.skillSettings[skillname]['enabled'])
                {
                    // no need to waste resources if muted
                    return;
                }

            audio.volume = Math.min(this.mVol, this.skillSettings[skillname]['volume']) / 100;

            audio.lastUsedTime = Date.now(); // Update the last used time
            this.play(audio)
        } else {
            console.error('Failed to retrieve an audio object.');
        }
    }


    play(audio){
        if ((!loadingOfflineProgress) && audio.volume > 0) {
            const currentTime = Date.now();
            const lastTime = this.lastSoundTime || 0;

            if (!audio || (this.hasDelay && ((currentTime - lastTime) <= (this.sDelay * 1000)))) {
                // Early return in case delay is enabled and not enough time passed
                return;
            }

            try {
                audio.play();
                this.setLastSoundTime(currentTime);
                console.log(`[${audio.gamesource}] Playing sound: ${audio.src}`);
            } catch (e) {
                console.log('Error playing sound:', e);
            }
        }
    }

    initSettings(generalSettings) {
        if (generalSettings) {
            this.mVol       = generalSettings.get('master-volume');
            this.hasDelay   = generalSettings.get('enable-delay');
            this.sDelay     = generalSettings.get('sound-delay-sec');
            this.petUnlSfx  = generalSettings.get('enable-petmanager-sounds');
        }

        // if (skillSettings) {
        //     this.skillSettings = skillSettings;
        //     // Initialize skill settings if needed
        //     // console.log(`[SKILL SETTINGS] ${this.skillSettings.get('skill-card-grid')}`);
        // }
    }
}



// const { settings } = mod.getContext(import.meta);

// const generalSettings = settings.section('General');
// const skillSettings   = settings.section('Skills');

// const audioManagerInstance = new AudioManager(generalSettings, skillSettings);
const audioManagerInstance = new AudioManager();
Object.seal(audioManagerInstance); // Prevent modifications to the instance
export default audioManagerInstance; // Export the singleton instance