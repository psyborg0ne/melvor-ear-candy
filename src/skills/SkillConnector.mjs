const { getResourceUrl, patch } = mod.getContext(import.meta);

export class SkillConnector {
    constructor() {
      if (this.constructor == SkillConnector) {
        throw new Error(`[PSY] ${this.constructor.name} class is abstract and cannot be initialized directly.`);
      }

    this.audioMng = null;
    this.skillname = null;
    this.skill = null;

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

    // Getter for skillname
    get skillName() {
        return this.skillname;
    }

    // Setter for skillname
    set skillName(name) {
        this.skillname = name;
    }

    // Getter for skill
    get skillInstance() {
        return this.skill;
    }

    // Setter for skill
    set skillInstance(skill) {
        this.skill = skill;
    }

    // Getter for patchMap
    get patchMapInstance() {
        return this.patchMap;
    }

    initializeConnector() {
        // Base game patches
        this.initBaseGamePatches();

        // Throne of the Herald expansion patches
        if (cloudManager.hasTotHEntitlementAndIsEnabled)
            this.initTotHPatches();

        // Atlas of Discovery expansion patches
        if (cloudManager.hasAoDEntitlementAndIsEnabled)
            this.initAoDPatches();

        // Into the Abyss expansion patches
        if (cloudManager.hasItAEntitlementAndIsEnabled){
            this.initItAPatches();
        }

    }

    // Game & expansion patches
    initBaseGamePatches()
    {
        console.log("[PSY] Ear Candy | Patching base game functions...");

        this.patchActionInterval();
        this.patchXpDrop();
        this.patchLevelUp();

        if(game.currentGamemode.localID == 'Hardcore' ||
            game.currentGamemode.localID == 'AncientRelics')
            {
                this.patchOnUnlockSkill();
            }

        if(game.currentGamemode.localID == 'AncientRelics')
            {
                this.patchAncientRelicUnlock();
            }
    }

    initTotHPatches()
    {
        console.log("[PSY] Ear Candy | Throne of the Herald expansion detected, patching functions...");
    }

    initAoDPatches()
    {
        console.log("[PSY] Ear Candy | Atlas of Discovery expansion detected, patching functions...");
    }

    initItAPatches()
    {
        console.log("[PSY] Ear Candy | Into the Abyss expansion detected, patching functions...");
        this.patchAbyssalLevelUp();
    }
    // Game & expansion patches end

    // Base game patches
    patchActionInterval() {
        // TODO Patch action interval
        // May be used for specific skills only
        console.log(`[${this.constructor.name}] Patching action interval...`);
    }

    patchXpDrop() {
        this.patchMapInstance.set('addXP', patch(this.skillInstance.constructor, 'addXP'));
        this.patchMapInstance.get('addXP').after(() => { this.audioManager.playActionSound(this.skillName, getResourceUrl(`assets/sfx/Skills/${this.skillName}/addXP.wav`))});
        console.log(`[${this.constructor.name}] Patching XP drop...`);
    }

    patchLevelUp() {
        this.patchMapInstance.set('levelUp', patch(this.skillInstance.constructor, 'levelUp'));
        this.patchMapInstance.get('levelUp').after(() => { this.audioManager.playActionSound(this.skillName, getResourceUrl(`assets/sfx/Skills/${this.skillName}/levelUp.ogg`))});
        console.log(`[${this.constructor.name}] Patching level up...`);
    }

    // if skill is locked
    patchOnUnlockSkill()
    {
        this.patchMapInstance.set('onUnlock', patch(this.skillInstance.constructor, 'onUnlock'));
        this.patchMapInstance.get('onUnlock').after(() => { this.audioManager.playActionSound(this.skillName, getResourceUrl(`assets/sfx/Misc/Skills/onUnlock.ogg`))});
        console.log(`[${this.constructor.name}] Patching on unlock skill...`);
    }

    // If character mode is ancient relic
    patchAncientRelicUnlock()
    {
        this.patchMapInstance.set('onAncientRelicUnlock', patch(this.skillInstance.constructor, 'onAncientRelicUnlock'));
        this.patchMapInstance.get('onAncientRelicUnlock').after(() => { this.audioManager.playActionSound(this.skillName, getResourceUrl(`assets/sfx/Misc/Skills/onAncientRelicUnlock.ogg`))});
        console.log(`[${this.constructor.name}] Patching ancient relic unlock...`);
    }
    // Base game patches end

    // Into the Abyss expansion patches
    patchAbyssalLevelUp() {
        this.patchMapInstance.set('abyssalLevelUp', patch(this.skillInstance.constructor, 'abyssalLevelUp'));
        this.patchMapInstance.get('abyssalLevelUp').after(() => { this.audioManager.playActionSound(this.skillName, getResourceUrl(`assets/sfx/Skills/${this.skillName}/abyssalLevelUp.ogg`))});
        console.log(`[${this.constructor.name}] Patching abyssal level up...`);
    }
    // Into the Abyss expansion patches end

    //TODO Test function - remove once done
    helloWorld() {
        console.log(`[${this.constructor.name}] Hello world!`);
    }

  }