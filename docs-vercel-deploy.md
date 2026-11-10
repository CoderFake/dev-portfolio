# 🚀 Hướng dẫn Build & Deploy lên Vercel qua Plugin, CLI hoặc GitHub (`docs-vercel-deploy.md`)

Dự án đã được cấu hình sẵn file [`vercel.json`](./vercel.json) ở thư mục gốc (`dev-portfolio/vercel.json`) để xử lý trọn vẹn:
- Header `Content-Type: application/wasm` cho nhân vật lý Rust + WebAssembly (`public/wasm/star_network_engine.wasm`).
- Bộ nhớ đệm `Cache-Control: immutable` cho video 3D Hero (`public/videos/engineer-hero.mp4`).
- Điều hướng SPA (`rewrites` về `/index.html`).

Dưới đây là 3 cách để **AI Agent (ChatGPT, Claude, Cursor, Antigravity)** hoặc lập trình viên triển khai trang web lên **Vercel**.

---

## Cách 1: Deploy tự động qua AI Agent Plugin / MCP Server (Claude, ChatGPT, Cursor, Antigravity)

Nếu bạn đã kết nối **Vercel Plugin / Vercel MCP Server** vào trình trợ lý AI của mình:

### 1. Thông số cấu hình chuẩn cung cấp cho Plugin
Khi AI gọi tool của Vercel Plugin (ví dụ `vercel_deploy`, `create_deployment`, hoặc `link_project`), hãy truyền chính xác các tham số sau:

```json
{
  "projectName": "dev-portfolio",
  "framework": "vite",
  "rootDirectory": "dev-portfolio",
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "nodeVersion": "20.x"
}
```
*(Lưu ý: Nếu repo Git của bạn đặt nội dung của `dev-portfolio` ngay tại thư mục gốc của repo thì để `"rootDirectory": "."` hoặc bỏ trống).*

### 2. Câu lệnh ngắn để ra lệnh cho AI có gắn Plugin
> *"Hãy đọc `docs-vercel-deploy.md`, chạy `npm run build` để kiểm tra không có lỗi, sau đó dùng plugin Vercel để deploy thư mục `dev-portfolio` lên môi trường Production và gửi lại đường link `.vercel.app` cho tôi."*

---

## Cách 2: Deploy bằng 1 câu lệnh qua Vercel CLI (Dành cho Claude Code / Terminal Agent)

Nếu AI Agent có quyền thực thi câu lệnh Terminal (như **Claude Code, Cursor Agent, Antigravity**), Agent chỉ cần chạy các lệnh sau:

### Trường hợp 1: Máy đã đăng nhập Vercel (`vercel login`)
```bash
cd dev-portfolio
npm install
npm run build
npx vercel deploy --prod --yes
```

### Trường hợp 2: Chạy tự động hoàn toàn qua `VERCEL_TOKEN` (Không cần mở trình duyệt)
1. Lấy mã Token tại: [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Cung cấp `VERCEL_TOKEN` cho AI Agent và chạy:
```bash
cd dev-portfolio
npm install
npm run build
npx vercel deploy --prod --yes --token="$VERCEL_TOKEN"
```

---

## Cách 3: Kết nối GitHub / GitLab tự động Deploy trên Dashboard Vercel

1. Đẩy mã nguồn lên GitHub / GitLab.
2. Truy cập [https://vercel.com/new](https://vercel.com/new) và chọn Repository của bạn.
3. Thiết lập các thông số:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Chọn `dev-portfolio` *(nếu repo của bạn chứa nhiều thư mục con)* hoặc `./` *(nếu đẩy riêng thư mục này)*.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Bấm **Deploy**. Mọi lần `git push` tiếp theo sẽ tự động cập nhật trang web.

---

## 🛠️ Tùy chọn Nâng cao (Tối ưu Video 60fps & Biên dịch lại Rust WebAssembly)

### 1. Làm mượt video Hero lên 60fps bằng `ffmpeg`
Khi thay video mới vào `public/videos/engineer-hero.mp4`, nếu video gốc từ AI chỉ có `24fps`, AI Agent có thể chạy lệnh `ffmpeg` sau để nội suy lên `60fps` và tối ưu chuẩn nén Web (`+faststart`):

```bash
ffmpeg -y -i input-raw.mp4 \
  -vf "framerate=fps=60:interp_start=0:interp_end=255:scene=100" \
  -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -movflags +faststart \
  public/videos/engineer-hero.mp4
```

### 2. Biên dịch lại nhân vật lý Rust + WebAssembly (`rust-star-engine`)
File `public/wasm/star_network_engine.wasm` đã được biên dịch sẵn nên **không cần cài Rust khi deploy trên Vercel**. Tuy nhiên, nếu bạn chỉnh sửa mã nguồn trong `rust-star-engine/src/lib.rs`, hãy chạy:

```bash
rustup target add wasm32-unknown-unknown
npm run build:wasm
```
Lệnh này sẽ biên dịch Rust với cờ tối ưu hóa phần cứng `SIMD128` và tự động cập nhật file `.wasm` vào `public/wasm/star_network_engine.wasm`.
