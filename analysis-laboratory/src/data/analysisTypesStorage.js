import { analysisTypesData } from "./analysisTypes";

export const getAnalysisTypes = () => {
  const data = localStorage.getItem("analysisTypes");

  return data
    ? JSON.parse(data)
    : analysisTypesData;
};

export const saveAnalysisTypes = (data) => {
  localStorage.setItem(
    "analysisTypes",
    JSON.stringify(data)
  );
};