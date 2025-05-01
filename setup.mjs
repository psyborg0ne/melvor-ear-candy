// [PSY] Ear Candy | setup.mjs
export async function setup({loadModule, patch, getResourceUrl, onCharacterLoaded, onInterfaceReady, onModsLoaded, onCharacterSelectionLoaded}) {
    const opt                   = await loadModule('src/settings.mjs');
    const skillConnectorHelper  = await loadModule('src/SkillConnectorHelper.mjs');

    let skillConnectorMap;;
    let petMngConnector;

    onModsLoaded(async () => {
      opt.initSettings();
    })

    onCharacterSelectionLoaded(async () => {
      skillConnectorMap = new Map(await skillConnectorHelper.loadSkillConnectors());

      petMngConnector = (await loadModule('src/PetManagerConnector.mjs'))?.default;
      petMngConnector.initializeConnector();
    });


    // onCharacterLoaded(async () => {

    // });

    onInterfaceReady(async () => {
      skillConnectorMap.get('Mining').helloWorld();
    });
  }