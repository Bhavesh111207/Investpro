 const mutualFunds = [
  { name: "Axis Bluechip Fund", category: "Equity", rating: "4.5", return: "12.5%" },
  { name: "HDFC Small Cap", category: "Small Cap", rating: "4.2", return: "18%" },
  { name: "ICICI Balanced Advantage", category: "Hybrid", rating: "4.0", return: "10.3%" }
];

function renderFunds(data) {
  const container = document.getElementById("fundList");
  container.innerHTML = "";
  data.forEach(fund => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow";
    card.innerHTML = `
      <h3 class="text-xl font-bold text-blue-600">${fund.name}</h3>
      <p>Category: ${fund.category}</p>
      <p>Rating: ⭐ ${fund.rating}</p>
      <p>Annual Return: ${fund.return}</p>
      <button class="mt-2 px-3 py-1 border border-blue-500 rounded text-blue-500 hover:bg-blue-50">Compare</button>
    `;
    container.appendChild(card);
  });
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = mutualFunds.filter(f => f.name.toLowerCase().includes(query));
  renderFunds(filtered);
});

window.onload = () => {
  renderFunds(mutualFunds);
};
