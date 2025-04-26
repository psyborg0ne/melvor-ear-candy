// [PSY] Ear Candy | /src/SettingTypes.mjs
const { settings } = mod.getContext(import.meta);

export function initCustomSettingTypes(){

    settings.type('slider', {
        render(name, onChange, config) {
          const wrapper = document.createElement('div');
          const input   = document.createElement('input');
          const label   = document.createElement('label');
          input.id      = name;
          input.type    = 'range';
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

      // Skill Card Grid
      // This setting type creates a grid of skill cards
      // Each card represents a skill and contains its settings
      // The grid is responsive and adjusts to the number of skills
      settings.type('skill-card-grid', {
          render(name, onChange, config) {
            const gridWrapper = document.createElement('div');
            gridWrapper.classList.add('skill-card-grid');

            const skills = game.skills;
            skills.forEach((skill) => {
              const skillname = getLangString(`SKILL_NAME_${skill.localID}`);

              // const cardElem = skillCard(config['skills'][skillname], (change) => {
                const cardElem = skillCard(config['skills'].get(skillname), (change) => {
                console.log('Skill card changed:', skillname, change);
              });

              const col = document.createElement('div');
              col.classList.add('skill-card-column');
              col.appendChild(cardElem);
              gridWrapper.appendChild(col);
            });

            return gridWrapper;
          },
          get(root) {
            return Array.from(root.querySelectorAll('.skill-card-wrapper'))
              .map(card => settings.type('skill-card').get(card));
          },
          set(root, values) {
            const cards = root.querySelectorAll('.skill-card-wrapper');
            values.forEach((val, i) => {
              settings.type('skill-card').set(cards[i], val);
            });
          }
        });
}

function skillCard(config, onChange = () => {}) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('skill-card-wrapper'); // Add a class for styling

  // Using document fragment to batch DOM updates (similar to UoW)
  const fragment = document.createDocumentFragment();

  // Title and Icon
  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('skill-card-title-wrapper');

  const icon = document.createElement('img');
  icon.src = config.icon; // Skill icon URL
  icon.alt = `${config.skillname} Icon`;
  icon.classList.add('skill-card-icon');
  icon.loading = 'lazy'; // Lazy load the image

  const title = document.createElement('p');
  title.textContent = config.skillname;
  title.classList.add('skill-card-title');

  titleWrapper.append(icon, title);
  fragment.appendChild(titleWrapper);

  // Volume Slider
  const volumeWrapper = document.createElement('div');
  volumeWrapper.classList.add('skill-card-volume-wrapper');
  const volumeLabel = document.createElement('label');
  volumeLabel.textContent = 'Volume';
  const volumeSlider = document.createElement('input');
  volumeSlider.type = 'range';
  volumeSlider.min = config.volumeMin ?? 0;
  volumeSlider.max = config.volumeMax ?? 100;
  volumeSlider.step = config.volumeStep ?? 1;
  volumeSlider.value = config.volumeDefault ?? 50;
  volumeSlider.addEventListener('input', (event) => {
    const updatedValue = Number(event.target.value); // Get the updated value
    onChange({ volume: updatedValue });
  });

  volumeWrapper.append(volumeLabel, volumeSlider);
  fragment.appendChild(volumeWrapper);

  // Enable skill sounds Checkbox
  const enabledWrapper = document.createElement('div');
  enabledWrapper.classList.add('skill-card-checkbox-wrapper');
  const enabledCheckbox = document.createElement('input');
  enabledCheckbox.type = 'checkbox';
  enabledCheckbox.checked = config.enabledDefault ?? true;
  enabledCheckbox.addEventListener('change', (event) => {
    const updatedValue = event.target.checked; // Get the updated value
    onChange({ enabled: updatedValue });
  });
  const enabledLabel = document.createElement('label');
  enabledLabel.textContent = 'Enable Skill Sounds';

  enabledWrapper.append(enabledCheckbox, enabledLabel);
  fragment.appendChild(enabledWrapper);

  // Sound Delay Checkbox
  const delayWrapper = document.createElement('div');
  delayWrapper.classList.add('skill-card-checkbox-wrapper');
  const delayCheckbox = document.createElement('input');
  delayCheckbox.type = 'checkbox';
  delayCheckbox.checked = config.delayEnabledDefault ?? false;
  delayCheckbox.addEventListener('change', (event) => {
    const updatedValue = event.target.checked; // Get the updated value
    onChange({ delayEnabled: updatedValue });
  });
  const delayLabel = document.createElement('label');
  delayLabel.textContent = 'Enable Sound Delay';

  delayWrapper.append(delayCheckbox, delayLabel);
  fragment.appendChild(delayWrapper);

  // Sound Delay Integer Field
  const delayFieldWrapper = document.createElement('div');
  delayFieldWrapper.classList.add('skill-card-delay-wrapper');
  const delayFieldLabel = document.createElement('label');
  delayFieldLabel.textContent = 'Sound Delay (ms)';
  const delayField = document.createElement('input');
  delayField.type = 'number';
  delayField.min = config.delayMin ?? 0;
  delayField.max = config.delayMax ?? 5000;
  delayField.step = config.delayStep ?? 100;
  delayField.value = config.delayDefault ?? 500;
  delayField.addEventListener('input', (event) => {
    const updatedValue = Number(event.target.value); // Get the updated value
    onChange({ delay: updatedValue });
  });

  delayFieldWrapper.append(delayFieldLabel, delayField);
  fragment.appendChild(delayFieldWrapper);

  // Append all elements to the wrapper
  // wrapper.append(titleWrapper, volumeWrapper, enabledWrapper, delayWrapper, delayFieldWrapper);
  wrapper.appendChild(fragment);
  return wrapper;
}