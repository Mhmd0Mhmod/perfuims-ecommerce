export const getStatsAr = async () => {
  return [
    {
      title: "إجمالي الإيرادات",
      value: "45,231.89$",
      change: "+20.1% من الشهر الماضي",
    },
    {
      title: "الاشتراكات",
      value: "+2350",
      change: "+180.1% من الشهر الماضي",
    },
    {
      title: "المبيعات",
      value: "+12,234",
      change: "+19% من الشهر الماضي",
    },
    {
      title: "نشط الآن",
      value: "+573",
      change: "+201 منذ الساعة الماضية",
    },
  ];
};

export const getRevenueDataAr = async () => {
  return [
    { name: "يناير", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "فبراير", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "مارس", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "أبريل", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "مايو", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "يونيو", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "يوليو", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "أغسطس", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "سبتمبر", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "أكتوبر", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "نوفمبر", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "ديسمبر", total: Math.floor(Math.random() * 5000) + 1000 },
  ];
};

export const getRecentOrdersAr = async () => {
  return [
    {
      id: "TASK-8782",
      customer: "أوليفيا مارتن",
      status: "قيد المعالجة",
      total: "$250.00",
      method: "بطاقة ائتمان",
    },
    {
      id: "TASK-7823",
      customer: "جاكسون لي",
      status: "مؤجل",
      total: "$150.00",
      method: "باي بال",
    },
    {
      id: "TASK-6512",
      customer: "إيزابيلا نجوين",
      status: "للعمل",
      total: "$350.00",
      method: "تحويل بنكي",
    },
    {
      id: "TASK-3421",
      customer: "ويليام كيم",
      status: "مكتمل",
      total: "$450.00",
      method: "بطاقة ائتمان",
    },
    {
      id: "TASK-1234",
      customer: "صوفيا ديفيس",
      status: "ملغي",
      total: "$550.00",
      method: "باي بال",
    },
  ];
};

export const getRecentSalesAr = async () => {
  return [
    {
      item: "OM",
      email: "olivia.martin@email.com",
      amount: "+$1,999.00",
      name: "أوليفيا مارتن",
    },
    {
      item: "JL",
      email: "jackson.lee@email.com",
      amount: "+$39.00",
      name: "جاكسون لي",
    },
    {
      item: "IN",
      email: "isabella.nguyen@email.com",
      amount: "+$299.00",
      name: "إيزابيلا نجوين",
    },
    {
      item: "WK",
      email: "will@email.com",
      amount: "+$99.00",
      name: "ويليام كيم",
    },
    {
      item: "SD",
      email: "sofia.davis@email.com",
      amount: "+$39.00",
      name: "صوفيا ديفيس",
    },
  ];
};
