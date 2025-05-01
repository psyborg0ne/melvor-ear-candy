// [PSY] Ear Candy | /src/settings.mjs
const { settings, loadModule, characterStorage, patch, getResourceUrl } = mod.getContext(import.meta);
const { initCustomSettingTypes } = await loadModule('src/SettingTypes.mjs');

const audioMod = await loadModule('src/audiomng.mjs');
const audioMng = audioMod.default;

const generalSection = settings.section('General');
const skillSection   = settings.section('Skills');

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
      onChange: (v) => { audioMng.mVol = v; console.log('Master volume changed:', v) }
    },
    {
      type: 'switch',
      name: 'enable-delay',
      label: 'Enable Sound Delay',
      hint: 'Adds delay between actions',
      default: false,
      onChange: (v) => { audioMng.hasDelay = v; console.log('Sound delay enabled changed:', v) }
    },
    {
    type: 'number',
    name: 'sound-delay-sec',
    label: 'Sound Delay (sec)',
    hint: 'Delay in seconds',
    default: 1,
    min: 0,
    max: 5,
    step: 1,
    onChange: (v) => { audioMng.sDelay = v; console.log('Sound delay changed:', v) }
  },
  {
    type: 'text',
    name: 'custom-soundpack-dir',
    label: 'Custom Soundpack Directory',
    hint: 'NOT WORKING! Specify path for custom soundpack',
    default: '',
    onChange: (v) => { console.log('Custom soundpack directory changed:', v) }
  },
  {
    type: 'switch',
    name: 'enable-petmanager-sounds',
    label: 'Enable Pet Unlock Sounds',
    hint: 'Enable sounds for Pet Manager',
    default: true,
    onChange: (v) => { audioMng.petUnlSfx = v; console.log('PetManager sounds enabled changed:', v) }
  }]);

  audioMng.initSettings(generalSection);
}

// TODO: Display the settings in a grid | Good enough for now

function initSkillSettings() {
  const skillsMap = buildSkillConfigs();  // Map<skillName, cfg>

  // Build initial full‐map state for defaults
  const defaultState = {};
  skillsMap.forEach((cfg, skillName) => {
    defaultState[skillName] = {
      volume:       cfg.volumeDefault,
      enabled:      cfg.enabledDefault,
      delayEnabled: cfg.delayEnabledDefault,
      delay:        cfg.delayDefault
    };
  });

  skillSection.add({
    type:    'skill-card-grid',
    name:    'skillSettings',
    default: defaultState,
    skills:  skillsMap,
    onChange: values => {
      audioMng.skillSettings = values;
      console.log('audioMng.skillSettings updated:', values);
    }
  });

  audioMng.skillSettings = defaultState;
}

// function initSkillSettings(){
//   const skills = buildSkillConfigs()

//   skillSection.add({
//     type: 'skill-card-grid',
//     name: 'skill-setting-grid',
//     skills, // Pass the skills array explicitly
//     onChange: (values) => {
//       audioMng.skillSettings = values;
//       console.log('Skill card grid values changed:', values);
//     }
//   });
// }

function buildSkillConfigs() {
  const skillConfigs = new Map();

  game.skills.forEach(skill => {
    const skillname = getLangString(`SKILL_NAME_${skill.localID}`);
    skillConfigs.set(skillname, {
      skillname,  // so your cards can show the label
      icon: assets.getURI(`assets/media/skills/${skillname}/${skillname}.png`),
      volumeDefault:        50,
      volumeMin:            0,
      volumeMax:            100,
      volumeStep:           1,
      enabledDefault:       true,
      delayEnabledDefault:  false,
      delayDefault:         500,
      delayMin:             0,
      delayMax:             5000,
      delayStep:            100
    });
  });

  return skillConfigs;
}


// function buildSkillConfigs() {
//   let skillConfigs = new Map();

//   // TODO: Define global skill list once
//   game.skills.forEach(skill => {
//     let skillname = getLangString(`SKILL_NAME_${skill.localID}`);
//     let icon = assets.getURI(`assets/media/skills/${skillname}/${skillname}.png`);

//     skillConfigs.set(skillname, {
//     icon: icon,
//     volumeDefault: 50,
//     volumeMin: 0,
//     volumeMax: 100,
//     volumeStep: 1,
//     enabledDefault: true,
//     delayEnabledDefault: false,
//     delayDefault: 500,
//     delayMin: 0,
//     delayMax: 5000,
//     delayStep: 100
//   })
// })

//   return skillConfigs;
// }
