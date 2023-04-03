import { useRouteError } from "react-router-dom"
export default function ErrorHandlerHome() {
    let error = useRouteError();  
 return ( 
    <h1 className="text-6xl py-[2em] font-black text-red-600 w-fit mx-auto">The Servers have a Problem right now please come again later!</h1>
 )   
}