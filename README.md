# Nguyễn Quỳnh Anh — Personal Portfolio

Portfolio cá nhân giới thiệu quá trình học tập, nghiên cứu, thành tích và hoạt động cộng đồng của Nguyễn Quỳnh Anh tại Trường Đại học Ngoại thương. Dự án là website tĩnh dùng HTML, CSS và JavaScript thuần; không cần cài đặt thư viện hay chạy bước build.

## Cấu trúc dự án

```text
.
├── index.html                     # Trang portfolio chính (điểm vào của website)
├── pages/
│   └── cv.html                    # Hồ sơ tóm tắt, có thể in hoặc lưu PDF
├── assets/
│   ├── css/
│   │   ├── main.css               # Giao diện portfolio
│   │   └── cv.css                 # Giao diện và bản in hồ sơ
│   ├── js/
│   │   └── main.js                # Menu di động và hiệu ứng cuộn
│   ├── icons/
│   │   └── favicon.svg
│   └── images/                    # Ảnh chân dung, hoạt động và chứng nhận
├── .gitignore
└── README.md
```

## Chạy trên máy

Mở `index.html` trực tiếp bằng trình duyệt, hoặc chạy một máy chủ tĩnh từ thư mục dự án:

```bash
python -m http.server 8000
```

Sau đó truy cập `http://localhost:8000/`. Từ portfolio, chọn **My Profile** để mở hồ sơ; nút **Print / Save as PDF** dùng chức năng in của trình duyệt.

## Hiệu ứng và tương tác

Trang có phần tên mở theo từng dòng, từ khóa luân phiên ở đầu trang, dải chữ chạy, số liệu tăng dần, ảnh và thông tin mở dần khi cuộn, hiệu ứng thị sai nhẹ ở ảnh hoạt động, ánh sáng theo con trỏ trên thẻ nghiên cứu, nút phản hồi theo con trỏ, hộp xem lớn chứng nhận và nút trở về đầu trang. Các tương tác được viết bằng JavaScript thuần; trang vẫn hiển thị nội dung khi tắt JavaScript. Hiệu ứng tự giảm theo thiết lập **Reduce motion** của hệ điều hành.

## Chỉnh sửa

| Nội dung | Tệp |
| --- | --- |
| Giới thiệu, thành tích, hoạt động, liên hệ | `index.html` |
| Hồ sơ tóm tắt | `pages/cv.html` |
| Màu sắc, bố cục portfolio | `assets/css/main.css` |
| Bố cục và bản in hồ sơ | `assets/css/cv.css` |
| Menu và hiệu ứng | `assets/js/main.js` |
| Ảnh | `assets/images/` |

Khi cập nhật CSS hoặc JavaScript trên GitHub Pages, đổi giá trị `?v=` trong các đường dẫn ở `index.html` để trình duyệt tải phiên bản mới thay vì dùng bản lưu trong cache.

## Xuất bản bằng GitHub Pages

Repository dùng nhánh `main` với một commit khởi đầu mới, độc lập với lịch sử của repository cũ. Tạo một repository trống tên `QuynhAnh_Portfolio` trên tài khoản GitHub muốn sử dụng; không chọn tạo sẵn README, `.gitignore` hoặc license. Kiểm tra URL của `origin` trước khi đẩy:

```bash
git remote -v
```

Nếu URL chưa đúng, thay `NEW_USERNAME` bằng username mới:

```bash
git remote set-url origin https://github.com/NEW_USERNAME/QuynhAnh_Portfolio.git
```

Đẩy nhánh mới lên repository trống:

```bash
git push -u origin main
```

Trên repository mới, vào **Settings → Pages**, chọn **Deploy from a branch**, nhánh `main`, thư mục `/(root)`, rồi **Save**. Sau khi tác vụ **pages build and deployment** hoàn tất trong tab **Actions**, địa chỉ website sẽ là `https://NEW_USERNAME.github.io/QuynhAnh_Portfolio/`. `index.html` nằm ở thư mục gốc; các đường dẫn tương đối hiện tại dùng được cho GitHub Pages.

Nếu Git vẫn đăng nhập bằng tài khoản cũ, hãy xóa thông tin `git:https://github.com` trong **Windows Credential Manager → Windows Credentials** rồi chạy lại `git push`; Git sẽ yêu cầu đăng nhập tài khoản mới. Để commit hiển thị dưới tài khoản mới, đặt `user.email` của riêng repository thành email đã xác minh hoặc địa chỉ `noreply` của tài khoản đó.

Tài liệu chính thức: [Changing a remote URL](https://docs.github.com/en/get-started/git-basics/managing-remote-repositories) · [Managing multiple accounts](https://docs.github.com/en/account-and-profile/how-tos/account-management/managing-multiple-accounts) · [Publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Trang dùng Google Fonts khi có kết nối mạng; nếu không tải được font, trình duyệt sẽ dùng font dự phòng được khai báo trong CSS.

Ảnh cá nhân và chứng nhận trong `assets/images/` do chủ portfolio cung cấp. Thiết kế và mã nguồn của trang được xây dựng riêng; không sao chép tệp từ các website tham khảo.
