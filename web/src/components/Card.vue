<template>
  <div class="card p-3 mt-3 bg-white">
    <div
      class="card-header d-flex ai-center"
      :class="{ 'border-bottom': !plain, 'pb-3': !plain }"
    >
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2">
        <strong>{{ title }}</strong>
      </div>
      <router-link :to="`/moreContent/${mySelf}`">
        <i class="iconfont icon-menu" v-if="!plain"></i>
      </router-link>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      requird: true,
    },
    icon: {
      type: String,
      requird: true,
    },
    plain: {
      type: Boolean,
    },
    mySelf: {
      type: String,
      requird: true,
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.card {
  border-bottom: 1px solid $border-color;
}
</style>