<template>
  <div>
   <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="account"
      label="用户账号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="region"
      label="地区"
      width="200">
    </el-table-column>
    <el-table-column
      prop="address"
      label="详细地址"
      width="350">
    </el-table-column>
    <el-table-column
      prop="names"
      label="兑换商品"
      width="200">
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态"
      width="200">
      已送达
    </el-table-column>
    </el-table-column>
  </el-table>
     

  </div>
</template>

<script>
import qs from 'qs'
import axios from '@/axios/axios'
export default {
name:"administratorsUserPending",
data(){
  return{
    dialogVisible: false,
    formLabelWidth: '120px',
    courier:'',
    tableData:[],
    time:""
    }
},
mounted(){
   this.time=setInterval(function(){
     let data=qs.stringify({courier:this.$store.state.courier.account,state:2,a:1})
  axios.post('/courier/userRedemption',data).then(response=>{
    this.tableData=response.data
    console.log(response.data)
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