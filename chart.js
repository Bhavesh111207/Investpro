let sipChart;

function calculateSIP() {
  const m = parseFloat(document.getElementById("monthly").value);
  const r = parseFloat(document.getElementById("rate").value) / 100 / 12;
  const n = parseInt(document.getElementById("years").value) * 12;
<!-- Chart.js CDN -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
  const API_KEY = "YOUR_API_KEY"; // Replace with your Alpha Vantage key
  let stockChart;

  async function fetchStockPrice() {
    const symbol = document.getElementById("stockSymbol").value.trim().toUpperCase();
    const status = document.getElementById("stockStatus");
    const ctx = document.getElementById("stockChart").getContext("2d");

    if (!symbol) {
      status.textContent = "❌ Please enter a stock symbol.";
      return;
    }

    status.textContent = "⏳ Fetching stock data...";
    
    try {
      const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`);
      const data = await res.json();

      if (!data["Time Series (5min)"]) {
        throw new Error(data["Note"] || "Invalid Symbol or Limit Exceeded.");
      }

      const timeSeries = data["Time Series (5min)"];
      const labels = Object.keys(timeSeries).reverse().slice(-50); // last 50 timestamps
      const prices = labels.map(time => parseFloat(timeSeries[time]["1. open"]));

      if (stockChart) stockChart.destroy();

      stockChart = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: `${symbol} Price (5min)`,
            data: prices,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59,130,246,0.1)",
            tension: 0.3
          }]
        },
        options: {
          scales: {
            x: { ticks: { maxTicksLimit: 10 } },
            y: { beginAtZero: false }
          }
        }
      });

      status.textContent = `✅ Showing live price for ${symbol}`;
    } catch (error) {
      status.textContent = `❌ ${error.message}`;
    }
  }
</script>

  if (!m || !r || !n) {
    document.getElementById("result").innerText = "Please enter valid inputs.";
    return;
  }

  const fv = m * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  document.getElementById("result").innerText = `Maturity Amount: ₹${fv.toFixed(2)}`;

  const labels = [], data = [];
  for (let i = 1; i <= n; i += 12) {
    const val = m * ((Math.pow(1 + r, i) - 1) / r) * (1 + r);
    labels.push(`Year ${i / 12}`);
    data.push(val.toFixed(2));
  }

  if (sipChart) sipChart.destroy();
  sipChart = new Chart(document.getElementById("sipChart"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Projected SIP Growth",
        data,
        borderColor: "rgb(59, 130, 246)",
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4
      }]
    }
  });
}
