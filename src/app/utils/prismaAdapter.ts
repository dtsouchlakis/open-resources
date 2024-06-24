import { Prisma } from "@prisma/client";
import { DefaultArgs, Extensions } from "@prisma/client/runtime/library";

export default class PrismaAdapter {
  async parseQuery<T>(query: URLSearchParams) {
    const where = this.parseWhere(query);
    const orderBy = query.has("orderBy") ? query.get("orderBy") : undefined;
    const include = this.parseInclude(query);
    const skip = query.has("skip") ? parseInt(query.get("skip")!) : undefined;
    const take = query.has("take") ? parseInt(query.get("take")!) : undefined;
    const cursor = query.has("cursor") ? query.get("cursor")! : undefined;
    return {
      where,
      orderBy,
      include,
      skip,
      take,
      cursor,
    } as T;
  }

  parseWhere(query: URLSearchParams) {
    const _where = query.has("where") ? query.get("where") : {};
    if (typeof _where !== "string") return {};
    let value = _where?.split(":")[1];
    let args = _where?.split(":")[0].split(".");
    let where = {};
    if (args?.length === 0 || value?.length === 0) return {};
    if (args?.length === 1) {
      return {
        [args[0]]: value,
      };
    } else if (args?.length! > 1) {
      where = args.reduceRight((acc: any, item: any) => {
        return { [item]: acc };
      }, value);
      return where;
    }
  }

  parseInclude(query: URLSearchParams) {
    const _include = query.has("include") ? query.get("include") : undefined;
    let includeList = _include?.split(",");
    let include;
    if (includeList) {
      include = includeList.reduceRight((acc: any, item) => {
        return { [item]: acc };
      }, true);
    }
    return include;
  }
}
