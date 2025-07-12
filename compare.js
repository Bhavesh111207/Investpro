const sampleData = {
  "Axis Bluechip Fund": { return: 12.5, nav: 45.8, rating: 4.5 },
  "HDFC Small Cap": { return: 18.2, nav: 38.9, rating: 4.3 }
};

function compareFunds() {
  const f1 = document.getElementById("fund1").value.trim();
  const f2 = document.getElementById("fund2").value.trim();

  if (!sampleData[f1] || !sampleData[f2]) {
    alert("Fund data not available");
    return;
  }

  const labels = ["Return (%)", "NAV", "Rating"];
  const data1 = [sampleData[f1].return, sampleData[f1].nav, sampleData[f1].rating];
  const data2 = [sampleData[f2].return, sampleData[f2].nav, sampleData[f2].rating];

  new Chart(document.getElementById("compareChart"), {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: f1,
          data: data1,
          backgroundColor: "rgba(59,130,246,0.6)"
        },
        {
          label: f2,
          data: data2,
          backgroundColor: "rgba(34,197,94,0.6)"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } }
    }
  });
}
