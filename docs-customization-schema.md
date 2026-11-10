# 📐 Đặc tả Cấu trúc Dữ liệu JSON, Logo & Hình ảnh (`docs-customization-schema.md`)

Toàn bộ nội dung của Portfolio được quản lý tập trung tại 2 file ngôn ngữ:
- Tiếng Việt: `src/locales/vi.json`
- Tiếng Anh: `src/locales/en.json`

Tài liệu này mô tả chi tiết từng khối dữ liệu, cách **thay thế thông tin từ CV**, **upload hoặc tự động generate Logo dự án**, và **bổ sung hình ảnh cho phần Giải thưởng / Dự án** để lập trình viên hoặc AI Agent (**ChatGPT / Claude / Cursor / Antigravity**) ánh xạ chính xác mà không cần sửa sâu vào mã nguồn React.

> ⚠️ **Giấy phép ([`LICENSE`](./LICENSE))**: Dự án chỉ được phép sử dụng cho **mục đích cá nhân phi thương mại**.

---

## 1. Chủ đề màu sắc WebGL (`theme`)

```json
"theme": {
  "defaultPreset": "quantum"
}
```
Các giá trị `defaultPreset` được hỗ trợ sẵn (người dùng cũng có thể bấm nút đổi trực tiếp trên thanh Navbar):
- `"quantum"`: **Quantum AI** — Tông màu Emerald (`#00f59b`) & Electric Cyan (`#00d4ff`) — Mặc định.
- `"cyber"`: **Cyber AGI** — Tông màu Cyan (`#00f0ff`) & Electric Violet (`#7b2cbf`).
- `"emerald"`: **Bio Matrix** — Tông màu Neon Lime (`#38ef7d`) & Teal (`#11998e`).
- `"amber"`: **Solar Core** — Tông màu Solar Gold (`#ffb703`) & Magma Orange (`#fb5607`).
- `"rose"`: **Synthwave AI** — Tông màu Neon Rose (`#ff2a85`) & Deep Purple (`#7209b7`).

---

## 2. Thông tin Định danh, CV & Logo Thương hiệu (`meta`)

```json
"meta": {
  "lang": "vi",
  "title": "Họ và Tên — Chức danh chính",
  "description": "Mô tả ngắn chuẩn SEO cho portfolio.",
  "brandName": "TENBAN",
  "brandDot": ".",
  "shortMark": "TB®",
  "logoSrc": "/logo-cf.svg",
  "avatarSrc": "/images/avatar.jpg",
  "cvUrl": "/cv.pdf",
  "email": "youremail@gmail.com",
  "phone": "09xx xxx xxx",
  "location": "Hà Nội, Việt Nam",
  "websiteUrl": "https://yourdomain.com"
}
```

### Hướng dẫn xử lý Logo (`meta.logoSrc` & `public/logo-cf.svg`)
1. **Cách 1 — Người dùng Upload Logo mới**:
   - Lưu file logo (`.svg`, `.png`, `.webp`) vào thư mục `public/` (ví dụ: `public/logo-custom.svg`).
   - Cập nhật `"logoSrc": "/logo-custom.svg"` trong cả `src/locales/vi.json` và `src/locales/en.json`, đồng thời cập nhật `<link rel="icon" href="/logo-custom.svg" />` trong `index.html`.
2. **Cách 2 — AI Agent Tự động Generate Logo SVG mới**:
   - Nếu người dùng chỉ tải CV lên mà chưa có logo riêng, AI Agent lấy **2–3 chữ cái viết tắt tên của người dùng** (ví dụ: `"Nguyễn Văn An"` -> `"NA"`) để viết lại file vector `public/logo-cf.svg` (`viewBox="0 0 120 120"`, nền squircle bo góc `rx="28"` với dải màu gradient Liquid Glass / Cyber-AI).

### Hướng dẫn xử lý File CV tải lên (`meta.cvUrl`)
- Khi người dùng tải file CV `.pdf` lên cho AI, AI copy file đó vào `public/cv.pdf` và đặt `"cvUrl": "/cv.pdf"` (đồng thời cập nhật mục CV trong `contact.socials`).

---

## 3. Sân khấu Hero (`hero` — Section `#top`)

```json
"hero": {
  "kicker": "KỸ SƯ AI · BACKEND, LLM & HỆ THỐNG ĐA TÁC NHÂN",
  "titleLineOne": "HOANG VAN",
  "titleLineTwo": "DIEU",
  "showPeriod": true,
  "bio": "Đoạn giới thiệu ngắn gọn 2–3 câu hiển thị ở góc giữa bên trái.",
  "cvLabel": "XEM HỒ SƠ CV (PDF)",
  "videoSrc": "/videos/engineer-hero.mp4?v=60fps",
  "videoAriaLabel": "Mô tả trợ năng cho video Hero",
  "scrollTarget": "#projects",
  "scrollButtonAria": "Cuộn xuống phần dự án",
  "indexLeft": "01 — 08",
  "scrollHint": "SCROLL TO EXPLORE ↓"
}
```
- **Lưu ý quan trọng về nhân vật 3D Hero (`videoSrc` / `modelSrc`) — Chú ý hỏi Nam hay Nữ**:
  - AI Agent khi đọc CV **phải chủ động hỏi xác nhận người dùng là Nam hay Nữ** để đổi đúng nhân vật 3D (đã được xử lý `60fps` và map sẵn quỹ đạo bám mặt Three.js AGI Halo):
    - **Nam (`Male`)**: đặt `"videoSrc": "/videos/engineer-hero.mp4?v=60fps"`
    - **Nữ (`Female`)**: đặt `"videoSrc": "/videos/engineer-female.mp4?v=60fps"`
  - Nếu dùng ảnh tĩnh (`.png`, `.jpg`, `.webp`): đặt đường dẫn ảnh tại `hero.videoSrc`, component `HeroSection` sẽ tự động chuyển sang thẻ `<img>`.
  - Nếu dùng mô hình 3D (`.glb`, `.gltf`): thêm trường `"modelSrc": "/models/character.glb"`.

---

## 4. Giới thiệu (`about` — Section `#about`)

```json
"about": {
  "eyebrow": "01 / GIỚI THIỆU",
  "verticalMark": "HVD®",
  "headingLineOne": "Dòng tiêu đề lớn thứ nhất",
  "headingLineTwo": "dòng tiêu đề nhấn mạnh thứ hai.",
  "paragraphOne": "Đoạn văn thứ nhất về triết lý kỹ thuật / sản phẩm.",
  "paragraphTwo": "Đoạn văn thứ hai về kinh nghiệm triển khai thực tế.",
  "capabilities": [
    "PYTHON · FASTAPI · DJANGO",
    "LLM · RAG · MULTI-AGENT",
    "MILVUS · QDRANT · REDIS",
    "DOCKER · CLOUD · CI/CD"
  ]
}
```

---

## 5. Dự án Tiêu biểu (`projects` — Section `#projects`)

Mỗi phần tử trong `projects.items` sẽ tạo ra 1 thẻ bài 3D trong quạt dự án. Hỗ trợ cả **ảnh/logo riêng của dự án (`image`)** hoặc **11 mẫu đồ họa Cyber-AI SVG dựng sẵn (`posterKind`)**:

```json
{
  "id": "ten-du-an-slug",
  "title": "Tên Dự Án",
  "description": "Mô tả bài toán, kiến trúc giải pháp và kết quả đạt được (1-2 câu).",
  "tech": "LangGraph · FastAPI · Next.js · Milvus · Docker",
  "link": "https://link-demo-hoac-github.com",
  "ctaLabel": "XEM DỰ ÁN",
  "posterKind": "media",
  "posterCategory": "MULTI-AGENT / ADS",
  "posterWord": "AM.",
  "image": ""
}
```

- **Nếu có ảnh hoặc logo dự án riêng**: Lưu ảnh vào `public/images/projects/<slug>.png` và đặt `"image": "/images/projects/<slug>.png"`. Thẻ bài 3D sẽ hiển thị trực tiếp ảnh/logo đó.
- **Nếu không có ảnh dự án (`"image": ""`)**: Hệ thống tự động hiển thị 1 trong **11 mã đồ họa SVG Cyber-AI (`posterKind`)** dưới đây:
  1. `"media"` — Sơ đồ nút điều phối **Multi-Agent (`AI AGENTS`)**.
  2. `"news"` — Đồ thị tri thức ngữ cảnh **RAG & LLM Studio (`RAG · LLM`)**.
  3. `"super"` — Lưới lục giác giao diện hội thoại thông minh **Agent-to-User (`A2UI`)**.
  4. `"partner"` — Mạng lưới phân tán **Orchestrator Mesh (`ADK MESH`)**.
  5. `"farm"` — Kiến trúc 3 tầng **Vector Embed → Milvus GPU → Neural Rerank**.
  6. `"mini"` — Phổ sóng âm thanh **Speech / Voice AI (`VOICE · AI`)**.
  7. `"store"` — Quả cầu dữ liệu **SaaS Widget / Web Crawler RAG (`RAG`)**.
  8. `"commerce"` — Máy quét tài liệu thông minh **Document AI (`GEMINI · PARSER`)**.
  9. `"game"` — Vi mạch & xung nhịp thời gian thực **Hardware / Realtime Telemetry**.
  10. `"match"` — Đường cong truy xuất ngữ nghĩa **Vector Similarity / Agentic RAG**.
  11. `"concert"` — Khung ngắm nhận diện thị giác máy tính **Computer Vision (`YOLO · VISION AI`)**.

---

## 6. Tuyên ngôn Chuyển động 5 Từ (`statement` — Section `#statement`)

Hiển thị 5 từ khóa bay 3D nối tiếp nhau theo nhịp cuộn, trong đó từ thứ 5 (`ship`) có hiệu ứng **Hào quang phóng sáng (Radiant Supernova Aura `.kinetic-ai-aura`)**:

```json
"statement": {
  "ariaLabel": "Build scalable systems with AI",
  "eyebrow": "BUILD · SCALABLE · SYSTEMS · WITH · AI",
  "stepLabel": "SCROLL DRIVES THE STORY / 03",
  "trackOne": "FASTAPI • LANGGRAPH • RAG • MULTI-AGENT • DOCKER •",
  "trackTwo": "BACKEND • MICROSERVICES • MILVUS • CLOUD • AI •",
  "words": {
    "build": "BUILD",
    "design": "SCALABLE",
    "code": "SYSTEMS",
    "with": "WITH",
    "ship": "AI"
  },
  "bottomLeft": "FROM ARCHITECTURE TO PRODUCTION",
  "bottomRight": "YOUR NAME ®"
}
```

---

## 7. Kinh nghiệm Làm việc (`experience` — Section `#experience`)

Mỗi công ty trong `experience.items` gồm thông tin chi tiết và 1 thẻ `poster` 3D đại diện (hỗ trợ gắn logo/ảnh công ty qua `poster.image` hoặc dùng SVG `poster.kind`):

```json
{
  "company": "Tên Công Ty",
  "watermark": "WATERMARK",
  "period": "2024 — HIỆN TẠI",
  "role": "Chức danh (ví dụ: AI Engineer)",
  "project": "CÁC DỰ ÁN CHÍNH TẠI CÔNG TY",
  "points": [
    "Ý 1: Thiết kế và phát triển hệ thống...",
    "Ý 2: Tối ưu hiệu năng và hạ tầng...",
    "Ý 3: Kết quả định lượng đạt được..."
  ],
  "poster": {
    "kind": "super",
    "category": "AGENTIC AI / RAG",
    "word": "WU.",
    "title": "Tên Công Ty",
    "image": ""
  }
}
```

---

## 8. Học vấn, Giải thưởng & Chứng chỉ (`credentials` — Section `#certificates`)

Section `#certificates` trưng bày tối đa **5 giải thưởng / chứng chỉ** trong không gian 3D. Đặc biệt hỗ trợ **bổ sung ảnh chụp bằng khen / chứng chỉ thật (`image`)**:

```json
"credentials": {
  "eyebrow": "06 / HỌC VẤN & GIẢI THƯỞNG",
  "headingLineOne": "NỀN TẢNG",
  "headingLineTwo": "ĐƯỢC KIỂM CHỨNG.",
  "archiveTag": "HỒ SƠ THÀNH TÍCH",
  "docPrefix": "DOC",
  "overviewLabel": "05 GIẢI THƯỞNG / MỘT LƯU TRỮ",
  "education": {
    "school": "Tên Trường Đại Học / Học Viện",
    "detail": "Chuyên ngành · Niên khóa · Điểm nhấn học thuật"
  },
  "certificates": [
    {
      "name": "Giải Nhất — AI Hackathon",
      "issuer": "Tên Tổ Chức Cấp",
      "date": "2026",
      "desc": "Mô tả ngắn gọn về giải thưởng hoặc chứng chỉ đạt được.",
      "badge": "FIRST PRIZE · CHAMPION",
      "serial": "CERT-2026-01",
      "accent": "#2646c8",
      "link": "https://link-xac-thuc-chung-chi.com",
      "image": "/images/certificates/ai-hackathon-2026.jpg"
    }
  ]
}
```

### Quy tắc hiển thị Hình ảnh Giải thưởng (`certificates[].image`)
- **Khi có ảnh (`"image": "/images/certificates/..."`)**: Component `CertificatePlate` sẽ hiển thị trực tiếp bức ảnh chụp bằng khen / giải thưởng / chứng chỉ của bạn (tỷ lệ khuyến nghị `4:3` hoặc ngang `792x612`).
- **Khi chưa có ảnh (`"image": ""`)**: Nếu trong CV của bạn có giải thưởng nhưng bạn chưa kịp tải ảnh lên, hãy để `"image": ""` — hệ thống sẽ tự động render một tấm **Bằng khen 3D Vector (`CertificatePlate`)** sang trọng dựa trên `name`, `issuer`, `date`, `badge`, `serial` và màu `accent`.

---

## 9. Kỹ năng (`toolkit` — `#skills`), Số liệu (`proof` — `#proof`), Dịch vụ (`services` — `#services`) & Liên hệ (`contact` — `#contact`)

- **`toolkit.groups`**: Mảng gồm **4 nhóm kỹ năng** (`title` + chuỗi `items` ngăn cách bằng dấu `·`).
- **`proof.stats`**: Mảng gồm **4 con số ấn tượng** trích xuất từ CV (`value`: số nguyên, `suffix`: hậu tố như `"+"`, `"%"`, `label`: mô tả ngắn).
- **`services.items`**: Mảng **3 hạng mục dịch vụ / thế mạnh kỹ thuật** (`title`, `description`).
- **`contact`**: Chứa `lines` (4 dòng chữ lớn ở cuối trang), `email`, và mảng `socials` (`label`, `href`, `icon`: `"file" | "github" | "linkedin" | "phone"`).
