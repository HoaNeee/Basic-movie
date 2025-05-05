const navigation = [
  {
    label: "TV Shows",
    href: "tv",
    icons: "TvIcon",
  },
  {
    label: "Movies",
    href: "movie",
    icons: "MovieIcon",
  },
];

const navigationMobile = [
  {
    label: "Home",
    href: "",
    icons: "HomeIcon",
  },
  ...navigation,
  {
    label: "Search",
    href: "search?q=",
    icons: "SearchIcon",
  },
];

export { navigation, navigationMobile };
