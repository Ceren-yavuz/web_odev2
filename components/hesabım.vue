<template>
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
  </template>
  
  <script>
  export default {
  name: "Arama",
  data() {
    return {
      searchQuery: "",
      showDropdown: false,
      recentSearches: ["Lenovo", "iPhone"],
      popularSearches: ["Skechers", "Robot Süpürge", "Bileklik", "Baharatlık"],
      products: [
        { name: "Ürün 1", image: "/saat.png", price: "100 TL" },
        { name: "Ürün 2", image: "/telefon.png", price: "200 TL" },
        { name: "Ürün 3", image: "/televizyon.png", price: "300 TL" },
        { name: "Ürün 4", image: "/ütü.png", price: "400 TL" },
      ],
      currentIndex: 0,
    };
  },
  computed: {
    visibleProducts() {
      return this.products.slice(this.currentIndex, this.currentIndex + 2);
    },
  },
  methods: {
    hideDropdown() {
      setTimeout(() => {
        this.showDropdown = false;
      }, 200);
    },
    nextSlide() {
      this.currentIndex =
        (this.currentIndex + 1) % (this.products.length - 1 || 1);
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.products.length) %
        (this.products.length - 1 || 1);
    },
  },
};
  </script>
  
  <style scoped>
  .dropdown {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
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
  </style>
  