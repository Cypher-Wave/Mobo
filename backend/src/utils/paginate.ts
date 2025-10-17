import { Model } from "mongoose";

export interface PaginateResult<T> {
  results: T[];
  total: number;
  currentPage: number;
  totalPages: number;
}

// Função para paginar dados
export async function paginate<T>(
  model: Model<T>,
  filter: object = {},
  page: number = 1,
  limit: number = 10,
  sort: Record<string, 1 | -1> = {}
): Promise<PaginateResult<T>> {
  const total = await model.countDocuments(filter);
  const results = await model.find(filter).sort(sort).skip((page - 1) * limit).limit(limit);
  return {
    results,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}
