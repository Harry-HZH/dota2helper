<template>
  <m-card :icon="icon" :title="title" :mySelf="mySelf" >
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{ active: active === i }"
        v-for="(category, i) in categories"
        :key="i"
        @click="$refs.list.swiper.slideTo(i)"
      >
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <div class="mt-2">
      <swiper
        ref="list"
        :options="{
          observer: true,
          observeParents: true,
          autoHeight: true,
        }"
        @slide-change="() => (active = $refs.list.swiper.realIndex)"
      >
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true },
    mySelf:{type:String,required:true}
  },
  data() {
    return {
      active: 0,
      options: {},
    };
  },
  methods: {},
};
</script>

<style>
.swiper-wrapper {
  height: auto;
}
</style>