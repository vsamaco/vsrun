export const metersToMiles = (i) => {
  return Math.round((i*0.000621371192) * 100) / 100;
}

export const metersToFeet = (i) => {
  return Math.round(i / 0.3048);
}

export const secondsToMinutes = (i) => {
  const hours = Math.floor(i / 3600);
  const minutes = Math.floor(i / 60);
  const seconds = i % 60;
  return `${minutes}:${seconds}`
}

export const averagePace = (seconds, meters) => {
  // momentDurationFormat(moment);
  // time: 0:41:16 = 2476 seconds
  // distance: 5.2m
  const time = seconds / 60;
  const distance = metersToMiles(meters);
  const result = time / distance;
  // console.log('result', moment.duration(Math.round(result * 100) / 100), 'seconds').format('h:mm:ss');

  const res_min = Math.floor(Math.abs(result));
  const res_sec = Math.floor((Math.abs(result) * 60) % 60);

  return `${res_min}:${String(res_sec).padStart(2, 0)}`;
}

export const averagePaceSeconds = (seconds, meters) => {
  const time = seconds / 60;
  const distance = metersToMiles(meters);
  return time / distance;
}
