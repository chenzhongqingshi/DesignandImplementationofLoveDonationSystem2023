<template>
<div>
  <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="选择地区" style="margin-top:5px">
    <VDistpicker @selected="onSelected"></VDistpicker>
  </el-form-item>
  <el-form-item label="详细地址">
    <el-input v-model="address"></el-input>
  </el-form-item>
  
  <el-form-item label="物品类型">
    <el-select v-model="itemType" placeholder="请选择物品类型">
      <el-option label="书籍" value="书籍"></el-option>
      <el-option label="衣服" value="衣服"></el-option>
      <el-option label="裤子" value="裤子"></el-option>
      <el-option label="鞋子" value="鞋子"></el-option>
      <el-option label="文具" value="文具"></el-option>
    </el-select>
  </el-form-item>

  
  <el-form-item label="物品描述">
    <el-input type="textarea" v-model="itemDescription"></el-input>
  </el-form-item>
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


  <el-form-item>
    <el-button type="primary" @click="upload">点击上传</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
import axios from '../../../axios/axios.js';
import  VDistpicker  from 'v-distpicker';
import qs from 'qs'
export default {
    name:'uploadItems',
    components:{
  VDistpicker
},
    data(){
      return {
        region:{
          province:"", city:"", area:""
        },
        picturesurl:'',
        address:'',
        itemType:'',
        itemDescription:''  
        }
      },
methods: {
  upload(){
    let data=qs.stringify({
      account:this.$store.state.user.account,
      region:this.region,
      picturesurl:this.picturesurl,
      address:this.address,
      itemType:this.itemType,
      itemDescription:this.itemDescription
    })
    console.log(data)
axios.post('/user/uploadItems',data).then(response=>{
    if(response.data=="上传成功"){
      this.$message('上传成功')
      
        this.picturesurl='',
        this.address='',
        this.itemType='',
        this.itemDescription=''  
    }else{
      this.$message('上传失败，请重新上传'),
        this.picturesurl='',
        this.address='',
        this.itemType='',
        this.itemDescription=''  
    }
})
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
 }
}
 

</script>

<style>
.picture{
  margin: 10px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
