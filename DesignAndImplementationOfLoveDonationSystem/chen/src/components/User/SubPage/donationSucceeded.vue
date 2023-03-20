<template>
<div>
  <el-descriptions class="margin-top" title="" :column="2" :size="size" border v-for="item in tableData">
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        物品类型
      </template>
      {{item.itemtype}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        获得积分
      </template>
      5
    </el-descriptions-item>
    
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        物品图片
      </template>
      <img :src="item.photo" style="height:50px">
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        物品描述
      </template>
      {{item.itemdescribe}}
    </el-descriptions-item>
  </el-descriptions>
</div>
</template>

<script>
import qs from 'qs'
import axios from '@/axios/axios'
export default {
name:"donationSucceeded",
data(){
  return {
    tableData:[],
    time:''
  }
},
mounted(){
   this.time=setInterval(function(){
   let data =qs.stringify({account:this.$store.state.user.account})
  axios.post('/user/success',data).then(response=>{
    
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