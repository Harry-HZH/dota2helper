<template>
  <div class="page-hero" v-if="model.banner">
    <div
      class="bg-black py-2 px-3 d-flex ai-center text-white"
      ref="header"
      :class="headerFixed ? 'topbar fixed' : 'topbar'"
    >
      <img src="../assets/DOta2.jpg" height="30px" />
      <div class="px-2 flex-1">
        <span>刀塔2</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link tag="div" to="/">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{ 'background-image': `url(${model.banner})` }">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div>{{ model.title }}</div>
        <h2 class="my-2">{{ model.name }}</h2>
        <div class="my-1 fs-sm">
          {{ model.categories.map((v) => v.name).join("/") }}
        </div>
        <div class="d-flex jc-between">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="difficult bg-grey">{{ model.scores.difficult }}</span>
            <span>力量</span>
            <span class="badge bg-strength">{{ model.scores.strength }}</span>
            <span>敏捷</span>
            <span class="badge bg-agility">{{ model.scores.agility }}</span>
            <span>智力</span>
            <span class="badge bg-intelligence">{{
              model.scores.intelligence
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- end of top -->
    <div>
      <div class="bg-white px-2">
        <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom">
              <div class="d-flex">
                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                  <i class="iconfont icon-bofang"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon-tupian1"></i>
                  英雄介绍视频
                </router-link>
              </div>
              <!-- skills -->
              <div class="skills mt-4 bg-white">
                <div class="d-flex jc-around">
                  <img
                    class="icon"
                    @click="currentSkillIndex = i"
                    :class="{ active: currentSkillIndex === i }"
                    :src="item.icon"
                    v-for="(item, i) in model.skills"
                    :key="item.name"
                  />
                </div>
                <div v-if="currentSkill" class="pt-4 pb-3">
                  <div class="d-flex">
                    <h3 class="m-0">{{ currentSkill.name }}</h3>
                    <div class="text-grey-1 ml-4">
                      (冷却值：{{ currentSkill.delay }} 消耗：{{
                        currentSkill.cost
                      }})
                    </div>
                  </div>
                  <p>{{ currentSkill.description }}</p>
                  <div class="border-bottom"></div>
                  <p class="text-grey-1">小提示：{{ currentSkill.tips }}</p>
                </div>
              </div>
            </div>
            <m-card plain icon="Menu" title="出装推荐" class="hero-items">
              <div class="fs-xl">顺风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" class="icon" />
                  <div class="fs-sm">{{ item.name }}</div>
                </div>
              </div>
              <div class="border-bottom mt-3"></div>
              <div class="fs-xl mt-3">逆风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items2" :key="item.name">
                  <img :src="item.icon" class="icon" />
                  <div class="fs-sm">{{ item.name }}</div>
                </div>
              </div>
            </m-card>
            <m-card plain icon="Menu" title="使用技巧">
              <p class="m-0">{{ model.usageTips }}</p>
            </m-card>
            <m-card plain icon="Menu" title="对抗技巧">
              <div class="m-0">{{ model.battleTips }}</div>
            </m-card>
            <m-card plain icon="Menu" title="团战思路">
              <div class="m-0">{{ model.teamTips }}</div>
            </m-card>
            <m-card plain icon="Menu" title="英雄关系">
              <div class="fs-xl">最佳搭档</div>
              <div
                v-for="item in model.partners"
                :key="item.name"
                class="d-flex pt-4"
              >
                <img :src="item.hero.avatar" alt="" height="50" />
                <p class="flex-1 m-0 ml-3">
                  {{ item.description }}
                </p>
              </div>
            </m-card>
          </div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      currentSkillIndex: 0,
      model: { banner: "" },
      fixed_offsetTop: 0,
      fixed_offsetHeight: 0,
      headerFixed: false,
    };
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    },
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      let header = this.$refs.header;

      this.headerFixed = scrollTop > header.offsetHeight - header.offsetTop; // eslint-disable-line
    },
    async fetch() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.model = res.data;
      console.log(this.model);
    },
  },
  created() {
    this.fetch();
  },
  mounted() {
    this.$nextTick(() => {
      // 监听滚动条
      window.addEventListener("scroll", this.handleScroll);
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
  
<style lang="scss">
@import "../assets/scss/_variables.scss";

.page-hero {
  .top {
    height: 50vw;
    background-size: auto 100%;
    background: #fff no-repeat top center;
  }
  .skills {
    img.icon {
      width: 70px;
      height: 70px;
      border: 3px solid map-get($map: $colors, $key: "white");
      &.active {
        border-color: map-get($map: $colors, $key: "primary");
      }
    }
  }
  .hero-items {
    img.icon {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
  .info {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 3rem;
        height: 1.7rem;
        line-height: 1.7rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.75rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      .difficult {
        margin: 0 0.25rem;
        border-radius: 50%;
        display: inline-block;
        text-align: center;
        width: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>