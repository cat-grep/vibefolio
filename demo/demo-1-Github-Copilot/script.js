const projectCards = document.querySelectorAll("[data-dialog]");
let lastFocusedCard = null;

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const dialog = document.getElementById(card.dataset.dialog);
    if (!dialog) {
      return;
    }

    lastFocusedCard = card;
    dialog.showModal();
  });
});

document.querySelectorAll(".project-dialog").forEach((dialog) => {
  const closeButton = dialog.querySelector(".dialog-close");

  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", () => {
    if (lastFocusedCard) {
      lastFocusedCard.focus();
    }
  });
});
