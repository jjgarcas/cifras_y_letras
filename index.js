function init() {
    let numberEntryIndex = 0;
    let currentOperation = {
        number1: null,
        operator: null,
        number2: null,
        elements: null
    };
    let numbersUsed = [];
    let wordEntryIndex = 0;
    let lettersUsed = [];

    const newNumbersButton = document.getElementById('new_numbers');
    const numbersContainer = document.getElementById('numbers_container');
    const extraNumbersContainer = document.getElementById('extra_numbers_container');
    const numbersEntry = document.getElementById('numbers_entry');
    const numbers = [
        document.getElementById('numbers_0'),
        document.getElementById('numbers_1'),
        document.getElementById('numbers_2'),
        document.getElementById('numbers_3'),
        document.getElementById('numbers_4'),
        document.getElementById('numbers_5'),
        document.getElementById('numbers_6'),
        document.getElementById('numbers_7'),
        document.getElementById('numbers_8'),
        document.getElementById('numbers_9'),
        document.getElementById('numbers_10'),
        document.getElementById('numbers_11')
    ];
    const numbersEntryInput = document.getElementById('numbers_entry_input');
    const numbersEntryButton = document.getElementById('numbers_entry_button');
    const operatorsContainer = document.getElementById('operators');
    const add = document.getElementById('add');
    const substract = document.getElementById('substract');
    const multiply = document.getElementById('multiply');
    const divide = document.getElementById('divide');
    const operations = document.getElementById('operations');

    const newLettersButton = document.getElementById('new_letters');
    const lettersContainer = document.getElementById('letters_container');
    const lettersEntry = document.getElementById('letters_entry');
    const lettersEntryInput = document.getElementById('letters_entry_input');
    const lettersEntryButton = document.getElementById('letters_entry_button');
    const letters = [
        document.getElementById('letter_0'),
        document.getElementById('letter_1'),
        document.getElementById('letter_2'),
        document.getElementById('letter_3'),
        document.getElementById('letter_4'),
        document.getElementById('letter_5'),
        document.getElementById('letter_6'),
        document.getElementById('letter_7'),
        document.getElementById('letter_8'),
        document.getElementById('letter_9'),
    ];
    const wordContainer = document.getElementById('word');
    const word = [
        document.getElementById('word_0'),
        document.getElementById('word_1'),
        document.getElementById('word_2'),
        document.getElementById('word_3'),
        document.getElementById('word_4'),
        document.getElementById('word_5'),
        document.getElementById('word_6'),
        document.getElementById('word_7'),
        document.getElementById('word_8'),
        document.getElementById('word_9'),
    ];

    const clearButton = document.getElementById('clear');

    const clear = () => {
        numbersUsed = [];
        currentOperation = {
            number1: null,
            operator: null,
            number2: null,
            elements: null
        };
        numbers.forEach((number, index) => {
            number.classList.remove('disable');
            if (index > 5) number.innerText = '';
        });
        numberEntryIndex = 6;
        operations.replaceChildren('');
        lettersUsed = [];
        letters.forEach((letter) => {
            letter.classList.remove('disable');
        });
        word.forEach((wordLetter) => {
            wordLetter.innerText = '';
        });
        wordEntryIndex = 0;
    };

    const newNumbers = () => {
        numberEntryIndex = 0;
        numbersUsed = [];
        currentOperation = {
            number1: null,
            operator: null,
            number2: null,
            elements: null
        };
        numbers.forEach((entry) => {
            entry.innerText = '';
            entry.classList.remove('disable');
        });
        operations.replaceChildren('');
        numbersContainer.classList.remove('hidden');
        numbersEntry.classList.remove('hidden');
        lettersContainer.classList.add('hidden');
        operatorsContainer.classList.add('hidden');
        extraNumbersContainer.classList.add('hidden');
    };

    const addNewNumber = () => {
        if (!numbersEntryInput.value || !parseInt(numbersEntryInput.value)) return;
        numbers[numberEntryIndex].innerText = numbersEntryInput.value;
        numbersEntryInput.value = '';
        numbersEntryInput.focus();
        numberEntryIndex++;
        if (numberEntryIndex > 5) {
            numbersEntry.classList.add('hidden');
            operatorsContainer.classList.remove('hidden');
            extraNumbersContainer.classList.remove('hidden');
        }
    };

    const addNewOperation = () => {
        const operationContainer = document.createElement('div');
        operationContainer.className = 'numbers_container';
        const number1 = document.createElement('div');
        number1.className = 'number';
        const operator = document.createElement('div');
        operator.className = 'number';
        const number2 = document.createElement('div');
        number2.className = 'number';
        const equal = document.createElement('div');
        equal.className = 'number';
        equal.innerText = '=';
        const result = document.createElement('div');
        result.className = 'number';
        operationContainer.appendChild(number1);
        operationContainer.appendChild(operator);
        operationContainer.appendChild(number2);
        operationContainer.appendChild(equal);
        operationContainer.appendChild(result);
        operations.appendChild(operationContainer);
        currentOperation.elements = {
            number1,
            operator,
            number2,
            result
        };
    };

    const useNumber = (element, index) => {
        numbersUsed.push(index);
        element.classList.add('disable');
    };

    const calculateOperation = () => {
        let result;
        switch (currentOperation.operator) {
            case '+':
                result = currentOperation.number1 + currentOperation.number2;
                break;
            case '-':
                result = currentOperation.number1 - currentOperation.number2;
                break;
            case 'x':
                result = currentOperation.number1 * currentOperation.number2;
                break;
            case '÷':
                result = currentOperation.number1 / currentOperation.number2;
                break;
        }
        currentOperation.elements.result.innerText = result;
        numbers[numberEntryIndex].innerText = result;
        numberEntryIndex++;
        currentOperation = {
            number1: null,
            operator: null,
            number2: null,
            elements: null
        };
    };

    const addNumberToOperation = (e) => {
        if (numberEntryIndex <= 5) return;
        const index = parseInt(e.target.id.split('_')[1], 10);
        if (numbersUsed.includes(index)) return;
        const value = parseInt(e.target.innerText, 10);
        if (currentOperation.number1 === null) {
            addNewOperation();
            currentOperation.number1 = value;
            currentOperation.elements.number1.innerText = value;
            useNumber(e.target, index);
        } else if(currentOperation.operator !== null && currentOperation.number2 === null) {
            currentOperation.number2 = value;
            currentOperation.elements.number2.innerText = value;
            useNumber(e.target, index);
            calculateOperation();
        }
    };

    const addOperatorToOperation = (e) => {
        if (numberEntryIndex <= 5) return;
        if(currentOperation.number1 !== null && currentOperation.operator === null) {
            currentOperation.operator = e.target.innerText;
            currentOperation.elements.operator.innerText = e.target.innerText;
        }
    };

    const newLetters = () => {
        lettersContainer.classList.remove('hidden');
        lettersEntry.classList.remove('hidden');
        numbersContainer.classList.add('hidden');
        wordContainer.classList.add('hidden');
        lettersUsed = [];
        letters.forEach((letter) => {
            letter.classList.remove('disable');
            letter.innerText = '';
        });
        word.forEach((wordLetter) => {
            wordLetter.innerText = '';
        });
        wordEntryIndex = 0;
        lettersEntryInput.value = '';
    };

    const addLetters = () => {
        const value = lettersEntryInput.value;
        letters.forEach((letter, index) => letter.innerText = value[index]);
        lettersEntry.classList.add('hidden');
        wordContainer.classList.remove('hidden');
    };

    const addLetterToWord = (e) => {
        const index = parseInt(e.target.id.split('_')[1], 10);
        if (lettersUsed.includes(index)) return;
        word[wordEntryIndex].innerText = e.target.innerText;
        e.target.classList.add('disable');
        lettersUsed.push(index);
        wordEntryIndex++;
    };

    newNumbersButton.addEventListener('click', newNumbers);
    newLettersButton.addEventListener('click', newLetters);
    numbersEntryButton.addEventListener('click', addNewNumber);
    numbers.forEach((number) => number.addEventListener('click', addNumberToOperation));
    add.addEventListener('click', addOperatorToOperation);
    substract.addEventListener('click', addOperatorToOperation);
    multiply.addEventListener('click', addOperatorToOperation);
    divide.addEventListener('click', addOperatorToOperation);
    lettersEntryButton.addEventListener('click', addLetters);
    letters.forEach((letter) => letter.addEventListener('click', addLetterToWord));
    clearButton.addEventListener('click', clear);
}