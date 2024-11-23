import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const username = 'dopo';
const password = 'DevOps2024';
const encodedCredentials = btoa(`${username}:${password}`);

export const customBaseQuery = fetchBaseQuery({
  baseUrl: 'https://hackaton-api.fly.dev/api/v1/',
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Basic ${encodedCredentials}`);
    return headers;
  },
});

export enum QueryOperator {
  /** Filters by equality */
  EQ = 'eq',
  /** Filters by inequality */
  NE = 'ne',
  /** Filters by greater */
  GT = 'gt',
  /** Filters by greater or equal */
  GTE = 'gte',
  /** Filters by lower */
  LT = 'lt',
  /** Filters by lower or equal */
  LTE = 'lte',
  /** Filters by partial match */
  LIKE = 'like',
  /** Filters properties that start with a value */
  START = 'start',
  /** Filters properties that end with a value */
  END = 'end',
}

export interface QueryFilter {
  property: string;
  operator: QueryOperator;
  value: string | number;
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export type UrlParams = {
  /**
   * `base` is the base URL that the query will target.
   * If not specified, it will use the default value. For example, it could be 'automations' or any other base URL you want to use.
   * @example 'automations'
   */
  base?: string;

  /**
   * `page` specifies the page number for pagination.
   * If not defined, the default value will be used.
   * @example 1
   */
  page?: number;

  /**
   * `limit` specifies the number of items per page.
   * If not specified, the default value will be used.
   * @example 10
   */
  limit?: number;

  /**
   * `sort` specifies the property by which the results should be sorted.
   * You can specify any property for sorting, such as 'name', 'date', etc.
   * @example 'name'
   */
  sort?: string;

  /**
   * `order` specifies the sort direction. It can be 'asc' (ascending) or 'desc' (descending).
   * @example 'asc'
   */
  order?: Order;

  /**
   * `search` allows you to filter results by a search term.
   * This parameter is optional and can be used to filter records by name or other properties.
   * @example 'automation'
   */
  search?: string;

  /**
   * `query` is an array of filters for more complex queries.
   * Each filter contains `property`, `operator`, and `value`.
   * You can use operators like 'eq', 'ne', 'gt', 'lt', etc.
   * @example
   * [
   *   { property: 'status', operator: 'eq', value: 'active' },
   *   { property: 'name', operator: 'like', value: 'automation' }
   * ]
   */
  query?: QueryFilter[];
};

export const urlParamsBuilder = ({
  base,
  page = 1,
  limit = 0,
  sort,
  order,
  search,
  query,
}: UrlParams): string => {
  let url = base ?? '';
  const params = new URLSearchParams();

  if (page !== undefined) params.append('page', page.toString());
  if (limit !== undefined) params.append('limit', limit.toString());
  if (sort) params.append('sort', sort);
  if (order) params.append('order', order);
  if (search) params.append('search', search);

  if (query) {
    query.forEach(({ property, operator, value }) => {
      params.append(`${property}_${operator}`, value.toString().trim());
    });
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  return url;
};
