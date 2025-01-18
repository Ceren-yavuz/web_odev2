<template>
  <div class="cart-container">
    <!-- Sol Kısım: Sepet ve İndirim -->
    <div class="cart-left">
      <h1>Sepetim ({{ cartItems.length }} Ürün)</h1>

      <!-- İndirim Kuponları -->
      <div class="discount-section">
        <h3>İndirim Kuponlarım</h3>
        <div class="coupon-card">
          <div class="coupon-left">
            <div class="coupon">
              <div class="coupon-info">
                <span class="highlight">Son 1 Gün!</span>
                <p>Favorilediğin Ürüne Özel! ❤️</p>
                <small>Alt Limit: 2.750 TL</small>
              </div>
              <button class="apply-button">Ürün Ekle & Uygula</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sepet Ürünleri -->
      <div class="cart-products">
        <div class="product-header">
          <span>Satıcı: Taraftarium</span>
          <span class="badge">8.6</span>
          <span class="free-shipping">Kargo Bedava!</span>
        </div>
        <div v-for="(item, index) in cartItems" :key="item.id" class="product-item">
          <div class="product-info">
            <img
                :src="item.image"
                :alt="item.name"
                class="product-image"
            />
            <div>
              <h4>{{ item.name }}</h4>
              <p>Beden: {{ item.size }}</p>
              <p class="delivery-time">
                ⏰ 7 saat 21 dakika içinde sipariş verirsen, <strong>yarın kargoda!</strong>
              </p>
            </div>
          </div>
          <div class="product-actions">
            <div class="quantity">
              <button @click="decreaseQuantity(index)" :disabled="item.quantity === 1">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(index)">+</button>
            </div>
            <span class="price">{{ item.price * item.quantity }} TL</span>
            <button class="delete" @click="removeItem(index)">Sil</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Sağ Kısım: Sipariş Özeti -->
    <div class="order-summary">
      <h3>Sipariş Özeti</h3>
      <div class="summary-item">
        <span>Ürünün Toplamı</span>
        <span>{{ cartTotal }} TL</span>
      </div>
      <div class="summary-item">
        <span>Kargo Toplam</span>
        <span>39,99 TL</span>
      </div>
      <div class="summary-item">
        <span>200 TL ve Üzeri Kargo Bedava</span>
        <span class="discount">-39,99 TL</span>
      </div>
      <div class="summary-total">
        <span>Toplam</span>
        <span>{{ cartTotal }} TL</span>
      </div>
      <button class="checkout-button">Sepeti Onayla</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";

// Reactive state for cart items
const cartItems = reactive([
  {
    id: 1,
    name: "Fenerbahçe 2023/2024 Yeni Sezon Çubuklu Maç Forması",
    size: "L",
    image: "/fener.jpg",
    price: 1949,
    quantity: 1,
  },
  // İleride ek ürünler buraya eklenebilir.
]);

// Computed property for cart total
const cartTotal = computed(() =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
);

// Method to increase item quantity
const increaseQuantity = (index: number) => {
  cartItems[index].quantity += 1;
};

// Method to decrease item quantity
const decreaseQuantity = (index: number) => {
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity -= 1;
  }
};

// Method to remove item from cart
const removeItem = (index: number) => {
  cartItems.splice(index, 1);
};
</script>

<style scoped>
/* Tüm CSS'ler buraya eklendi */
.cart-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.cart-left {
  flex: 3;
}

h1 {
  margin-bottom: 20px;
}

.discount-section {
  background: #fef5e6;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.coupon-card {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px dashed #ffa726;
  border-radius: 8px;
  padding: 15px;
  gap: 15px;
}

.coupon-left {
  text-align: center;
  background: #fffbf4;
  padding: 30px 60px;
  border-radius: 8px;
  border: 1px solid #ffa726;
}

.apply-button {
  margin-top: 10px;
  padding: 8px 15px;
  border: 1px solid #ffa726;
  background: transparent;
  color: #ffa726;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.apply-button:hover {
  background: #ffa726;
  color: #fff;
}

.cart-products {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.badge {
  background: #4caf50;
  color: white;
  padding: 3px 5px;
  border-radius: 3px;
}

.free-shipping {
  color: #007bff;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid #ddd;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}

.delivery-time {
  color: #28a745;
  font-size: 12px;
}

.product-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 5px;
}

.quantity button {
  background: #ddd;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.price {
  font-weight: bold;
}

.delete {
  background: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.order-summary {
  flex: 1;
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 16px;
}

.checkout-button {
  width: 100%;
  background: #f90;
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
</style>
