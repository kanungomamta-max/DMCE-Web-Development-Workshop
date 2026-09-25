const boxes = [...document.querySelectorAll('#checklistList input')];
const progress = document.getElementById('progress');

function updateProgress() {
  const done = boxes.filter(box => box.checked).length;
  progress.textContent = `${done} of ${boxes.length} completed`;
}

boxes.forEach(box => box.addEventListener('change', updateProgress));
updateProgress();
