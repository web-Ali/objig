/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { useQuery } from '@tanstack/react-query';

import { apiClient } from "../libs/axios";


export const getUsersList = async ({
    page,size,citizenship,education,full_name,relationship
}:{
    page: number;
    size: number;
    full_name?: string
    citizenship?: string
    relationship?: string
    education?: string
}) => {
    const { data } = await apiClient.get(
      `/api/v1/student-resume`,
      {
        params: {
            page,
            size,
            full_name,
            citizenship,
            education,
            relationship,
        }
      }
    );
    return data;
  };
  
export const useGetUsersList = ({
    page = 1,size = 10,citizenship,education,full_name,relationship
}:{
    page: number;
    size: number;
    full_name?: string
    citizenship?: string
    relationship?: string
    education?: string
}) => {
const query = useQuery({ queryKey: ['getUsersList',page,full_name,citizenship,relationship,education], queryFn: ()=> getUsersList({page,size,citizenship,education,full_name,relationship}) })

const data = query.data?.data;
const count = query.data?.count;
const isFetching = query.isFetching ;
const refetch = query.refetch;

return {
    data,
    isFetching,
    refetch,
    count
} as const;
};