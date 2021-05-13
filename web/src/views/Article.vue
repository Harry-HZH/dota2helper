<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2">
      <div class="iconfont icon-back-line text-blue" @click="$router.go(-1)"></div>
      <strong class="flex-1 text-blue pl-2">
        {{ model.title }}
      </strong>
      <div class="text-grey">{{ model.createdAt | date }}</div>
    </div>
    <div v-html="model.body" class="px-3 fs-lg border-top"></div>
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
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: null,
    };
  },
  metaInfo: {
    meta: [
      {
        name: "referrer",
        content: "no-referrer",
      },
    ],
  },

  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
.page-article {
  .icon-back-line{
    font-size: 1.2rem;
    align-items: center;
  }
  img {
      max-width: 100%;
      height: auto;
    }
}
</style>