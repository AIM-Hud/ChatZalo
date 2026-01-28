const DB_URL = "https://chat-bddc6-default-rtdb.firebaseio.com";

async function changeAvatar(uid, base64) {
    await fetch(`${DB_URL}/users/${uid}/avatar.json`, { 
        method: 'PUT', 
        body: JSON.stringify(base64) 
    });
}

async function getUserInfo(uid) {
    const res = await fetch(`${DB_URL}/users/${uid}.json`);
    return await res.json();
}
