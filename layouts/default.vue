<template>
  <div class="header">
    <div class="header-left">
      <img src="/logo.png" alt="Logo" class="logo" />
    </div>

    <div class="header-center">
      <input
        type="text"
        placeholder="Aradığınız ürün, kategori veya markayı yazınız"
        class="search-input"
        v-model="searchQuery"
        @focus="showDropdown = true"
        @blur="hideDropdown"
      />
      <button class="search-btn" @click="showDropdown = true">
        <span>🔍</span>
      </button>
    </div>

    <!-- Dropdown -->
    <div class="dropdown" v-if="showDropdown" @mousedown.prevent>
      <!-- Geçmiş Aramalar -->
      <div class="section">
        <h4>Geçmiş Aramalar</h4>
        <ul class="list">
          <li
            v-for="(item, index) in recentSearches"
            :key="index"
            class="list-item"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- Popüler Aramalar -->
      <div class="section">
        <h4>Popüler Aramalar</h4>
        <ul class="list">
          <li
            v-for="(item, index) in popularSearches"
            :key="index"
            class="list-item"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- Popüler Ürünler -->
      <div class="section popular-products">
        <h4>Popüler Ürünler</h4>
        <div class="slider">
          <button @click="prevSlide" class="arrow left-arrow">❮</button>
          <div class="products">
            <div
              v-for="(product, index) in visibleProducts"
              :key="index"
              class="product"
            >
              <img :src="product.image" :alt="product.name" />
              <div class="product-info">
                <p>{{ product.name }}</p>
                <p>{{ product.price }}</p>
              </div>
            </div>
          </div>
          <button @click="nextSlide" class="arrow right-arrow">❯</button>
        </div>
      </div>
    </div>

    <div class="header-right">
      <!-- NuxtLink kullanımı -->
      <button @click="navigateTologin" class="header-link">
        <i class="fa fa-sign-in"></i> <!-- Font Awesome ikonu -->
        <span class="text">Giriş Yap</span>
      </button>

      <button @click="navigateToFavorites" class="header-link">
        <i class="fa-regular fa-heart"></i> <!-- Font Awesome ikonu -->
      <span class="text">Favorilerim</span>
      </button>

      <button @click="navigateTosepetim" class="header-link">
    <font-awesome-icon icon="shopping-cart" class="header-icon" /> Sepetim
  </button>
    </div>
  </div>

  <nav class="categories">
    <button class="category-all">
      <span class="icon">☰</span>
      <span class="category-text">Tüm Kategoriler</span>
    </button>
    <a href="#" class="category-link">Kadın</a>
    <a href="#" class="category-link">Erkek</a>
    <a href="#" class="category-link">Anne & Çocuk</a>
    <a href="#" class="category-link">Ev & Yaşam</a>
    <a href="#" class="category-link">Süepermarket</a>
    <a href="#" class="category-link">Kozmetik</a>
    <a href="#" class="category-link">Ayakkabı & Çanta</a>
    <a href="#" class="category-link">Elektronik</a>
    <a href="#" class="category-link">Çok Satanlar</a>
    <a href="#" class="category-link">Fırsat Ürünleri</a>
  </nav>

  <!-- AramaComponenti ekleniyor -->
  
  <div class="carousel-container" v-if="!activeComponent">
<div class="arama-componenti">
    <div class="categories">
      <button
        v-for="category in categories"
        :key="category.id"
        class="category-button"
        @click="handleClick(category.id)"
      >
        <img :src="category.image" :alt="category.name" />
        <p>{{ category.name }}</p>
      </button>
    </div>
  </div>


  <div class="buttons">
    <button class="button green">Sepete en çok eklenenler</button>
    <button class="button orange">En çok öne çıkanlar</button>
    <button class="button red">Flaş Ürünler</button>
  </div>


  




  <div class="ana-sayfa">
  <section class="ozel-urunler">
    <h2>Popüler Ürünler</h2>
    <div class="urun-listesi">
      <div v-for="urun in ozelUrunler" :key="urun.id" class="urun-karti1">
        <img :src="urun.image" :alt="urun.name" />
        <h3>{{ urun.name }}</h3>
        <p>{{ urun.price }} TL</p>
        <button @click="addToCart(urun)" class="sepete-ekle-btn">Sepete Ekle</button>
      </div>
    </div>
  </section>

  <section class="kampanyalar">
      <h2>Kampanyalar</h2>
      <div class="kampanya-bantlari">
        <div 
          v-for="kampanya in kampanyalar" 
          :key="kampanya.id" 
          class="kampanya" 
          @click="handleCampaignClick">
          <img :src="kampanya.image" :alt="kampanya.name" />
        </div>
      </div>
    </section>

    <div class="flas-urunler">
    <h2 class="baslik">
      <span class="simsek-ikon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M13 2L3 14h7v8l10-12h-7l4-8h-4z" />
        </svg>
      </span>
      Flaş Ürünler
    </h2>
    <div class="urun-listesi">
      <div 
        v-for="urun in flasUrunler" 
        :key="urun.id" 
        class="urun-karti" 
        @click="handleProductClick(urun)">
        <div class="urun-resmi">
          <img :src="urun.image" :alt="urun.name" />
          <div v-if="urun.badge" class="urun-badge">{{ urun.badge }}</div>
        </div>
        <div class="urun-detay">
          <h3>{{ urun.name }}</h3>
          <p class="urun-fiyat">{{ urun.price }} TL</p>
          <div class="ek-bilgiler">
            <span v-if="urun.delivery" class="ek-bilgi">{{ urun.delivery }}</span>
            <span v-if="urun.cargo" class="ek-bilgi">{{ urun.cargo }}</span>
          </div>
          <p v-if="urun.discount" class="urun-indirim">{{ urun.discount }}</p>
        </div>
      </div>
    </div>
  </div>
</div>




<div class="brands-slider">
    <h3 class="title">Sana Özel Markalar</h3>
    <div class="slider-container">
      <button class="arrow left" @click="prevSlide">&#8249;</button>
      <div class="slider" ref="sliderRef">
        <div
          v-for="(brand, index) in brands"
          :key="index"
          class="brand-item"
        >
          <img :src="brand.logo" :alt="brand.name" />
        </div>
      </div>
      <button class="arrow right" @click="nextSlide">&#8250;</button>
    </div>
  </div>
</div>
     <!-- Sayfanın içeriği burada olacak -->
    <main class="main-content">
    <component :is="activeComponent" />
  </main>
  <div>
 
    <!-- Footer Bileşenini buraya ekleyebilirsiniz -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';

import Favorites from '~/components/Favorites.vue';
import Login from '~/components/login.vue';
import Sepetim from '~/components/sepetim.vue';
import Footer from './components/Footer.vue'; // Footer bileşenini import ediyoruz

const activeComponent = ref(null);

const navigateToFavorites = () => {
  activeComponent.value = Favorites;
};
const navigateTosepetim = () => {
  activeComponent.value = Sepetim;
};
const navigateTologin = () => {
  activeComponent.value = Login;
};

const categories = [
  { id: 1, name: 'İyi Fiyatlı Ürünler', image: '/icon1.jpg' },
  { id: 2, name: 'Sen De Al!', image: '/icon2.jpg' },
  { id: 3, name: 'Avantajlı Ürünler', image: '/icon3.jpg' },
  { id: 4, name: 'İndirim Kuponlarım', image: '/icon4.jpg' },
  { id: 5, name: 'Krediler', image: '/icon5.jpg' },
  { id: 6, name: 'Kredi Kartı', image: '/icon6.jpg' },
  { id: 7, name: 'Yeni Gelen Ürünler', image: '/icon7.jpg' },
];

const handleClick = (categoryId) => {
  console.log(`Category clicked: ${categoryId}`);
};

const handleProductClick = (urun) => {
  console.log(`Ürün tıklandı: ${urun.name}`);
};

const handleCampaignClick = () => {
  console.log('Kampanya tıklandı!');
};

const ozelUrunler = [
  { id: 1, name: 'Fenerbahçe Erkek Mavi Futbol Forması', price: 1349, image: '/fener.jpg' },
  { id: 2, name: 'Fenerbahçe Puma Forma', price: 1099, image: '/fener2.jpg' },
];

const kampanyalar = [
  { id: 1, name: 'Madame Coco', image: '/madame-coco.jpg' },
  { id: 2, name: 'H&M', image: '/h-m.jpg' },
  { id: 3, name: 'P&B', image: '/p-b.jpg' },
];

const flasUrunler = [
  { id: 1, name: 'The Purest Solutions', price: 499, image: '/path/to/product1.jpg' },
  { id: 2, name: 'Momordica Detox Mix', price: 421, image: '/path/to/product2.jpg' },
];

const addToCart = (urun) => {
  console.log(`${urun.name} sepete eklendi!`);
};

const brands = [
  { name: 'Karaca', logo: '/karaca.png' },
  { name: 'Bershka', logo: '/bershka.png' },
  { name: 'Puma', logo: '/puma.png' },
  { name: 'Lumberjack', logo: '/lumberjack.png' },
  { name: 'Karaca Home', logo: '/nike.png' },
  { name: 'Madame Coco', logo: '/images/madame-coco.png' },
  { name: 'Cool & Sexy', logo: '/images/cool-and-sexy.png' },
  { name: 'Schafer', logo: '/images/schafer.png' },
  { name: "Colin's", logo: '/images/colins.png' },
];

const sliderRef = ref(null);

const nextSlide = () => {
  const slider = sliderRef.value;
  if (slider) {
    slider.scrollBy({ left: 200, behavior: 'smooth' });
  }
};

const prevSlide = () => {
  const slider = sliderRef.value;
  if (slider) {
    slider.scrollBy({ left: -200, behavior: 'smooth' });
  }
};

// Arama Çubuğu İşlevselliği
const searchQuery = ref('');
const showDropdown = ref(false);

const recentSearches = ref(['Lenovo', 'iPhone']);
const popularSearches = ref(['Skechers', 'Robot Süpürge', 'Bileklik', 'Baharatlık']);
const popularProducts = ref([
{ name: "Ürün 1", image: "/saat.png", price: "100 TL" },
        { name: "Ürün 2", image: "/telefon.png", price: "200 TL" },
        { name: "Ürün 3", image: "/televizyon.png", price: "300 TL" },
        { name: "Ürün 4", image: "/ütü.png", price: "400 TL" },
]);
const visibleProducts = computed(() => popularProducts.value.slice(0, 4));

const handleFocus = () => {
  showDropdown.value = true;
};

const handleBlur = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
};

const handleSearchClick = () => {
  console.log(`Arama yapıldı: ${searchQuery.value}`);
};
</script>


<style scoped>
/* Dropdown */
.dropdown {
  position: fixed;
  top: 55px;
  left: 44%;
  transform: translateX(-50%);
  width: 37%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  z-index: 1000;
}

.section {
  margin-bottom: 20px;
}

.section h4 {
  margin-bottom: 10px;
}

.list {
  list-style: none;
  padding: 0;
}

.list-item {
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.list-item:hover {
  background-color: #f0f0f0;
}

/* Popüler Ürünler */
.popular-products {
  margin-top: 20px;
}

.products-slider {
  display: flex;
  gap: 10px;
  overflow-x: auto;
}

.product-item {
  min-width: 150px;
  text-align: center;
}

.product-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}
.popular-products .slider {
  display: flex;
  align-items: center;
  position: relative;
}

.slider .products {
  display: flex;
  overflow: hidden;
  width: 300px;
}

.slider .product {
  flex: 0 0 150px;
  margin-right: 10px;
}

.slider img {
  width: 100%;
  border-radius: 5px;
}

.arrow {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #007bff;
}

.arrow:hover {
  color: #0056b3;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  width: 100px;
}

.header-center {
  display: flex;
  align-items: center;
  flex-grow: 1;
  max-width: 600px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.search-btn {
  padding: 10px 15px;
  background-color: #f90;
  color: #fff;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.header-right {
  display: flex;
  gap: 15px;
}

.header-link {
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: #333;
  font-size: 14px;
  transition: color 0.3s;
  cursor: pointer;
}

.header-link:hover {
  color: #f90;
}

.categories {
  display: flex;
  gap: 15px;
  padding: 10px 20px;
  background-color: #f9f9f9;
  overflow-x: auto;
}

.category-all {
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #555;
}

.category-text {
  font-weight: bold;
}

.category-link {
  text-decoration: none;
  color: #555;
  font-size: 14px;
  white-space: nowrap;
  font-family: Arial, sans-serif;
  transition: color 0.3s;
}

.category-link:hover {
  color: #000;
}

.icon {
  font-size: 16px;
}

.arama-componenti {
  display: flex;
  justify-content: center;
  align-items: center;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  margin-bottom: 50px;
}

.category-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background-color: #f9f9f9;
  border: 2px solid #ddd;
  border-radius: 20px;
  padding: 20px;
  width: 120px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
}

.category-button:hover {
  background-color: #ffe4e1;
  border-color: #ff7f7f;
  transform: scale(1.05);
}

.category-button img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.category-button p {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1600px;
}

.button {
  padding: 20px 150px;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  color: white;
}

.button.green {
  background-color: #d4f5d4;
  color: #2c6f2c;
}

.button.orange {
  background-color: #ffedcc;
  color: #b36b00;
}

.button.red {
  background-color: #ffccd5;
  color: #a10029;
  margin-left: 50px;
}




.ana-sayfa {
  padding: 10px; /* ana sayfa ortalaması */
}

.ozel-urunler, .kampanyalar, .flas-urunler {
  margin-bottom: 40px;
}

.urun-listesi {
  display: flex;
  gap: 10px; /* ürünlerin arası */
}


.urun-karti1 {
  border: 1px solid #ddd;
  padding: 16px; /* fener forması olan yer */
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.urun-karti1:hover {
  transform: scale(1.05); /* Kart üzerine gelindiğinde kart biraz büyür */
}

.kampanya-bantlari {
  display: flex;
  gap: 190px; /* Kampanyalar arasındaki mesafeyi artırın */
   /* Daha düzenli yerleşim için */
}




.kampanya:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); /* Hover efektiyle görselin büyümesi */
}

.kampanya {
  width: 300px;
  height: auto;
  border-radius: 8px; /* Kampanya görselleri için kenar yumuşatma */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Hafif gölge ekleme */
  cursor: pointer;
}



.flas-urunler .urun-karti {
  cursor: pointer; /* Kartların tıklanabilir olduğunu belirtir */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}


.flas-urunler .urun-karti:hover {
  transform: scale(1.05); /* Kart üzerine gelindiğinde büyür */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Kart üzerine gelindiğinde gölge ekler */
}
.flas-urunler {
  width: 80%; /* Genişliği sınırlıyoruz */
  max-width: 1200px; /* Maksimum genişlik belirliyoruz */
  height: 250px; /* Yüksekliği kısaltıyoruz */
  margin: 0 auto; /* Sayfada ortalamak için */
  padding: 20px;
  background: linear-gradient(to right, #ff7f50, #ff4500);
  border-radius: 12px;
  margin-bottom: 40px; /* Alt boşluk */
}
.baslik {
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  color: #fff;
  gap: 8px;
}

.simsek-ikon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: yellow; /* İkon rengi */
}


.urun-listesi {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 5px 10px;
}
.urun-karti {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 180px;
  text-align: center;
  padding: 16px;
  position: relative;
}

.urun-resmi {
  position: relative;
}

.urun-resmi img {
  width: 10%;
  height: auto;
  border-radius: 8px;
}

.urun-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #ff4500;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
}

.urun-detay {
  margin-top: 10px;
}

.urun-fiyat {
  font-weight: bold;
  color: #ff4500;
}

.ek-bilgiler {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.ek-bilgi {
  background: #f0f0f0;
  color: #555;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.urun-indirim {
  color: #009688;
  font-size: 12px;
  margin-top: 8px;
}

.kategori-liste {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
}

.kategori-item {
  text-align: center;
  cursor: pointer;
}

.kategori-item img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.kategori-item h4 {
  margin-top: 8px;
  font-size: 14px;
}




.sepete-ekle-btn {
  background-color: #f90;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  font-size: 14px;
  transition: background-color 0.3s;
}

.sepete-ekle-btn:hover {
  background-color: #ff7f00;
}




.brands-slider {
  width: 80%; /* Genişliği sınırlıyoruz */
  max-width: 1200px; /* Maksimum genişlik belirliyoruz */
  height: 200px; /* Yüksekliği kısaltıyoruz */
  margin: 0 auto; /* Sayfada ortalamak için */
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}

.slider-container {
  display: flex;
  align-items: center;
  position: relative;
}

.slider {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 10px;
  padding: 10px 0;
  width: 100%;
}

.brand-item {
  flex: 0 0 auto;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.brand-item img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.brand-item:hover {
  transform: scale(1.05);
}

.arrow {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #555;
  padding: 10px;
  position: absolute;
  z-index: 1;
}

.arrow.left {
  left: 10px;
}

.arrow.right {
  right: 10px;
}

.arrow:hover {
  color: #000;
}
</style>
