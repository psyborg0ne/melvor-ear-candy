// [PSY] Ear Candy | /src/SkillConnectorHelper.mjs
const { loadModule } = mod.getContext(import.meta);

export async function loadSkillConnectors()
{
  const audioMod = await loadModule('src/audiomng.mjs');
  const audioMng = audioMod.default;

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
          connector.audioMng = audioMng;
          connector.skillName = skillname;
          connector.skillInstance = skill;
          connectorModules.set(skillname, connector);
          connector.initializeConnector();
        }
      } catch (e) {
        console.warn(`[PSY] Ear Candy: couldn’t load ${skillname}Connector.mjs`, e);
      }
    })();

    // Add the connector load promise to the array
    loadPromises.push(p);
  });

  // Wait for all connectors to be loaded
  await Promise.all(loadPromises);

  return connectorModules;
}