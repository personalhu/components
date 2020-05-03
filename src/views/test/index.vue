<!--  -->
<template>
  <div>
    <el-button type="primary" @click="clickMe">点我</el-button>
    <router-tabs :prefix="prefix" :config="config" :keep-alive-includes="keepAliveIncludes"></router-tabs>
  </div>
</template>

<script>
import RouterTabs from '@/components/RouterTabs'
export default {
  name: '',
  components: {
    RouterTabs
  },
  data () {
    return {
      keepAliveIncludes: 'PageB',
      prefix: '/test',
      config: [
        {
          path: 'a',
          name: '测试页面1',
          tips: (h) => {
            return (
              <div>
                <strong>routertabs组件</strong>能自动匹配路由与组件
              </div>
            )
          }
        },
        {
          path: 'b',
          name: '测试页面2',
          tips: (h) => {
            return (
              <div>
                <p>this is a test</p>
                <p>轻音少女</p>
              </div>
            )
          }
        },
        {
          path: 'd',
          name: '测试页面3',
          tips: (h) => {
            return (
              <div>
                <h4>this is a test</h4>
                <p>轻音少女</p>
              </div>
            )
          }
        },
        {
          path: 'e',
          name: '测试页面4'
        },
        {
          path: 'f',
          name: '测试页面4'
        },
        {
          path: 'g',
          name: '测试页面4'
        },
        {
          path: 'h',
          name: '测试页面4'
        },
        {
          path: 'i',
          name: '测试页面4'
        }
      ]
    }
  },
  computed: {},
  mounted () {},
  methods: {
    clickMe () {
      this.config.push({
        path: 'o',
        name: 'ceshiyemian'
      })
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
