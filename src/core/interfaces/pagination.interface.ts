export default interface IPagination<T> {
  total: number;
  page: number;
  pageSize: number;
  items: T[];
}
