function startLoader() {
  let counterElement = document.querySelector(".counter");
  let currentValue = 0;

  function updateCounter() {
    if (currentValue === 100) {
      return;
    }

    currentValue += Math.floor(Math.random() * 10) + 1;

    if (currentValue > 100) {
      currentValue = 100;
    }

    counterElement.textContent = currentValue;

    let delay = 20;
    setTimeout(updateCounter, delay);
  }
  updateCounter();
}

startLoader();

window.addEventListener("load", function () {
  document.querySelector(".preloader").classList.add("fadehide");
});

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const fatherName = document.getElementById("fatherName").value;
    const motherName = document.getElementById("motherName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const classes = document.getElementById("classes").value

    if (!name || !surname || !fatherName || !motherName || !phoneNumber || !classes) {
      showBadge("Iltimos, barcha maydonlarni to'ldiring.", "error");
      return;
    }

    // Ism va familiya tekshiruvi uchun shablon
    const namePattern = /^[a-zA-Zа-яА-ЯёЁ]{4,30}$/;
    if (!namePattern.test(name)) {
      showBadge("Ism noaniq.", "error");
      return;
    }
    if (!namePattern.test(surname)) {
      showBadge("Familiya noaniq.", "error");
      return;
    }
    if (!namePattern.test(fatherName)) {
      showBadge("Otangiz ismi noaniq.", "error");
      return;
    }
    if (!namePattern.test(motherName)) {
      showBadge("Onangiz ismi noaniq.", "error");
      return;
    }

    // Pattern mosligini tekshirish
    const phonePattern = /^\+998\d{9}$/;
    if (!phonePattern.test(phoneNumber)) {
      showBadge("To'g'ri format: +998XXXXXXXXX", "error");
      return;
    }

    const message = `Ism: ${name}\nFamiliya: ${surname}\nOtasining ismi: ${fatherName}\nOnasining ismi: ${motherName}\nTelefon raqami: ${phoneNumber}\nSinfi: ${classes}`;
    const botToken = "7246599957:AAFnPA8Q_ewQJi5O_mDCeSGA6x-wTsXVCBU";
    const chatId = "@NobelMedTashkiliy"; // o'zingizning telegram kanalingiz yoki chat ID

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const loadingIndicator = document.getElementById("loadingIndicator");
    const messageBadge = document.getElementById("messageBadge");

    loadingIndicator.style.display = "block";
    messageBadge.style.display = "none";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          showBadge("Ma`lumotlar muvaffaqiyatli yuborildi!", "success");
          document.getElementById("registrationForm").reset();
        } else {
          showBadge("Xato: Ma`lumotlar yuborilmadi.", "error");
        }
      })
      .catch((error) => {
        showBadge("Xato: Ma`lumotlar yuborilmadi.", "error");
        console.error("Error:", error);
      })
      .finally(() => {
        loadingIndicator.style.display = "none";
      });
  });

function showBadge(message, type) {
  const badge = document.getElementById("messageBadge");
  badge.textContent = message;
  badge.className = "badge " + type;
  badge.style.display = "block";
}
