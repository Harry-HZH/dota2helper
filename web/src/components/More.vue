<template>
  <div class="page-more" v-if="model" @touchstart="touchStart($event)" @touchend="touchEnd($event)">
    <div class="d-flex py-3 px-2">
      <div
        class="iconfont icon-back-line text-blue"
        @click="$router.go(-1)"
      ></div>
      <strong class="flex-1 text-blue pl-2"> 返回上一页 </strong>
    </div>
    <div
      v-for="item in model.slice(0,(newPage+1)*5)"
      :key="item._id"
      class="px-3 fs-lg py-4 more-item"
    >
    <router-link :to="`/${from}/${item._id}`">
      <span>{{ item.title }}</span>
    </router-link>
      
    </div>
    <div class="load-more" v-show="loadMore">{{ loadMoreText }}</div>
    <div class="load-end" v-show="!loadMore">已经到底了!</div>
  </div>
</template>

<script>
export default {
  props: {
    model: {},
    //是否显示loading和加载文字
    initialLoadMore: {
      type: Boolean,
      default: true,
    },
    //加载更多
    onLoadMore: {
      type: Function,
      default: undefined,
      require: false,
    },
    from:{}
  },
  data() {
    return {
      loadMore: this.initialLoadMore,
      // 上拉出现的文字
      loadMoreText: "上拉加载更多",
      // 起始位置
      startX: 0,
      startY: 0,
      // 是否显示loading
      isLoading: false,
      newPage:0
    };
  },
  methods: {

        touchStart(e) {
            //获取点击的初始位置
            this.startY = e.targetTouches[0].pageY;
            this.startX = e.targetTouches[0].pageX;  
        },
        scrollToEnd() {
            // 如果组件是基于body或者其他父元素进行滚动，则下面获取的对象为相应的对象
            let scrollHeight = this.$el.scrollHeight; 
            let clientHeight = this.$el.clientHeight; 
            let scrollTop = this.$el.scrollTop;  
            
            if (scrollTop + clientHeight >= scrollHeight || this.loadMore) {
                this.doLoadMore()  
            } 
        },
        touchEnd(e) {
            if (this.isLoading) {
                return;
            }

            let endX = e.changedTouches[0].pageX,
                endY = e.changedTouches[0].pageY,
                dy = this.startY - endY,
                dx = endX - this.startX;
            if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                return;
            }
            if (endY < this.startY) {
                this.scrollToEnd(e)
            }
        },
        doLoadMore() {
            this.isLoading = true
            // this.loadMoreText = '加载中...'
            alert('加载中。。。')
            this.newPage = this.newPage+1
            if((this.newPage+1)*5>=this.model.length){
              this.loadMore = false
              return
            }
            this.onLoadMore(this.loadDone);
        },
        loadDone() {
            this.isLoading = false;
            this.loadMoreText = '上拉加载更多'
        }
    }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
html{
  height: 100%;
}
.card {
  border-bottom: 1px solid $border-color;
}
.more-item {
  border: 1px solid $border-color;
}
.page-more {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transition-duration: 300ms;
  .load-more, .load-end {
        color: #aea699;
        font-size: .26rem;
        margin: .3rem 0;
        text-align: center;
    }
}
</style>