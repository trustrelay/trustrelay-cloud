import {useState} from 'react';
import {ToastMessageType, TOAST_CONTEXT_DEFAULT} from '../app-contexts';

export const useToast = () =>{
    const [toastState, setToastState] = useState(TOAST_CONTEXT_DEFAULT.toastState);

    const openToast = (title:string, message:string, type:ToastMessageType) => {
      setToastState({
        messageType:type,
        message:message,
        title:title,
        open:true
      })
    }
  
    const closeToast = () =>{
      setToastState({
        messageType:ToastMessageType.Closed,
        message:'',
        title:'',
        open:false
      })
    }

    return {
        ...toastState,
        openToast,
        closeToast
      };
  
}