export function initResDevCounters() {
  const counters = document.querySelectorAll(".counter-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = +el.dataset.target;
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;

        const update = () => {
          current = Math.min(current + step, target);
          el.textContent = current.toLocaleString("it-IT");
          if (current < target) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));
}
