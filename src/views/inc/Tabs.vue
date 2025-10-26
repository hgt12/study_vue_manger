<script>
  export default {
    name:"Tabs",
    data() {
      return {
        // editableTabsValue: this.$store.state.menu.editableTabsValue,
        // editableTabs: this.$store.state.menu.editableTabs,
      }
    },
    computed:{
      editableTabs:{
        get(){
          return this.$store.state.menu.editableTabs
        },
        set(val){
          this.$store.state.menu.editableTabs = val
        }
      },
      editorTabsValue:{
        get(){
          return this.$store.state.menu.editableTabsValue
        },
        set(val){
          this.$store.state.menu.editableTabsValue = val
        }
      }
    },
    methods: {
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (targetName === 'Index') {
          return
        }
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);

        if (this.$route.name !== activeName) {
          this.$router.push({name: activeName}).catch(err =>{

          })
        }
      },
      clickTab(target) {
        if(this.$route.name !== target.name){
           this.$router.push({name: target.name})
        }
        // 更新当前激活的标签页状态
        this.editableTabsValue = target.name
      }
    }
  }
</script>

<template>
  <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
    <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>

</style>