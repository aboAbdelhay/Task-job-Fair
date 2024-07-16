document.addEventListener("DOMContentLoaded", () => {
  const customerTableBody = document.querySelector("#customerTable tbody");
  const nameFilter = document.getElementById("nameFilter");
  const amountFilter = document.getElementById("amountFilter");
  const transactionChart = document.getElementById("transactionsChart");
  let customers = [];
  let transactions = [];
  let selectedCustomer = null;
  let displayedchart = null;
  // !=======fetchDate=========
  function fetchData() {
    customers = [
      { id: 1, name: "Ahmed Ali" },
      { id: 2, name: "Aya Elsayed" },
      { id: 3, name: "Mina Adel" },
      { id: 4, name: "Sarah Reda" },
      { id: 5, name: "Mohamed Sayed" },
    ];
    transactions = [
      { id: 1, customer_id: 1, date: "2022-01-01", amount: 1000 },
      { id: 2, customer_id: 1, date: "2022-01-02", amount: 2000 },
      { id: 3, customer_id: 2, date: "2022-01-01", amount: 550 },
      { id: 4, customer_id: 3, date: "2022-01-01", amount: 500 },
      { id: 5, customer_id: 2, date: "2022-01-02", amount: 1300 },
      { id: 6, customer_id: 4, date: "2022-01-01", amount: 750 },
      { id: 7, customer_id: 3, date: "2022-01-02", amount: 1250 },
      { id: 8, customer_id: 5, date: "2022-01-01", amount: 2500 },
      { id: 9, customer_id: 5, date: "2022-01-02", amount: 875 },
      { id: 10, customer_id: 1, date: "2022-01-02", amount: 500 },
    ];
    displayTable();
  }
  fetchData();
  // !=======displayTable=========
  function displayTable() {
    customerTableBody.innerHTML = "";
    const filteredCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(nameFilter.value.toLowerCase())
    );
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.amount >= amountFilter.value
    );
    filteredTransactions.forEach((transaction) => {
      filteredCustomers.forEach((customer) => {
        if (transaction.customer_id === customer.id) {
          const row = document.createElement("tr");
          row.innerHTML = `
                        <td>${transaction.id}</td>
                        <td>${customer.name}</td>
                        <td>${transaction.date}</td>
                        <td>${transaction.amount}</td>
                    `;
          row.addEventListener("click", () => {
            selectedCustomer = customer;
            displayChart();
          });
          customerTableBody.appendChild(row);
        }
      });
    });
  }
  // !=========display chart ================
  function displayChart() {
    const customerTransactions = transactions.filter(
      (t) => t.customer_id === selectedCustomer.id
    );
    const chartData = {
      labels: customerTransactions.map((t) => t.date),
      datasets: [
        {
          label: selectedCustomer.name + "'s Transaction Amount",
          data: customerTransactions.map((t) => t.amount),
          backgroundColor: "#09c",
          borderColor: "#09c",
          fill: false,
        },
      ],
    };
    displayedchart = new Chart(transactionChart, {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        scales: {
          x: {
            type: "category",
            labels: customerTransactions.map((t) => t.date),
          },
        },
      },
    });
  }

  nameFilter.addEventListener("input", displayTable);
  amountFilter.addEventListener("input", displayTable);
});
