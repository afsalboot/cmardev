import React, { useEffect, useContext, useRef } from "react";
import { Line, Doughnut, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { AppContext } from "../../context/AppContext";
import "./dashboard.scss";
import ChartBox from "../../UI components/ChartBox";
import Card from "../../UI components/Card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const { orders, fetchOrders, customers, fetchCustomers } = useContext(AppContext);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
  }, []);

  // Stats
  const totalOrders = orders.length;
  const paidOrders = orders.filter((o) => o.payment === "paid").length;
  const pendingOrders = orders.filter((o) => o.payment === "pending").length;
  const totalCustomers = customers.length;

  // Date Ranges
  const now = new Date();
  const startOfToday = new Date(now.setHours(0, 0, 0, 0));
  const endOfToday = new Date(now.setHours(23, 59, 59, 999));
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  // Income
  const todaysIncome = orders
    .filter((o) => {
      const d = new Date(o.createdAt);
      return d >= startOfToday && d <= endOfToday;
    })
    .reduce((sum, o) => sum + o.total, 0);

  const thisMonthIncome = orders
    .filter((o) => {
      const d = new Date(o.createdAt);
      return d >= startOfMonth && d <= endOfMonth;
    })
    .reduce((sum, o) => sum + o.total, 0);

  // Daily Income
  const dailyPaid = {};
  const dailyPending = {};

  orders.forEach((o) => {
    const date = new Date(o.createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
    if (o.payment === "paid") dailyPaid[date] = (dailyPaid[date] || 0) + o.total;
    else dailyPending[date] = (dailyPending[date] || 0) + o.total;
  });

  const dailyLabels = Array.from(
    new Set([...Object.keys(dailyPaid), ...Object.keys(dailyPending)])
  );
  const dailyPaidValues = dailyLabels.map((d) => dailyPaid[d] || 0);
  const dailyPendingValues = dailyLabels.map((d) => dailyPending[d] || 0);

  // Monthly Income (Paid/Pending)
  const monthlyPaid = {};
  const monthlyPending = {};

  orders.forEach((o) => {
    const month = new Date(o.createdAt).toLocaleString("default", { month: "short" });
    if (o.payment === "paid")
      monthlyPaid[month] = (monthlyPaid[month] || 0) + o.total;
    else monthlyPending[month] = (monthlyPending[month] || 0) + o.total;
  });

  const monthlyLabels = Array.from(
    new Set([...Object.keys(monthlyPaid), ...Object.keys(monthlyPending)])
  );
  const monthlyPaidValues = monthlyLabels.map((m) => monthlyPaid[m] || 0);
  const monthlyPendingValues = monthlyLabels.map((m) => monthlyPending[m] || 0);

  // New vs Returning Customers
  const firstPurchase = {};
  let newCount = 0;
  let returningCount = 0;
  orders.forEach((o) => {
    const customerId = o.customerId?._id || o.customerId;
    if (!firstPurchase[customerId]) {
      firstPurchase[customerId] = true;
      newCount++;
    } else {
      returningCount++;
    }
  });

  // Chart Options
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#444", usePointStyle: true },
      },
      tooltip: { backgroundColor: "#222", titleColor: "#fff", bodyColor: "#eee" },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#777" } },
      y: { grid: { color: "rgba(0,0,0,0.05)" }, ticks: { color: "#777" } },
    },
  };

  const dailyLineData = {
    labels: dailyLabels,
    datasets: [
      {
        label: "Paid (₹)",
        data: dailyPaidValues,
        borderColor: "#6C63FF",
        backgroundColor: "rgba(108,99,255,0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Pending (₹)",
        data: dailyPendingValues,
        borderColor: "#FFB74D",
        backgroundColor: "rgba(255,183,77,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const monthlyBarData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Paid (₹)",
        data: monthlyPaidValues,
        backgroundColor: "#6C63FF",
        borderRadius: 6,
      },
      {
        label: "Pending (₹)",
        data: monthlyPendingValues,
        backgroundColor: "#FFB74D",
        borderRadius: 6,
      },
    ],
  };

  const paymentDoughnutData = {
    labels: ["Paid", "Pending"],
    datasets: [
      {
        data: [paidOrders, pendingOrders],
        backgroundColor: ["#6C63FF", "#FFB74D"],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const customerPieData = {
    labels: ["New Customers", "Returning Customers"],
    datasets: [
      {
        data: [newCount, returningCount],
        backgroundColor: ["#4DB6AC", "#9575CD"],
        borderWidth: 0,
      },
    ],
  };

  // Auto-refresh at midnight
  useEffect(() => {
    const now = new Date();
    const millisUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5) - now;
    const timeout = setTimeout(() => {
      fetchOrders();
    }, millisUntilMidnight);
    return () => clearTimeout(timeout);
  }, [fetchOrders]);

  return (
    <div className="dashboard-container modern">
      <h1 className="dashboard-title">📊 Shop Dashboard</h1>

      {/* Summary Cards */}
      <div className="dashboard-cards">
        <Card title="Total Customers" value={totalCustomers} color="#6C63FF" />
        <Card title="Total Orders" value={totalOrders} color="#FF8A65" />
        <Card title="Today's Income" value={`₹${todaysIncome.toFixed(2)}`} color="#4DB6AC" />
        <Card title="This Month's Income" value={`₹${thisMonthIncome.toFixed(2)}`} color="#64B5F6" />
      </div>

      {/* Charts */}
      <div className="charts-row">
        <ChartBox title="Income by Day">
          <Line ref={chartRef} data={dailyLineData} options={baseOptions} />
        </ChartBox>

        <ChartBox title="Payment Status">
          <div className="doughnut-container">
            <Doughnut data={paymentDoughnutData} />
            <div className="center-text">
              <h3>{Math.round((paidOrders / totalOrders) * 100) || 0}%</h3>
              <p>Paid</p>
            </div>
          </div>
        </ChartBox>

        <ChartBox title="Income by Month">
          <Bar data={monthlyBarData} options={baseOptions} />
        </ChartBox>

        <ChartBox title="Customers">
          <Pie data={customerPieData} options={baseOptions} />
        </ChartBox>
      </div>
    </div>
  );
}



