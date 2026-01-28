const DB_URL = "https://chat-bddc6-default-rtdb.firebaseio.com";

async function sendFriendRequest(fromUser, toId) {
    // Lưu vào mục requests của người nhận để họ phê duyệt
    await fetch(`${DB_URL}/requests/${toId}/${fromUser.uid}.json`, { 
        method: 'PUT', 
        body: JSON.stringify({ from: fromUser.uid, name: fromUser.name }) 
    });
}

async function acceptFriendRequest(myId, friendId) {
    // Thêm vào danh sách bạn bè của cả hai
    await fetch(`${DB_URL}/friends/${myId}/${friendId}.json`, { method: 'PUT', body: JSON.stringify({uid: friendId}) });
    await fetch(`${DB_URL}/friends/${friendId}/${myId}.json`, { method: 'PUT', body: JSON.stringify({uid: myId}) });
    // Xóa lời mời sau khi đồng ý
    await fetch(`${DB_URL}/requests/${myId}/${friendId}.json`, { method: 'DELETE' });
}
