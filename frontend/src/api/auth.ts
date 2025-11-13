import { API_URL } from "../utils/config";

export async function registerUser(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/register`,{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({email,password}),
    });

    if(!res.ok) throw new Error("Error register user");
    return res.json();
}

export async function loginUser(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`,{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({email,password}),
    });
    
    if(!res.ok) throw new Error("Credential incorrect");

    return res.json();
}