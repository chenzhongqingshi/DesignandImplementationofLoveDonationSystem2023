<template>
  <div class="shopping">
<el-descriptions class="margin-top" title="" :column="4" direction="vertical" v-for="item in tableData">
  <el-descriptions-item label="商品名称">{{item.names}}</el-descriptions-item>
  <el-descriptions-item label="商品图片"><img :src="item.photo" style="height:50px"></el-descriptions-item>
  <el-descriptions-item label="所需积分">{{item.integral}}</el-descriptions-item>
  <el-descriptions-item label="点击兑换"><el-button type="primary" @click="exchange(item)">兑换</el-button></el-descriptions-item>
  <el-descriptions-item label="商品详情">{{item.details}}</el-descriptions-item>
</el-descriptions>

</div>
</template>

<script>
import axios from '@/axios/axios'
import qs from 'qs'
export default {
name:'shoppingMall',
data(){
   return{
    tableData:[],
    time:''
   }
},
methods:{
exchange(item){
  let data=qs.stringify({account:this.$store.state.user.account,item})
  axios.post('/user/exchange',data).then(response=>{

  },err=>{
    
  })
  this.$message('兑换成功')
}
},
 mounted(){
   this.time=setInterval(function(){
    axios.get('/user/shopping').then(response=>{
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
.shopping{
  background-color: rgb(236, 236, 235);
  margin: 0px;
  display: flex;
   flex-wrap: wrap;
}
.margin-top{
  width:31%;
  background-color: #ffff;
  padding:10px;
  margin: 5px;
  border-radius: 5px;
}
</style>