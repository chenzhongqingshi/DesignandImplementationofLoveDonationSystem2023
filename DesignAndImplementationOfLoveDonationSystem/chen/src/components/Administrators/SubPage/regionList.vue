<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true" style="margin:5px">新建地区</el-button>

<el-dialog title="新建地区" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="选择地区" :label-width="formLabelWidth">
       <VDistpicker @selected="onSelected"></VDistpicker>
    </el-form-item>
    <el-form-item label="详细地址" :label-width="formLabelWidth">
      <el-input v-model="address" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="所需物资" :label-width="formLabelWidth">
      <el-input v-model="material" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="newArea">确 定</el-button>
  </div>
</el-dialog>

    <el-descriptions class="margin-top" title="" :column="3" :size="size" border v-for="item in tableData">
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
    
  </el-descriptions>
  </div>
</template>

<script>
import qs from 'qs'
import  VDistpicker  from 'v-distpicker'; 
import axios from '@/axios/axios';
export default {
name:"warehouseList",
data(){
  return{
        dialogTableVisible: false,
        dialogFormVisible: false,
        tableData:[],
        region:{
          province:"", city:"", area:""
        },
        address:'',
        material:'',
        formLabelWidth: '120px',
        time:""
  }
},
components:{
  VDistpicker
},
methods:{
  newArea(){
    let data=qs.stringify({
        region:this.region,
        address:this.address,
        material:this.material,
    })
 axios.post('/administrators/newRgeion',data).then(response=>{

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
    axios.get('/administrators/regionList').then(response=>{
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