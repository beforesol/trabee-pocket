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
  const reader: any = new FileReader();

  reader.readAsDataURL(file);

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject();
    };
  });
};

export const blobToBase64 = (blob: any) => {
  const reader: any = new FileReader();

  reader.readAsDataURL(blob);

  return new Promise(resolve => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

export const b64toBlob = (dataURI: any, type: string) => {
  const byteString = atob(dataURI.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type });
};

export const getImageSrc = (type: string, data: string) => (type === 'DEFAULT' ? data : `${type},${data}`);
