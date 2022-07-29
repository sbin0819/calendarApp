export const timeOptions = [...Array(96).keys()].map((el) => {
  const min = el * 15;
  const onFixedFormat = (t: number) => {
    return t < 10 ? '0' + t : t;
  };
  const time = `${onFixedFormat(Math.floor(min / 60))}:${onFixedFormat(
    min % 60,
  )}`;
  if (min / 60 >= 12) {
    return {
      type: '오후',
      time,
      min,
    };
  } else {
    return {
      type: '오전',
      time,
      min,
    };
  }
});
