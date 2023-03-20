<template>
  <div>
   <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="region"
      label="地区"
      width="300">
    </el-table-column>
    <el-table-column
      prop="address"
      label="详细地址"
      width="350">
    </el-table-column>
    <el-table-column
      prop="material"
      label="所需物资"
      width="300">
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态"
      width="300">
      已送达
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
    time:''
    }
},
mounted(){
   this.time=setInterval(function(){
    let data=qs.stringify({account:this.$store.state.courier.account,state:2})
  axios.post('/courier/regionalDistribution',data).then(response=>{
    this.tableData=response.data
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