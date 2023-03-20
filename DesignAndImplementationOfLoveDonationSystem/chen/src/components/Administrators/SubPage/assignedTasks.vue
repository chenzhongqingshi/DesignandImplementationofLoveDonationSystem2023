<template>
  <div>
   <el-table
    :data="[tableData[0]]"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="courier"
      label="物流员账号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="type"
      label="任务类型"
      width="120">
      
    </el-table-column>
    <el-table-column
      prop="accountRegion"
      label="用户/地区"
      width="200">
    </el-table-column>
    <el-table-column
      prop="goodsMaterial"
      label="物品照片/物资描述"
      width="400"><img v-if="tableData[0].type==0" :src="tableData[0].goodsMaterial" style="height:50px">
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态"
      width="200">已分配
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
      prop="courier"
      label="物流员账号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="type"
      label="任务类型"
      width="120">
      
    </el-table-column>
    <el-table-column
      prop="accountRegion"
      label="用户/地区"
      width="200">
    </el-table-column>
    <el-table-column
      prop="goodsMaterial"
      label="物品照片/物资描述"
      width="400"><img v-if="item.taskType==0" :src="item.goodsMaterial" style="height:50px">
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态"
      width="200">已分配
    </el-table-column>
  </el-table>

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
    name:'',
    goodsShelves:'',
    tableData:[],
    time:''
    }
},
mounted(){
   this.time=setInterval(function(){
     let data=qs.stringify({state:0})
  axios.post('/administrators/assignTaskTable',data).then(response=>{
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