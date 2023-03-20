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
        <el-button @click="record(scope.row.region,scope.row.address)" type="text" size="small">选择物流员</el-button>
      </template>
    </el-table-column>
  </el-table>
     
<el-dialog title="选择物流员" :visible.sync="dialogFormVisible">
  <el-form >
    <el-form-item label="物流员" :label-width="formLabelWidth">
      <el-select v-model="courier" placeholder="请选择物流员">
        <el-option v-for="item in tableValue" :label="item.name" :value="item.account"></el-option>
        
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="choice">确 定</el-button>
  </div>
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
    dialogFormVisible: false,
    formLabelWidth: '120px',
    courier:'',
    tableData:[],
    tableValue:[],
    DData:{},
    time:''
    }
},
methods:{
record(region,address){
  this.DData={
    region,
    address
  }
  axios.get('/administrators/courier').then(response=>{
     this.tableValue=response.data
  },err=>{

  })
  this.dialogFormVisible=true
},
choice(){
this.DData.courier=this.courier
let data=qs.stringify(this.DData)
axios.post('/administrators/regionalTasks',data).then(response=>{

},err=>{

})
this.dialogFormVisible = false
}
},
mounted(){
   this.time=setInterval(function(){
    axios.get('/administrators/regionList').then(response=>{
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