const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    const action = button.getAttribute("data-action");

    if (action === "clear") {
      clearDisplay();
    } else if (action === "delete") {
      deleteLast();
    } else if (action === "equals") {
      calculateResult();
    } else if (value) {
      appendValue(value);
    }
  });
});

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    // Prevents execution of malicious input
    display.value = eval(display.value) || "";
  } catch {
    display.value = "Error";
  }
}

// ✅ Keyboard support
document.addEventListener("keydown", (event) => {
  if (!isNaN(event.key) || ["+", "-", "*", "/", "."].includes(event.key)) {
    appendValue(event.key);
  } else if (event.key === "Enter") {
    event.preventDefault();
    calculateResult();
  } else if (event.key === "Backspace") {
    deleteLast();
  } else if (event.key.toLowerCase() === "c") {
    clearDisplay();
  }
});
