// ── Shared mock data for Admin and POS pages ──

export let MOCK_EMPLOYEES = [
  { id: "NV01", name: "Lê Hoàng Tuấn", role: "Quản lý", phone: "0988111222", status: "Đang làm việc" },
  { id: "NV02", name: "Phạm Mai Phương", role: "Nhân viên bán hàng", phone: "0977333444", status: "Đang làm việc" },
  { id: "NV03", name: "Trần Văn Nam", role: "Nhân viên kho", phone: "0966555666", status: "Đang làm việc" },
  { id: "NV04", name: "Nguyễn Hương Giang", role: "Nhân viên bán hàng", phone: "0955777888", status: "Đã nghỉ" }
];

export let MOCK_SUPPLIERS = [
  { id: "NCC01", name: "Công ty Vinamilk", phone: "024 3828 2222", address: "Chi nhánh Thanh Xuân, Hà Nội" },
  { id: "NCC02", name: "Đại lý Nước giải khát", phone: "0912 345 678", address: "KCN Thăng Long, Đông Anh, Hà Nội" },
  { id: "NCC03", name: "Nhà phân phối Bánh kẹo", phone: "0988 123 456", address: "Quận Ba Đình, Hà Nội" }
];

export let MOCK_PROMOTIONS = [
  { id: "KM01", name: "Giảm giá mùa hè rực rỡ", discount: "10%", startDate: "01/05/2026", endDate: "31/05/2026", status: "Đang diễn ra" },
  { id: "KM02", name: "Tuần lễ vàng - Mua 1 tặng 1", discount: "Quà tặng", startDate: "10/06/2026", endDate: "17/06/2026", status: "Sắp tới" },
  { id: "KM03", name: "Lễ hội bánh kẹo", discount: "15%", startDate: "01/03/2026", endDate: "15/03/2026", status: "Đã kết thúc" }
];

export let MOCK_ORDERS = [
  {"id": "PN001", "date": "01/03/2026", "supplier": "Công ty Cổ phần Sữa Việt Nam (Vinamilk)", "total": "15.000.000 ₫", "creator": "NV03"},
  {"id": "PN002", "date": "05/03/2026", "supplier": "Suntory Pepsico Việt Nam", "total": "12.500.000 ₫", "creator": "NV03"},
  {"id": "PN003", "date": "08/03/2026", "supplier": "Công ty TNHH Thực phẩm Orion Vina", "total": "8.200.000 ₫", "creator": "NV03"}
];
export let MOCK_CUSTOMERS = [
  { id: "KH01", name: "Nguyễn Thị Thu Hà", phone: "0901112233", address: "Cầu Giấy, Hà Nội", points: 150, spent: "1.500.000 ₫" },
  { id: "KH02", name: "Trần Việt Dũng", phone: "0987778899", address: "Đống Đa, Hà Nội", points: 50, spent: "500.000 ₫" },
  { id: "KH03", name: "Lê Hoàng Long", phone: "0912223344", address: "Ba Đình, Hà Nội", points: 320, spent: "3.200.000 ₫" },
  { id: "KH04", name: "Phạm Trà My", phone: "0934445566", address: "Thanh Xuân, Hà Nội", points: 10, spent: "100.000 ₫" }
];

export let MOCK_PRODUCTS = [
  { id: "SP01", name: "Nước ngọt Pepsi 320ml", price: 10000, cost: 7500, stock: 120, minStock: 20, location: "Kệ A", category: "Đồ uống", img: "https://cdn.tgdd.vn/Products/Images/2443/88121/bhx/thung-24-lon-nuoc-ngot-pepsi-cola-320ml-202405140910328596.jpg" },
  { id: "SP02", name: "Nước suối Aquafina 500ml", price: 6000, cost: 3500, stock: 150, minStock: 20, location: "Kệ A", category: "Đồ uống", img: "https://cdn.tgdd.vn/Products/Images/2563/84814/bhx/nuoc-tinh-khiet-aquafina-15-lit-202407121349501454.jpg" },
  { id: "SP03", name: "Coca-Cola vị nguyên bản 320ml", price: 10000, cost: 7500, stock: 80, minStock: 20, location: "Kệ A", category: "Đồ uống", img: "https://cdnv2.tgdd.vn/webmwg/comment/ef/4a/ef4a44fb0c806a130d74efca2ee6ce87.jpg" },
  { id: "SP04", name: "Nước tăng lực Redbull 250ml", price: 15000, cost: 11000, stock: 60, minStock: 20, location: "Kệ A", category: "Đồ uống", img: "https://cdn.tgdd.vn/Products/Images/3226/76513/bhx/nuoc-tang-luc-redbull-lon-250ml-15112018162747.JPG" },
  { id: "SP05", name: "Cà phê sữa lon Birdy", price: 14000, cost: 10000, stock: 40, minStock: 20, location: "Kệ A", category: "Đồ uống", img: "https://cdn.tgdd.vn/Products/Images/8966/260195/bhx/ca-phe-sua-birdy-stay-awake-170ml-202112161121064089.jpg" },
  { id: "SP06", name: "Snack khoai tây OStar vị tảo biển", price: 12000, cost: 8000, stock: 100, minStock: 20, location: "Kệ B", category: "Đồ ăn vặt", img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/3364/79812/bhx/snack-ostar-rong-bien-48g_202511181409098380.jpg" },
  { id: "SP07", name: "Bánh Chocopie Orion (Hộp 6 cái)", price: 35000, cost: 25000, stock: 30, minStock: 20, location: "Kệ B", category: "Đồ ăn vặt", img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/7622/76995/bhx/banh-choco-pie-6p-180g_202512050937577481.jpg" },
  { id: "SP08", name: "Kẹo cao su Coolair", price: 5000, cost: 3000, stock: 200, minStock: 20, location: "Kệ B", category: "Đồ ăn vặt", img: "https://cdn.tgdd.vn/Products/Images/4888/77270/bhx/singum-ca-menthol-eucalyptus-hu-40-vien-2-700x467.jpg" },
  { id: "SP09", name: "Mì tôm Hảo Hảo chua cay", price: 5000, cost: 3500, stock: 300, minStock: 20, location: "Kệ C", category: "Thức ăn nhanh", img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/2565/77622/bhx/slide-1_202410151354441725.jpg" },
  { id: "SP10", name: "Xúc xích Lắc xốt Mayo Ponnie", price: 18000, cost: 13000, stock: 45, minStock: 20, location: "Kệ C", category: "Thức ăn nhanh", img: "https://cdn.tgdd.vn/Products/Images/3507/320180/bhx/xuc-xich-heo-cao-boi-lac-vi-tom-yum-masan-ly-56g-202312120951395371.jpg" },
  { id: "SP11", name: "Mì ly Modern lẩu Thái", price: 9000, cost: 6500, stock: 80, minStock: 20, location: "Kệ C", category: "Thức ăn nhanh", img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/2565/77738/bhx/mi-ly-modern-lau-thai-tom-65g_202511211137157691.jpg" },
  { id: "SP12", name: "Sữa tươi Vinamilk 100% không đường", price: 8000, cost: 6000, stock: 120, minStock: 20, location: "Kệ A", category: "Đồ uống", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBCfYBBXRrjAGtXbled_rwi_21Fa_t2QUGfQ&s" },
  { id: "SP13", name: "Sữa chua nha đam Vinamilk", price: 7000, cost: 5000, stock: 90, minStock: 20, location: "Kệ A", category: "Đồ uống", img: "https://cdnv2.tgdd.vn/bhx-static/bhx/production/2026/2/image/Products/Images/7558/198082/bhx/loc-4-hop-sua-chua-nha-dam-vinamilk-len-men-tu-nhien-100g_202602061632078496.jpg" },
  { id: "SP14", name: "Kem ốc quế Celano vị Vani", price: 20000, cost: 14000, stock: 50, minStock: 20, location: "Kệ B", category: "Đồ ăn vặt", img: "https://storage.googleapis.com/sc_pcm_product/prod/2025/6/16/625893-8936011771177.webp" },
  { id: "SP15", name: "Bia Tiger bạc (Crystal) 330ml", price: 20000, cost: 16000, stock: 240, minStock: 20, location: "Kệ A", category: "Đồ uống", img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/2282/328901/bhx/httpscdnv2tgddvnbhx-staticbhxproductsimages2282328901bhxlon-250ml202412031318572325_202412041000314324.jpg" },
  { id: "SP16", name: "Bia Heineken 330ml", price: 22000, cost: 18000, stock: 120, minStock: 20, location: "Kệ A", category: "Đồ uống", img: "https://cdnv2.tgdd.vn/bhx-static/bhx/production/2025/12/image/Products/Images/2282/200637/bhx/bia-heineken-silver-lon-330ml_202512301357376940.jpg" },
  { id: "SP17", name: "Kem đánh răng PS trà xanh", price: 38000, cost: 28000, stock: 25, minStock: 20, location: "Kệ D", category: "Đồ dùng cá nhân", img: "https://assets.unileversolutions.com/v1/116186774.png" },
  { id: "SP18", name: "Dầu gội Clear mát lạnh", price: 65000, cost: 50000, stock: 15, minStock: 20, location: "Kệ D", category: "Đồ dùng cá nhân", img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/2483/77965/bhx/dau-goi-clear-sach-gau-mat-lanh-bac-ha-359ml_202511040908105760.jpg" },
  { id: "SP19", name: "Bánh bao nhân thịt trứng cút", price: 15000, cost: 10000, stock: 20, minStock: 50, location: "Kệ C", category: "Thức ăn nhanh", img: "https://banhmibahuynh.vn/wp-content/uploads/2022/11/Banh-bao-ba-Huynh.jpg" },
  { id: "SP20", name: "Cơm nắm Onigiri cá ngừ", price: 18000, cost: 12000, stock: 10, minStock: 30, location: "Kệ C", category: "Thức ăn nhanh", img: "https://cdn.tgdd.vn/Files/2022/03/22/1421569/onigiri-la-gi-tong-hop-cac-loai-onigiri-thom-ngon-chuan-nhat-202203220827145206.jpg" }
];

export function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "₫";
}
