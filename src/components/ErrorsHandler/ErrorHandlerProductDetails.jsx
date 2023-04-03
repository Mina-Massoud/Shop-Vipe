import { useRouteError } from "react-router-dom"
export default function ErrorHandlerProductDetails() {
    const error = useRouteError() ;  
    return (
        <> 
        <h1 className="text-5xl mx-auto w-fit py-[2em] text-red-600 font-black">Sorry This Product Not Available Right Now !</h1>
        </>
    )
}