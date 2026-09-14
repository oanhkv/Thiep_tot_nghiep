# 📋 Hướng Dẫn Sử Dụng Thiệp Mời Lễ Tốt Nghiệp

## 🎓 Giới Thiệu
Đây là website thiệp mời lễ tốt nghiệp tương tác với giao diện mềm mại, tone hồng và có tính năng theo dõi xác nhận tham dự từ khách mời.

---

## 📂 Cấu Trúc File

```
graduation-invitation/
├── index.html          # Trang thiệp mời chính
├── admin.html          # Trang quản lý xác nhận (chỉ xem nội bộ)
├── style.css           # Stylesheet chính
├── script.js           # JavaScript chính
├── HUONG-DAN.md        # File này
├── assets/
│   └── oanh-photo.jpg  # Ảnh tốt nghiệp (thay bằng ảnh của bạn)
```

---

## 🚀 Cách Sử Dụng

### 1️⃣ Chỉnh Sửa Thông Tin Sự Kiện
Mở file `script.js` tìm phần `CONFIG` ở trên cùng:

```javascript
const CONFIG = {
  graduateName: "VŨ KIỀU OANH",      // Tên người tốt nghiệp
  eventDate: "2026-10-03T08:00:00+07:00",  // Ngày/giờ sự kiện
  eventTime: "08:00 – 11:00",        // Giờ khai mạc
  venue: "Hội trường tốt nghiệp",    // Địa điểm
  address: "Số 2, Hoàng Văn Thụ...", // Địa chỉ đầy đủ
  mapUrl: "https://www.google.com/maps/...",  // Link Google Maps
  photo: "assets/oanh-photo.jpg"     // Đường dẫn ảnh
};
```

### 2️⃣ Thay Ảnh Tốt Nghiệp
1. Chuẩn bị ảnh (khuyến nghị: 400x500px, định dạng JPG/PNG)
2. Đặt ảnh vào thư mục `assets/` với tên `oanh-photo.jpg`
3. Hoặc thay đổi `photo` trong `CONFIG` ở `script.js`

### 3️⃣ Gửi Link Thiệp Cho Khách Mời
- **URL thiệp chính:** `https://your-domain.com/index.html`
- Bạn có thể upload lên hosting như Vercel, Netlify, GitHub Pages, hoặc máy chủ riêng

### 4️⃣ Xem Kết Quả Xác Nhận (Rất Quan Trọng!)
**Trên máy tính của bạn:**
- Mở file `admin.html` trong trình duyệt
- Hoặc truy cập: `https://your-domain.com/admin.html`

**Trang Admin hiển thị:**
- 📊 Thống kê số người sẽ đi, không đi, chưa chắc
- 📝 Danh sách tên + lời chúc của mọi người
- 🔍 Tính năng tìm kiếm
- 📥 Nút xuất dữ liệu ra CSV/Excel

---

## 🎨 Giao Diện & Màu Sắc

### Tone Màu Chính (Hồng Mềm Mại)
- **Hồng chính:** `#e89ab8`
- **Hồng đậm:** `#c75a7e`
- **Hồng nhạt:** `#f5d9e6`
- **Nền:** Gradient hồng nhạt

### Đặc Điểm Thiết Kế
- ✨ Gradient mềm mại, rounded corners 16-24px
- 🌸 Hiệu ứng cánh hoa rơi khi mở thiệp
- 💫 Pháo giấy mini khi nhấn "Mở thiệp"
- 🎯 Hiệu ứng scroll reveal (phần tử hiện lên khi cuộn)
- 📱 Responsive design (dùng được trên mobile)

---

## 💾 Lưu Trữ Dữ Liệu

### Cách Dữ Liệu Được Lưu
Tất cả dữ liệu xác nhận được **lưu tự động** trên:
1. **LocalStorage của trình duyệt** (trên máy khách)
   - Dữ liệu này **chỉ hiển thị khi mở `admin.html` trên cùng máy tính**
   - An toàn, không upload lên internet

2. **Google Sheets** (tùy chọn)
   - Nếu bạn cấu hình URL Google Apps Script (xem phần dưới)
   - Dữ liệu sẽ được gửi về Google Sheet tự động

### Sao Lưu Dữ Liệu
1. Mở `admin.html`
2. Nhấn nút **"📥 Xuất Excel"**
3. File CSV sẽ được tải xuống máy tính
4. Mở bằng Excel hoặc Google Sheets

---

## 🔗 Kết Nối Google Sheets (Tùy Chọn)

Nếu muốn dữ liệu được gửi về Google Sheets:

### Bước 1: Tạo Google Apps Script
1. Truy cập [script.google.com](https://script.google.com)
2. Tạo project mới
3. Dán code dưới đây:

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

4. Lưu & Deploy (Select type: Web app, Execute as: Your email)
5. Copy URL được tạo ra

### Bước 2: Cấu Hình URL
1. Mở `script.js`
2. Tìm dòng `googleScriptUrl`
3. Thay `YOUR_EXEC_ID_HERE` bằng URL từ bước 1

---

## 🎯 Các Tính Năng Chính

### 📌 Trên Trang Thiệp (`index.html`)
- ✅ Nút "Mở Thiệp" với hiệu ứng
- 🖼️ Khung ảnh tốt nghiệp bo góc
- 📅 Lịch tháng 10/2026 (ngày lễ được highlight)
- ⏱️ Bộ đếm ngược (days, hours, minutes, seconds)
- 🗺️ Nút xem bản đồ Google Maps
- 📝 Form xác nhận: Tên, xác nhận, lời chúc
- 💌 Hiển thị lời chúc từ khách mời

### 📊 Trên Trang Admin (`admin.html`)
- 📈 Thống kê: Tổng, đi, không đi, chưa chắc
- 🔍 Tìm kiếm theo tên
- 📋 Bảng chi tiết toàn bộ xác nhận
- 👀 Xem chi tiết lời chúc (modal popup)
- 📥 Xuất dữ liệu CSV
- 🗑️ Xóa tất cả dữ liệu

---

## 🐛 Xử Lý Sự Cố

### Vấn đề: Form không gửi được
**Giải pháp:**
- Refresh trang browser
- Kiểm tra kết nối internet
- Mở DevTools (F12) xem có lỗi không

### Vấn đề: Ảnh không hiển thị
**Giải pháp:**
- Kiểm tra đường dẫn ảnh có đúng không
- Đảm bảo file ảnh có trong thư mục `assets/`
- Đặt tên file: `oanh-photo.jpg`

### Vấn đề: Admin page không thấy dữ liệu
**Giải pháp:**
- Bạn phải mở `admin.html` **trên cùng máy tính** (cùng browser, cùng domain)
- Hoặc dữ liệu chưa có (chưa ai xác nhận)
- Thử xuất CSV từ admin page để sao lưu

### Vấn đề: Bộ đếm ngược không đúng
**Giải pháp:**
- Kiểm tra múi giờ: Đảm bảo `eventDate` đúng format
- Ví dụ đúng: `"2026-10-03T08:00:00+07:00"` (giờ Việt Nam +7:00)

---

## 💡 Mẹo & Thủ Thuật

1. **Tùy chỉnh màu sắc:**
   - Mở `style.css`
   - Tìm `:root { --pink: #e89ab8; ... }`
   - Đổi mã màu hex thành màu yêu thích

2. **Thay đổi emoji/biểu tượng:**
   - Tìm các emoji (🎓, 💌, ✨, etc.) trong HTML & JS
   - Thay thế bằng emoji khác

3. **Thêm phần thông tin sự kiện:**
   - Thêm thẻ `<div class="event-item">` mới vào HTML
   - Tuân theo cấu trúc có sẵn

4. **Upload lên web:**
   - Vercel: `vercel --prod`
   - Netlify: Kéo thả thư mục
   - cPanel: Upload FTP
   - GitHub Pages: Push code lên repo

---

## 📞 Liên Hệ & Support

Nếu có vấn đề:
- Kiểm tra các tệp CSS/JS có lỗi syntax không (F12)
- Đảm bảo tất cả đường dẫn file đúng
- Thử trên browser khác (Chrome, Firefox, Safari)

---

## 🎉 Chúc Mừng!

Thiệp mời của bạn đã sẵn sàng! Gửi link cho khách mời và theo dõi xác nhận trên trang Admin.

**Hãy tận hưởng ngày lễ tốt nghiệp đặc biệt! 🎓✨**
