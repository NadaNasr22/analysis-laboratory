
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
    ],
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
      {
        name: "Ketones",
        unit: "",
        reference: "Negative",
      },
      {
        name: "Blood",
        unit: "",
        reference: "Negative",
      },
      {
        name: "pH",
        unit: "",
        reference: "4.5 - 8.0",
      },
    ],
  },

  {
    id: 4,
    name: "Vitamin D",
    category: "Biochemistry",
    price: 200,
    duration: "30 min",

    fields: [
      {
        name: "Vitamin D",
        unit: "ng/mL",
        reference: "30 - 100",
      },
    ],
  },

  {
    id: 5,
    name: "Liver Function Test",
    category: "Biochemistry",
    price: 180,
    duration: "30 min",

    fields: [
      {
        name: "ALT",
        unit: "U/L",
        reference: "7 - 56",
      },
      {
        name: "AST",
        unit: "U/L",
        reference: "10 - 40",
      },
      {
        name: "ALP",
        unit: "U/L",
        reference: "44 - 147",
      },
      {
        name: "Total Bilirubin",
        unit: "mg/dL",
        reference: "0.1 - 1.2",
      },
      {
        name: "Direct Bilirubin",
        unit: "mg/dL",
        reference: "0.0 - 0.3",
      },
      {
        name: "Albumin",
        unit: "g/dL",
        reference: "3.5 - 5.0",
      },
    ],
  },

  {
    id: 6,
    name: "Kidney Function Test",
    category: "Biochemistry",
    price: 180,
    duration: "30 min",

    fields: [
      {
        name: "Creatinine",
        unit: "mg/dL",
        reference: "0.6 - 1.3",
      },
      {
        name: "Urea",
        unit: "mg/dL",
        reference: "15 - 45",
      },
      {
        name: "BUN",
        unit: "mg/dL",
        reference: "7 - 20",
      },
      {
        name: "Uric Acid",
        unit: "mg/dL",
        reference: "3.5 - 7.2",
      },
    ],
  },

  {
    id: 7,
    name: "Lipid Profile",
    category: "Biochemistry",
    price: 200,
    duration: "30 min",

    fields: [
      {
        name: "Total Cholesterol",
        unit: "mg/dL",
        reference: "< 200",
      },
      {
        name: "HDL Cholesterol",
        unit: "mg/dL",
        reference: "> 40",
      },
      {
        name: "LDL Cholesterol",
        unit: "mg/dL",
        reference: "< 100",
      },
      {
        name: "Triglycerides",
        unit: "mg/dL",
        reference: "< 150",
      },
    ],
  },

  {
    id: 8,
    name: "Thyroid Function Test",
    category: "Hormones",
    price: 220,
    duration: "40 min",

    fields: [
      {
        name: "TSH",
        unit: "µIU/mL",
        reference: "0.4 - 4.0",
      },
      {
        name: "Free T4",
        unit: "ng/dL",
        reference: "0.8 - 1.8",
      },
      {
        name: "Free T3",
        unit: "pg/mL",
        reference: "2.3 - 4.2",
      },
    ],
  },

  {
    id: 9,
    name: "Iron Profile",
    category: "Hematology",
    price: 180,
    duration: "30 min",

    fields: [
      {
        name: "Serum Iron",
        unit: "µg/dL",
        reference: "60 - 170",
      },
      {
        name: "Ferritin",
        unit: "ng/mL",
        reference: "15 - 150",
      },
      {
        name: "TIBC",
        unit: "µg/dL",
        reference: "240 - 450",
      },
      {
        name: "Transferrin Saturation",
        unit: "%",
        reference: "20 - 50",
      },
    ],
  },

  {
    id: 10,
    name: "HbA1c",
    category: "Biochemistry",
    price: 120,
    duration: "20 min",

    fields: [
      {
        name: "HbA1c",
        unit: "%",
        reference: "4.0 - 5.6",
      },
    ],
  },

  {
    id: 11,
    name: "Calcium",
    category: "Biochemistry",
    price: 90,
    duration: "15 min",

    fields: [
      {
        name: "Calcium",
        unit: "mg/dL",
        reference: "8.5 - 10.5",
      },
    ],
  },

  {
    id: 12,
    name: "Vitamin B12",
    category: "Vitamins",
    price: 180,
    duration: "30 min",

    fields: [
      {
        name: "Vitamin B12",
        unit: "pg/mL",
        reference: "200 - 900",
      },
    ],
  },
];
