import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { Appointment, UserProfile } from '../backend';

export function useGetCallerUserProfileQuery() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: isAuthenticated ? (!!actor && query.isFetched) : true,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { identity } = useInternetIdentity();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['currentUserProfile', identity?.getPrincipal().toString()],
      });
    },
  });
}

export function useSubmitAppointment() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (appointment: Appointment) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitAppointment(appointment);
    },
  });
}

export function useGetAppointmentsByEmail(email: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Appointment[] | null>({
    queryKey: ['appointmentsByEmail', email],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAppointmentsByEmail(email);
    },
    enabled: !!actor && !actorFetching && !!email,
  });
}
