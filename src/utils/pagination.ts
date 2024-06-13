export function getPagination(page: number = 1, size: number = 10): { offset: number; limit: number } {
  const limit = size
  const offset = (page - 1) * limit

  return { offset, limit }
}
