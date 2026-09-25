# Website khảo sát bất ngờ Trung thu

## Mở trong VS Code

1. Giải nén file ZIP, rồi trong VS Code chọn **File → Open Folder** và chọn thư mục `trung-thu-khao-sat`.
2. Mở `index.html` bằng trình duyệt. Có thể cài tiện ích **Live Server**, nhấn chuột phải vào `index.html` → **Open with Live Server**.
3. Trên điện thoại, để thử qua mạng nội bộ, chạy Live Server trong VS Code và truy cập địa chỉ IP máy tính cùng cổng Live Server khi điện thoại và máy tính dùng chung Wi-Fi. Để gửi người khác qua Internet, cần đưa thư mục lên dịch vụ lưu trữ website tĩnh.

## Gắn nhạc

Đặt bản nhạc MP3 bạn có quyền sử dụng vào đúng đường dẫn:

`assets/music/trung-thu.mp3`

Giữ nguyên tên tệp (chữ thường, có dấu gạch nối). Nếu muốn dùng tên khác, sửa thuộc tính `src` của thẻ `<audio>` trong `index.html`. Nhạc bắt đầu sau khi nhấn **Tiếp**; một số trình duyệt có thể chặn phát tự động, khi đó người xem nhấn nút **Bật nhạc**. Thư mục nhạc đang trống để bạn thêm bản nhạc của mình.

## Chỉnh sửa nội dung

- Câu hỏi và 7 lựa chọn của từng câu: đầu file `script.js`, đối tượng `questions`.
- Nội dung thư: thẻ `<article id="letter">` trong `index.html`.
- Màu sắc, kích thước, hiệu ứng: `style.css`.

## Gửi câu trả lời tới Gmail

1. Đăng nhập Google bằng tài khoản bạn muốn dùng để cấp quyền gửi thư. Vào [script.google.com](https://script.google.com), tạo **Dự án mới**.
2. Xóa mã mẫu trong `Code.gs`, dán toàn bộ nội dung tệp `google-apps-script/Code.gs` trong gói này, rồi lưu.
3. Chọn **Deploy → New deployment → Web app**. Đặt **Execute as: Me** và **Who has access: Anyone** để người nhận không phải đăng nhập Google. Nhấn Deploy, cấp quyền gửi email theo hướng dẫn của Google. Nếu Google cảnh báo ứng dụng chưa xác minh, chỉ tiếp tục nếu đây đúng là dự án do bạn vừa tạo.
4. Sao chép **Web app URL** kết thúc bằng `/exec`. Mở `script.js`, thay chuỗi `DAN_URL_WEB_APP_VAO_DAY` bằng URL đó, giữ nguyên dấu nháy đơn. Lưu tệp.
5. Tự điền một câu trả lời thử và kiểm tra hộp thư `lehuuduc0704@gmail.com` (cả mục Spam). Chỉ chia sẻ website sau khi thử thành công.

Kết quả gồm tên và bốn lựa chọn được gửi đến Gmail nêu trên. Nội dung không được lưu vào cơ sở dữ liệu của website. Nếu bạn sửa mã Apps Script sau khi triển khai, cần tạo phiên bản triển khai mới trong phần **Manage deployments**. Việc gửi bằng biểu mẫu nền không đọc được phản hồi của Google từ trình duyệt, vì vậy trang Trung thu có thể mở dù email bị lỗi; hãy kiểm tra bằng lần gửi thử trước khi chia sẻ.

