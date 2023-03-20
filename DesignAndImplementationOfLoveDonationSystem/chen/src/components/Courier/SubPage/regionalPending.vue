<template>
  <div>
   <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="region"
      label="地区"
      width="300">
    </el-table-column>
    <el-table-column
      prop="address"
      label="详细地址"
      width="350">
    </el-table-column>
    <el-table-column
      prop="material"
      label="所需物资"
      width="300">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="retrieved(scope.row.region,scope.row.address)" type="text" size="small">点击已取</el-button>
      </template>
    </el-table-column>
  </el-table>
     

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
    time:''
    }
},
methods:{
retrieved(region,address){
    let data=qs.stringify({account:this.$store.state.courier.account,region,address,state:1})
    axios.post('/courier/regionalDistributionupdate',data).then(response=>{

    },err=>{

    })
}
},
mounted(){
   this.time=setInterval(function(){
      let data=qs.stringify({account:this.$store.state.courier.account,state:0})
  axios.post('/courier/regionalDistribution',data).then(response=>{
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