export const getDatesBetween = (startDate: any, endDate: any) => {
  const dates = [];

  // Strip hours minutes seconds etc.
  let currentDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );

  while (currentDate <= endDate) {
    dates.push(currentDate);

    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1, // Will increase month if over range
    );
  }

  return dates;
};

export const encodeImageFileAsURL = (file: any) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader.result);
    }

    reader.onerror = () => {
      reject();
    }
  })
}