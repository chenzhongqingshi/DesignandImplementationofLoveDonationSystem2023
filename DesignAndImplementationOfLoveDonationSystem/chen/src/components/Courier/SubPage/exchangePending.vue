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
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="retrieved(scope.row.account,scope.row.names)" type="text" size="small">点击已取</el-button>
      </template>
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
methods:{
retrieved(account,names){
let data=qs.stringify({courier:this.$store.state.courier.account,account,names,state:1,a:0})
axios.post('/courier/userRedemption',data).then(response=>{

},err=>{

})
this.dialogVisible=false
}
},
mounted(){
   this.time=setInterval(function(){
    let data=qs.stringify({courier:this.$store.state.courier.account,state:0,a:1})
  axios.post('/courier/userRedemption',data).then(response=>{
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