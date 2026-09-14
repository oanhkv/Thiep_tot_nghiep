# 🎓 Thiệp Mời Lễ Tốt Nghiệp - Tương Tác Với Theo Dõi Xác Nhận

Một website thiệp mời lễ tốt nghiệp hiện đại, mềm mại với tone hồng và tính năng quản lý xác nhận khách mời.

## ✨ Đặc Điểm Chính

- 🌸 **Giao diện mềm mại** - Tone hồng gradien, shadow mềm, border-radius lớn
- 💝 **Hiệu ứng đẹp** - Cánh hoa rơi, pháo giấy, scroll reveal animation
- 📱 **Responsive** - Tối ưu cho desktop, tablet, mobile
- 💾 **Lưu dữ liệu** - Xác nhận được lưu tự động trên browser
- 📊 **Trang Admin** - Xem thống kê, danh sách khách, xuất dữ liệu
- 🔍 **Tìm kiếm & Lọc** - Dễ quản lý danh sách xác nhận
- 📥 **Xuất Excel** - Tải dữ liệu ra CSV/Excel

## 📁 Cấu Trúc

```
├── index.html          ← Trang thiệp mời chính
├── admin.html          ← Trang quản lý xác nhận
├── style.css           ← Stylesheet (tone hồng mệm mại)
├── script.js           ← JavaScript chính
├── README.md           ← File này
├── HUONG-DAN.md        ← Hướng dẫn chi tiết
└── assets/
    └── oanh-photo.jpg  ← Ảnh tốt nghiệp
```

## 🚀 Bắt Đầu Nhanh

1. **Chỉnh sửa thông tin sự kiện** (`script.js`):
   ```javascript
   const CONFIG = {
     graduateName: "VŨ KIỀU OANH",
     eventDate: "2026-10-03T08:00:00+07:00",
     venue: "Hội trường tốt nghiệp",
     address: "Số 2, Hoàng Văn Thụ...",
     photo: "assets/oanh-photo.jpg"
   };
   ```

2. **Thêm ảnh tốt nghiệp**: Đặt file ảnh vào `assets/oanh-photo.jpg`

3. **Mở thiệp**: `index.html` - Gửi link này cho khách mời

4. **Xem kết quả**: `admin.html` - Xem danh sách & thống kê xác nhận

## 📊 Tính Năng Admin

| Tính Năng | Mô Tả |
|-----------|-------|
| 📈 Thống kê | Số người đi, không đi, chưa chắc |
| 📋 Danh sách | Toàn bộ xác nhận với lời chúc |
| 🔍 Tìm kiếm | Lọc theo tên khách mời |
| 👁️ Xem chi tiết | Modal hiển thị lời chúc đầy đủ |
| 📥 Xuất Excel | Tải dữ liệu dưới dạng CSV |
| 🗑️ Xóa dữ liệu | Reset tất cả xác nhận |

## 🎨 Màu Sắc

- **Hồng chính:** #e89ab8
- **Hồng đậm:** #c75a7e  
- **Hồng nhạt:** #f5d9e6
- **Nền:** Gradient hồng mềm

## 💾 Lưu Trữ Dữ Liệu

- ✅ **LocalStorage** - Lưu trên browser của khách mời
- ✅ **Admin Page** - Xem dữ liệu từ cùng máy tính
- ✅ **Xuất CSV** - Sao lưu bất cứ lúc nào
- 🔄 **Google Sheets** (tuỳ chọn) - Gửi tự động nếu cấu hình URL

## 📲 Deploy

**Netlify / Vercel:**
1. Kéo thả thư mục lên Netlify/Vercel
2. Nhận link công khai ngay lập tức

**GitHub Pages:**
```bash
git push origin main
```

**cPanel / VPS:**
- Upload tất cả file bằng FTP
- Truy cập qua domain của bạn

## ⚙️ Cấu Hình Google Sheets (Tuỳ Chọn)

Xem chi tiết trong file `HUONG-DAN.md`

## 🎯 Ghi Chú

- Dữ liệu xác nhận **mặc định lưu trên browser** khách mời
- Để xem dữ liệu, mở `admin.html` **trên cùng máy tính**
- Khuyến khích xuất CSV hàng ngày để sao lưu
- Có thể kết nối Google Sheets để tự động gửi dữ liệu

## 📚 Hướng Dẫn Chi Tiết

Xem file `HUONG-DAN.md` để:
- Chỉnh sửa tất cả thông tin
- Thay đổi màu sắc & emoji
- Upload lên web
- Xử lý sự cố
- Các mẹo & thủ thuật

---

**Chúc mừng ngày lễ tốt nghiệp! 🎓✨**
