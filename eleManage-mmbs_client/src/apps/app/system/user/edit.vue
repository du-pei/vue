<template>
    <el-form :model="form">
        <el-form-item label="用户名">
            <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="form.id == 0" label="密码">
            <el-input v-model="form.password" type="password" auto-complete="off"></el-input>
        </el-form-item>        
        <el-form-item label="显示名称">
            <el-input v-model="form.displayName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
            <el-input v-model="form.mobilePhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="form.email" auto-complete="off"></el-input>
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
