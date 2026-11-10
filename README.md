# Interactive 3D AI & Developer Portfolio Template

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg)](./LICENSE)

Một template Portfolio 3D tương tác hiệu năng cao dành cho **AI Engineer, Software Engineer, Backend Architect & Creative Developer**. Toàn bộ nội dung (Tiếng Việt & Tiếng Anh), chủ đề màu sắc WebGL, logo thương hiệu, danh sách dự án, kinh nghiệm và giải thưởng/chứng chỉ đều được điều khiển qua **2 file JSON** (`src/locales/vi.json` & `src/locales/en.json`), giúp bạn chỉ cần **tải CV lên cho ChatGPT, Claude, Cursor hoặc Antigravity** để AI tự động thay thế thông tin, tạo logo, bổ sung hình ảnh, build và deploy thẳng lên **Vercel** qua Plugin / CLI.

---

## ✨ Tính năng nổi bật

- **100% JSON-Driven (Đa ngôn ngữ VI / EN)**: Không cần sửa code React khi thay đổi thông tin cá nhân — chỉ cần cập nhật `src/locales/vi.json` và `src/locales/en.json`.
- **Tự động hóa hoàn toàn với AI Agent (Hỗ trợ cả người dùng Non-Tech)**: Chỉ cần tải CV lên, AI sẽ chủ động hỏi bạn là **Nam hay Nữ** để đổi đúng nhân vật 3D (`engineer-hero.mp4` hoặc `engineer-female.mp4`), tự động tạo (generate) Logo SVG theo tên viết tắt của bạn, nhắc bổ sung ảnh giải thưởng / dự án nếu thiếu, và **mặc định tự động chạy deploy lên Vercel** để trả về link web hoàn chỉnh.
- **Sân khấu Hero 3D + Three.js AGI Telemetry Core**: Hỗ trợ video 3D `16:9` (`60fps`), ảnh tĩnh hoặc mô hình `.glb`/`.gltf`, kết hợp vòng xoay hào quang Three.js tự động bám theo chuyển động nhân vật theo thời gian thực.
- **Rust + WebAssembly (SIMD128) 3D Star Network**: Hệ thống 1,800 hạt sao & mạng lưới chòm sao 3D ở các section bên dưới được tính toán vật lý bằng **Rust biên dịch sang WebAssembly** (`public/wasm/star_network_engine.wasm`), truyền bộ đệm zero-copy trực tiếp sang GPU.
- **10 Section Scrollytelling mượt mà (GSAP ScrollTrigger + Lenis)**:
  1. `#top` — **Hero Stage**: Video 3D + Three.js AGI Core + hiệu ứng chữ Speed Rush.
  2. `#about` — **About / Intro**: Giới thiệu bản thân với hiệu ứng sáng chữ theo nhịp cuộn.
  3. `#projects` — **Selected Work (3D Card Fan)**: Bộ bài dự án 3D xòe quạt (hỗ trợ gắn ảnh/logo dự án riêng hoặc 11 mẫu đồ họa vector Cyber-AI dựng sẵn).
  4. `#statement` — **Kinetic Typography**: Chuỗi 5 từ khóa 3D (`BUILD · SCALABLE · SYSTEMS · WITH · AI`) với hiệu ứng hào quang phóng sáng ở chữ `AI`.
  5. `#experience` — **Experience Archive**: Hành trình kinh nghiệm xếp chồng 3D.
  6. `#skills` — **Tech Stack**: Các nhóm kỹ năng kèm sơ đồ kiến trúc SVG tương tác.
  7. `#proof` — **Impact Metrics**: Bộ đếm số liệu & biểu đồ cột tăng trưởng theo cuộn trang.
  8. `#certificates` — **3D Credentials World**: Không gian 3D trưng bày bằng cấp, giải thưởng & chứng chỉ (hỗ trợ hiển thị ảnh chụp giải thưởng/bằng khen thật hoặc tự động dựng khung bằng khen Vector 3D).
  9. `#services` — **Engineering Services**: Các hạng mục dịch vụ & giải pháp kỹ thuật.
  10. `#contact` — **Contact Portal**: Cổng liên hệ 3D, email và liên kết mạng xã hội.
- **URL Fragment Sync (`#section`)**: Tự động cập nhật `#hash` trên thanh địa chỉ khi cuộn và tự động khôi phục đúng vị trí khi tải lại trang (F5 / Reload).

---

## 🚀 Khởi chạy nhanh (Quick Start)

### Yêu cầu hệ thống
- **Node.js**: `>= 20.x` (khuyên dùng LTS)
- **npm**: `>= 10.x`
- *(Tùy chọn)* **Rust & Cargo** (`wasm32-unknown-unknown`) nếu muốn biên dịch lại nhân vật lý `rust-star-engine` (file `.wasm` đã được biên dịch sẵn trong `public/wasm/star_network_engine.wasm`).

### Cài đặt & chạy Local

```bash
# 1. Di chuyển vào thư mục dự án
cd dev-portfolio

# 2. Cài đặt dependencies
npm install

# 3. Chạy môi trường phát triển (http://localhost:5173)
npm run dev

# 4. Build bản Production (xuất ra thư mục dist/)
npm run build

# 5. Xem thử bản Production tại máy local
npm run preview
```

---

## 🤖 Hướng dẫn dùng ChatGPT / Claude để Tự động Cá nhân hóa từ CV & Deploy Vercel

### Bước 0 (Dành cho cả người dùng Non-Tech): Kết nối Plugin Vercel
Trước khi gửi CV cho AI, bạn chỉ cần thực hiện 1 thao tác:
1. Mở **ChatGPT** hoặc **Claude** (hoặc Cursor / Antigravity).
2. Vào mục **Plugins** (hoặc **Connectors / Integrations**).
3. Gõ tìm kiếm **`Vercel`** ➡️ Bấm **Kết nối (Connect / Sign in with Vercel)**.

Sau đó, bạn chỉ cần **tải lên (upload) file CV của bạn** kèm theo các file hướng dẫn dưới đây cho **ChatGPT hoặc Claude**:

| File tài liệu | Mục đích sử dụng |
| :--- | :--- |
| 📄 **[`docs-ai-agent-prompt.md`](./docs-ai-agent-prompt.md)** | **Prompt mẫu Copy-Paste cho ChatGPT / Claude**: Hướng dẫn AI yêu cầu bạn tải CV lên, hỏi xác nhận giới tính (Nam/Nữ) để đổi nhân vật 3D, tạo/thay logo dự án, bổ sung ảnh giải thưởng còn thiếu, và **mặc định tự động deploy lên Vercel** (cho cả người dùng Non-Tech). |
| 📄 **[`docs-customization-schema.md`](./docs-customization-schema.md)** | **Đặc tả cấu trúc dữ liệu JSON, Logo & Hình ảnh**: Giải thích chi tiết từng trường trong `src/locales/vi.json`, `src/locales/en.json`, cách đổi/gen logo thương hiệu, gắn ảnh giải thưởng (`credentials.certificates[].image`), ảnh/logo dự án (`projects.items[].image`) và 11 loại thẻ Cyber-AI Poster. |
| 📄 **[`docs-vercel-deploy.md`](./docs-vercel-deploy.md)** | **Hướng dẫn Build & Deploy lên Vercel**: Quy trình deploy tự động qua Vercel Plugin / MCP Server, Vercel CLI (`npx vercel --prod`), hoặc GitHub CI/CD. |

---

## 📁 Cấu trúc thư mục chính

```text
dev-portfolio/
├── public/
│   ├── images/                  # Chứa ảnh giải thưởng (certificates/), ảnh/logo dự án (projects/), avatar
│   ├── videos/
│   │   ├── engineer-hero.mp4    # Video 3D Hero Nam Developer (1920x1080, 60fps, H.264)
│   │   └── engineer-female.mp4  # Video 3D Hero Nữ Developer (1920x1080, 60fps, H.264)
│   ├── wasm/
│   │   └── star_network_engine.wasm # Nhân vật lý Rust + WebAssembly SIMD128 đã biên dịch sẵn
│   └── logo-cf.svg              # Logo thương hiệu trên thanh điều hướng & Favicon (có thể upload mới hoặc nhờ AI tự gen SVG)
├── rust-star-engine/            # Mã nguồn Rust cho hệ thống hạt 3D Star Network
│   ├── Cargo.toml
│   └── src/lib.rs
├── src/
│   ├── common/
│   │   ├── components/          # SiteNav, PosterArt (Hỗ trợ ảnh/logo riêng hoặc 11 mẫu SVG AI), SplitText, Eyebrow
│   │   ├── morph/               # Đồng bộ giao diện thanh điều hướng theo section
│   │   ├── motion/              # Cấu hình GSAP + ScrollTrigger
│   │   ├── scroll/              # Điều khiển cuộn mượt Lenis & URL fragment
│   │   ├── theme/               # 3 bộ chủ đề màu WebGL (Cyber AGI, Quantum AI, Solar)
│   │   └── webgl/               # Three.js AGI Core & Rust/Wasm Star Network Canvas
│   ├── context/
│   │   └── LanguageContext.jsx  # Quản lý đa ngôn ngữ VI / EN
│   ├── locales/
│   │   ├── vi.json              # Dữ liệu nội dung Tiếng Việt (Chỉnh sửa tại đây)
│   │   └── en.json              # Dữ liệu nội dung Tiếng Anh (Chỉnh sửa tại đây)
│   ├── sections/                # 10 Section thành phần của Portfolio
│   ├── styles/                  # CSS Base, Cyber-AI Theme & Certificate Plates
│   ├── App.jsx
│   └── main.jsx
├── index.html                   # Meta SEO, Tiêu đề trang, Favicon & Google Fonts
├── vercel.json                  # Cấu hình chuẩn hóa cho Vercel (WASM headers, Cache, SPA)
├── LICENSE                      # Giấy phép Sử dụng Cá nhân & Phi thương mại (Personal & Non-Commercial)
├── vite.config.js
└── package.json
```

---

## ⚠️ Giấy phép sử dụng ([`LICENSE`](./LICENSE) — `CC-BY-NC-4.0`)

Dự án sử dụng giấy phép chuẩn GitHub / SPDX **[Creative Commons Attribution-NonCommercial 4.0 International (`CC-BY-NC-4.0`)](./LICENSE)** — **Chỉ cho phép sử dụng Cá nhân & Phi thương mại**:

- ✅ **ĐƯỢC PHÉP (Permitted — Personal & Non-Commercial)**:
  - Cá nhân tải về, tùy biến thông tin từ CV, hình ảnh giải thưởng/dự án, logo cá nhân để làm **Portfolio cá nhân, CV/Resume trực tuyến, giới thiệu bản thân khi ứng tuyển** hoặc phục vụ mục đích học tập, nghiên cứu.
- ❌ **KHÔNG ĐƯỢC PHÉP (Forbidden — Commercial Use)**:
  - **Nghiêm cấm sử dụng cho mục đích thương mại (`NonCommercial`)** dưới mọi hình thức.
  - Không được bán lại mã nguồn/template, đóng gói vào các sản phẩm/dịch vụ thiết kế web có thu phí, hoặc phân phối lại làm sản phẩm thương mại cho tổ chức/agency khi chưa có sự đồng ý bằng văn bản của tác giả.
  - Phải giữ nguyên tệp [`LICENSE`](./LICENSE) và thông tin ghi nhận tác giả (`Attribution`) trong mọi bản sao của dự án.
