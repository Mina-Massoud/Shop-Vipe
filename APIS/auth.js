import { redirect } from "react-router-dom";

export function auth() { 
    const user = localStorage.getItem("user") !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : localStorage.clear();
    if (!user) { 
        throw redirect("/login")
    }
    return null
}