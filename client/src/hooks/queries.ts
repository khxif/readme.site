import { getProjects } from '@/data-fetchers/projects';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { queryKeys } from './query-keys';

export function getProjectsQuery() {
  return queryOptions({ queryKey: queryKeys.projects, queryFn: getProjects });
}

export function useGetProjects() {
  return useQuery(getProjectsQuery());
}
