const { settings, characterStorage, patch, getResourceUrl } = mod.getContext(import.meta);

const generalSection = settings.section('General');
const skillSection   = settings.section('Skill Settings');

settings.type('slider', {
  render(name, onChange, config) {
    const wrapper = document.createElement('div');
    const input   = document.createElement('input');
    const label   = document.createElement('label');
    input.id      = name;
    input.type    = 'range';                // Native slider :contentReference[oaicite:4]{index=4}
    input.min     = config.min;
    input.max     = config.max;
    input.step    = config.step ?? 1;
    input.value   = config.default;
    input.addEventListener('input', () => onChange());

    label.htmlFor = name;
    label.textContent = config.label;

    wrapper.append(input, label);
    return wrapper;
  },
  get(root) {
    return Number(root.querySelector('input').value);
  },
  set(root, value) {
    root.querySelector('input').value = value;
  }
});

export function initSettings() {
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
}]);
}