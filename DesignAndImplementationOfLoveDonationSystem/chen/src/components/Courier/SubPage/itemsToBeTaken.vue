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
      prop="tableData[0].photo"
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
        <el-button @click="record(tableData[0].account,tableData[0].photo)" type="text" size="small">点击已取</el-button>
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
      prop="item.photo"
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
        <el-button @click="record(item.account,item.photo)" type="text" size="small">点击已取</el-button>
      </template>
    </el-table-column>
  </el-table>

<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>确认是否已取？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="retrieved">确 定</el-button>
  </span>
</el-dialog>
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
    DData:{
      user:'',
      photo:''
    },
    time:''
    }
},
methods:{
record(account,photo){
this.DData={
      user:account,
      photo:photo
    }
    this.dialogVisible=true
},
retrieved(){
  let data=qs.stringify({
    user:this.DData.user,
    photo:this.DData.photo,
    courier:this.$store.state.courier.account
  })
  axios.post('/courier/retrieved',data).then(response=>{

  },err=>{

  })
  this.dialogVisible = false
}
},
mounted(){
   this.time=setInterval(function(){
     let data=qs.stringify({account:this.$store.state.courier.account,state:0})
  axios.post('/courier/receivingAndWarehousing',data).then(response=>{
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