<template>
  <el-form :model='form' :rules='rules' ref='form' label-width="80px">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label='用户名' prop='username'>
          <el-input v-model='form.username'></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label='显示名称' prop='displayName'>
          <el-input v-model='form.displayName' auto-complete='off'></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item v-if='form.id == 0' label='密码' prop='password'>
          <el-input v-model='form.password' type='password' auto-complete='off'></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item v-if='form.id == 0' label='重复密码' prop='rePass'>
          <el-input v-model='form.rePass' type='password' auto-complete='off'></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label='联系电话'>
          <el-input v-model='form.mobilePhone' auto-complete='off'></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label='邮箱'>
          <el-input v-model='form.email' auto-complete='off'></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { saveUser, registerUser, getObjectDataByName } from '@/api/user';
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value);
      if (value === '' || value === undefined) {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.rePass !== '') {
          this.$refs.form.validateField('rePass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validateDname = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入显示名称'));
      } else {
        getObjectDataByName('displayName', value).then(res => {
          if (res && res.success) {            
            if (res.result.length > 0) {
              callback(new Error('名称已存在，换一个吧'));
            }
          }
        })
      }
    };
    return {
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '长度最少3个字符', trigger: 'blur' }
        ],
        displayName: [{ required: true, message: '请输入用户名', validator: validateDname, trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', validator: validatePass, trigger: 'blur' }],
        rePass: [{ required: true, message: '请输入重复密码', validator: validatePass2, trigger: 'blur' }]
      }
    };
  },
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
      required: true
    }
  },
  methods: {
    onUpdate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const userData = this.form;
          saveUser(userData)
            .then(res => {
              if (res && res.success) {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.$emit('handleClseDialog');
                this.$emit('refreshList');
              } else {
                this.$message.error('操作失败');
              }
            })
            .catch(result => {
              this.$message({
                message: (result && result.error && result.error.message) || '保存失败！',
                type: 'error'
              });
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onRegister() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('showLoading');
          const userData = this.form;
          registerUser(userData)
            .then(res => {
              if (res && res.success) {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.$emit('handleClseDialog');
                this.$emit('refreshList');
              } else {
                this.$message.error('操作失败');
              }
            })
            .catch(result => {
              this.$message({
                message: (result && result.error && result.error.message) || '保存失败！',
                type: 'error'
              });
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
