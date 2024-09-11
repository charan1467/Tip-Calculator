document.addEventListener('DOMContentLoaded', function() {
    const billInput = document.querySelector('.bill');
    const peopleInput = document.querySelector('.people-num');
    const tipButtons = document.querySelectorAll('.perc');
    const customTipButton = document.querySelector('.perc-custom');
    const customTipInput = document.createElement('input');
    const tipAmountDisplay = document.querySelector('.tip-amount .amount');
    const totalAmountDisplay = document.querySelector('.total-amount .amount');
    const resetButton = document.querySelector('.reset');

    let tipPercentage = 0;

    customTipButton.innerHTML = '';
    customTipButton.appendChild(customTipInput);
    customTipInput.type = 'number';
    customTipInput.placeholder = 'Custom';
    customTipInput.max = 100;

    customTipInput.addEventListener('input', function() {
        const customValue = validateNumericInput(customTipInput.value);
        customTipInput.value = customValue;  
        if (customValue !== '') {
            tipPercentage = parseFloat(customValue);
            calculateTip();
        }
    });

    billInput.addEventListener('input', function() {
        const billValue = validateNumericInput(billInput.value);
        billInput.value = billValue;  
        calculateTip();
    });

    peopleInput.addEventListener('input', function() {
        const peopleValue = validateNumericInput(peopleInput.value);
        peopleInput.value = peopleValue;  
        calculateTip();
    });

    tipButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            removeActiveState();
            this.classList.add('active');
            tipPercentage = parseFloat(this.getAttribute('data-perc'));
            calculateTip();
        });
    });

    customTipButton.addEventListener('click', function() {
        removeActiveState();
        customTipButton.classList.add('active');
        customTipInput.focus(); 
    });

    resetButton.addEventListener('click', function() {
        billInput.value = '';
        peopleInput.value = '';
        customTipInput.value = '';
        tipAmountDisplay.textContent = "$0.00";
        totalAmountDisplay.textContent = "$0.00";
        tipPercentage = 0;
        removeActiveState();
    });

    function calculateTip() {
        const billValue = parseFloat(billInput.value);
        const peopleValue = parseInt(peopleInput.value);

        if (isNaN(billValue) || billValue <= 0 || isNaN(peopleValue) || peopleValue <= 0 || tipPercentage <= 0) {
            tipAmountDisplay.textContent = "$0.00";
            totalAmountDisplay.textContent = "$0.00";
            return;
        }

        const tipAmount = (billValue * tipPercentage) / 100;
        const totalAmount = billValue + tipAmount;

        const tipPerPerson = tipAmount / peopleValue;
        const totalPerPerson = totalAmount / peopleValue;

        tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
    }

    function removeActiveState() {
        tipButtons.forEach(function(button) {
            button.classList.remove('active');
        });
        customTipButton.classList.remove('active');
    }

    function validateNumericInput(inputValue) {
        return inputValue.replace(/[^0-9.]/g, ''); 
    }
});
