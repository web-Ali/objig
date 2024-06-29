/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from "../libs/axios";


export const addUser = async (formData: any) => {
    await apiClient.post(
      `/api/f/student-resume`,formData
    );
   
  };
  
export const useAddUser = () => {
    const queryClient = useQueryClient()
    const query = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            notifications.show({ message: 'Выпускник добавлен' })
            queryClient.invalidateQueries({ queryKey: ['getUsersList'] })
        }
      })

const mutate = query.mutate;
const isLoading = query.isPending;

return {
    mutate,
    isLoading,
} as const;
};