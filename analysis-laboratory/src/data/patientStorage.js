const STORAGE_KEY = "patients";

export const getPatients = () => {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
};

export const savePatients = (patients) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(patients)
  );
};