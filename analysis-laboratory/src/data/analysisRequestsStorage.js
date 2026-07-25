const STORAGE_KEY = "analysisRequests";

export const getRequests = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveRequests = (requests) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(requests)
  );
};