import { API_URL } from "../utils/config";

export async function registerUser(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/register`,{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({email,password}),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        throw new Error(data?.error || "Error registering user");
    }
    return data;

}

export async function loginUser(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`,{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({email,password}),
    });
    
    const data = await res.json().catch(() => null);

    if (!res.ok) {
        throw new Error(data?.error || "Error login user");
    }
    return data;
}