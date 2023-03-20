<template>
 <div>
  <el-descriptions class="margin-top" title="" :column="4" :size="size" border v-for="item in tableData">
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        地区
      </template>
      {{item.region}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
      详细地址
      </template>
      {{item.address}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        所需物资
      </template>
      {{item.material}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        状态
      </template>
      捐赠成功
    </el-descriptions-item>
  </el-descriptions>
 </div>
</template>

<script>
import axios from '@/axios/axios'
export default {
name:"donatedArea",
data(){
return {
  tableData:[],
  time:''
}
},
mounted(){
   this.time=setInterval(function(){
     axios.get('/administrators/regionalDistribution').then(response=>{
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