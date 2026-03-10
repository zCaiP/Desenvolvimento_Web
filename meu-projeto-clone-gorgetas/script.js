document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.getElementById("bill");
  const tipButtons = document.querySelectorAll(".tip-btn");
  const customTipInput = document.getElementById("custom-tip");
  const peopleInput = document.getElementById("people");
  const tipAmountDisplay = document.getElementById("tip-amount");
  const totalAmountDisplay = document.getElementById("total-amount");
  const resetButton = document.querySelector(".reset-btn");
  const errorMsg = document.getElementById("error-text");

  let billValue = 0.0;
  let tipValue = 0;
  let peopleValue = 1;

  const formatCurrency = (value) => {
    if (!isFinite(value) || isNaN(value)) {
      value = 0;
    }
    return `R$${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  function calculateAndDisplay() {
    if (peopleValue >= 1 && billValue >= 0) {
      const tipTotal = billValue * (tipValue / 100);
      const totalBill = billValue + tipTotal;

      const tipPerPerson = tipTotal / peopleValue;
      const totalPerPerson = totalBill / peopleValue;

      tipAmountDisplay.innerText = formatCurrency(tipPerPerson);
      totalAmountDisplay.innerText = formatCurrency(totalPerPerson);
    }
  }

  function toggleResetButton() {
    const hasValue =
      billInput.value > 0 || customTipInput.value > 0 || peopleInput.value > 0;
    resetButton.disabled = !hasValue;
  }

  function handleBillInput(event) {
    billValue = parseFloat(event.target.value) || 0;
    calculateAndDisplay();
    toggleResetButton();
  }

  function handlePeopleInput(event) {
    peopleValue = parseInt(event.target.value);

    if (peopleValue === 0) {
      errorMsg.style.display = "inline";
      peopleInput.classList.add("error-border");
      tipAmountDisplay.innerText = "R$0,00";
      totalAmountDisplay.innerText = "R$0,00";
    } else {
      errorMsg.style.display = "none";
      peopleInput.classList.remove("error-border");
      if (isNaN(peopleValue) || peopleValue < 1) {
        return;
      }
      calculateAndDisplay();
    }
    toggleResetButton();
  }

  function handleCustomTipInput(event) {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    tipValue = parseFloat(event.target.value) || 0;
    calculateAndDisplay();
    toggleResetButton();
  }

  function handleTipButtonClick(event) {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");
    customTipInput.value = "";
    tipValue = parseFloat(event.target.innerText.replace("%", "")) || 0;
    calculateAndDisplay();
    toggleResetButton();
  }

  function resetCalculator() {
    billInput.value = "";
    customTipInput.value = "";
    peopleInput.value = "";
    billValue = 0.0;
    tipValue = 0;
    peopleValue = 1;
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    errorMsg.style.display = "none";
    peopleInput.classList.remove("error-border");
    tipAmountDisplay.innerText = "R$0,00";
    totalAmountDisplay.innerText = "R$0,00";
    resetButton.disabled = true;
  }

  billInput.addEventListener("input", handleBillInput);
  peopleInput.addEventListener("input", handlePeopleInput);
  customTipInput.addEventListener("input", handleCustomTipInput);
  tipButtons.forEach((button) => {
    button.addEventListener("click", handleTipButtonClick);
  });
  resetButton.addEventListener("click", resetCalculator);

  resetCalculator();
});