export const getArticle = (str: string | undefined) => {
  if (!str) {
    return null;
  } else if (str === "m") {
    return "Der";
  } else if (str === "n") {
    return "Das";
  } else if (str === "f" || str === "pl") {
    return "Die";
  }
};
