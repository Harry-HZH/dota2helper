<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2">
      <div class="iconfont icon-back-line text-blue" @click="$router.go(-1)"></div>
      <strong class="flex-1 text-blue pl-2">
        {{ model.name }}
      </strong>
      <div class="text-grey">{{ model.createdAt | date }}</div>
    </div>
    <div class="video-iframe">
        <iframe :src="model.url" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" class="w-100 h-100"> </iframe>
    </div>
    
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

  methods: {
    async fetch() {
      const res = await this.$http.get(`videos/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">

</style>