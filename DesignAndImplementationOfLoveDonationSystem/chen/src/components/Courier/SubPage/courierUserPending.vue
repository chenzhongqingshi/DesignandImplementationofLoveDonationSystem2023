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
      prop="picturesurl"
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
        <el-button @click="record(tableData[0].account,tableData[0].photo)" type="text" size="small">点击领取</el-button>
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
      prop="picturesurl"
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
      prop="itemDescription"
      label="物品描述"
      width="300">
    </el-table-column>
    <el-table-column
      prop="itemType"
      label="物品类型"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="record(item.account,item.photo)" type="text" size="small">点击领取</el-button>
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
    DData:{
      account:'',
      photo:''
    },
    time:""
    }
},
methods:{
  record(account,photo){
      this.DData.account=account
      this.DData.photo=photo
      this.dialogVisible = true
  },
receive(){
  let data=qs.stringify({
    user:this.DData.account,
    courier:this.$store.state.courier.account,
    photo:this.DData.photo
  })
  axios.post('/courier/userTasks',data).then(response=>{

  },err=>{

  })
  this.dialogVisible = false
},

},
 mounted(){
   this.time=setInterval(function(){
   let data=qs.stringify({account:this.$store.state.courier.account})
  axios.post('/courier/itemsToBeTaken',data).then(response=>{
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