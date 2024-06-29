/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { useQuery } from '@tanstack/react-query';

import { apiClient } from "../libs/axios";


export const getUser = async ({
    id
}:{
    id: string
}) => {
    const { data } = await apiClient.get(
      `/api/v1/student-resume/${id}`
    );
    return data;
  };
  
export const useGetUser = ({
    id
}:{
    id?: string;
}) => {
const query = useQuery({ queryKey: ['getUser'], queryFn: ()=> id==null ? null: getUser({id}) })

const data = query.data;
const isLoading = query.isLoading;
const refetch = query.refetch;

return {
    data,
    isLoading,
    refetch
} as const;
};