<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="{ span: 10, offset: 1 }" :lg="{ span: 10, offset: 1 }" style="float: left; position: relative; left: 10%">
      <h2>欢迎使用VueManager管理系统</h2>
      <el-image :src="require('@/assets/logo.png')" style="width: 100%; max-width: 480px; height: auto"></el-image>
      <h3>管理至简，运维无忧</h3>
    </el-col>

    <!--分割线-->
    <el-col :xl="{ span: 1, offset: 1 }" :lg="{ span: 1, offset: 1 }" >
      <el-divider direction="vertical"></el-divider>
    </el-col>

    <el-col :xl="{ span: 10, offset: 1 }"
            :lg="{ span: 10, offset: 1 }"
             style="float: right; position: relative; left: 5%">
      <el-form :model="loginFrom" :rules="rules" ref="loginFrom" label-width="100px" class="demo-loginFrom">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginFrom.username" style="width: 390px; float: left"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginFrom.password" style="width: 390px; float: left"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="loginFrom.code" style="width: 260px; float: left"></el-input>
          <el-image :src="codeImg" class="codeImg"></el-image>
        </el-form-item>
        <el-form-item style="float: left; position: relative; left: 10%; margin-top: 30px">
          <el-button type="primary" @click="submitForm('loginFrom')">登录</el-button>
          <el-button @click="resetForm('loginFrom')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginFrom: {
        username: '',
        password: '',
        code: '',
        token:''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请正确输入验证码', trigger: 'blur'},
          { min: 5, max: 5, message: '长度为5个字符', trigger: 'blur' }
        ],
      },
      codeImg:''
    };
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login',this.loginFrom).then(({headers,data}) => {
            console.log("headers:",headers)
            const jwt = data.headers['authorization'] || data.headers['Authorization']
            console.log("用户点击登录时，提交的随机码",jwt)
            this.$store.commit('SET_TOKEN',jwt)
            this.$router.push('/index');//进入index页面
          })
              .catch(error => {
                console.log('登录失败',error)
              })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCaptcha(){
      this.$axios.get('/captcha').then(res => {
        if (res.data && res.data.data) {
          this.loginFrom.token = res.data.data.token || ''
          console.log("mock(模拟服务器生成的随机码：)",this.loginFrom.token)
          this.codeImg = res.data.data.captchaImg
        }
      })
          .catch(err => {
            console.log('验证码获取失败',err)
          })
    }
  }
}
</script>

<style scoped>
  .el-row{
    align-items: center;
    min-height: 100vh;
    height: 100%;
    display: flex;
    text-align: center;
  }

  .el-divider{
    height: 450px;
  }

  .codeImg{
    float: left;
    margin-left: 10px;
    border-radius: 5px;
  }
</style>