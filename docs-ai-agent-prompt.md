# 🤖 Hướng dẫn Giao việc cho ChatGPT / Claude / AI Agent (Đọc CV, Tạo Logo, Bổ sung Ảnh & Deploy Vercel)

Tài liệu này chứa **System Prompt chuẩn hóa** và quy trình từng bước để bạn gửi trực tiếp cho **ChatGPT, Claude (Claude Code / Claude Desktop với MCP), Cursor, hoặc Antigravity**.

AI sẽ tự động:
1. **Yêu cầu bạn tải lên (upload) file CV** để trích xuất và thay thế 100% thông tin hiện tại.
2. **Nhận file Logo mới bạn tải lên hoặc tự động Generate một Logo SVG mới** theo tên viết tắt của bạn.
3. **Kiểm tra các mục còn thiếu hình ảnh** (như **Giải thưởng / Chứng chỉ**, **Ảnh dự án**, **Avatar**) và hướng dẫn bạn tải ảnh bổ sung hoặc tự động tạo đồ họa thay thế.
4. **Kiểm tra bản build (`npm run build`) và tự động deploy thẳng lên Vercel qua Plugin / MCP / CLI**.

> ⚠️ **Lưu ý Bản quyền**: Dự án chỉ được phép sử dụng cho **mục đích cá nhân phi thương mại** (làm Portfolio cá nhân, CV xin việc). Nghiêm cấm sử dụng cho mục đích thương mại hoặc bán lại.

---

## 1. Cách sử dụng nhanh (Copy & Paste cho ChatGPT / Claude)

### Bước chuẩn bị trước khi gửi Prompt
Đính kèm (Upload) vào khung chat của **ChatGPT / Claude / Cursor / Antigravity**:
1. 📄 **File CV / Resume của bạn** (định dạng PDF, DOCX, Ảnh chụp hoặc Text) — **Bắt buộc**.
2. 🖼️ *(Tùy chọn)* **Logo cá nhân** và **các ảnh chụp Giải thưởng / Chứng chỉ / Dự án** (nếu chưa đính kèm ngay, AI sẽ chủ động hỏi bạn ở Bước 1 hoặc tự generate cho bạn).
3. 📘 Đính kèm 3 file hướng dẫn của dự án: `README.md`, `docs-customization-schema.md`, `docs-vercel-deploy.md`.

### Prompt mẫu Copy-Paste gửi cho AI

```markdown
Bạn là một Senior Full-Stack, Creative UI & DevOps AI Agent. Nhiệm vụ của bạn là cá nhân hóa toàn bộ dự án `dev-portfolio` (chỉ sử dụng cho mục đích cá nhân phi thương mại) dựa trên CV của tôi, xử lý logo & hình ảnh minh họa, sau đó kiểm tra bản build và triển khai (deploy) trực tiếp lên Vercel.

Hãy thực hiện chính xác theo trình tự 5 bước sau:

### Bước 1: Yêu cầu tải lên CV & Kiểm tra hình ảnh bổ sung (Logo, Giải thưởng, Dự án)
1. **Kiểm tra CV**:
   - Nếu tôi chưa đính kèm/tải lên file CV trong cuộc trò chuyện này, hãy **dừng lại và yêu cầu tôi tải lên file CV (PDF/DOCX/Ảnh/Text)** trước khi làm tiếp.
   - Khi đã có CV, hãy phân tích toàn bộ thông tin: Họ tên, chức danh, giới thiệu bản thân, kỹ năng, danh sách dự án, lịch sử làm việc, học vấn, giải thưởng/chứng chỉ, số liệu thành tích và liên hệ.
   - Nếu tôi tải lên file CV định dạng `.pdf`, hãy copy file đó vào `public/cv.pdf` và cập nhật `meta.cvUrl: "/cv.pdf"` (cùng link CV trong `contact.socials`) để nút tải CV trên web hoạt động ngay.
2. **Kiểm tra & bổ sung Hình ảnh còn thiếu (Đặc biệt là Giải thưởng & Logo)**:
   - Sau khi đọc CV, hãy đối chiếu xem các phần sau đã có hình ảnh chưa và **hỏi tôi xem có muốn tải thêm ảnh lên không**:
     - **Phần Giải thưởng & Chứng chỉ (`credentials.certificates`)**: Nếu trong CV có liệt kê giải thưởng/chứng chỉ nhưng tôi chưa gửi ảnh chụp bằng khen/giải thưởng, hãy hỏi tôi có muốn upload ảnh giải thưởng không.
       - Nếu tôi tải ảnh lên: hãy lưu vào `public/images/certificates/` và điền đường dẫn (ví dụ `"/images/certificates/award-1.jpg"`) vào trường `"image"` của giải thưởng tương ứng.
       - Nếu tôi không có ảnh: hãy để `"image": ""` và điền đầy đủ `badge`, `serial`, `accent` để hệ thống tự động dựng tấm bằng khen 3D Vector (`CertificatePlate`).
     - **Phần Dự án (`projects.items`) & Kinh nghiệm (`experience.items`)**: Nếu tôi gửi kèm ảnh hoặc logo dự án/công ty, hãy lưu vào `public/images/projects/` và gán vào trường `"image"` của dự án đó. Nếu không có ảnh riêng, hãy để trống `"image"` và chọn mã `posterKind` phù hợp nhất trong 11 mẫu đồ họa Cyber-AI SVG dựng sẵn.

### Bước 2: Upload Logo mới hoặc Tự động Generate Logo SVG cho dự án
- Kiểm tra xem tôi có tải lên file Logo mới cho dự án không:
  - **Trường hợp 1 (Tôi có tải lên file logo `.svg`, `.png`, `.webp`)**: Hãy lưu file vào thư mục `public/` (ví dụ `public/logo-custom.svg` hoặc `.png`), sau đó cập nhật `meta.logoSrc` trong `src/locales/vi.json`, `src/locales/en.json` và thẻ `<link rel="icon">` trong `index.html`.
  - **Trường hợp 2 (Tôi chưa có logo hoặc yêu cầu AI tự gen logo)**: Hãy **tự động thiết kế (generate) một file Logo SVG Monogram mới** mang phong cách **Liquid Glass / Cyber-AI Gradient** (kết hợp sắc tím `#8B5CF6`, xanh cyan `#00F0FF`, viền kính phát sáng trên nền squircle `120x120`) sử dụng **2 hoặc 3 chữ cái viết tắt tên của tôi** (ví dụ tên "Nguyễn Văn An" -> monogram `"NA"` hoặc `"NVA"`), rồi ghi vào `public/logo-cf.svg` và cập nhật `meta.brandName`, `meta.shortMark`, `about.verticalMark` tương ứng.

### Bước 3: Thay thế toàn bộ thông tin trong `vi.json`, `en.json` & `index.html`
- Thay thế 100% thông tin mẫu hiện tại trong `src/locales/vi.json` (Tiếng Việt) và `src/locales/en.json` (Tiếng Anh) bằng thông tin từ CV của tôi theo đúng cấu trúc trong `docs-customization-schema.md`.
- Giữ nguyên đầy đủ các key bắt buộc (`theme`, `meta`, `navbar`, `hero`, `about`, `projects`, `statement`, `experience`, `toolkit`, `proof`, `credentials`, `services`, `contact`).
- Trong mục `statement.words`, giữ cấu trúc 5 từ (`build`, `design`, `code`, `with`, `ship`) sao cho từ khóa thứ 5 (`ship`, mặc định là `"AI"`) là từ nhấn mạnh nhất để nhận hiệu ứng hào quang phóng sáng (`.kinetic-ai-aura`).
- Cập nhật thẻ `<title>` và `<meta name="description">` trong `index.html` theo họ tên và chức danh của tôi.

### Bước 4: Kiểm tra Build Production
- Chạy lệnh kiểm tra build:
  ```bash
  npm install && npm run build
  ```
- Đảm bảo lệnh build hoàn tất với exit code `0`, thư mục `dist/` được sinh ra đầy đủ và không có lỗi cú pháp JSON.

### Bước 5: Deploy lên Vercel qua Plugin / MCP hoặc Vercel CLI
- Nếu bạn có **Vercel Plugin / Vercel MCP Server**: hãy gọi tool deploy trực tiếp với thư mục `dev-portfolio` (`framework: "vite"`, `buildCommand: "npm run build"`, `outputDirectory: "dist"`).
- Nếu bạn chạy qua **Terminal / CLI**: thực thi lệnh:
  ```bash
  npx vercel deploy --prod --yes
  ```
- Cuối cùng, trả về đường dẫn URL Production trên Vercel cùng bảng tóm tắt các thông tin, logo và hình ảnh giải thưởng/dự án đã cập nhật.
```

---

## 2. Prompt Tạo Video 3D Hero bằng Google Flow (Omni 1.2 Flash / Veo)

Nếu bạn muốn thay đổi cả video nhân vật 3D ở đầu trang (`public/videos/engineer-hero.mp4`), bạn có thể mở **Google Flow (Labs.google)**, chọn chế độ **Video -> Khung hình (Frames) -> 16:9 -> 720p/1080p -> 8 giây (Omni 1.2 Flash)** và dùng các Prompt sau:

### 2.1. Prompt Tạo Ảnh Khung Đầu (First Frame — Tỷ lệ 16:9)
> **Prompt**:
> `16:9 widescreen high-end 3D stylized CGI render (Pixar/Arcane aesthetic). A handsome young male AI Engineer standing on the right third of the frame (around 72% horizontal), leaving clean dark negative space on the left side for website typography. He is in a futuristic dark high-tech AI lab room with glowing cyan and violet neon architectural lines and blurred code monitors in the background. He wears a sleek black hoodie, silver over-ear headphones resting around his neck, a silver bracelet on his right wrist, a rectangular Apple Watch on his left wrist, and tucks a Space Black MacBook Pro under his left arm while holding a Titanium iPhone 17 Pro in his right hand. Sitting on his shoulder is a cute miniature white winged baby cloud-fox companion with glowing cyan eyes. Cinematic rim lighting, 8k octane render.`

### 2.2. Prompt Chuyển Động Video 8 Giây (Google Flow Video Prompt)
> **Prompt**:
> `[0-3s] Continuous single-shot 3D animation. The young AI engineer on the right smoothly swipes his right index finger across the Titanium iPhone 17 Pro screen, casting a soft cyan holographic glow. [3-5s] The cute miniature white winged baby fox on his shoulder flutters its glowing wings and flies in a playful magic sparkle arc around his head as the camera smoothly pans and zooms in, bringing the engineer's face and upper shoulders into the center of the frame. [5-8s] The engineer looks straight into the camera lens, tilts his head slightly with a cool confident smile, and gives a single crisp wink while the baby fox perches on his shoulder and winks along. Smooth 60fps motion, shallow depth of field, no scene cuts, no text overlays.`

Sau khi tải video `.mp4` về, hãy lưu đè vào đường dẫn:
```text
public/videos/engineer-hero.mp4
```

---

## 3. Lưu ý Kỹ thuật dành riêng cho AI Agent (Guardrails)

Khi ChatGPT, Claude hoặc các Agent tự động chỉnh sửa dự án này, Agent cần tuân thủ các nguyên tắc sau:
1. **Bản quyền Phi thương mại**: Chỉ hỗ trợ người dùng cá nhân hóa làm Portfolio cá nhân; không chèn mã quảng cáo thương mại hoặc đóng gói bán lại.
2. **Không xóa `public/wasm/star_network_engine.wasm`**: Đây là module WebAssembly SIMD128 đã được biên dịch sẵn cho nền sao 3D. Không cần cài Rust trên máy chủ Vercel khi build trừ khi muốn sửa đổi công thức vật lý trong `rust-star-engine/src/lib.rs`.
3. **Giữ nguyên các thuộc tính `data-*` và `id` trên các `<section>`**:
   - Các hook GSAP `ScrollTrigger` và bộ đồng bộ URL Fragment (`#top`, `#about`, `#projects`, `#statement`, `#experience`, `#skills`, `#proof`, `#certificates`, `#services`, `#contact`) dựa vào các `id` và `data-*` attribute này để hoạt động chính xác khi cuộn và khi F5 tải lại trang.
4. **Đảm bảo tính hợp lệ của JSON**:
   - Mọi chỉnh sửa trong `src/locales/vi.json` và `src/locales/en.json` phải là JSON chuẩn (không có dấu phẩy thừa ở phần tử cuối cùng, đóng mở ngoặc kép đầy đủ).
