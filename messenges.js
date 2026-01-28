const DB_URL = "https://chat-bddc6-default-rtdb.firebaseio.com";

async function sendMsg(fromId, toId, content, isImage = false) {
    const chatId = [fromId, toId].sort().join('_');
    const msgData = {
        sender: fromId,
        time: Date.now()
    };
    if (isImage) msgData.image = content;
    else msgData.text = content;

    await fetch(`${DB_URL}/messages/${chatId}.json`, { 
        method: 'POST', 
        body: JSON.stringify(msgData) 
    });
}
