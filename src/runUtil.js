export const metersToMiles = (i) => {
  return Math.round((i*0.000621371192) * 100) / 100;
}

export const metersToFeet = (i) => {
  return Math.round(i / 0.3048);
}

export const secondsToMinutes = (i) => {
  const hours = Math.floor(i / 3600);
  const minutes = Math.floor(i / 60);
  const seconds = String(i % 60).padStart(2,0);
  return `${hours}:${minutes}:${seconds}`
}

export const averagePace = (seconds, meters) => {
  // momentDurationFormat(moment);
  // time: 0:41:16 = 2476 seconds
  // distance: 5.2m
  const time = seconds / 60;
  const distance = metersToMiles(meters);
  const paceSeconds = time / distance;

  const res_min = Math.floor(Math.abs(paceSeconds));
  const res_sec = Math.floor((Math.abs(paceSeconds) * 60) % 60);

  return `${res_min}:${String(res_sec).padStart(2, 0)}`;
}

export const averagePaceSeconds = (seconds, meters) => {
  const time = seconds / 60;
  const distance = metersToMiles(meters);
  return Math.round((time / distance) * 100) / 100;
}
