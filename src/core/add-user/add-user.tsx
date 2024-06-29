/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-imports */
import { Button, MultiSelect, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { isNotEmpty, useForm } from "@mantine/form";
import dayjs from "dayjs";
import  customParseFormat  from "dayjs/plugin/customParseFormat";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAddUser } from "../../service/add-user";
import { citizenship, computer_skills, course, driving_license_category, education, education_form, institute, language_skills, reason, relationship, yes_no } from "../../service/const";
import { useDeleteUser } from "../../service/delete-user";
import { useEditUser } from "../../service/edit-user";
import { useGetUser } from "../../service/get-user";
dayjs.extend(customParseFormat)


export function AddUser({editMode}:{editMode?: boolean}) {

  const {userId} = useParams()
  const navigate = useNavigate()
  const {data} = useGetUser({id: userId})
  const form = useForm<any>({
  initialValues:{
    language_skills:{}
  },
  validate: {
    full_name: isNotEmpty('Обязательное поле'),
    email: isNotEmpty('Обязательное поле'),
    phone_number: isNotEmpty('Обязательное поле'),
    birth_date: isNotEmpty('Обязательное поле'),
    address: isNotEmpty('Обязательное поле'),
    citizenship: isNotEmpty('Обязательное поле'),
    relationship: isNotEmpty('Обязательное поле'),
    reason: isNotEmpty('Обязательное поле'),
    education: isNotEmpty('Обязательное поле'),
    institute: isNotEmpty('Обязательное поле'),
    specialization: isNotEmpty('Обязательное поле'),
    course: isNotEmpty('Обязательное поле'),
    computer_skills: isNotEmpty('Обязательное поле'),
    medicine_papers: isNotEmpty('Обязательное поле'),
    driving_license: isNotEmpty('Обязательное поле'),
    driving_license_category: isNotEmpty('Обязательное поле'),
    experience: isNotEmpty('Обязательное поле'),
    achievements: isNotEmpty('Обязательное поле'),
    hobby: isNotEmpty('Обязательное поле'),
    health_restrictions: isNotEmpty('Обязательное поле'),
    ['language_skills.Английский']: isNotEmpty('Обязательное поле'),
    ['language_skills.Арабский']: isNotEmpty('Обязательное поле'),
    ['language_skills.Турецкий']: isNotEmpty('Обязательное поле'),
    ['language_skills.Немецкий']: isNotEmpty('Обязательное поле'),
    ['language_skills.Французский']: isNotEmpty('Обязательное поле'),
  }
})

useEffect(()=>{
  if(editMode && data){
    const dataClone = cloneDeep(data?.data)
    if(dataClone?.reason?.filter((el:any)=> !reason.includes(el))?.length > 0){
      const index = dataClone?.reason?.indexOf(dataClone?.reason?.filter((el:any)=> !reason.includes(el))?.[0]);
      if (index !== -1) {
        dataClone.reason_another = dataClone?.reason[index]
        dataClone?.reason?.splice(index,1,'Другое') ;
      }
    }
    if(dayjs(dataClone?.birth_date, 'DD.MM.YYYY').isValid()){
      dataClone.birth_date = dayjs(dataClone?.birth_date, 'DD.MM.YYYY');
    }else{
      dataClone.birth_date = dayjs(dataClone?.birth_date).isValid() ? dayjs(dataClone?.birth_date) : null
    }
    dataClone.course = String(dataClone?.course)
    form.setValues(dataClone)
  }
},[editMode,data])

const {mutate} = useAddUser()
const {mutate: editMutate} = useEditUser()
const {mutate: deleteMutate} = useDeleteUser()
const reasonAnotherVisible = form.values?.reason?.some((el:any)=>el ==='Другое')

const onSubmit = ()=>{
  form.validate()
  if(form.isValid()){
    const formValues = cloneDeep(form.values)
    formValues.course = Number(formValues?.course)
    // formValues.driving_license_category = [
    //   "М",
    //   "А",
    //   "В",
    //   "ВЕ",
    //   "С",
    //   "СЕ",
    //   "D",
    // ]
    if(formValues?.reason?.some((el:any)=>el ==='Другое')){
      const index = formValues?.reason?.indexOf('Другое');
      if (index !== -1) {
        if(formValues?.reason_another?.length){
          formValues?.reason?.splice(index,1,formValues?.reason_another);
        }else{
          formValues?.reason?.splice(index,1);
        }
        
      }
    }
    
    delete formValues?.reason_another
    if(editMode && userId !== undefined){
      editMutate({formData: formValues,id: userId},{onSuccess: ()=> navigate(`/${userId}`)})
    }else{
      mutate(formValues,{onSuccess: ()=> navigate(`/${userId}`) })
    }
    
  }
}
  return (
    <div>
        <h1 className="font-semibold text-3xl p-6">{editMode ? 'Редактирование выпускника' : 'Добавление выпускника'}</h1>
        <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-4 ml-14">
          <div className="flex flex-col gap-2">
            <TextInput label="ФИО" {...form.getInputProps('full_name')} withAsterisk/>
            <div className="text-2xl border-b-2 pb-2 border-my-blue">Причины трудоустройства</div>
              <MultiSelect label="Причины трудоустройства" data={reason} {...form.getInputProps('reason')} withAsterisk />
              {reasonAnotherVisible && <TextInput placeholder="Опишите свою причину" {...form.getInputProps('reason_another')} withAsterisk/>}
            <div className="text-2xl border-b-2 pb-2 border-my-blue mt-4">Контактная информация</div>
              <TextInput type="email" label="Адрес электронной почты" {...form.getInputProps('email')} withAsterisk/>
              <TextInput label="Номер телефона " {...form.getInputProps('phone_number')} withAsterisk/>
              <TextInput label="Адрес проживания (город, район, улица) " {...form.getInputProps('address')} withAsterisk/>
            <div className="text-2xl border-b-2 pb-2 border-my-blue mt-4">Личная информация</div>
              <Select label="Гражданство" data={citizenship} {...form.getInputProps('citizenship')} withAsterisk />
              <DatePickerInput locale="ru" label="Дата рождения " {...form.getInputProps('birth_date')} withAsterisk/>
              <Select label="Семейное положение " data={relationship} {...form.getInputProps('relationship')} withAsterisk />
            <div className="text-2xl border-b-2 pb-2 border-my-blue mt-4">Опыт работы</div>
              <TextInput label="Опыт работы в организациях (писать название организации и должность)" {...form.getInputProps('experience')} withAsterisk/>
              <TextInput label="Ваши достижения (участие в мероприятиях в форумах, спортивные состязания и тд.)" {...form.getInputProps('achievements')} withAsterisk/>
            <div className="text-2xl border-b-2 pb-2 border-my-blue mt-4">Образование</div>
              <MultiSelect label="Уровень образования (если есть указывать оба)" data={education} {...form.getInputProps('education')} withAsterisk />
              <Select label="Ваш факультет" data={institute} {...form.getInputProps('institute')} withAsterisk />
             <TextInput label="Ваша специальность" {...form.getInputProps('specialization')} withAsterisk/>
              <Select label="Форма обучения" data={education_form} {...form.getInputProps('education_form')}  />
              <Select label="Ваш курс" data={course} {...form.getInputProps('course')} withAsterisk />
            <div className="text-2xl border-b-2 pb-2 border-my-blue mt-4">О себе</div>
              <Select label="Компьютерные навыки" data={computer_skills} {...form.getInputProps('computer_skills')} withAsterisk />
              <Select label="Наличие медицинской книжки" data={yes_no} {...form.getInputProps('medicine_papers')} withAsterisk />
              <Select label="Водительские права" data={yes_no} {...form.getInputProps('driving_license')} withAsterisk />
              <MultiSelect label="Категория прав" data={driving_license_category} {...form.getInputProps('driving_license_category')} withAsterisk />
            
              <TextInput label="Хобби\увлечения" {...form.getInputProps('hobby')} withAsterisk/>
              <Select label="Наличие ограничений по здоровью" data={yes_no} {...form.getInputProps('health_restrictions')} withAsterisk />
              <TextInput label="Самопрезентация (немного расскажите о себе)" {...form.getInputProps('bio')} />
              <div className="text-sm mt-1">Владение языками:</div>
              <div className="ml-4">
                <Select label="Английский" data={language_skills} {...form.getInputProps('language_skills.Английский')} withAsterisk />
                <Select label="Арабский" data={language_skills} {...form.getInputProps('language_skills.Арабский')} withAsterisk />
                <Select label="Турецкий" data={language_skills} {...form.getInputProps('language_skills.Турецкий')} withAsterisk />
                <Select label="Немецкий" data={language_skills} {...form.getInputProps('language_skills.Немецкий')} withAsterisk />
                <Select label="Французский" data={language_skills} {...form.getInputProps('language_skills.Французский')} withAsterisk />
              </div>
          </div>
          <Button className="col-span-2 !bg-my-blue" onClick={()=>onSubmit()}>{editMode ? 'Сохранить изменения' : 'Добавить выпускника'}</Button>
          {editMode ? <Button  className="col-span-2 !bg-my-red" onClick={()=> userId ? deleteMutate({id: userId}) : null}>Удалить</Button> : null}
          
        </form>
    </div>
  )
}
