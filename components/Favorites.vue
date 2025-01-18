<template>
  
  <div>
    
    <!-- Buttons Section -->
    <div class="buttons">
      <button
          v-for="(button, index) in buttons"
          :key="button.label"
          :class="['button', button.color, { active: button.active }]"
          @click="toggleButton(button)"
      >
        <FontAwesomeIcon :icon="button.icon" class="icon" />
        {{ button.label }}
      </button>
      <button class="remove-button" @click="removeFromCart(product)">
        <FontAwesomeIcon icon="fa-xmark" />
      </button>

    </div>

    <!-- Cards Section -->
    <div class="cards">
      <div class="card" v-for="product in products" :key="product.id">

        <!-- Remove Button -->
        <button class="remove-button" @click="removeFromCart(product)">
          <FontAwesomeIcon icon="fa-xmark" />
        </button>
        <!-- Product Image -->
        <img :src="product.image" alt="Product Image" />
        <!-- Product Details -->
        <div class="details">
          <h3>{{ product.title }}</h3>
          <p class="description">{{ product.description }}</p>
          <p class="stock-info" v-if="product.stock">{{ product.stockInfo }}</p>
          <p class="price">{{ product.price }} TL</p>
          <div class="size-and-cart">
            <!-- Size Dropdown -->
            <select class="size-dropdown" v-model="product.selectedSize">
              <option v-for="size in product.sizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>

            <!-- Add to Cart Button -->
            <button class="add-to-cart" @click="addToCart(product)">
              <FontAwesomeIcon icon="fa-cart-plus" />
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// Tip tanımlamaları
interface Button {
  label: string;
  color: string;
  icon: string;
  active: boolean;
}

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  sizes: string[];
  selectedSize: string;
  stock: boolean;
  stockInfo: string;
}

// `ref`'ler için type tanımlamaları
const buttons = ref<Button[]>([
  { label: 'Tümü', color: 'orange', icon: 'fa-heart', active: true },
  { label: 'Kuponlu Ürünler', color: 'pink', icon: 'fa-ticket-alt', active: false },
  { label: 'Fiyatı Düşenler', color: 'red', icon: 'fa-chart-line', active: false },
  { label: 'Avantajlı Ürünler', color: 'blue', icon: 'fa-star', active: false },
]);

const products = ref<Product[]>([
  {
    id: 1,
    image: '/fener.jpg',
    title: 'Fenerbahçe 2023/24 A Takım Forma',
    description: 'Fenerbahçe forma.',
    price: 1450,
    sizes: ['S', 'M', 'L', 'XL'],
    selectedSize: 'M',
    stock: false,
    stockInfo: '134 kişinin sepetinde, kaçırma!',
  },
  {
    id: 2,
    image: '/fener2.jpg',
    title: 'Fenerbahçe Erkek 2023/24 Deplasman Forması',
    description: 'Yüksek kaliteli forma.',
    price: 1379.95,
    sizes: ['S', 'M', 'L', 'XL'],
    selectedSize: 'L',
    stock: false,
    stockInfo: '50 TL Kupon',
  },
  {
    id: 3,
    image: '/images/urun3.jpg',
    title: 'Fenerbahçe 2022/23 A Takım Tek Alt',
    description: 'Takım tek alt pantolonu.',
    price: 1299.90,
    sizes: ['XS', 'S', 'M', 'L'],
    selectedSize: 'M',
    stock: true,
    stockInfo: 'Hızlı teslimat yapılıyor!',
  },
]);

// Fonksiyonların tip tanımlamaları
const toggleButton = (button: Button): void => {
  buttons.value.forEach((btn) => (btn.active = false));
  button.active = true;
};

const addToCart = (product: Product): void => {
  alert(`${product.title} sepete eklendi!`);
};

const removeFromCart = (product: Product): void => {
  alert(`${product.title} sepetten kaldırıldı!`);
};

</script>

<style scoped>
/* Button Styles */
.buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.button {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  color: #fff;
  transition: background-color 0.3s;
  font-weight: bold;
  gap: 10px;
  border-radius: 20px;
}

.button.orange {
  background: #f39c12;
}

.button.pink {
  background: #e91e63;
}

.button.red {
  background: #e74c3c;
}

.button.blue {
  background: #3498db;
}

.button.active.orange {
  background: #d35400;
}

.button.active.pink {
  background: #c2185b;
}

.button.active.red {
  background: #c0392b;
}

.button.active.blue {
  background: #2980b9;
}

.icon {
  font-size: 16px;
}
/* Cards Section */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  background: #fff;
  position: relative;
}

.card img {
  width: 100%;
  height: auto;
}

.details {
  padding: 15px;
}

.details .price {
  font-weight: bold;
  margin: 10px 0;
}
.remove-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #e74c3c; /* Daha dikkat çekici bir kırmızı */
  cursor: pointer;
  font-size: 24px; /* X ikonunu biraz daha büyük yap */
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-button:hover {
  color: #c0392b; /* Hover'da daha koyu bir kırmızı */
}


/* Size Dropdown */
.size-and-cart {
  display: flex;
  align-items: center;
  gap: 10px; /* Butonlar arasında boşluk */
  margin-top: 10px; /* Üstteki elementten boşluk */
}

.size-dropdown {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 14px;
}

/* Add to Cart Button */
.add-to-cart {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 15px;
  background: #0057b8;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
}

.add-to-cart {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 15px;
  background: #0057b8;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.add-to-cart:hover {
  background: #004494;
}

.out-of-stock {
  color: #e74c3c;
  font-weight: bold;
}
</style>
