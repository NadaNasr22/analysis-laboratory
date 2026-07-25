const invoices = [
  {
    id: 1001,
    patient: "Ahmed Ali",
    phone: "01012345678",
    date: "25/06/2026",
    status: "Paid",
    tests: [
      { name: "CBC", price: 150 },
      { name: "Vitamin D", price: 200 },
      { name: "Glucose", price: 100 },
    ],
    discount: 50,
    total: 400,
  },
  {
    id: 1002,
    patient: "Sara Mohamed",
    phone: "01098765432",
    date: "26/06/2026",
    status: "Pending",
    tests: [
      { name: "Urine Analysis", price: 120 },
      { name: "Blood Sugar", price: 80 },
    ],
    discount: 0,
    total: 200,
  },
  {
    id: 1003,
    patient: "Omar Hassan",
    phone: "01145678912",
    date: "27/06/2026",
    status: "Cancelled",
    tests: [
      { name: "Liver Function", price: 300 },
    ],
    discount: 0,
    total: 300,
  },
];

export default invoices;