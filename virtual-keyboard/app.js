const Keyboard = {
    elements: {
        main: null,
        input: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        this.elements.input = document.createElement('textarea');
        this.elements.input.classList.add('use-keyboard-input');
        document.body.appendChild(this.elements.input);

        // Create main elements
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        // Setup main elements
        this.elements.main.classList.add('keyboard', 'keyboard--hidden');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');


        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll('.use-keyboard-input').forEach(element => {
            element.addEventListener('focus', () => {
                this.open(element.value, currentvalue => {
                    element.value = currentvalue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "up", "done",
            "ctrl", "ru/en", "alt", "space", "alt", "left", "down", "right"
        ];

        // const keyLayout = [
        //     "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
        //     "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
        //     "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
        //     "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".","up", "done",
        //     "ctrl", "ru/en", "alt", "space", "alt", "left", "down", "right"
        // ];

        // Create HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement('button');

            // Add attributes/classes
            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboard__key');

            switch (key) {
                case 'backspace':
                    keyElement.classList.add('keyboard__key--tab');
                    keyElement.innerHTML = createIconHTML('backspace');

                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent('oninput');
                    });
                    break;

                case 'caps':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
                    keyElement.innerHTML = createIconHTML('keyboard_capslock');

                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);

                    });
                    break;

                case 'enter':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('keyboard_return');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this._triggerEvent('oninput');
                    });
                    break;

                case 'space':
                    keyElement.classList.add('keyboard__key--extra-wide');
                    keyElement.innerHTML = createIconHTML('space_bar');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvent('oninput');
                    });
                    break;

                case 'done':
                    keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
                    keyElement.innerHTML = createIconHTML('check_circle');

                    keyElement.addEventListener('click', () => {
                        this.close();
                        this._triggerEvent('onclose');
                    });
                    break;

                case 'tab':
                    keyElement.classList.add('keyboard__key--tab');
                    keyElement.innerHTML = 'Tab';

                    keyElement.addEventListener('click', () => {

                        this._triggerEvent('onclose');
                    });
                    break;

                case 'shift':
                    keyElement.classList.add('keyboard__key--wider');
                    keyElement.innerHTML = 'Shift';

                    keyElement.addEventListener('click', () => {

                        this._triggerEvent('onclose');
                    });
                    break;

                case 'ru/en':
                    keyElement.classList.add('keyboard__key');
                    keyElement.innerHTML = 'RU/EN';

                    keyElement.addEventListener('click', () => {

                        this._triggerEvent('onclose');
                    });
                    break;

                case 'up':
                    keyElement.classList.add('keyboard__key');
                    keyElement.innerHTML = createIconHTML('arrow_upward');

                    keyElement.addEventListener('click', () => {

                        this._triggerEvent('onclose');
                    });
                    break;

                case 'down':
                    keyElement.classList.add('keyboard__key');
                    keyElement.innerHTML = createIconHTML('arrow_downward');

                    keyElement.addEventListener('click', () => {

                        this._triggerEvent('onclose');
                    });
                    break;

                case 'left':
                    keyElement.classList.add('keyboard__key');
                    keyElement.innerHTML = createIconHTML('arrow_back');

                    keyElement.addEventListener('click', () => {

                        this._triggerEvent('onclose');
                    });
                    break;

                case 'right':
                    keyElement.classList.add('keyboard__key');
                    keyElement.innerHTML = createIconHTML('arrow_forward');

                    keyElement.addEventListener('click', () => {

                        this._triggerEvent('onclose');
                    });
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener('click', () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent('oninput');
                    });
                    break;
            }

            fragment.appendChild(keyElement);


        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == 'function') {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove('keyboard--hidden');
    },

    close() {
        this.properties.value = '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add('keyboard--hidden');
    },

    keyOnDown(e) {
        // e.key - нажатая кнопка (a,b,c, ...)
        // keys - массив всех кнопок клавиатуры
        console.log(e.key)
        let keys = document.querySelectorAll('.keyboard__key');

        for (const key of keys) {
            if (e.key == key.innerHTML) {
                key.classList.add('active');
            }
            else if (e.key == 'Backspace' && key.innerText == 'backspace') {
                key.classList.add('active');
            }
            else if (e.key == 'Enter' && key.innerText == 'keyboard_return') {
                key.classList.add('active');
            }
            else if (e.key == 'CapsLock' && key.innerText == 'keyboard_capslock') {
                key.classList.add('active');
                key.classList.add('keyboard__key--active');
                Keyboard._toggleCapsLock();
            }
            else if (e.key == ' ' && key.innerText == 'space_bar') {
                key.classList.add('active');
            }
        }
    },

    keyOnUp(e) {
        let keys = document.querySelectorAll('.keyboard__key');

        for (const key of keys) {
            if (e.key == key.innerHTML) {
                key.classList.remove('active');
            }
            else if (e.key == 'Backspace' && key.innerText == 'backspace') {
                key.classList.remove('active');
            }
            else if (e.key == 'Enter' && key.innerText == 'keyboard_return') {
                key.classList.remove('active');
            }
            else if (e.key == 'CapsLock' && key.innerText == 'keyboard_capslock') {
                key.classList.remove('active');
            }
            else if (e.key == ' ' && key.innerText == 'space_bar') {
                key.classList.remove('active');
            }
        }
    },

    changeLang(e) {
        const keyLayoutRU = [
            "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "up", "done",
            "ctrl", "ru/en", "alt", "space", "alt", "left", "down", "right"
        ];
        const keyLayoutEN = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "up", "done",
            "ctrl", "ru/en", "alt", "space", "alt", "left", "down", "right"
        ];
        Keyboard._createKeys()
    }
};

window.addEventListener('DOMContentLoaded', function () {
    Keyboard.init();
    document.addEventListener('keydown', Keyboard.keyOnDown);
    document.addEventListener('keyup', Keyboard.keyOnUp);
});