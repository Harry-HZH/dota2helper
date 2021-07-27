<template>
  <m-more :model="model" :page="page" :onLoadMore="onLoadMore" :initialLoadMore="loadMore" :from="from"></m-more>
</template>
<script>
import dayjs from "dayjs";
export default {
  filters: {
    Moredate(val) {
      return dayjs(val).format("M/DD");
    },
  },
  props: {
    mySelf: { required: true },
  },
  data() {
    return {
      model: null,
      loadMore: true,
      page: 0,
      from: String
    };
  },

  methods: {
    onLoadMore(done) {
      setTimeout(() => {
        if (!this.loadMore) {
          return;
        }
        done();
      }, 200);
    },
    fromWhere(){
      if(this.$route.params.mySelf === 'news'){
        this.from = 'articles'
      }
    },
    async fetch() {
      const res = await this.$http.get(`${this.$route.params.mySelf}/listAll`);
      this.model = res.data;
      if (this.model.length < 6) {
        this.loadMore = false;
      }
      console.log(res);
    },
  },
  created() {
    console.log(this.$route.params.mySelf);
    this.fetch();
    this.fromWhere()
  },
};
</script>

<style lang="scss">
.page-article {
  .icon-back-line {
    font-size: 1.2rem;
    align-items: center;
  }
  img {
    max-width: 100%;
    height: auto;
  }
}
</style>