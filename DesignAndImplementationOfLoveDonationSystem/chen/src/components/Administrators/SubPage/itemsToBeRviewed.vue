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
        <el-button @click="adopt(tableData[0].account,tableData[0].photo)" type="text" size="small">通过</el-button>
        <el-button type="text" size="small" @click="remark(tableData[0].account,tableData[0].photo)">不通过</el-button>
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
        <el-button @click="adopt(item.account,item.photo)" type="text" size="small">通过</el-button>
        <el-button type="text" size="small" @click="remark(item.account,item.photo)">不通过</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="备注" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="填写备注" :label-width="formLabelWidth">
      <el-input v-model="remarks" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="auditFailed()">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
import axios from '@/axios/axios'
export default {
name:"itemsToBeRviewed",
data(){
  return{
    tableData:[],
    dialogFormVisible:false,
    formLabelWidth: '120px',
    DData:{
      account:'',
      photo:'',
      remarks:'',
      time:''
    },
    remarks:''
  }
},
methods:{
  remark(account,photo){
     this.DData.account=account
     this.DData.photo=photo
     console.log(account,photo)
     this.dialogFormVisible=true
  },
adopt(account,photo){
  let data=qs.stringify({
        account,
        photo
  })
  axios.post('/administrators/clickToPass',data).then(response=>{
         this.$message(response.data)
  },err=>{
console.log(err)
  })
},
auditFailed(){

  this.DData.remarks=this.remarks
  let data=qs.stringify(this.DData)
  
  axios.post('/administrators/auditFailed',data).then(response=>{
         this.$message(response.data)
  },err=>{
console.log(err)
  })
  this.remarks=''
  this.DData={}
  this.dialogFormVisible = false
}
},
mounted(){
   this.time=setInterval(function(){
    axios.get('/administrators/pending').then(response=>{
           this.tableData=response.data
  },err=>{})
   },500)
    },
beforeDestroy(){
      clearInterval(this.time)
},
}
</script>

<style>

</style>