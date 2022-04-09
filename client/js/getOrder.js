let WEATHER_URL = "http://localhost:5000/api/v1";

fetch(`${WEATHER_URL}/weather/payment`)
  .then((data) => data.json())
  .then((data) => {
    if (data.success) {
      data.data.forEach((order) => {
        const list = document.getElementById("table-id");

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.from_airport}</td>
            <td>${order.to_airport}</td>
            <td>${order.from_country}</td>
            <td>${order.to_country}</td>
            <td>${order.total}</td>
            <td>${order.status}</td>
            `;
        list.appendChild(row);
      });
    }
  });
