<template>
  <div>
    <div class="bg-black py-2 px-3 d-flex ai-center" ref="header" :class="headerFixed?'topbar fixed':'topbar'">
      <img src="../assets/DOta2.jpg" height="30px" />
      <div class="px-2 flex-1">
        <div class="text-white">刀塔2官方助手</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
      fixed_offsetTop: 0,
      fixed_offsetHeight: 0,
      headerFixed: false
    }
  },
  methods: {
    handleScroll(){
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
        
      let header = this.$refs.header;
      
      this.headerFixed = scrollTop > header.offsetHeight - header.offsetTop // eslint-disable-line
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 监听滚动条
      window.addEventListener("scroll", this.handleScroll); 
    });

  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style lang="scss">
.topbar {
  position: relative;
  z-index: 999;
  &.fixed{
    width: 100%;
    position: fixed;
    top: 0;
  }
}
</style>
<style>
img[lazy="loading"]{
  display:block;
  width:59px !important;
  height:71.4px !important;
  }
</style>