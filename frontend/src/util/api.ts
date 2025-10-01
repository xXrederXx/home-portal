const apiUrl = "http://localhost:8000/api/"

export async function CreateUser(name: string, passwd: string, passwdRep: string): Promise<{ error: string, userId: number }> {

    if (passwd !== passwdRep) {
        return { error: "You need to write the same password twice", userId: 0 };
    }
    if (name === "") {
        return { error: "No name provided", userId: 0 };
    }
    if (passwd === "") {
        return { error: "No password provided", userId: 0 };
    }
    const data = { username: name, passwd: passwd }
    const res = await fetch(apiUrl + "createUser", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    if (res.status !== 200) {
        return { error: `Unexpected Statuscode: ${res.status}`, userId: 0 }
    }
    const jsonData = await res.json();
    return { error: "", userId: jsonData["user_id"] }
}