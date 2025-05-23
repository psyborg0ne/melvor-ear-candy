// [PSY] Ear Candy | setup.mjs
export async function setup({loadModule, patch, getResourceUrl, onCharacterLoaded, onInterfaceReady, onModsLoaded}) {
    const audioMod  = await loadModule('src/audiomng.mjs');
    const audioMng  = audioMod.default;
    const opt       = await loadModule('src/settings.mjs');
    const skillConn = await loadModule('src/SkillConnectorHelper.mjs');
    const petMngMod = await loadModule('src/PetManagerConnector.mjs');
    const petMngConn = new petMngMod.default(audioMng);

    let connMap;

    onModsLoaded(async () => {
      opt.initSettings();
    })

    onCharacterLoaded(async () => {
      console.log(`[PSY] Passing audioMng ${audioMng} to skill connectors...`);
      connMap = new Map(await skillConn.loadSkillConnectors(audioMng));

      petMngConn.initializeConnector();

    });

    onInterfaceReady(async () => {
      console.log('[PSY] Ear Candy: Loaded connectors:', connMap);
      connMap.get('Mining').helloWorld();
    });
  }