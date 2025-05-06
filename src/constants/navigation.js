const navigation = [
  {
    label: "TV Shows",
    labelVi: "Show truyền hình",
    href: "tv",
    icons: "TvIcon",
  },
  {
    label: "Movies",
    labelVi: "Phim ảnh",
    href: "movie",
    icons: "MovieIcon",
  },
];

const navigationMobile = [
  {
    label: "Home",
    labelVi: "Trang chủ",
    href: "",
    icons: "HomeIcon",
  },
  ...navigation,
  {
    label: "Search",
    labelVi: "Tìm kiếm",
    href: "search?q=&page=1",
    icons: "SearchIcon",
  },
];

export { navigation, navigationMobile };
