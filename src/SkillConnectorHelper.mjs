// [PSY] Ear Candy | /src/SkillConnectorHelper.mjs
const { loadModule } = mod.getContext(import.meta);

export async function loadSkillConnectors()
{
    const connectorModules = new Map();
    const loadPromises = [];

        // Enqueue loading for each skill
        // TODO: Define global skill list once
        game.skills.forEach(skill => {
          const skillname = getLangString(`SKILL_NAME_${skill.localID}`);
          const p = (async () => {
            try {
              const mod = await loadModule(`src/skills/${skillname}Connector.mjs`);
              if (mod?.default) {
                const connector = new mod.default();
                connectorModules.set(skillname, connector);
                connector.initializeConnector();
              }
            } catch (e) {
              console.warn(`[PSY] Ear Candy: couldn’t load ${skillname}`, e);
            }
          })();
          loadPromises.push(p);
        });

        // Wait for all connector loads
        await Promise.all(loadPromises);

        return connectorModules;
}