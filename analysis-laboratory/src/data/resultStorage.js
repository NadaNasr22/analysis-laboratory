const RESULTS_KEY = "analysisResults";


export const getResults = () => {
  const data = localStorage.getItem(RESULTS_KEY);

  return data ? JSON.parse(data) : [];
};


export const saveResults = (results) => {
  localStorage.setItem(
    RESULTS_KEY,
    JSON.stringify(results)
  );
};