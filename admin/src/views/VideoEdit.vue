<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model="model.url"></el-input>
      </el-form-item>
      <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      categories: [],
    };
  },
  methods: {
    afterUpload(res){
      this.$set(this.model, 'icon', res.url)
      console.log(this.model.icon);
    },
    async save() {
      let res; // eslint-disable-line no-unused-vars
      if (this.id) {
        res = await this.$http.put(`rest/videos/${this.id}`, this.model); // eslint-disable-line no-unused-vars
      } else {
        res = await this.$http.post("rest/videos", this.model); // eslint-disable-line no-unused-vars
      }
      this.$router.push("/videos/list");
      this.$message({
        type: "success",
        message: "保存成功了",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/videos/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
  },
  created() {
    this.fetchParents();
    this.id && this.fetch();
  },
};
</script>

<style>

</style>