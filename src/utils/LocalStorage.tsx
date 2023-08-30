function saveToLocal(key: string, value: string) {
  localStorage.setItem(key, value);
}

function getFromLocal(key: string): string | null {
  return localStorage.getItem(key);
}

function removeItemFromLocal(key: string) {
  localStorage.removeItem(key);
}

const localStorageUtils = {
  removeItemFromLocal,
  saveToLocal,
  getFromLocal,
};

export default localStorageUtils;
