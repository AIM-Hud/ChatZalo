const DB_URL = "https://chat-bddc6-default-rtdb.firebaseio.com"; //

// 1. Hàm hiển thị thông tin cá nhân lên giao diện
function displayProfile(user) {
    if (!user) return;
    document.getElementById('my-avatar').src = user.avatar || 'https://via.placeholder.com/150';
    document.getElementById('my-name').innerText = user.name || 'Người dùng';
    document.getElementById('my-id').innerText = user.uid || '000000';
}

// 2. Hàm xử lý đổi ảnh đại diện (Đồng bộ với Firebase)
async function updateAvatar(uid, inputElement) {
    const file = inputElement.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async function() {
        const base64Image = reader.result;
        
        // Cập nhật lên Firebase chat-bddc6
        await fetch(`${DB_URL}/users/${uid}/avatar.json`, {
            method: 'PUT',
            body: JSON.stringify(base64Image)
        });

        // Cập nhật lại bộ nhớ tạm localStorage để "bất tử" trên máy
        const savedUser = JSON.parse(localStorage.getItem('chat_session'));
        savedUser.avatar = base64Image;
        localStorage.setItem('chat_session', JSON.stringify(savedUser));
        
        // Cập nhật giao diện ngay lập tức
        document.getElementById('my-avatar').src = base64Image;
        alert("Đã đổi ảnh đại diện thành công!");
    };
    reader.readAsDataURL(file);
}

// 3. Hàm lấy thông tin quan trọng của một User khác bằng ID
async function fetchUserProfile(id) {
    const res = await fetch(`${DB_URL}/users/${id}.json`);
    const data = await res.json();
    return data;
}
