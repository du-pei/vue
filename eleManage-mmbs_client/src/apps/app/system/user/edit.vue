<template>
    <el-form :model="form">
        <el-form-item label="用户名">
            <el-input v-model="form.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="显示名称">
            <el-input v-model="form.displayName" auto-complete="off"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
      required: true
    }
  }
};
</script>
