export const formatPoints = (point: number) => {
  if (point < 1000) return `${point}`;
  if (point < 1000000) return `${Math.round((point / 1000) * 100) / 100}k`;
  return `${Math.round((point / 1000000) * 100) / 100}M`;
};
