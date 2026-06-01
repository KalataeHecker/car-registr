function login(){
const u = prompt("User");
const p = prompt("Pass");

if(u === "admin" && p === "72725324"){
document.getElementById("adminPanel").classList.remove("hidden");
}
else alert("Грешно");
}

function toggleForm(){
document.getElementById("form").classList.toggle("hidden");
}

document.getElementById("form").addEventListener("submit", async (e)=>{
e.preventDefault();

const fd = new FormData();

fd.append("image", image.files[0]);
fd.append("plate", plate.value);
fd.append("brand", brand.value);
fd.append("model", model.value);
fd.append("year", year.value);
fd.append("owner", owner.value);
fd.append("ownerInfo", ownerInfo.value);

await fetch("/add-car", { method:"POST", body:fd });

alert("Добавено!");
});

async function searchCar(){
const plate = searchInput.value;

const res = await fetch("/search?plate=" + plate);
const data = await res.json();

result.innerHTML = "";

data.forEach(c=>{
result.innerHTML += `
<div class="panel">
<img src="/uploads/${c.image}" width="200">
<p><b>${c.plate}</b></p>
<p>${c.brand} ${c.model}</p>
<p>${c.year}</p>
<p>${c.owner}</p>
<p>${c.ownerInfo}</p>
</div>
`;
});
}
