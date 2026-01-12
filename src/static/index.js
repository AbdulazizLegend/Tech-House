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
  {
    id: "p1",
    title: "iPhone 13 128GB",
    price: 9_500_000,
    parentCategory: "Elektronika",
    category: "Telefon",
    url: Smartfon,
  },
  {
    id: "p2",
    title: "Samsung Galaxy A34 5G",
    price: 3_800_000,
    parentCategory: "Elektronika",
    category: "Telefon",
    url: img1,
  },
  {
    id: "p3",
    title: "Tecno Spark 20 Pro",
    price: 2_200_000,
    parentCategory: "Elektronika",
    category: "Telefon",
    url: Smartfon,
  },

  {
    id: "p4",
    title: "Acer Aspire 5 i5 / 16GB / SSD 512GB",
    price: 7_200_000,
    parentCategory: "Elektronika",
    category: "Noutbuk",
    url: Acer,
  },
  {
    id: "p5",
    title: "Acer Aspire 3 i3 / SSD 256GB",
    price: 5_600_000,
    parentCategory: "Elektronika",
    category: "Noutbuk",
    url: Acer,
  },

  {
    id: "p6",
    title: "Artel Android TV 43 dyuym",
    price: 3_900_000,
    parentCategory: "Elektronika",
    category: "Televizor",
    url: Tv,
  },
  {
    id: "p7",
    title: "LG Smart TV 50 dyuym 4K",
    price: 6_500_000,
    parentCategory: "Elektronika",
    category: "Televizor",
    url: Tv,
  },

  {
    id: "p8",
    title: "Simsiz quloqchin Redmi Buds 4",
    price: 420_000,
    parentCategory: "Elektronika",
    category: "Quloqchin",
    url: Quloqchin,
  },

  /* ================== UY-RO‘ZG‘OR ================== */
  {
    id: "p9",
    title: "Konditsioner Artel 12 Inverter",
    price: 5_300_000,
    parentCategory: "Uy-ro‘zg‘or",
    category: "Konditsioner",
    url: Konditsiyaner,
  },
  {
    id: "p10",
    title: "Konditsioner TCL 12 Inverter",
    price: 5_100_000,
    parentCategory: "Uy-ro‘zg‘or",
    category: "Konditsioner",
    url: Konditsiyaner,
  },

  {
    id: "p11",
    title: "LED stol chirog‘i sensorli",
    price: 180_000,
    parentCategory: "Uy-ro‘zg‘or",
    category: "Chiroq",
    url: Chiroq,
  },

  /* ================== AKSESSUAR ================== */
  {
    id: "p12",
    title: "Casio erkaklar qo‘l soati WR100",
    price: 1_850_000,
    parentCategory: "Aksessuar",
    category: "Soat",
    url: Soat,
  },

  /* ================== BOLALAR ================== */
  {
    id: "p13",
    title: "Radio boshqaruv mashinasi 4x4",
    price: 480_000,
    parentCategory: "Bolalar",
    category: "O‘yinchoq",
    url: Car,
  },

  /* ================== BAYRAM ================== */
  {
    id: "p14",
    title: "Sun’iy archa 150 sm",
    price: 220_000,
    parentCategory: "Bayram",
    category: "Archa",
    url: Archa,
  },
  {
    id: "p15",
    title: "Archa o‘yinchoqlari to‘plami (24 dona)",
    price: 55_000,
    parentCategory: "Bayram",
    category: "Archa o‘yinchoqlari",
    url: ArchaOyinchoq,
  },
];

export default PRODUCTS;
