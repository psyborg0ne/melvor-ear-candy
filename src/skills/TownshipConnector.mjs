const { loadModule } = mod.getContext(import.meta); // Ensure this is correctly set up
const { SkillConnector } = await loadModule('src/skills/SkillConnector.mjs'); // Dynamically load SkillConnector

class TownshipConnector extends SkillConnector {
    patchXpDrop() {
        super.patchXpDrop();
        console.log(`[INSIDE THE SKILL CONNECTOR] Patching XP drop...`);
    }
}

export default TownshipConnector;