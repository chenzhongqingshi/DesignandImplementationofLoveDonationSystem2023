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
        <el-button @click="record(tableData[0].account,tableData[0].photo)" type="text" size="small">点击入库</el-button>
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
        <el-button @click="record(item.account,item.photo)" type="text" size="small">点击入库</el-button>
      </template>
    </el-table-column>
  </el-table>

<el-dialog title="物品入库" :visible.sync="dialogFormVisible">
  <el-form>
    <el-form-item label="仓库名称" :label-width="formLabelWidth">
      <el-input v-model="names" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="仓库货架" :label-width="formLabelWidth">
      <el-input v-model="goodsShelves" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="warehousing">确 定</el-button>
  </div>
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
    dialogFormVisible: false,
    formLabelWidth: '120px',
    names:'',
    goodsShelves:'',
    tableData:[],
    time:'',
    DData:{
      user:'',
      photo:''
    }
    }
},
methods:{
  record(account,photo){
    this.DData={
      user:account,
      photo:photo
    }
    this.dialogFormVisible=true
},
warehousing(){
  let data=qs.stringify({
    user:this.DData.user,
    photo:this.DData.photo,
    courier:this.$store.state.courier.account,
    names:this.names,
    goodsShelves:this.goodsShelves
  })
  axios.post('/courier/warehousing',data).then(response=>{

  },err=>{
    
  })
  this.dialogFormVisible = false
  this.$message('入库成功')
}
},
mounted(){
   this.time=setInterval(function(){
        let data=qs.stringify({account:this.$store.state.courier.account,state:1})
  axios.post('/courier/receivingAndWarehousing',data).then(response=>{
    this.tableData=response.data
      console.log(response.data)
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