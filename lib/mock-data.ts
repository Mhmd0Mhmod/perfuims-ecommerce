
export const getStats = async () => {
  return [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
    },
    {
      title: "Subscriptions",
      value: "+2350",
      change: "+180.1% from last month",
    },
    {
      title: "Sales",
      value: "+12,234",
      change: "+19% from last month",
    },
    {
      title: "Active Now",
      value: "+573",
      change: "+201 since last hour",
    },
  ];
};

export const getRevenueData = async () => {
  return [
    { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
  ];
};

export const getRecentOrders = async () => {
  return [
    {
      id: "TASK-8782",
      customer: "Olivia Martin",
      status: "In Progress",
      total: "$250.00",
      method: "Credit Card",
    },
    {
      id: "TASK-7823",
      customer: "Jackson Lee",
      status: "Backlog",
      total: "$150.00",
      method: "PayPal",
    },
    {
      id: "TASK-6512",
      customer: "Isabella Nguyen",
      status: "Todo",
      total: "$350.00",
      method: "Bank Transfer",
    },
    {
      id: "TASK-3421",
      customer: "William Kim",
      status: "Done",
      total: "$450.00",
      method: "Credit Card",
    },
    {
      id: "TASK-1234",
      customer: "Sofia Davis",
      status: "Canceled",
      total: "$550.00",
      method: "PayPal",
    },
  ];
};

export const getRecentSales = async () => {
  return [
    {
      item: "OM",
      email: "olivia.martin@email.com",
      amount: "+$1,999.00",
      name: "Olivia Martin",
    },
    {
      item: "JL",
      email: "jackson.lee@email.com",
      amount: "+$39.00",
      name: "Jackson Lee",
    },
    {
      item: "IN",
      email: "isabella.nguyen@email.com",
      amount: "+$299.00",
      name: "Isabella Nguyen",
    },
    {
      item: "WK",
      email: "will@email.com",
      amount: "+$99.00",
      name: "William Kim",
    },
    {
      item: "SD",
      email: "sofia.davis@email.com",
      amount: "+$39.00",
      name: "Sofia Davis",
    },
  ];
};
