export default class PrismaAdapter {
  async parseQuery(query: URLSearchParams) {
    const where = query.has("where") ? JSON.parse(query.get("where")!) : {};
    const orderBy = query.has("orderBy")
      ? JSON.parse(query.get("orderBy")!)
      : {};
    const select = query.has("select") ? JSON.parse(query.get("select")!) : {};
    const include = query.has("include")
      ? JSON.parse(query.get("include")!)
      : {};
    const skip = query.has("skip") ? parseInt(query.get("skip")!) : undefined;
    const take = query.has("take") ? parseInt(query.get("take")!) : undefined;
    const cursor = query.has("cursor")
      ? JSON.parse(query.get("cursor")!)
      : undefined;
    return { where, orderBy, select, include, skip, take, cursor };
  }
}
