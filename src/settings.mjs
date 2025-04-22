// [PSY] Ear Candy | /src/settings.mjs
const { settings, loadModule, characterStorage, patch, getResourceUrl } = mod.getContext(import.meta);
const { initCustomSettingTypes } = await loadModule('src/SettingTypes.mjs');

const generalSection = settings.section('General');
const skillSection   = settings.section('Skill Settings');

export function initSettings() {
  // Initialize custom setting types
  initCustomSettingTypes();

  initGeneralSettings();
  initSkillSettings();
}

function initGeneralSettings(){
  generalSection.add([
    {
      type: 'slider',
      name: 'master-volume',
      label: 'Master Volume',
      hint: '0 = silent, 100 = full',
      default: 75,
      min: 0,
      max: 100,
      onChange: (v) => { console.log('Master Volume changed:', v) }
    },
    {
      type: 'switch',
      name: 'enable-delay',
      label: 'Enable Sound Delay',
      hint: 'Adds delay between actions',
      default: false,
      onChange: (v) => { console.log('Sound delay enabled changed:', v) }
    },
    {
    type: 'slider',
    name: 'sound-delay-sec',
    label: 'Sound Delay (sec)',
    hint: 'Delay in seconds',
    default: 0.5,
    min: 0,
    max: 5,
    step: 0.1,
    onChange: (v) => { console.log('Sound delay changed:', v) }
  },
  {
    type: 'text',
    name: 'custom-soundpack-dir',
    label: 'Custom Soundpack Directory',
    hint: 'NOT WORKING! Specify path for custom soundpack',
    default: '',
    onChange: (v) => { console.log('Custom soundpack directory changed:', v) }
  }]);
}

// TODO: Display the settings in a grid | Good enough for now
function initSkillSettings(){
  const skills = buildSkillConfigs()

  skillSection.add({
    type: 'skill-card-grid',
    name: 'skill-card-grid',
    skills, // Pass the skills array explicitly
    onChange: (values) => {
      console.log('Skill card grid values changed:', values);
    }
  });
}

function buildSkillConfigs() {
  let skillConfigs = new Map();

  // TODO: Define global skill list once
  game.skills.forEach(skill => {
    let skillname = getLangString(`SKILL_NAME_${skill.localID}`);
    let icon = assets.getURI(`assets/media/skills/${skillname}/${skillname}.png`);

    skillConfigs.set(skillname, {
    icon: icon,
    volumeDefault: 50,
    volumeMin: 0,
    volumeMax: 100,
    volumeStep: 1,
    enabledDefault: true,
    delayEnabledDefault: false,
    delayDefault: 500,
    delayMin: 0,
    delayMax: 5000,
    delayStep: 100
  })
})

  return skillConfigs;
}
