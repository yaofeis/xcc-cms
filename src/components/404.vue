<template>
  <div id="error">
    <div>
      <span @click="back">返回首页</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "404",
    methods:{
      back(){
        this.$router.push('/Index');
      }
    }
  }
</script>

<style lang="scss">
  #error {
    width: 100%;
    height: 100%;
    background: url("../assets/404.jpg") center;
    position: relative;
    >div{
      position: absolute;
      bottom: 100px;
      text-align: center;
      width: 100%;
      >span{
        cursor: pointer;
        text-decoration: underline;
        &:hover{
          color: red;
        }
      }
    }
  }
</style>
