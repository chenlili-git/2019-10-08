<template>
  <div>
    <p>登录</p>用户名：
    <input type="text" v-model="val" />
    <button @click="login">登录</button>
    <button @click="reg">注册</button>
  </div>
</template>
//https://www.cnblogs.com/xuxinstyle/p/9675541.html  token
<script>
import {get,post} from '../api/api';
export default {
  data() {
    return {
      val: ""
    };
  },
  methods: {
    login() {
      post(this.val).then(data => {
        if (data.code === 0) {
          this.$router.push("/");
        } else {
          alert("登录失败");
        }
        this.val = "";
      });
    },
    reg() {}
  }
};
</script>

<style lang="scss" scoped>
</style>