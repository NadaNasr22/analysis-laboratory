import { analysisTypesData } from "./analysisTypes";

export const getAnalysisTypes = () => {
  const data = localStorage.getItem("analysisTypes");
  if (!data) {
    return analysisTypesData;
  }

  try {
    const storedData = JSON.parse(data);

    return analysisTypesData.map((baseAnalysis) => {
      const storedAnalysis = storedData.find(
        (item) => String(item.id) === String(baseAnalysis.id)
      );

      if (!storedAnalysis) {
        return baseAnalysis;
      }

      return {
        ...baseAnalysis,
        ...storedAnalysis,
        fields:
          storedAnalysis.fields &&
          storedAnalysis.fields.length > 0
            ? storedAnalysis.fields
            : baseAnalysis.fields || [],
      };
    });
  } catch (error) {
    console.error(
      "Error reading analysisTypes:",
      error
    );

    return analysisTypesData;
  }
};

export const saveAnalysisTypes = (data) => {
  localStorage.setItem(
    "analysisTypes",
    JSON.stringify(data)
  );
};