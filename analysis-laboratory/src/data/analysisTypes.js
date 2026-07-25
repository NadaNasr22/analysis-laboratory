export const analysisTypesData = [
{
  id: 1,
  name: "Complete Blood Count",
  category: "Hematology",
  price: 150,
  duration: "30 min",

  fields: [
    {
      name: "Hemoglobin",
      unit: "g/dL",
      reference: "12 - 16",
    },
    {
      name: "RBC",
      unit: "10^6/µL",
      reference: "4.2 - 5.4",
    },
    {
      name: "WBC",
      unit: "10³/µL",
      reference: "4 - 11",
    },
    {
      name: "Platelets",
      unit: "10³/µL",
      reference: "150 - 450",
    },
    {
      name: "MCV",
      unit: "fL",
      reference: "80 - 100",
    },
    {
      name: "MCH",
      unit: "pg",
      reference: "27 - 33",
    },
    {
      name: "MCHC",
      unit: "g/dL",
      reference: "32 - 36",
    },
  ],
},
  {
    id: 2,
    name: "Blood Sugar",
    category: "Biochemistry",
    price: 80,
    duration: "20 min",
    fields: [
  {
    name: "Blood Sugar",
    unit: "mg/dL",
    reference: "70 - 110",
  },
]
  },
  {
    id: 3,
    name: "Urine Analysis",
    category: "Urine",
    price: 70,
    duration: "15 min",
    fields: [
  {
    name: "Color",
    unit: "",
    reference: "Yellow",
  },
  {
    name: "Appearance",
    unit: "",
    reference: "Clear",
  },
  {
    name: "Protein",
    unit: "",
    reference: "Negative",
  },
  {
    name: "Glucose",
    unit: "",
    reference: "Negative",
  },
]
  },
];