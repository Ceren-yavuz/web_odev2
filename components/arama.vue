<template>
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

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AramaComponenti',
  data() {
    return {
      categories: [
        { id: 1, name: 'İyi Fiyatlı Ürünler', image: '/icon1.jpg' },
        { id: 2, name: 'Sen De Al!', image: '/icon2.jpg' },
        { id: 3, name: 'Avantajlı Ürünler', image: '/icon3.jpg' },
        { id: 4, name: 'İndirim Kuponlarım', image: '/icon4.jpg' },
        { id: 5, name: 'Krediler', image: '/icon5.jpg' },
        { id: 6, name: 'Kredi Kartı', image: '/icon6.jpg' },
        { id: 7, name: 'Yeni Gelen Ürünler', image: '/icon7.jpg' },
      ],
    };
  },
  methods: {
    handleClick(categoryId: number) {
      console.log(`Category clicked: ${categoryId}`);
      // İlgili işlem burada yapılabilir
    },
  },
});
</script>

<style scoped>
.arama-componenti {
  display: flex;
  justify-content: center;
  align-items: center;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 118px;
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
  padding: 25px 30px;
  border: none;
  border-radius: 15px;
  font-size: 30px; /* yazı boyutu */
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
</style>
