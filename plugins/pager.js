function linkGen(pageNum) {
  return pageNum === 1 ? '?' : `?page=${pageNum}`;
}

const DEFAULT_PAGING = {
  current_page: 1,
  is_first_page: true,
  is_last_page: false,
  total_count: 0,
  total_pages: 1,
};

export { linkGen, DEFAULT_PAGING };
