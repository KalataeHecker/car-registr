let cars = JSON.parse(localStorage.getItem("cars")) || [
    { plate: "CA1234AB", brand: "BMW", model: "320d" },
    { plate: "CB5678CD", brand: "Audi", model: "A4" }
];

function save() {
    localStorage.setItem("cars", JSON.stringify(cars));
}

function render(filter = "") {
    const list = document.getElementById("list");
    if (!list) return;

    list.innerHTML = "";

    cars
        .filter(c =>
            c.plate.toLowerCase().includes(filter.toLowerCase()) ||
            c.brand.toLowerCase().includes(filter.toLowerCase())
        )
        .forEach((car, i) => {
            list.innerHTML += `
                <div class="car">
                    <b>${car.plate}</b> - ${car.brand} ${car.model}
                    <br>
                    <button class="admin-only" onclick="removeCar(${i})">Изтрий</button>
                </div>
            `;
        });

    applyAdmin();
}

function addCar() {
    const plate = document.getElementById("plate").value;
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;

    cars.push({ plate, brand, model });
    save();
    render();
}

function removeCar(i) {
    cars.splice(i, 1);
    save();
    render();
}

/* SEARCH */
document.getElementById("search")?.addEventListener("input", e => {
    render(e.target.value);
});

/* LOGIN */
function openLogin() {
    document.getElementById("loginModal").style.display = "block";
}

function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "72725324") {
        localStorage.setItem("isAdmin", "true");
        document.getElementById("loginModal").style.display = "none";
        applyAdmin();
    } else {
        document.getElementById("error").innerText = "Грешни данни!";
    }
}

function applyAdmin() {
    if (localStorage.getItem("isAdmin") === "true") {
        document.querySelectorAll(".admin-only").forEach(el => {
            el.style.display = "inline-block";
        });
    }
}

function logout() {
    localStorage.removeItem("isAdmin");
    location.reload();
}

/* INIT */
render();
applyAdmin();
