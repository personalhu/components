<!--  -->
<template>
  <div>

    <el-divider>RouterTabs</el-divider>
    <el-button type="primary" @click="clickMe" class="m-t-b-8">点我</el-button>
    <!-- 默认按钮 -->
    <h5 class="m-t-b-8">默认按钮</h5>
    <router-tabs
      :prefix="prefix"
      :config="config"
      :keep-alive-includes="keepAliveIncludes"
      :doc-url="'https://www.baidu.com'"
    ></router-tabs>
    <!-- 自定义按钮 -->
    <h5 class="m-t-b-8">自定义按钮</h5>
    <router-tabs :prefix="prefix" :config="config" :keep-alive-includes="keepAliveIncludes">
      <template v-slot:extBtn>
        <div class="test-box">
          <el-button type="text" @click="testFunc">测试</el-button>
        </div>
      </template>
    </router-tabs>

    <el-divider>PinYinSearch</el-divider>
    <el-alert
      title="支持中文、工号以及拼音进行检索"
      type="success"
      class="m-t-b-8"
      :closable="false">
    </el-alert>
    <PinYinSearch v-model="number" :options="userList" @getNameCN="getNameCN"></PinYinSearch>
    <div v-if="number || username" class="m-t-b-8"> 用户选择：{{ username + ' - ' + number }}</div>

    <el-divider>R-Form</el-divider>
    <r-form
      lock-form-center
      :gutter="12"
      :form-data="formData"
      :form-list="formList"
      @submit="submit"
    ></r-form>
  </div>
</template>

<script>
import RouterTabs from '@/components/RouterTabs'
import PinYinSearch from '@/components/PinYinSearch'
import RForm from '@/components/RForm'
export default {
  name: '',
  components: {
    RouterTabs,
    PinYinSearch,
    RForm
  },
  data () {
    return {
      form: {},
      formData: {},
      number: '',
      username: '',
      userList: [
        { label: '松冈祯丞', value: '0001' },
        { label: '茅野爱衣', value: '0002' },
        { label: '珂朵莉', value: '0003' }
      ],
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
                <p>this is a test,路由以/test/b或test/b/c（以/test/b开头的所有页面都会点亮此tab）的页面</p>
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
      ],
      formList: [
        {
          title: '活动名称',
          key: 'name',
          span: 12,
          type: 'input',
          placeholder: '请输入活动名称',
          rules: [
            { required: true, message: '请输入活动', trigger: 'blur' }
          ],
          on: {
            change: (val) => {
              console.log('活动名称change')
            },
            blur: () => {
              console.log('活命名称blur')
            }
          },
          props: {
            clearable: true,
            disabled: false
          }
        },
        {
          title: '计数器',
          span: 12,
          key: 'count',
          type: 'inputnumber',
          rules: [
            { required: true, message: '请选择数字', trigger: 'blur' }
          ]
        },
        {
          title: '选择时间',
          key: 'date',
          span: 12,
          type: 'date',
          placeholder: '请选择时间',
          rules: [
            { required: true, message: '请选择活动时间', trigger: 'change' }
          ],
          props: {
            clearable: true,
            disabled: false,
            format: 'yyyy-MM-dd',
            'value-format': 'yyyy-MM-dd'
          }
        },
        {
          title: '活动区域',
          key: 'region',
          span: 12,
          type: 'select',
          placeholder: '请选择活动区域',
          rules: [
            { required: true, message: '请输入活动', trigger: 'change' }
          ],
          options: [
            { label: '选项一', value: 'one' },
            { label: '选项二', value: 'two' }
          ]
        },
        {
          title: '选择时间范围',
          key: 'daterange',
          type: 'daterange',
          placeholder: '请选择时间范围',
          rules: [
            { required: true, message: '请选择时间范围', trigger: 'change' }
          ],
          props: {
            clearable: true,
            disabled: false
          }
        },
        {
          title: '活动性质',
          key: 'type',
          span: 24,
          type: 'checkboxgroup',
          rules: [
            { required: true, message: '请选择活动性质', trigger: 'blur' }
          ],
          options: [
            { label: '美食/餐厅线上活动', value: 'one' },
            { label: '地推活动', value: 'two' },
            { label: '线下主题活动', value: 'three' },
            { label: '单纯品牌曝光', value: 'four' }
          ]
        },
        {
          title: '特殊资源',
          key: 'special',
          type: 'radiogroup',
          rules: [
            { required: true, message: '请确认特殊资源', trigger: 'blur' }
          ],
          options: [
            { label: '线上品牌商赞助', value: 'one' },
            { label: '线下场地免费', value: 'two' }
          ]
        },
        {
          title: '即时配送',
          span: 12,
          type: 'switch',
          key: 'delivery'
        },
        {
          title: '进度值',
          span: 12,
          type: 'slider',
          key: 'progress'
        },
        {
          title: '活动名称',
          key: 'name1',
          type: 'input',
          placeholder: '请输入活动名称',
          props: {
            type: 'textarea',
            clearable: true,
            disabled: false
          }
        },
        {
          title: '自定义字段',
          key: 'mine',
          render: (h) => {
            return (
              <div><h1>自定义字段</h1></div>
            )
          },
          rules: [
            { required: true, message: '自定义字段' }
          ]
        }
      ]
    }
  },
  computed: {},
  mounted () {},
  methods: {
    submit (data) {
      console.log(data)
    },
    clickMe () {
      this.config.push({
        path: 'o',
        name: 'ceshiyemian'
      })
    },
    getNameCN (name) {
      this.username = name
    },
    testFunc () {
      this.$message.success('欧拉欧拉欧拉！')
    }
  }
}

</script>
<style lang='scss' scoped>
.m-t-b-8 {
  margin: 8px 0;
}
.test-box{
  line-height: 40px;
  font-weight: 600;
}
</style>
