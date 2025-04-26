const { getResourceUrl, patch } = mod.getContext(import.meta);

export class SkillConnector {
    constructor() {
      if (this.constructor == SkillConnector) {
        throw new Error(`[PSY] ${this.constructor.name} class is abstract and cannot be initialized directly.`);
      }

    this.audioMng = null; // Initialize with a default value
    this.skillname = null; // Initialize with a default value
    this.skill = null; // Initialize with a default value
    this.patchAddXP = null;
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

    // Getter for patchAddXP
    get patchAddXPInstance() {
        return this.patchAddXP;
    }

    // Setter for patchAddXP
    set patchAddXPInstance(patch) {
        this.patchAddXP = patch;
    }

    initializeConnector() {
        // TODO Figure out the logic | Patches should be performed here ?

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
        console.log("Patching base game functions...");

        this.patchXpDrop();
        this.patchActionInterval();
        this.patchLevelUp();
    }

    initTotHPatches()
    {
        console.log("Throne of the Herald expansion detected, patching functions...");
    }

    initAoDPatches()
    {
        console.log("Atlas of Discovery expansion detected, patching functions...");
    }

    initItAPatches()
    {
        console.log("Into the Abyss expansion detected, patching functions...");
        this.patchAbyssalLevelUp();
    }
    // Game & expansion patches end


    patchXpDrop() {
        // TODO Patch XP drop
        let sAddXP = getResourceUrl(`assets/sfx/${this.skillName}/addXP.wav`);
        this.patchAddXPInstance = patch(this.skillInstance.constructor, 'addXP');
        // this.patchAddXPInstance.after(this.afterXpDropPatch());
        this.patchAddXPInstance.after(() => { this.audioManager.playActionSound(this.skillName, getResourceUrl(`assets/sfx/${this.skillName}/addXP.wav`))});
        console.log(`[${this.constructor.name}] Patching XP drop...`);
    }

    patchActionInterval() {
        // TODO Patch action interval
        console.log(`[${this.constructor.name}] Patching action interval...`);
    }

    patchLevelUp() {
        // TODO Patch level up
        console.log(`[${this.constructor.name}] Patching level up...`);
    }

    patchAbyssalLevelUp() {
        // TODO Patch abyssal level up
        console.log(`[${this.constructor.name}] Patching abyssal level up...`);
    }

    // if skill is locked
    patchOnUnlockSkill()
    {
        // TODO Patch on unlock skill
        console.log(`[${this.constructor.name}] Patching on unlock skill...`);
    }

    // If character mode is ancient relic
    patchAncientRelicUnlock()
    {
        // TODO Patch ancient relic unlock
        console.log(`[${this.constructor.name}] Patching ancient relic unlock...`);
    }

    helloWorld() {
        console.log(`[${this.constructor.name}] Hello world!`);
        // this.audioMng.play(getResourceUrl('assets/sfx/Woodcutting/addXP.wav'));
    }

  }