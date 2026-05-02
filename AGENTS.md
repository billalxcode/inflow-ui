# InFlow
InFlow adalah sebuah aplikasi yang berfungsi untuk melakukan simulasi jaringan, aplikasi ini berbasis nextjs (react). Gunakan library react flow untuk fitur flow nya.

Saya ingin agar aplikasi ini memiliki konsep node, dimana setiap perangkat itu memiliki node masing-masing. Contoh node untuk router, access point, end user devices, dll. Untuk menyelesaikan masalah ini maka dibutuhkan library react flow, library ini dapat menyelesaikan masalah ini.

# Konsep tampilan aplikasi
1. Layout nya itu memiliki sidebar, navbar, main content, dan footer
2. Terdapat menu "Components", "

# Rule untuk tampilan aplikasi
## Sidebar
1. Setiap menu sidebar memiliki halaman tersendiri
2. Sidebar terdiri dari sidebar header, sidebar main content, dan sidebar footer
3. Sidebar header hanya untuk b3randing (logo, title, dll)
4. Sidebar main content terdiri dibagi menjadi sidebar group, hanya 1 group saja yaitu Projects. Dan di atas group project terdapat tombol "Create Project".
5. Sidebar footer terdiri dari card account, mungkin dropdown ke atas.

## Header
1. Header hanya memiliki breadcrumb

## Main content
1. Jika halaman nya home atau root url, maka akan menampilkan halaman welcome
2. Jika halaman nya /project (path untuk project baru) dan halaman /project/:id (path untuk project lama) maka akan mengikuti point pada halaman project

## Halaman project
1. Halaman project terdiri dari section board (section untuk draw menggunakan react flow) dan juga section component.

### Section board
1. Section board merupakan section yang dibuat khusus untuk react flow
2. Section board dapat di geser menggunakan mouse (X dan Y)
3. Section board memiliki tampilan full screen sebanyak 80% dari total layar dari sisa space yang kosong (sidebar dan navbar).

### Section component
1. Section component merupakan section yang digunakan untuk memilih komponen apa saja atau node apa saja yang dapat dimasukan ke dalam board
2. Section component ini memiliki tampilan statis, artinya section nya tidak dapat di geser.
3. Section component berada di bagian bawah section board
4. Section component memiliki tampilan full widthh dan height sebanyak 20% dari sisa space yang kosong (sidebar, navbar, dan section board).

# PERINGATAN PENTING
1. Semua aplikasi ini berbasis komponen shadcn, gunakan semu akomponen shadcn, jangan ada komponen yang tidak menggunakan shadcn. Jangan ada komponen yang non-shadcn.
2. 