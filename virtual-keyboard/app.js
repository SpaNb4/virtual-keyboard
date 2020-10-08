const Keyboard = {
    elements: {
        main: null,
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
        // Create main elements
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        // Setup main elements
        this.elements.main.classList.add('keyboard', '1keyboard--hidden');
        this.elements.keysContainer.classList.add('keyboard__keys');

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        // Create HTML for an icon
        const createIconHTML = (icon_name) => {
            return '<i class="material-icons">${icon_name}</i>'
        };

        keyLayout.forEach(key => {
            const KeyElement = Document.createElement('button');
            const insertLineBreak = ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;

            // Add attributes/classes
            KeyElement.setAttribute('type', 'button');
            KeyElement.classList.Add('keyboard__key');

            switch (key) {
                case 'backspace':
                    KeyElement.classList.add('keyboard__key--wide');
                    KeyElement.innerHTML = createIconHTML('backspace');

                    KeyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent('oninput');
                    });
                    break;

                case 'caps':
                    KeyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
                    KeyElement.innerHTML = createIconHTML('keyboard_capslock');

                    KeyElement.addEventListener('click', () => {
                        this._toggleCapsLock();
                        KeyElement.classList.toggle('keyboard__key--activate', this.properties.capsLock);

                    });
                    break;

                case 'enter':
                    KeyElement.classList.add('keyboard__key--wide');
                    KeyElement.innerHTML = createIconHTML('keyboard_return');

                    KeyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this._triggerEvent('oninput');
                    });
                    break;

                case 'space':
                    KeyElement.classList.add('keyboard__key--extra-wide');
                    KeyElement.innerHTML = createIconHTML('space_bar');

                    KeyElement.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvent('oninput');
                    });
                    break;

                case 'done':
                    KeyElement.classList.add('keyboard__key--wide','keyboard__key--dark');
                    KeyElement.innerHTML = createIconHTML('check_circle');

                    KeyElement.addEventListener('click', () => {
                        this.close();
                        this._triggerEvent('onclose');
                    });
                    break; F
            }
        });
    },

    _triggerEvent(handlerName) {
        console.log('Event Triggered! Event Name: ' + handlerName);
    },

    _toggleCapsLock() {
        console.log('Caps Lock Toggled!');
    },

    open(initialValue, oninput, onclose) {

    },

    close() {

    }
};

window.addEventListener('DOMContentLoaded', () => {

});