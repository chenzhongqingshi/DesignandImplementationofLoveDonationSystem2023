<template>
  <div>
   <el-table
    :data="[tableData[0]]"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="account"
      label="用户账号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="photo"
      label="物品照片"
      width="120">
      <img :src="tableData[0].photo" style="height:50px">
    </el-table-column>
    <el-table-column
      prop="region"
      label="地区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="详细地址"
      width="120">
    </el-table-column>
    <el-table-column
      prop="itemdescribe"
      label="物品描述"
      width="300">
    </el-table-column>
    <el-table-column
      prop="itemtype"
      label="物品类型"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="record(scope.row.account,scope.row.photo,scope.row.region)" type="text" size="small">选择物流员</el-button>
      </template>
    </el-table-column>
  </el-table>
     <el-table v-for="item in tableData.slice(1)"
    :data="[item]"
    border
    style="width: 100%"
    :show-header="false"
    >
    <el-table-column
      fixed
      prop="account"
      label="用户账号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="photo"
      label="物品照片"
      width="120">
      <img :src="item.photo" style="height:50px">
    </el-table-column>
    <el-table-column
      prop="region"
      label="地区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="详细地址"
      width="120">
    </el-table-column>
    <el-table-column
      prop="itemdescribe"
      label="物品描述"
      width="300">
    </el-table-column>
    <el-table-column
      prop="itemtype"
      label="物品类型"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="record(scope.row.account,scope.row.photo,scope.row.region)" type="text" size="small">选择物流员</el-button>
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
record(account,photo,region){
  this.DData={
    account,
    photo
  }
  let data=qs.stringify({region})
  axios.post('/administrators/courier',data).then(response=>{
     this.tableValue=response.data
  },err=>{

  })
  this.dialogFormVisible=true
},
choice(){
this.DData.courier=this.courier
let data=qs.stringify(this.DData)
axios.post('/administrators/userTasks',data).then(response=>{

},err=>{

})
this.dialogFormVisible=false
this.$message('分配任务成功')
}
},
mounted(){
   this.time=setInterval(function(){
    axios.get('/administrators/userUnclaimed').then(response=>{
           console.log(response.data)
           
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