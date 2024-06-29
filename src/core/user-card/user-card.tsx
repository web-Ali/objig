/* eslint-disable no-restricted-imports */
import { Button, FileInput, Image } from "@mantine/core"
import { MdEdit } from "@react-icons/all-files/md/MdEdit";
import dayjs from "dayjs"
import { useState } from "react";
import {  Link, useParams } from "react-router-dom"

import { useGetUser } from "../../service/get-user"
import { useUpdateImage } from "../../service/update-image";
import { getCookie } from "../../service/utils"

export  function UserCard() {

    const {userId}= useParams()
    const [photo, setPhoto] = useState<File | null>(null);
    const [inputHidden, setInputHidden] = useState(true);
    const {isLoading,mutate} = useUpdateImage()

    const previews = () => {
        if(photo){
            const imageUrl = URL.createObjectURL(photo);
            return <Image radius="md" className="mt-2"
            w="auto"
            fit="contain" src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
        }
        return null
      };
      
    const {data} = useGetUser({id: userId})

  return (
    <div style={{maxWidth: 1200, margin: '0 auto'}}>
        <div className="flex justify-between mt-2">
            <div><Link to='/' className="underline underline-offset-4 text-slate-600 text-sm">Вернуться к списку</Link></div>
            {getCookie('token') && <div className="underline underline-offset-4 text-slate-600 text-sm"><Link to={`/edit/${userId}`}>Редактировать</Link></div>}
        </div>
        <div className="grid grid-cols-4 " >
            <div className="mt-4 col-span-3 p-4">
                <div className="text-3xl font-semibold mb-6">{data?.data?.full_name}</div>
                <div className="text-2xl border-b-2 pb-2 border-my-blue">Причина трудоустройства</div>
                    <div>{Array.isArray(data?.data?.reason) ? data?.data?.reason?.join(', ') : data?.data?.reason}</div>
                <div className="text-2xl border-b-2 pb-2 border-my-blue mt-4">Контактная информация</div>
                    <div className="font-semibold">Телефон:</div>
                    <div>{data?.data?.phone_number}</div>
                    <div className="font-semibold">Электронная почта:</div>
                    <div>{data?.data?.email}</div>
                    <div className="font-semibold">Адрес:</div>
                    <div>{data?.data?.address}</div>
                <div className="text-2xl border-b-2 pb-2 border-my-blue mt-4">Личная информация</div>
                    <div className="font-semibold">Гражданство:</div>
                    <div>{data?.data?.citizenship}</div>
                    <div className="font-semibold">Дата рождения:</div>
                    <div>{dayjs(data?.data?.birth_date).isValid() ? dayjs(data?.data?.birth_date).format('DD/MM/YYYY') : data?.data?.birth_date }</div>
                    <div className="font-semibold">Семейное положение:</div>
                    <div>{data?.data?.relationship}</div>
                <div className="text-2xl border-b-2 pb-2 border-my-blue mt-4">Опыт работы</div>
                    <div className="font-semibold">Опыт работы в организациях:</div>
                    <div>{data?.data?.experience}</div>
                    <div className="font-semibold">Достижения:</div>
                    <div>{data?.data?.achievements}</div>
                <div className="text-2xl border-b-2 pb-2 border-my-blue mt-4">Образование</div>
                    <div className="font-semibold">Уровень образования:</div>
                    <div>{Array.isArray(data?.data?.education) ? data?.data?.education?.join(', ') : data?.data?.education}</div>
                    <div className="font-semibold">Факультет:</div>
                    <div>{data?.data?.institute}</div>
                    <div className="font-semibold">Специальность:</div>
                    <div>{data?.data?.specialization}</div>
                    <div className="font-semibold">Форма обучения:</div>
                    <div>{data?.data?.education_form}</div>
                    <div className="font-semibold">Курс:</div>
                    <div>{data?.data?.course}</div>
                <div className="text-2xl border-b-2 pb-2 border-my-blue mt-4">О себе</div>
                    <div className="font-semibold">Самопрезентация:</div>
                    <div>{data?.data?.bio}</div>
                    <div className="font-semibold">Компьютерные навыки:</div>
                    <div>{data?.data?.computer_skills}</div>
                    <div className="font-semibold">Наличие медицинской книжки:</div>
                    <div>{data?.data?.medicine_papers}</div>
                    <div className="font-semibold">Водительские права:</div>
                    <div>{data?.data?.driving_license}</div>
                    <div className="font-semibold">Категория прав:</div>
                    <div>{Array.isArray(data?.data?.driving_license_category) ? data?.data?.driving_license_category?.join(', ') : data?.data?.driving_license_category}</div>
                    <div className="font-semibold">Хобби\увлечения:</div>
                    <div>{data?.data?.hobby}</div>
                    <div className="font-semibold">Наличие ограничений по здоровью:</div>
                    <div>{data?.data?.health_restrictions}</div>
                <div className="font-semibold">Владение языками:</div>
                <div>Английский: {data?.data?.language_skills.Английский}</div>
                <div>Арабский: {data?.data?.language_skills.Арабский}</div>
                <div>Турецкий: {data?.data?.language_skills.Турецкий}</div>
                <div>Немецкий: {data?.data?.language_skills.Немецкий}</div>
                <div>Французский: {data?.data?.language_skills.Французский}</div>
            </div>
            <div className="col-span-1 pt-4 w-28 items-center">
                <div className="w-60 object-contain">
                    <Image
                    radius="md"
                    w="auto"
                    fit="contain"
                    src={data?.image ? `api/${data?.image}` : 'https://gstou.ru/university/profiles/profile.jpg'}
                    alt={data?.data?.full_name}
                    />
                    
                    
                    {Boolean(getCookie('token')) && <div>
                    <div className="flex gap-2 items-center text-sm cursor-pointer" onClick={()=>setInputHidden(prev=>!prev)}><div>Сменить изображение профиля</div> <MdEdit /></div>
                        {!inputHidden && <>
                            <FileInput value={photo} onChange={setPhoto} placeholder="Выберите фото" />
                            {previews()}
                            {previews() ? <Button loading={isLoading} onClick={()=>(userId && photo) ? 
                                mutate({file: photo,userId},{onSuccess: ()=> setPhoto(null)}) 
                                : null} className="!bg-my-blue !w-full mt-2" >
                                    Сохранить</Button>
                                    : null
                            }
                        </>}
                        
                    </div>}
                </div>
            </div>
        </div>
    </div>
  )
}
