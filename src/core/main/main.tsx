/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Image } from "@mantine/core";
import React, { useState } from "react";
import {Camera} from "react-camera-pro";
import Webcam from "react-webcam";


export  function Main() {

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  const [image,setImage] = useState<File[]>([])
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      const imageSrc = (webcamRef.current as any)?.takePhoto() ;
      setImage(prev => [...prev,imageSrc])
    },
    [webcamRef]
  );
console.log(image)
  return (
    <div className=" h-full">
      <div className="grid grid-cols-2 gap-10 mt-10">
        <div>
          <div className="max-w-full">
            <Camera ref={webcamRef} videoReadyCallback={()=>console.log('start')}  aspectRatio={16 / 9}  errorMessages={{
              noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
              permissionDenied: 'Permission denied. Please refresh and give camera permission.',
              switchCamera:
              'It is not possible to switch camera to different one because there is only one video device accessible.',
              canvas: 'Canvas is not supported.'
            }} />
          </div>
          <div className="text-center mt-2">
          <Button onClick={capture}   variant="filled" size="xl" color="rgba(133, 19, 19, 1)" radius="xl">Найти деффекты</Button>
          </div>
        </div>
        <div>
          <div className="text-white text-5xl text-center mb-4 font-semibold">Найденные деффекты</div>
          <div className="grid grid-cols-3 gap-2 overflow-y-auto h-[calc(100vh-200px)]">
            {image?.map(screen => <div key={String(screen?.name)+String(screen?.lastModified)}><Image  radius="md"
                    h={200}
                    w="auto"
                    fit="contain" src={screen}
            /></div>)}
          </div>
        </div>
        
      </div>
    </div>
  )
}
