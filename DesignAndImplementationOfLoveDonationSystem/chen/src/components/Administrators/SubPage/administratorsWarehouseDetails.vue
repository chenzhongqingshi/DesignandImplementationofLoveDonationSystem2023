<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline" style="margin:5px">
  <el-form-item label="">
    <el-input v-model="warehouse" placeholder="请输入仓库名称"></el-input>
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
      prop="goodsshelves"
      label="物品货架"
      width="180">
    </el-table-column>
    <el-table-column
      prop="tableData[0].photo"
      label="物品照片"
      width="180">
      <img :src="tableData[0].photo" style="height:50px" v-if="tableData[0].photo"> 
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
  </el-table>

<el-table v-for="item in tableData.slice(1)"
    :data="[item]"
    stripe
    style="width: 100%"
    :show-header="false"
    >
    <el-table-column
      prop="goodsshelves"
      label="物品货架"
      width="180">
    </el-table-column>
    <el-table-column
      prop="item.photo"
      label="物品照片"
      width="180">
      <img :src="item.photo" style="height:50px" v-if="item.photo">
    </el-table-column>
    <el-table-column
      prop="item.itemtype"
      label="物品类型"
      width="180">
    </el-table-column>
    <el-table-column
      prop="item.describe"
      label="物品描述">
    </el-table-column>

  </el-table>

  </div>
</template>

<script>
import qs from 'qs'
import axios from '@/axios/axios'
export default {
name:"administratorsWarehouseDetails",
data(){
  return {
    warehouse:'',
    tableData: [{photo:""}]
  }
},
methods:{
  onSubmit(){
    let data=qs.stringify({
      warehouse:this.warehouse
    })
    axios.post('/administrators/warehouseDetails',data).then(response=>{
      console.log(response.data)
      this.tableData=response.data
    })
  }
}
}
</script>

<style>

</style>