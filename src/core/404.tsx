import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

export  function NotFound404() {
  return (
    <div className="flex justify-center flex-col gap-10 items-center h-full">
        <div className="text-3xl italic">Страница не найдена 404</div>
        <Button classNames={{root: '!bg-my-red'}}><Link to='/' className="">Перейти на главную</Link></Button>
    </div>
  )
}
