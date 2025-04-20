export async function setup({loadModule, patch, getResourceUrl, onCharacterLoaded, onInterfaceReady}){
    const audioMod = await loadModule('src/audiomng.mjs');
    const audioMng = audioMod.default;
    const opt = await loadModule('src/settings.mjs');

    onCharacterLoaded(() => {
        opt.initSettings();
        // audioMng.play('test url')
    })

}