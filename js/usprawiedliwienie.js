/* ==========================================================================
   1. INICJALIZACJA I OBSŁUGA ZDARZENIA FORMULARZA
   ========================================================================== */
document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById("form-status");
  status.textContent = "Wysyłanie...";
  status.style.color = "initial";
  const formData = new FormData(form);
/* ==========================================================================
   2. WYSYŁANIE DANYCH (ASYNC/AWAIT)
   ========================================================================== */
    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbzMqywXrLySvl5xPnZW5pjYwSzfj0dphTRS8R2R3UkVWeJp1SpEshfztHEQ3hSexIqY8A/exec", {
      method: "POST",
      body: formData
    });
    const text = await res.text();
/* ==========================================================================
   3. OBSŁUGA ODPOWIEDZI I CZYSZCZENIE
   ========================================================================== */
    if (text === "OK") {
      status.textContent = "✅ Wysłano!";
      status.style.color = "green";
      form.reset();
        } else {
      status.textContent = "❌ Błąd: " + text;
      status.style.color = "red";
        }
    setTimeout(() => {
    status.textContent = "";
      }, 4000);
    } catch (err) {
        status.textContent = "❌ Błąd wysyłania";
        status.style.color = "red";
        console.error("Błąd przesyłania formularza:", err);
    }
});