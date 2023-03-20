<template>
  <div>

  <el-descriptions class="margin-top" title="" :column="2" :size="size" border v-for="item in tableData" v-if="item.state!=5">
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
        物品状态
      </template>
      <i v-if="item.state==0">待审核</i>
       <i v-if="item.state==1">通过审核</i>
        <i v-if="item.state==2">待取</i>
         <i v-if="item.state==3">已取</i>
          <i v-if="item.state==4">入库</i>
          <i v-if="item.state==-1">不通过</i>

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
name:"itemStatus",
data(){
  return {
    size: '',
    tableData:[],
    time:''
  }
},
mounted(){
   this.time=setInterval(function(){
    let data=qs.stringify({account:this.$store.state.user.account})
axios.post('/user/itemStatus',data).then(response=>{
  this.tableData=response.data
  
},err=>{

})
   },500)
    },
    beforeDestroy(){
      clearInterval(this.time)
    }

}
</script>

<style scoped>
</style>