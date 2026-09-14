# 🎓 Thiệp Mời Lễ Tốt Nghiệp - Hướng Dẫn Thiết Lập

## ✨ Giao Diện Mới

Thiệp mời được thiết kế lại hoàn toàn với:
- 📜 Cuộn mượt mà (smooth scroll) từ trên xuống
- 🎨 Sash tốt nghiệp (dải chéo) màu đỏ wine với ảnh và tên khách
- 🎬 Filmstrip gallery - hiển thị 3 ảnh giống hình thước phim
- ✨ Hiệu ứng fade-in & slide-up khi scroll
- 🏫 Section logo trường
- 💫 Chữ cách điệu (Great Vibes font) cho tên người tốt nghiệp
- 📱 Fully responsive (dùng được trên mobile)

---

## 📋 Chuẩn Bị Ảnh

Bạn cần **3 tệp ảnh** trong thư mục `assets/`:

```
assets/
  ├── oanh-photo.jpg      (ảnh chính - để trong sash)
  ├── oanh-photo-2.jpg    (ảnh gallery thứ 2)
  └── oanh-photo-3.jpg    (ảnh gallery thứ 3)
```

**Khuyến nghị:**
- Kích thước: 400x500px trở lên
- Format: JPG hoặc PNG
- Chất lượng: Tốt (không nén quá)

---

## ⚙️ Chỉnh Sửa Thông Tin

Mở file `script.js` và tìm section `CONFIG`:

```javascript
const CONFIG = {
  graduateName: "VŨ KIỀU OANH",           // Tên người tốt nghiệp
  eventDate: "2026-10-03T13:30:00+07:00", // Ngày & giờ sự kiện
  eventTime: "13:30 – 14:30",              // Thời gian khai mạc
  venue: "Hội Trường Tầng 6",              // Tên địa điểm
  address: "Tòa VNB, Trường ĐH Công Nghệ Đông Á",  // Địa chỉ ngắn
  fullAddress: "Tòa VNB, Trường ĐH Công Nghệ Đông Á, TP. HCM", // Địa chỉ đầy đủ
  mapUrl: "https://www.google.com/maps/...",  // Link Google Maps
};
```

### Thay đổi Ngày/Giờ
Format đúng: `"YYYY-MM-DDTHH:mm:00+07:00"`

Ví dụ:
- Ngày 3/10/2026, 14:30 giờ: `"2026-10-03T14:30:00+07:00"`
- Ngày 1/11/2026, 09:00 giờ: `"2026-11-01T09:00:00+07:00"`

### Lấy Link Google Maps
1. Truy cập Google Maps
2. Tìm địa điểm sự kiện
3. Nhấn Share → Copy link
4. Dán vào `mapUrl`

---

## 🎨 Tùy Chỉnh Giao Diện

### Đổi Màu Sash (Dải Chéo)

Mở `style.css`, tìm:
```css
:root {
  --sash-color: #8b2e3f;  /* Đổi màu sash ở đây */
}
```

Một số màu gợi ý:
- Đỏ wine (hiện tại): `#8b2e3f`
- Xanh đậm: `#1a4d6d`
- Tím đậm: `#5c2e5c`
- Vàng đậm: `#8b7500`

### Đổi Font Chữ

Tên người tốt nghiệp dùng font `Great Vibes` (cursive).

Muốn đổi font khác, mở `index.html` line 11 và thêm font mới từ Google Fonts, sau đó chỉnh CSS.

---

## 📱 Cấu Trúc Thiệp

**9 Section cuộn liên tục:**

1. **INTRO** - Chào mừng
2. **SCHOOL** - Logo & tên trường
3. **NAME** - Tên người tốt nghiệp (cách điệu)
4. **GALLERY** - 3 ảnh (filmstrip)
5. **SASH** - Dải chéo với ảnh + chỗ viết tên khách
6. **EVENT** - Ngày giờ địa điểm
7. **COUNTDOWN** - Đếm ngược
8. **RSVP** - Form xác nhận + lời chúc
9. **CLOSING** - Cảm ơn + lời kết

Mỗi section hiện ra với animation slide-up khi cuộn xuống.

---

## 💾 Lưu Trữ Dữ Liệu

### Xác Nhận Được Lưu Ở Đâu?

**Mặc định:** LocalStorage trình duyệt (trên máy khách)
- Dữ liệu không upload lên internet
- Chỉ thấy được trên device gửi xác nhận

**Để xem dữ liệu:**
1. Mở `admin.html` trên máy tính của bạn
2. Hoặc xuất CSV từ admin page

### Kết Nối Google Sheets (Tuỳ Chọn)

Nếu muốn tự động gửi dữ liệu về Google Sheets:

#### Bước 1: Tạo Google Apps Script
1. Vào [script.google.com](https://script.google.com)
2. Tạo project mới
3. Dán code này:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.guest,
    data.attendance,
    data.received,
    data.wish,
    data.createdAt
  ]);

  return ContentService.createTextOutput("OK");
}
```

4. Lưu & Deploy (Type: Web app, Run as: Your email)
5. Copy URL được tạo ra

#### Bước 2: Cập Nhật Config
Mở `script.js`, tìm:
```javascript
googleScriptUrl: "https://script.google.com/macros/s/YOUR_EXEC_ID_HERE/exec"
```

Thay `YOUR_EXEC_ID_HERE` bằng ID từ URL Apps Script của bạn.

---

## 🌐 Publish Lên Web

### Vercel (Dễ Nhất - Khuyến Nghị)
1. Chuẩn bị code hoàn chỉnh trong thư mục
2. Vào [vercel.com](https://vercel.com)
3. Connect GitHub hoặc upload folder
4. Tự động deploy và nhận link public

### Netlify
1. Kéo thả thư mục lên [netlify.com](https://netlify.com)
2. Nhận link ngay lập tức

### GitHub Pages
```bash
git init
git add .
git commit -m "Init"
git branch -M main
git remote add origin https://github.com/username/repo
git push -u origin main
# Settings → Pages → Enable → Receive link
```

### Máy Chủ VPS / cPanel
- Upload tất cả file bằng FTP
- Truy cập qua domain của bạn

---

## 🔗 Chia Sẻ Thiệp

Sau khi publish:
- **Link thiệp:** `https://your-domain.com/index.html` ← Gửi cho khách mời
- **Link admin:** `https://your-domain.com/admin.html` ← Chỉ bạn xem

---

## 🎬 Sash Tốt Nghiệp - Hướng Dẫn Chi Tiết

### Sash là gì?
- Dải chéo màu đỏ wine chứa:
  - Ảnh tốt nghiệp
  - Input để khách nhập tên họ
  - Chữ "Thân Mời" & "Đến Dự Buổi Lễ"

### Cách khách dùng
1. Cuộn xuống đến section SASH
2. Nhấp vào input tên "Nhập tên của bạn..."
3. Gõ tên của họ
4. Tên xuất hiện trên sash

### Tùy chỉnh màu sash
Mở `style.css` tìm `.sash-ribbon`:
```css
.sash-ribbon {
  background: linear-gradient(135deg, var(--sash-color), #a63a4e);
  /* Thay đổi --sash-color hoặc #a63a4e */
}
```

---

## 🎬 Gallery (Filmstrip) - Hướng Dẫn Chi Tiết

### Cấu Trúc
- Hiển thị 3 ảnh xếp ngang
- Có frame giống dải phim (film strip)
- Khách có thể scroll ngang để xem

### Đổi Ảnh Gallery
Mở `index.html` line 44-47, thay đường dẫn:
```html
<div class="filmstrip-item">
  <img src="assets/oanh-photo.jpg" alt="Ảnh 1" />
</div>
<div class="filmstrip-item">
  <img src="assets/oanh-photo-2.jpg" alt="Ảnh 2" />
</div>
<div class="filmstrip-item">
  <img src="assets/oanh-photo-3.jpg" alt="Ảnh 3" />
</div>
```

---

## 🐛 Xử Lý Sự Cố

### ❌ Ảnh không hiển thị
- Kiểm tra đường dẫn có đúng không (phải là `assets/oanh-photo.jpg`)
- Đảm bảo file ảnh tồn tại
- Kiểm tra extension (`.jpg` hay `.png`?)

### ❌ Countdown sai giờ
- Đảm bảo `eventDate` đúng format: `"2026-10-03T14:30:00+07:00"`
- `+07:00` là múi giờ Việt Nam (nên giữ nguyên)

### ❌ Form không gửi được
- Refresh trang (Ctrl+R hoặc Cmd+R)
- Kiểm tra console (F12) có lỗi không
- Kiểm tra LocalStorage có quá hạn không

### ❌ Admin page không thấy dữ liệu
- Phải mở `admin.html` trên **cùng device** gửi xác nhận
- Hoặc dữ liệu chưa có (chưa ai xác nhận)

---

## 💡 Mẹo Hữu Ích

1. **Gửi preview cho bạn:** Sau khi deploy, gửi link và xem thử trên máy khác
2. **Sao lưu dữ liệu:** Mỗi ngày, xuất CSV từ admin page
3. **Test form:** Tự submit một lần để test trước khi gửi cho người khác
4. **Ảnh chất lượng:** Dùng ảnh có độ phân giải cao (2K trở lên)
5. **Thời gian:** Cập nhật ngày giờ chính xác, kể cả múi giờ

---

## 📞 Cần Giúp?

- Kiểm tra hết ảnh chưa (3 ảnh bắt buộc)
- Kiểm tra config.js đúng không
- Thử clear cache browser (Ctrl+Shift+Del)
- Kiểm tra console (F12 → Console) có lỗi gì không

---

## 🎉 Hoàn Tất!

Thiệp mời của bạn sẵn sàng! Gửi link cho khách mời và theo dõi xác nhận trên admin page.

**Chúc mừng ngày lễ tốt nghiệp! 🎓✨**
