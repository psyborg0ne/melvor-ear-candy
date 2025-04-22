export class SkillConnector {
    constructor() {
      if (this.constructor == SkillConnector) {
        throw new Error(`[PSY] ${this.constructor.name} class is abstract and cannot be initialized directly.`);
      }
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

    helloWorld() {
        console.log(`[${this.constructor.name}] Hello world!`);
    }

  }