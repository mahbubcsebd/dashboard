const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;


// Login
export async function login(loginData, token = 'mahbub') {
    const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            credentials: 'include',
        },
        body: loginData,
    });

    const data = await res.json();
    return Response.json(data);
}
