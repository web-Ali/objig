/* eslint-disable no-throw-literal */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from "../libs/axios";
import { getCookie } from './utils';


export const updateImage = async ({userId,file}:{userId: string,file: File}) => {
    if(getCookie('token')){
        const data = new FormData();
        data.append('file', file, file.name);

        await apiClient.post(
            `/api/v1/student-resume/${userId}`,data,{
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data;`,
                  }
            }
          );
    }else{
        notifications.show({ message: 'Требуется авторизация на портале isu.gstou.ru' })
        throw 'Требуется авторизация на портале isu.gstou.ru'
    }
  };
  
export const useUpdateImage = () => {
    const queryClient = useQueryClient()
    const query = useMutation({
        mutationFn: updateImage,
        onSuccess: () => {
            notifications.show({ message: 'Изображение обновлено' })
            queryClient.invalidateQueries({ queryKey: ['getUser'] })
        }
      })

const mutate = query.mutate;
const isLoading = query.isPending;

return {
    mutate,
    isLoading,
} as const;
};