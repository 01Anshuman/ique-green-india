const encode = (data: FormData) => new URLSearchParams(data as unknown as Record<string, string>).toString();

const readableDay = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

document.querySelectorAll<HTMLFormElement>('[data-booking]').forEach((form) => {
  const note = form.querySelector<HTMLElement>('[data-booking-note]');
  const day = form.querySelector<HTMLInputElement>('[data-min-today]');
  if (day) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    day.min = now.toISOString().slice(0, 10);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (data.get('company')) return;

    const message = [
      'Hello IQUE Green India, I would like to book a site visit.',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Service: ${data.get('service')}`,
      `Preferred day: ${readableDay(String(data.get('visit-day')))}`,
    ].join('\n');
    const url = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(message)}`;

    // Keep a copy of the request even if the visitor never presses send in WhatsApp
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(data),
      keepalive: true,
    }).catch(() => {});

    window.open(url, '_blank', 'noopener');
    if (note) {
      note.innerHTML = `WhatsApp should now be open. Press send to confirm your visit. <a href="${url}" target="_blank" rel="noopener">Open it again</a>`;
    }
  });
});
