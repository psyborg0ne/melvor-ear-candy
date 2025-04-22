// [PSY] Ear Candy | setup.mjs
export async function setup({loadModule, patch, getResourceUrl, onCharacterLoaded, onInterfaceReady}) {
    const audioMod  = await loadModule('src/audiomng.mjs');
    const audioMng  = audioMod.default;
    const opt       = await loadModule('src/settings.mjs');
    const skillConn = await loadModule('src/SkillConnectorHelper.mjs');

    let connMap;

    onCharacterLoaded(async () => {
      opt.initSettings();

      connMap = new Map(await skillConn.loadSkillConnectors());
    });

    onInterfaceReady(async () => {
      connMap.get('Mining').helloWorld();
    });
  }