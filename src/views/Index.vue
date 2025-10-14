<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
      >
        <router-link to="/index">
          <el-menu-item index="Index">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </template>
          </el-menu-item>
        </router-link>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-operation"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item index="1-1">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span slot="title">用户管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="1-2">
            <template slot="title">
              <i class="el-icon-rank"></i>
              <span slot="title">角色管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="1-3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">菜单管理</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>系统工具</span>
          </template>
          <el-menu-item index="2-2">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span slot="title">数字字典</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div style="float:left; position:relative; left:45%">
          <strong>VueManger后台管理系统</strong>
        </div>
        <div class="header-avatar">
          <el-avatar :src="require('@/assets/user.jpg')"></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link">
              Admin<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Index"
}
</script>

<style scoped>
.el-container {
  padding: 0;
  margin: 0;
  display: flex;
  min-height: 100vh;
}

.el-header {
  background-color: #17B3A3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
}


.header-avatar {
  display: flex;
  align-items: center;
  gap: 10px;
}


.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
}


.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: left;
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
  padding: 0;
}


.el-menu-vertical-demo {
  height: 100%;
}

a{
  text-decoration: none;
}

</style>