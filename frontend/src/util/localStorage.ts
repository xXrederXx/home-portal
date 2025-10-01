export function SaveUserId(userId: number): void {
    localStorage.setItem("userId", userId.toString());
}

export function DeleteUserId(): void {
    localStorage.removeItem("userId");
}

export function GetUserId(): number | null {
    const storedId = localStorage.getItem("userId");
    return storedId ? parseInt(storedId, 10) : null;
}
