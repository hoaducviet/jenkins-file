# Sử dụng image Node.js chính thức từ Docker Hub làm nền tảng
FROM node:14

# Thiết lập thư mục làm việc bên trong container
WORKDIR /usr/src/app

# Sao chép file package.json và package-lock.json để cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Mở cổng 3000 để ứng dụng có thể lắng nghe
EXPOSE 3000

# Chạy lệnh khởi động ứng dụng
CMD ["npm", "start"]
