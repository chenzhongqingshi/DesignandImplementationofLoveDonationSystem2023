<template>
  <div>
   <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="region"
      label="地区"
      width="300">
    </el-table-column>
    <el-table-column
      prop="address"
      label="详细地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="material"
      label="所需物资"
      width="350">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="record(scope.row.region,scope.row.address)" type="text" size="small">点击领取</el-button>
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
    <el-button type="primary" @click="retrieved">确 定</el-button>
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
    DDtata:{},
    time:''
    }
},
methods:{
record(region,address){
  this.DDtata={
    region,
    address,
  }
  this.dialogVisible=true
},
retrieved(){
  this.DDtata.account=this.$store.state.courier.account
  let data=qs.stringify(this.DDtata)
axios.post('/courier/regionalTasks',data).then(response=>{

},err=>{

})
this.dialogVisible=false
}
},
mounted(){
   this.time=setInterval(function(){
     axios.get('/courier/regionList').then(response=>{
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