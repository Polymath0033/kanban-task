export const UseImageLink = (url: string) => {
  return new URL(`../assets/${url}.svg`, import.meta.url).href
}
