<template>
	<el-dialog :title="tilte" :visible.sync="_dialogFormVisible" :before-close="handleClose">
		<slot name="form"></slot>
		<slot name="footer"></slot>
	</el-dialog>
</template>

<script>
export default {
  name: 'formDialog',
  data() {
    return {
      _dialogFormVisible: false
    };
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default() {
        return false;
      },
      required: true
    },
    tilte: {
      type: String,
      default() {
        return '信息修改';
      },
      required: false
    }
  },
  created() {
    this._dialogFormVisible = this.dialogFormVisible;
  },
  watch: {
    dialogFormVisible() {
      this._dialogFormVisible = this.dialogFormVisible;
    },
    _dialogFormVisible() {
      this.dialogFormVisible = this._dialogFormVisible;
    }
  },
  methods: {
    handleClose(done) {
      done();
      this.$emit('dgChange'); //子组件执行完方法后通知父组件
    }
  }
};
</script>
