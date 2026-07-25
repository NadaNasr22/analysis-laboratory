import { analysisResultsData } from "./analysisResults";

export const getResults = () => {
  const data = JSON.parse(
    localStorage.getItem("analysisResults")
  );

  if (!Array.isArray(data)) {
    localStorage.setItem(
      "analysisResults",
      JSON.stringify(analysisResultsData)
    );

    return analysisResultsData;
  }

  return data;
};

export const saveResults = (results) => {
  localStorage.setItem(
    "analysisResults",
    JSON.stringify(results)
  );
};