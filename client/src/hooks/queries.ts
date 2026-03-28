import { getProjectByName, getProjects } from '@/data-fetchers/projects';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { queryKeys } from './query-keys';

export function getProjectsQuery() {
  return queryOptions({ queryKey: queryKeys.projects, queryFn: getProjects });
}

export function useGetProjects() {
  return useQuery(getProjectsQuery());
}

export function useGetProjectByName(name: string) {
  return useQuery({
    queryKey: [...queryKeys.projects, name],
    queryFn: () => getProjectByName(name),
    enabled: !!name,
    refetchInterval: query => (query.state.data?.status === 'PENDING' ? 2000 : false),
  });
}
