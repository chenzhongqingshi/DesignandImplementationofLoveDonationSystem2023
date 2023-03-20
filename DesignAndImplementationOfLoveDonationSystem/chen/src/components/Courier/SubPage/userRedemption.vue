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
        <el-button @click="record(scope.row.account,scope.row.names)" type="text" size="small">点击领取</el-button>
      </template>
    </el-table-column>
  </el-table>
     
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>确认是否领取该任务？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="receive">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import axios from '@/axios/axios'
import qs from 'qs'
export default {
name:"administratorsUserPending",
data(){
  return{
    dialogVisible: false,
    formLabelWidth: '120px',
    courier:'',
    tableData:[],
    DData:{},
    time:""
    }
},
methods:{
record(account,names){
this.DData={
  account,
  names
}
this.dialogVisible = true
},
receive(){
  this.DData.courier=this.$store.state.courier.account
  this.DData.state=0
  this.DData.a=0
let data=qs.stringify(this.DData)
axios.post('/courier/userRedemption',data).then(response=>{

},err=>{

})
this.dialogVisible = false
}
},
mounted(){
   this.time=setInterval(function(){
       let data=qs.stringify({account:this.$store.state.courier.account,courier:'00000000000'})
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