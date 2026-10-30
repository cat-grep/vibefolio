// Native details remain usable when JavaScript or modal dialogs are unavailable.
const projectDialog = document.querySelector('.project-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogContent = document.querySelector('.dialog-content');
const closeButton = document.querySelector('.dialog-close');
let activeDetails = null;
let openingControl = null;

function loadProjectImage(projectContent) {
  const imageTemplate = projectContent.querySelector('.full-image-template');
  if (imageTemplate) {
    imageTemplate.replaceWith(imageTemplate.content.cloneNode(true));
  }
}

document.querySelectorAll('.project-details').forEach((details) => {
  const summary = details.querySelector('summary');
  const content = details.querySelector('.project-full-view');

  details.addEventListener('toggle', () => {
    if (details.open) loadProjectImage(content);
  });

  if (typeof projectDialog.showModal !== 'function') return;

  summary.setAttribute('aria-haspopup', 'dialog');
  summary.addEventListener('click', (event) => {
    event.preventDefault();
    activeDetails = details;
    openingControl = summary;
    dialogTitle.textContent = content.dataset.projectTitle;
    loadProjectImage(content);
    dialogContent.append(content);
    projectDialog.showModal();
    document.body.classList.add('dialog-open');
    closeButton.focus();
  });
});

closeButton.addEventListener('click', () => projectDialog.close());

// Native showModal makes the background inert and supports Escape.
// Explicit Tab wrapping keeps keyboard focus within the visible controls.
projectDialog.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab') return;
  const controls = [...projectDialog.querySelectorAll('button, a[href]')];
  const firstControl = controls[0];
  const lastControl = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === firstControl) {
    event.preventDefault();
    lastControl.focus();
  } else if (!event.shiftKey && document.activeElement === lastControl) {
    event.preventDefault();
    firstControl.focus();
  }
});

projectDialog.addEventListener('close', () => {
  if (activeDetails) {
    activeDetails.append(dialogContent.firstElementChild);
    activeDetails.open = false;
  }
  document.body.classList.remove('dialog-open');
  openingControl?.focus();
  activeDetails = null;
  openingControl = null;
});
