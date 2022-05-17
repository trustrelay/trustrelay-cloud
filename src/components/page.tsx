import { useEffect } from "react"; 

interface Props { 
    title?:string;
    children:any
}

const Page = (props: Props) => {
  useEffect(() => {
    document.title = props.title || "";
  }, [props.title]);
  return props.children;
};

export default Page;