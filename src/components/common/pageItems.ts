export const getPageItems = <T>(
  data: T[],
  currentPage: number,
  pageSize: number
) => {
  return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
};
