<template>
  <div>

  <el-descriptions class="margin-top" title="" :column="2" :size="size" border v-for="item in tableData">
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        使用积分
      </template>
      {{item.integral}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        商品名称
      </template>
      {{item.names}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        商品状态
      </template>
      <i v-if="item.state==2">已送达</i>
       <i v-if="item.state==1">已取件</i>
        <i v-if="item.state==0">待取件</i>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        商品图片
      </template>
      <img :src="item.photo" style="height:50px">
    </el-descriptions-item>
  </el-descriptions>
  </div>
</template>

<script>
import qs from 'qs'
import axios from '@/axios/axios'
export default {
name:"exchangeItems",
data(){
  return{
    tableData:[],
    time:''
  }
},
mounted(){
   this.time=setInterval(function(){
    let data=qs.stringify({account:this.$store.state.user.account})
   axios.post('/user/commodity',data).then(response=>{
     this.tableData=response.data

   },err=>{

   })
   },500)
    },
beforeDestroy(){
      clearInterval(this.time)
},

}  
</script>

<style>

</style>