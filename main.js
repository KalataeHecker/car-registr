document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const regInput = document.getElementById('regInput');

  // Fake данни за прототип
  const fakeData = {
    "CB1234AB": {
      reg: "CB1234AB",
      marca: "BMW",
      model: "530d",
      year: "2018",
      owner: "Иван Петров Иванов",
      phone: "0888 123 456",
      email: "ivan.petrov@example.com",
      added: "24.05.2024 14:35"
    }
  };

  function renderResult(data) {
    const results = document.querySelector('.results');
    if (!data) {
      results.innerHTML = '<p>Нямa резултати.</p>';
      return;
    }
    results.innerHTML = `
      <h3>РЕЗУЛТАТИ ОТ ТЪРСЕНЕТО</h3>
      <div class="card">
        <img src="https://via.placeholder.com/420x280" alt="Автомобил" />
        <table>
          <tr><td>Регистрационен номер:</td><td>${data.reg}</td></tr>
          <tr><td>Марка:</td><td>${data.marca}</td></tr>
          <tr><td>Модел:</td><td>${data.model}</td></tr>
          <tr><td>Година:</td><td>${data.year}</td></tr>
          <tr><td>Собственик:</td><td>${data.owner}</td></tr>
          <tr><td>Телефон:</td><td>${data.phone}</td></tr>
          <tr><td>Имейл:</td><td>${data.email}</td></tr>
          <tr><td>Дата на вписване:</td><td>${data.added}</td></tr>
        </table>
      </div>
    `;
  }

  searchBtn.addEventListener('click', () => {
    const key = regInput.value.trim().toUpperCase();
    renderResult(fakeData[key] || null);
  });

  // Показване на пример при зареждане
  renderResult(fakeData["CB1234AB"]);
});
