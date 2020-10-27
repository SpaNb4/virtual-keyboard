const Keyboard = {
    elements: {
        main: null,
        input: null,
        keysContainer: null,
        keys: [],
    },

    properties: {
        value: '',
        capsLock: false,
        shift: false,
        notification: true,
    },
    isRU: true,
    // prettier-ignore
    keyLayoutRU: [
        "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
        "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
        "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
        "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "up", "done",
        "ctrl", "ru/en", "alt", "space", "notifications", "left", "down", "right"
    ],
    // prettier-ignore
    keyLayoutEN: [
        "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
        "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
        "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "up", "done",
        "ctrl", "ru/en", "alt", "space", "notifications", "left", "down", "right"
    ],
    // prettier-ignore
    keyLayoutRUShift: [
        "Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "+", "/", "backspace",
        "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
        "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
        "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", "up", "done",
        "ctrl", "ru/en", "alt", "space", "notifications", "left", "down", "right"
    ],
    // prettier-ignore
    keyLayoutENShift: [
        "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
        "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", "/",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", '"', "enter",
        "shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "up", "done",
        "ctrl", "ru/en", "alt", "space", "notifications", "left", "down", "right"
    ],

    init(keyLayout) {
        this.elements.input = document.createElement('textarea');
        this.elements.input.classList.add('use-keyboard-input');
        this.elements.input.innerHTML = this.properties.value;
        document.body.appendChild(this.elements.input);

        // Create main elements
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        // Setup main elements
        this.elements.main.classList.add('keyboard', 'keyboard--hidden');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.appendChild(this._createKeys(keyLayout));

        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);

        document.body.appendChild(this.elements.main);
    },

    _createKeys(keyLayout) {
        const fragment = document.createDocumentFragment();
        let input = document.querySelector('.use-keyboard-input');

        input.addEventListener('click', () => {
            this.open();
        });

        let selFrom;
        let selTo;
        input.onselect = function () {
            selFrom = input.selectionStart;
            selTo = input.selectionEnd;
        };
        // Create HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach((key) => {
            const keyElement = document.createElement('button');

            // Add attributes/classes
            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboard__key');

            switch (key) {
                case 'backspace':
                    keyElement.classList.add('keyboard__key--tab', 'backspace');
                    keyElement.innerHTML = createIconHTML('backspace');

                    keyElement.addEventListener('click', () => {
                        if (selFrom && selTo) {
                            this.properties.value = this.properties.value.replace(this.properties.value.substring(selFrom, selTo), '');
                        } else {
                            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        }
                        input.value = this.properties.value;
                        input.focus();
                        this.keySound('backspace');
                    });
                    break;

                case 'caps':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable', 'capslock');
                    keyElement.innerHTML = createIconHTML('keyboard_capslock');

                    keyElement.addEventListener('click', () => {
                        this.toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
                        this.keySound('capslock');
                    });
                    break;

                case 'enter':
                    keyElement.classList.add('keyboard__key--wide', 'enter');
                    keyElement.innerHTML = createIconHTML('keyboard_return');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        input.value = this.properties.value;
                        input.focus();
                        this.keySound('enter');
                    });
                    break;

                case 'space':
                    keyElement.classList.add('keyboard__key--extra-wide');
                    keyElement.innerHTML = createIconHTML('space_bar');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += ' ';
                    });
                    break;

                case 'done':
                    keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
                    keyElement.innerHTML = createIconHTML('close');

                    keyElement.addEventListener('click', () => {
                        this.close();
                    });
                    break;

                case 'tab':
                    keyElement.classList.add('keyboard__key--tab');
                    keyElement.innerHTML = 'Tab';

                    keyElement.addEventListener('click', () => {});
                    break;

                case 'shift':
                    keyElement.classList.add('keyboard__key--wider', 'keyboard__key--activatable', 'shift');
                    keyElement.innerHTML = 'Shift';

                    keyElement.addEventListener('click', () => {
                        this.toggleShift();
                        keyElement.classList.toggle('keyboard__key--active', this.properties.shift);
                        this.keySound('shift');
                    });
                    break;

                case 'ctrl':
                    keyElement.classList.add('keyboard__key-');
                    keyElement.innerHTML = 'Ctrl';

                    keyElement.addEventListener('click', () => {});
                    break;

                case 'alt':
                    keyElement.classList.add('keyboard__key-');
                    keyElement.innerHTML = 'Alt';

                    keyElement.addEventListener('click', () => {});
                    break;

                case 'ru/en':
                    keyElement.classList.add('keyboard__key');
                    keyElement.innerHTML = 'RU/EN';

                    keyElement.addEventListener('click', () => {
                        this.changeLang();
                    });
                    break;

                case 'up':
                    keyElement.classList.add('keyboard__key');
                    keyElement.innerHTML = createIconHTML('arrow_upward');

                    keyElement.addEventListener('click', () => {});
                    break;

                case 'down':
                    keyElement.classList.add('keyboard__key');
                    keyElement.innerHTML = createIconHTML('arrow_downward');

                    keyElement.addEventListener('click', () => {});
                    break;

                case 'left':
                    keyElement.classList.add('keyboard__key');
                    keyElement.innerHTML = createIconHTML('arrow_back');

                    keyElement.addEventListener('click', () => {});
                    break;

                case 'right':
                    keyElement.classList.add('keyboard__key');
                    keyElement.innerHTML = createIconHTML('arrow_forward');

                    keyElement.addEventListener('click', () => {});
                    break;

                case 'notifications':
                    keyElement.classList.add('keyboard__key');
                    keyElement.innerHTML = createIconHTML('notifications_active');
                    keyElement.addEventListener('click', () => {
                        this.properties.notification = !this.properties.notification;
                        if (this.properties.notification) {
                            keyElement.firstChild.innerHTML = 'notifications_active';
                        } else {
                            keyElement.firstChild.innerHTML = 'notifications_off';
                        }
                    });
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener('click', () => {
                        input.focus();
                        let pos = input.selectionStart;
                        if (this.properties.capsLock || this.properties.shift) {
                            Keyboard.properties.value = this.properties.value.slice(0, pos) + key.toUpperCase() + this.properties.value.slice(pos);
                        } else {
                            this.properties.value = this.properties.value.slice(0, pos) + key.toLowerCase() + this.properties.value.slice(pos);
                        }
                        input.value = this.properties.value;
                        if (this.isRU) {
                            this.keySound('defaultEN', '.keyboard__key');
                        } else {
                            this.keySound('defaultRU', '.keyboard__key');
                        }
                    });
                    break;
            }

            fragment.appendChild(keyElement);
        });

        return fragment;
    },

    toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        this.caseOfLetters();
    },

    caseOfLetters() {
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                if (key.textContent != 'Tab' && key.textContent != 'Shift' && key.textContent != 'Ctrl' && key.textContent != 'RU/EN' && key.textContent != 'Alt') {
                    if (this.properties.shift && this.properties.capsLock) {
                        key.textContent = key.textContent.toLowerCase();
                    }
                    if (!this.properties.shift && this.properties.capsLock) {
                        key.textContent = key.textContent.toUpperCase();
                    }
                    if (this.properties.shift && !this.properties.capsLock) {
                        key.textContent = key.textContent.toUpperCase();
                    }
                    if (!this.properties.shift && !this.properties.capsLock) {
                        key.textContent = key.textContent.toLowerCase();
                    }
                }
            }
        }
    },

    toggleShift() {
        this.properties.shift = !this.properties.shift;

        this.elements.input.remove();
        this.elements.main.remove();

        if (this.properties.shift && this.isRU) {
            this.init(this.keyLayoutENShift);
        }
        if (this.properties.shift && !this.isRU) {
            this.init(this.keyLayoutRUShift);
        }
        if (!this.properties.shift && this.isRU) {
            this.init(this.keyLayoutEN);
        }
        if (!this.properties.shift && !this.isRU) {
            this.init(this.keyLayoutRU);
        }

        this.caseOfLetters();

        let shiftKey = document.querySelector('.shift');
        shiftKey.classList.toggle('keyboard__key--active', this.properties.shift);
    },

    open() {
        this.elements.main.classList.remove('keyboard--hidden');
    },

    close() {
        this.properties.value = '';
        this.elements.main.classList.add('keyboard--hidden');
    },

    keyOnDown(e) {
        // e.key - нажатая кнопка (a,b,c, ...)
        // keys - массив всех кнопок клавиатуры
        let keys = document.querySelectorAll('.keyboard__key');

        for (const key of keys) {
            if (e.key == key.innerHTML && e.key != 'Shift') {
                key.classList.add('active');
                let input = document.querySelector('.use-keyboard-input');
                input.focus();

                let pos = input.selectionStart;
                if (Keyboard.properties.capsLock) {
                    Keyboard.properties.value = Keyboard.properties.value.slice(0, pos) + e.key.toUpperCase() + Keyboard.properties.value.slice(pos);
                } else {
                    Keyboard.properties.value = Keyboard.properties.value.slice(0, pos) + e.key.toLowerCase() + Keyboard.properties.value.slice(pos);
                }
            } else if (e.key == 'Backspace' && key.innerText == 'backspace') {
                Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.value.length - 1);
                key.classList.add('active');
            } else if (e.key == 'Enter' && key.innerText == 'keyboard_return') {
                key.classList.add('active');
            } else if (e.key == 'CapsLock' && key.innerText == 'keyboard_capslock') {
                key.classList.add('active');
                key.classList.toggle('keyboard__key--active');
            } else if (e.key == ' ' && key.innerText == 'space_bar') {
                key.classList.add('active');
            }
        }
    },

    keyOnUp(e) {
        let keys = document.querySelectorAll('.keyboard__key');

        for (const key of keys) {
            if (e.key == key.innerHTML) {
                key.classList.remove('active');
            } else if (e.key == 'Backspace' && key.innerText == 'backspace') {
                key.classList.remove('active');
            } else if (e.key == 'Enter' && key.innerText == 'keyboard_return') {
                key.classList.remove('active');
            } else if (e.key == 'CapsLock' && key.innerText == 'keyboard_capslock') {
                key.classList.remove('active');
            } else if (e.key == ' ' && key.innerText == 'space_bar') {
                key.classList.remove('active');
            }
        }
    },

    changeLang() {
        this.elements.input.remove();
        this.elements.main.remove();

        if (this.isRU) {
            this.init(this.keyLayoutRU);
            this.isRU = !this.isRU;
        } else {
            this.init(this.keyLayoutEN);
            this.isRU = !this.isRU;
        }
    },

    keySound(audio_sel) {
        if (this.properties.notification) {
            const audio = document.querySelector(`audio[data-key="${audio_sel}"]`);

            audio.currentTime = 0;
            audio.play();
        }
    },
};

window.addEventListener('DOMContentLoaded', function () {
    Keyboard.init(Keyboard.keyLayoutEN);

    document.addEventListener('keydown', Keyboard.keyOnDown);
    document.addEventListener('keyup', Keyboard.keyOnUp);
});
