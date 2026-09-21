document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('orderModal');
  if (!modal) return;

  const closeModalBtn = document.getElementById('closeModalBtn');
  const selectedServiceText = document.getElementById('selectedServiceText');

  document.querySelectorAll('.order-now-trigger').forEach((button) => {
    button.addEventListener('click', () => {
      const service = button.dataset.order || 'service';
      if (selectedServiceText) {
        selectedServiceText.innerHTML = 'You selected: <strong>' + service + '</strong>';
      }
      modal.classList.add('visible');
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => modal.classList.remove('visible'));
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('visible');
    }
  });
});
