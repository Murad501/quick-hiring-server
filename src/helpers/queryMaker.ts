export const queryMaker = (query: Record<string, string>) => {
  const { limit, page, sort, search, ...rest } = query;
  const limitQuery = Math.max(parseInt(limit || "10") || 10, 1);
  const pageQuery = Math.max(parseInt(page || "1") || 1, 1);
  const sortQuery: Record<string, 1 | -1> = { createdAt: -1 };
  const skipQuery = (pageQuery - 1) * limitQuery;
  const searchQuery = search ? search : "";
  const filter: Record<string, string | unknown> = {};

  if (sort) {
    const sortArray = sort.split(",");
    sortArray.forEach((sortOption) => {
      const [key, order] = sortOption.split(":");
      sortQuery[key] = order === "desc" ? -1 : 1;
    });
  }
  if (rest) {
    const andConditions: Record<string, unknown>[] = [];

    Object.keys(rest).forEach((key) => {
      const value = rest[key];
      if (rest[key] !== "undefined" && rest[key] !== "null") {
        andConditions.push({
          $or: value
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item && item !== ",")
            .map((item) => {
              if (key === "status") {
                return { [key]: item };
              } else {
                return { [key]: { $regex: item, $options: "i" } };
              }
            }),
        });
      }
    });

    if (andConditions.length) {
      filter.$and = andConditions;
    }
  }

  return { limitQuery, pageQuery, sortQuery, skipQuery, filter, searchQuery };
};
