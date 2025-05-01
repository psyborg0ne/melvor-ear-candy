const { getResourceUrl, patch, loadModule } = mod.getContext(import.meta);

export class PetManagerConnector {
    constructor(audioMng) {
        this.audioMng = audioMng;
        this.patchMap = new Map();
    }

    // Getter for audio manager
    get audioManager() {
        return this.audioMng;
    }

    // Setter for audio manager
    set audioManager(manager) {
        this.audioMng = manager;
    }

    // Getter for patchMap
    get patchMapInstance() {
        return this.patchMap;
    }

    initializeConnector()
    {
        console.log("[PSY] Ear Candy | Patching PetManager functions...");

        this.patchMapInstance.set('unlockPet', patch(PetManager, 'unlockPet'));
        this.patchMapInstance.get('unlockPet').after(() => { this.audioManager.playActionSound('PetManager', getResourceUrl(`assets/sfx/Misc/unlockPet.ogg`))});
    }
}

const audioMng = (await loadModule('src/audiomng.mjs'))?.default;

const PetManagerConnectorInstance = new PetManagerConnector(audioMng);
export default PetManagerConnectorInstance;