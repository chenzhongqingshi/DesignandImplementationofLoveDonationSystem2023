<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline" style="margin:5px">
  <el-form-item label="">
    <el-input v-model="names" placeholder="请输入仓库名称"></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">点击搜索</el-button>
  </el-form-item>
</el-form>

    
<el-table
    :data="[tableData[0]]"
    stripe
    style="width: 100%"
    :show-header="true"
    >
    <el-table-column
      prop="goodsShelves"
      label="物品货架"
      width="180">
    </el-table-column>
    <el-table-column
      prop="photo"
      label="物品照片"
      width="180">
      <img :src="tableData[0].photo" style="height:50px">
    </el-table-column>
    <el-table-column
      prop="itemtype"
      label="物品类型"
      width="180">
    </el-table-column>
    <el-table-column
      prop="itemdescribe"
      label="物品描述">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="outbound(scope.row.account,scope.row.photo)" type="text" size="small">点击出库</el-button>
        
      </template>
    </el-table-column>
  </el-table>

<el-table v-for="item in tableData.slice(1)"
    :data="[item]"
    stripe
    style="width: 100%"
    :show-header="false"
    >
    <el-table-column
      prop="goodsShelves"
      label="物品货架"
      width="180">
    </el-table-column>
    <el-table-column
      prop="photo"
      label="物品照片"
      width="180">
      <img :src="item.photo" style="height:50px">
    </el-table-column>
    <el-table-column
      prop="itemtype"
      label="物品类型"
      width="180">
    </el-table-column>
    <el-table-column
      prop="itemdescribe"
      label="物品描述">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="outbound(scope.row.account,scope.row.photo)" type="text" size="small">点击出库</el-button>

      </template>
    </el-table-column>
  </el-table>

  </div>
</template>

<script>
import qs from 'qs'
import axios from '@/axios/axios'
export default {
name:"courierWarehouseDetails",
data(){
  return {
    names:'',
    tableData: [{photo:''}]
  }
},
methods:{
  onSubmit(){
    let data=qs.stringify({names:this.names})
    axios.post('/courier/warehouseDetails',data).then(response=>{
     this.tableData=response.data
    },err=>{

    })
  },
  outbound(account,photo){
    let data=qs.stringify({names:this.names,account,photo})
    axios.post('/courier/Outbound',data).then(response=>{

    },err=>{
      
    })
    this.$message('出库成功')
  }
},

}
</script>

<style>

</style>