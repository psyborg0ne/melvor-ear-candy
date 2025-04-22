export async function setup({loadModule, patch, getResourceUrl, onCharacterLoaded, onInterfaceReady}){
    const audioModule = await loadModule('src/audiomng.mjs');
    const modSettings = await loadModule('src/settings.mjs');

    const audioMng = audioModule.default;

    onCharacterLoaded(() => {
        modSettings.initSettings();
        // audioMng.play('test url')
    })

}