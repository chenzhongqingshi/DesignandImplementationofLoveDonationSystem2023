<template>
<div class="courierMy">
  <el-descriptions class="margin-top" title="" :column="4" direction="vertical" border>
  
  <el-descriptions-item label="账号">{{tableDate.account}}</el-descriptions-item>
  <el-descriptions-item label="物流员名">{{tableDate.name}}</el-descriptions-item>
  <el-descriptions-item label="地区" :span="1">{{tableDate.region}}</el-descriptions-item>
<el-descriptions-item label="头像" :span="1" class="personal"><img :src="tableDate.headPortrait" style="height:50px"></el-descriptions-item>
</el-descriptions>
  <el-button type="primary" @click="dialogFormVisible = true">修改个人信息</el-button>

<el-dialog title="修改信息" :visible.sync="dialogFormVisible">
  <el-form>
    <el-form-item label="选择地区" :label-width="formLabelWidth">
       <VDistpicker @selected="onSelected"></VDistpicker>
    </el-form-item>
    <el-form-item label="物流员名" :label-width="formLabelWidth">
      <el-input v-model="names" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="物流员头像" :label-width="formLabelWidth">
      <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-change="onchangemd"
  >
  <img v-if="picturesurl" :src="picturesurl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  <input type="file" @change="onchangemd" class="picture">

    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="modify">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import  VDistpicker  from 'v-distpicker';
import axios from '@/axios/axios';
import qs from 'qs'
export default {
name:'courierMy',
data(){
  return {
    tableDate:{},
    region:{
          province:"", city:"", area:""
        },
        picturesurl:'',
        names:'',
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        time:""
  }
},
components:{
  VDistpicker
},
methods:{
  modify(){
    let data=qs.stringify({
      account:this.$store.state.courier.account,
    region:this.region,
        picturesurl:this.picturesurl,
        names:this.names,
    })
    axios.post('/courier/update',data).then(response=>{

    },err=>{

    })
    this.dialogFormVisible=false
  },
  onchangemd(e){
        console.log(e.target.files)//这个就是选中文件信息
        let formdata = new FormData()
        Array.from(e.target.files).map(item => {
         console.log(item)
         formdata.append("file", item)  //将每一个文件图片都加进formdata
       })
       axios.post("/user/donation", formdata).then(res => {
        this.picturesurl=res.data
       console.log(res.data)
       })
    },
      onSelected(val){
    this.region.province=val.province
    this.region.city=val.city
    this.region.area=val.area
    }
    },
    mounted(){
   this.time=setInterval(function(){
    let data =qs.stringify({account:this.$store.state.courier.account})
      console.log(data)
      axios.post('/courier/data',data).then(response=>{
        this.tableDate=response.data[0]
      })
   },500)
    },
beforeDestroy(){
      clearInterval(this.time)
},
}

</script>

<style>
.courierMy{
  margin: 5px;
}
.margin-top{
  margin-bottom: 5px;
}
.distance{
  width: 100px;
}
</style>