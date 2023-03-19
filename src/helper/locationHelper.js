export const getRouteType = (location) => {
  const path = location.pathname.split("/");
  return path ? path[1] : "";
};

export const isPublicRoute = (location) => {
  return getRouteType(location) === "public-workouts";
};

export const isValidRoute = (location) => {
  ["my-workouts", "public-workouts"].includes(getRouteType(location));
};
