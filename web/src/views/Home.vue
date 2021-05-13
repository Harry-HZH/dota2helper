<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide
        ><img class="w-100" src="../assets/images/1.jpg"
      /></swiper-slide>
      <swiper-slide
        ><img class="w-100" src="../assets/images/2.jpg"
      /></swiper-slide>
      <swiper-slide
        ><img class="w-100" src="../assets/images/3.jpg"
      /></swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-2"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3" v-if="showdisplay">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3" v-if="showdisplay">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3" v-if="showdisplay">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3" v-if="showdisplay">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3" v-if="showdisplay">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3" v-if="showdisplay">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2" v-if="!showdisplay">
        <i
          class="sprite sprite-arrow mr-1"
          style="transform: rotate(180deg)"
          @click="showdisplay = !showdisplay"
        ></i
        ><span class="fs-sm">展开</span>
      </div>
      <div class="bg-light py-2" v-if="showdisplay">
        <i
          class="sprite sprite-arrow mr-1"
          @click="showdisplay = !showdisplay"
        ></i
        >
        <span class="fs-sm">收起</span>
      </div>
    </div>
    <!-- end of nav icons -->

    <m-list-card icon="Menu" title="新闻资讯" :categories="newsCats">
      <template v-slot:items="abc">
        <router-link
          tag="div"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in abc.category.newsList"
          :key="i"
          :to="`/articles/${news._id}`"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipse pr-2">{{
            news.title
          }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>
    <m-list-card icon="yingxiong" title="英雄列表" :categories="heroCats">
      <template v-slot:items="abc">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            class="p-2 text-center"
            style="width: 20%"
            v-for="(hero, i) in abc.category.heroList"
            :key="i"
            :to="`/heroes/${hero._id}`"
          >
            <img :src="hero.avatar" class="w-100" alt="" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <m-card icon="Menu" title="精彩视频"></m-card>
    <m-card icon="Menu" title="图文攻略"></m-card>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  filters: {
    date(val) {
      return dayjs(val).format("M/DD");
    },
  },
  data() {
    return {
      showdisplay: false,
      swiperOptions: {
        autoplay: true,
        loop: true,
        pagination: {
          el: ".pagination-home",
        },
        // Some Swiper option/callback...
      },
      newsCats: [],
      heroCats: [],
      reverseNewsCats: [],
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
      for (let i = 0; i < this.newsCats.length; i++) {
        this.newsCats[i].newsList.reverse();
      }
      this.reverseNewsCats = this.newsCats;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    },
  },

  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 2px;
    background: map-get($map: $colors, $key: "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav-icons {
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>