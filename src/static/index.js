import Soat from "./photos/Soat.jpg";
import Tv from "./photos/Tv.jpg";
import Smartfon from "./photos/smartfon.jpg";
import Quloqchin from "./photos/Quloqchin.jpg";
import Archa from "./photos/Archa.jpg";
import Chiroq from "./photos/Chiroq.jpg";
import Car from "./photos/Car.jpg";
import ArchaOyinchoq from "./photos/ArchaOyinchoq.jpg";
import Acer from "./photos/Acer.jpg";
import Konditsiyaner from "./photos/Konditsiyaner.jpg";
import img1 from "../assets/Images/image1.png";

const PRODUCTS = [
 
  /* ================== ELEKTRONIKA ================== */
  // Telefon (3 ta)
  { id: "p1", title: "iPhone 13 128GB", price: 9500000, parentCategory: "Elektronika", category: "Telefon", url: Smartfon },
  { id: "p2", title: "Samsung Galaxy A34 5G", price: 3800000, parentCategory: "Elektronika", category: "Telefon", url: img1 },
  { id: "p3", title: "Tecno Spark 20 Pro", price: 2200000, parentCategory: "Elektronika", category: "Telefon", url: Smartfon },

  // Noutbuk (3 ta)
  { id: "p4", title: "Acer Aspire 5 i5 / 16GB", price: 7200000, parentCategory: "Elektronika", category: "Noutbuk", url: Acer },
  { id: "p5", title: "Acer Aspire 3 i3 / 256GB", price: 5600000, parentCategory: "Elektronika", category: "Noutbuk", url: Acer },
  { id: "p16", title: "HP Pavilion i5 8GB", price: 6800000, parentCategory: "Elektronika", category: "Noutbuk", url: Acer },

  // Televizor (3 ta)
  { id: "p6", title: "Artel Android TV 43", price: 3900000, parentCategory: "Elektronika", category: "Televizor", url: Tv },
  { id: "p7", title: "LG Smart TV 50 4K", price: 6500000, parentCategory: "Elektronika", category: "Televizor", url: Tv },
  { id: "p17", title: "Samsung UHD TV 55", price: 7800000, parentCategory: "Elektronika", category: "Televizor", url: Tv },

  // Quloqchin (3 ta)
  { id: "p8", title: "Redmi Buds 4", price: 420000, parentCategory: "Elektronika", category: "Quloqchin", url: Quloqchin },
  { id: "p18", title: "JBL Wireless Headset", price: 520000, parentCategory: "Elektronika", category: "Quloqchin", url: Quloqchin },
  { id: "p19", title: "Sony Bluetooth Earbuds", price: 610000, parentCategory: "Elektronika", category: "Quloqchin", url: Quloqchin },

  /* ================== UY-RO‘ZG‘OR ================== */
  // Konditsioner (3 ta)
  { id: "p9", title: "Artel Inverter 12", price: 5300000, parentCategory: "Uy-ro‘zg‘or", category: "Konditsioner", url: Konditsiyaner },
  { id: "p10", title: "TCL Inverter 12", price: 5100000, parentCategory: "Uy-ro‘zg‘or", category: "Konditsioner", url: Konditsiyaner },
  { id: "p20", title: "Samsung WindFree 12", price: 6200000, parentCategory: "Uy-ro‘zg‘or", category: "Konditsioner", url: Konditsiyaner },

  // Chiroq (3 ta)
  { id: "p11", title: "LED stol chirog‘i", price: 180000, parentCategory: "Uy-ro‘zg‘or", category: "Chiroq", url: Chiroq },
  { id: "p21", title: "Smart Night Lamp", price: 220000, parentCategory: "Uy-ro‘zg‘or", category: "Chiroq", url: Chiroq },
  { id: "p22", title: "Dekorativ LED chiroq", price: 150000, parentCategory: "Uy-ro‘zg‘or", category: "Chiroq", url: Chiroq },

  /* ================== AKSESSUAR ================== */
  // Soat (3 ta)
  { id: "p12", title: "Casio WR100", price: 1850000, parentCategory: "Aksessuar", category: "Soat", url: Soat },
  { id: "p23", title: "Rolex Style Watch", price: 950000, parentCategory: "Aksessuar", category: "Soat", url: Soat },
  { id: "p24", title: "Smart Watch Pro", price: 680000, parentCategory: "Aksessuar", category: "Soat", url: Soat },

  /* ================== BOLALAR ================== */
  // O‘yinchoq (3 ta)
  { id: "p13", title: "Radio boshqaruv mashina", price: 480000, parentCategory: "Bolalar", category: "O‘yinchoq", url: Car },
  { id: "p25", title: "Robot o‘yinchoq", price: 350000, parentCategory: "Bolalar", category: "O‘yinchoq", url: Car },
  { id: "p26", title: "Transformer toy", price: 420000, parentCategory: "Bolalar", category: "O‘yinchoq", url: Car },

  /* ================== BAYRAM ================== */
  // Archa (3 ta)
  { id: "p14", title: "Sun’iy archa 150 sm", price: 220000, parentCategory: "Bayram", category: "Archa", url: Archa },
  { id: "p27", title: "Sun’iy archa 180 sm", price: 320000, parentCategory: "Bayram", category: "Archa", url: Archa },
  { id: "p28", title: "Mini archa 90 sm", price: 150000, parentCategory: "Bayram", category: "Archa", url: Archa },


  // Archa o‘yinchoqlari (3 ta)
  { id: "p15", title: "24 dona archa bezaklari", price: 55000, parentCategory: "Bayram", category: "Archa o‘yinchoqlari", url: ArchaOyinchoq },
  { id: "p29", title: "Yangi yil sharlari 12 dona", price: 45000, parentCategory: "Bayram", category: "Archa o‘yinchoqlari", url: ArchaOyinchoq },
  { id: "p30", title: "Premium dekor set", price: 75000, parentCategory: "Bayram", category: "Archa o‘yinchoqlari", url: ArchaOyinchoq },
];


export default PRODUCTS;
