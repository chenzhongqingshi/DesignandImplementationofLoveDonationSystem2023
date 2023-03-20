<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true" style="margin:5px">新建仓库</el-button>

<el-dialog title="新建仓库" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="选择地区" :label-width="formLabelWidth">
       <VDistpicker @selected="onSelected"></VDistpicker>
    </el-form-item>
    <el-form-item label="详细地址" :label-width="formLabelWidth">
      <el-input v-model="address" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="仓库名称" :label-width="formLabelWidth">
      <el-input v-model="warehouse" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="仓库表名" :label-width="formLabelWidth">
      <el-input v-model="names" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="newWarehouse">确 定</el-button>
  </div>
</el-dialog>

    <el-descriptions class="margin-top" title="" :column="2" :size="size" border v-for="item in tableData">
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        仓库名称
      </template>
      {{item.warehouse}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        仓库地区
      </template>
      {{item.region}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        详细地址
      </template>
      {{item.address}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        仓库物资数
      </template>
      {{item.number}}
    </el-descriptions-item>
  </el-descriptions>
  </div>
</template>

<script>
import  VDistpicker  from 'v-distpicker'; 
import axios from '@/axios/axios';
import qs from 'qs'
export default {
name:"warehouseList",
data(){
  return{
      dialogTableVisible: false,
        dialogFormVisible: false,
        tableData:[],
        warehouse:'',
        region:{
          province:"", city:"", area:""
        },
        address:'',
        names:'',
        formLabelWidth: '120px',
        time:""
  }
},
components:{
  VDistpicker
},
methods:{
  newWarehouse(){
    let data =qs.stringify({
        warehouse:this.warehouse,
        region:this.region,
        address:this.address,
        names:this.names,})
axios.post('/administrators/newWarehouse',data).then(response=>{

},err=>{

})
this.dialogFormVisible = false
},
   onSelected(val){
    this.region.province=val.province
    this.region.city=val.city
    this.region.area=val.area
    }
},
mounted(){
   this.time=setInterval(function(){
   axios.get('/administrators/warehouse').then(response=>{
    this.tableData=response.data
  })
   },500)
    },
beforeDestroy(){
      clearInterval(this.time)
},
}
</script>

<style scoped>
.margin-top{
  margin:5px;
}
</style>