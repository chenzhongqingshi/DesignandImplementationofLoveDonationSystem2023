<template>
<div>
    <router-view></router-view>
</div>
</template>

<script>

export default {
  name: 'App',
  mounted(){
    this.$router.push({
      name:'login'
    })
    console.log(this)
   },
  methods:{
   
  },
  components: {
   
  }
}
</script>

<style>

</style>
