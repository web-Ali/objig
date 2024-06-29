/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-imports */
import {  Image, Pagination, Select, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { citizenship, education, relationship } from "../../service/const";
import {  useGetUsersList } from "../../service/get-users-list";

export  const  UsersList = ()=> {

  const pageSize = 20
  const [page, onChange] = useState(1);

  const form = useForm({
    initialValues: {
    "full_name": undefined,
    "citizenship": undefined,
    "relationship": undefined,
    "education": undefined,
  }})

  const {data,count} = useGetUsersList({page: page,size: pageSize, ...form.values})

  useEffect(()=>{
    setTimeout(()=>{
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },500)
  },[page])
  
  return (
    <div className="grid md:flex-row gap-2 grid-cols-[16rem,1fr] items-center md:items-stretch">
      <form className=" p-4 flex flex-col gap-2">
        <TextInput label="ФИО" placeholder="ФИО" {...form.getInputProps('full_name')} />
        <Select data={citizenship} label="Гражданство" placeholder="Гражданство" {...form.getInputProps('citizenship')}  clearable/>
        <Select data={relationship} label="Семейное положение" placeholder="Семейное положение" {...form.getInputProps('relationship')} clearable/>
        <Select data={education} label="Уровень образования" placeholder="Уровень образования" {...form.getInputProps('education')} clearable/>
      </form>
      <div>
        <div className="grid xl:grid-cols-2 gap-6 mt-4 lg:grid-cols-1 sm:grid-cols-1 px-4 ">
          {data?.map((item: any)=>{
          return <div key={item?._id} className="shadow-card">
                    <div  className="flex gap-2  p-2">
                        <div className="flex flex-col gap-2 w-28 items-center">
                          <div className="w-32 object-contain pl-2 pt-2">
                            <Image
                              radius="md"
                              w="auto"
                              fit="contain"
                              src={item?.image ? `api/${item?.image}` : 'https://gstou.ru/university/profiles/profile.jpg'}
                              alt={item?.data?.full_name}
                            />
                          </div>
                        </div>
                        <div className="p-4 pt-0">
                        <div className="font-bold">{item?.data?.full_name}</div>
                          <div className="text-gray-400">Факультет:</div>
                          <div>{item?.data?.institute}</div>
                          <div className="text-gray-400">Уровень образования:</div>
                          <div>{item?.data?.education}</div>
                          <div className="text-gray-400">Специальность:</div>
                          <div>{item?.data?.specialization}</div>
                        </div>
                    </div>
                    <div className="flex justify-end p-4 pt-0"><p className="text-sm text-my-red"><Link to={`/${item?._id}`}>Подробнее</Link></p></div>
                  </div>
        })}
        </div>
        <div className="flex justify-end mt-4 pr-8">
          <Pagination 
           classNames={{control: "!bg-my-blue !text-white data-[active=true]:!bg-my-red data-[active=true]:!border-my-blue data-[disabled=true]:!opacity-40"}}
           total={Math.ceil(count / pageSize) || 0}  
           value={page} 
           onChange={onChange} />
        </div>
      </div>
    </div>
  )
}
