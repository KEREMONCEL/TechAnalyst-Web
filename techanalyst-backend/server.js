// techanalyst-backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Canlı Local MongoDB Bağlantısı
mongoose.connect('mongodb://localhost:27017/techanalyst')
  .then(() => console.log("🛰️ MongoDB Compass Veritabanına Canlı Bağlantı Sağlandı!"))
  .catch(err => console.error("MongoDB bağlantı hatası:", err));

// Epey Standartlarında Esnek NoSQL Şeması
const ProductSchema = new mongoose.Schema({
  category: String,
  brand: String,
  model: String,
  price: String,
  img: String,
  detaylar: mongoose.Schema.Types.Mixed
});

const Product = mongoose.model('Product', ProductSchema);

// --- API ENDPOINT'LERİ ---

// 1. Canlı Veri Çekme (React Burayı Dinleyecek)
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. MongoDB'yi Tek Seferde Devasa Veriyle Tohumlama (Seed)
app.post('/api/products/seed', async (req, res) => {
  try {
    await Product.deleteMany({}); // Eski bozuk dataları sıfırlar
    const devEcosystemData = [
      // 📱 AKILLI TELEFONLAR (APPLE, XIAOMI, OPPO)
      { category: "smartphones", brand: "Apple", model: "iPhone 13 Pro Max", price: "58.999 TL", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-graphite-select?wid=940&hei=1112&fmt=png-alpha", detaylar: { "Ekran Özellikleri": "6.7 inç OLED 120Hz ProMotion", "İşlemci Mimarisi": "Apple A15 Bionic (5nm)", "Bellek (RAM)": "6 GB LPDDR5", "Batarya Kapasitesi": "4352 mAh", "Şarj Hızı (W)": "27W Hızlı Şarj", "AnTuTu Puanı": "840.000 Puan" } },
      { category: "smartphones", brand: "Apple", model: "iPhone 16 Pro Max", price: "102.499 TL", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-max-black-titanium-select?wid=940&hei=1112&fmt=png-alpha", detaylar: { "Ekran Özellikleri": "6.9 inç LTPO OLED 120Hz", "İşlemci Mimarisi": "Apple A18 Pro (3nm)", "Bellek (RAM)": "8 GB Bellek", "Batarya Kapasitesi": "4685 mAh", "Şarj Hızı (W)": "30W Kablolu / 25W MagSafe", "AnTuTu Puanı": "1.650.000 Puan" } },
      { category: "smartphones", brand: "Xiaomi", model: "Xiaomi 14 Ultra", price: "69.999 TL", img: "https://mi-store.ch/wp-content/uploads/2024/03/Xiaomi-14-Ultra-black-1.png", detaylar: { "Ekran Özellikleri": "6.73 inç AMOLED 120Hz LTPO", "İşlemci Mimarisi": "Qualcomm Snapdragon 8 Gen 3", "Bellek (RAM)": "16 GB LPDDR5X", "Batarya Kapasitesi": "5000 mAh", "Şarj Hızı (W)": "90W HiperŞarj / 80W Kablosuz", "AnTuTu Puanı": "2.100.000 Puan" } },
      { category: "smartphones", brand: "Oppo", model: "Oppo Find X7 Ultra", price: "54.500 TL", img: "https://images.oppo.com/is/image/oppo/find-x6-pro-navigation-green?wid=400&hei=400&fmt=png-alpha", detaylar: { "Ekran Özellikleri": "6.82 inç 2K Diamond AMOLED", "İşlemci Mimarisi": "Qualcomm Snapdragon 8 Gen 3", "Bellek (RAM)": "16 GB RAM", "Batarya Kapasitesi": "5000 mAh", "Şarj Hızı (W)": "100W SUPERVOOC Flaş Şarj", "AnTuTu Puanı": "2.140.000 Puan" } },
      // 💻 DİZÜSTÜ BİLGİSAYARLAR (LAPTOPS)
      { category: "laptops", brand: "Apple", model: "MacBook Pro 16 M3 Max", price: "124.999 TL", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202310?wid=900&hei=900&fmt=png-alpha", detaylar: { "Ekran Özellikleri": "16.2 inç Liquid Retina XDR", "İşlemci Mimarisi": "Apple M3 Max (16 Çekirdek)", "Entegre Bellek": "48 GB Unified Memory", "Depolama Kapasitesi": "1 TB NVMe SSD", "Batarya Ömrü": "22 Saate Varan Kullanım", "Şarj Cihazı (W)": "140W MagSafe 3" } },
      { category: "laptops", brand: "Asus", model: "ROG Strix SCAR 18", price: "148.000 TL", img: "https://dlcdnwebimgs.asus.com/gain/3D7A41A1-C91A-45CC-94CE-7F0FFC5F57C0/w240", detaylar: { "Ekran Özellikleri": "18 inç ROG Nebula Mini LED 240Hz", "İşlemci Mimarisi": "Intel Core i9-14900HX", "Grafik Kartı (GPU)": "NVIDIA RTX 4090 (16GB - 175W)", "Bellek (RAM)": "32 GB DDR5 5600MHz", "Depolama Kapasitesi": "2 TB PCIe 4.0 NVMe SSD", "Soğutma Sistemi": "Tri-Fan Sıvı Metal Teknolojisi" } },
      // 🎧 PREMIUM KULAKLIKLAR (AUDIO)
      { category: "audio", brand: "Apple", model: "AirPods Max", price: "26.499 TL", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-spacegray-202011?wid=940&hei=1112&fmt=png-alpha", detaylar: { "Sürücü Tipi": "40 mm Dinamik Sürücü", "Gürültü Engelleme": "Aktif Gürültü Engelleme (ANC)", "Çip Seti": "Çift Apple H1 Kulaklık Çipi", "Batarya Ömrü": "ANC Açıkken 20 Saat", "Kasa Malzemesi": "Alüminyum Kapsüller & Örme File" } },
      { category: "audio", brand: "Sony", model: "Sony WH-1000XM5", price: "13.800 TL", img: "https://www.sony.com.tr/image/6145ae0a7298071aefc3a1f0a2b5e235?fmt=png-alpha", detaylar: { "Sürücü Tipi": "30 mm Özel Tasarım Güçlendirilmiş", "Entegre İşlemci": "Sony V1 + QN1 Gürültü Engelleme", "Ses Teknolojisi": "Hi-Res Audio Wireless, LDAC Desteği", "Batarya Ömrü": "ANC Aktifken 30 Saat", "Hızlı Şarj": "3 Dakika Şarj ile 3 Saat Kullanım" } }
    ];
    await Product.insertMany(devEcosystemData);
    res.json({ success: true, message: "MongoDB Canlı Veritabanı Epey Mimarisiyle Başarıyla Dolduruldu!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use((req, res) => res.status(404).json({ error: "Endpoint bulunamadı." }));

app.listen(5000, () => console.log("🚀 Canlı API Sunucusu Port 5000 üzerinde ateşlendi!"));