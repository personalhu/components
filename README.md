# components

> A Vue.js project

## RouterTabs组件

> #### 简介：
>> RouterTabs组件是应用于路由与tab完全自动匹配的组件，基本效果与el-tabs一致。但el-tabs需要频繁引入注册组件，过程繁琐代码繁杂。本组件只需要配置好基本数据以及在路由配置文件中定义好对应的路由层级关系即可。

> #### 基本用法

```vue
<template>
  <router-tabs :prefix="prefix" :config="config" :keep-alive-includes="keepAliveIncludes">
    <template v-slot:extBtn>
      <div class="test-box">
        <el-button type="text">测试</el-button>
      </div>
    </template>
  </router-tabs>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      prefix: '/test',
      keepAliveIncludes: [], // 需要缓存的页面的组件name
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
        }
      ]
    }
  }
  data() {},
}
</script>
```

> #### RouterTabs Attributes
>> 
   |     属性名        |        描述         |       类型         |        默认值      |
   | ------------------| ------------------ | ------------------ | ----------------- |
   |     prefix        |       路由前缀      |        String      |       ''          |
   |     config        |       基本配置项    |        Array       |       []          |
   | keepAliveIncludes | 需要缓存的页面name  |    String/Array    |       ''          |
> #### RouterTabs Events
>> 
   |     事件名        |        描述         |       参数         |
   | ------------------| ------------------ | ------------------ |
   |     tab-click     |  点击tab时触发事件  |        tab         |
   
***

# PinYinSearch
> #### 简介：
>> PinYinSearch组件是主要用于用户检索，支持汉字、拼音以及工号检索，依赖第三方组件“pinyin”。

> #### 基本用法
>>
```vue
<template>
  <PinYinSearch v-model="number" :options="userList" @getNameCN="getNameCN"></PinYinSearch>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      number: '',
      userList: [
        { label: '松冈祯丞', value: '0001' },
        { label: '茅野爱衣', value: '0002' },
        { label: '珂朵莉', value: '0003' }
      ],
      userName: ''
    }
  },
  methods: {
    getNameCN (name) {
      this.userName = name
    }
  }
}
</script>
```
> #### PinYinSearch Attributes
>> 
   |     属性名        |        描述         |       类型         |        默认值      |
   | ------------------| ------------------ | ------------------ | ----------------- |
   |     value/v-model |       绑定值       |        String        |       ''          |
   |     options       |       备选项       |        Array         |       []          |
> #### PinYinSearch Events
>> 
   |     事件名        |        描述         |       参数         |
   | ------------------| ------------------ | ------------------ |
   |     getNameCN     | 获取选取用户的中文名 |        label         |
   
***

# RForm
> #### 简介：
>> RForm组件是用于生成表单的组件，组件涵盖一些基本类型的组件input、select、slider、checkbox、radio等等，以及支持用户自定义。（表单功能还需进一步完善）

> #### 基本用法
>>
```vue
<template>
  <r-form
    lock-form-center
    :gutter="12"
    :form-data="formData"
    :form-list="formList"
    @submit="submit"
  ></r-form>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        formList: [ // 如果含有其他双向绑定变量（如select的options: this.externamOptions）,建议放入computed属性中
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
    }
  }
</script>
```

> #### RForm Attributes
>> 
   |     属性名        |        描述         |       类型         |        默认值      |
   | ------------------| ------------------ | ------------------ | ----------------- |
   |     formData      |       表单绑定对象  |        Object        |       {}          |
   |     formList      |       表单生成配置  |        Array         |       []          |
   |     gutter        |    表单项之间的间隔 |        Number         |       12          |
   |     labelWidth    |       表单label宽度  |      String         |       120px       |
   |  lockFormCenter   |   是否将表单固定至中间  |    Boolean         |       false      |
   |  submitText       |   提交按钮文本      |    String             |       '提交'      |
   |  cancelText   |   取消按钮文本           |    String            |       '清空'      |
   
> #### RForm formList配置项
>>
   |     属性名        |        描述         |       类型         |
   | ------------------| ------------------ | ------------------ |
   |     title         |       label名      |        String      |
   |     key           |       字段对应键名  |        String      |
   |     span          |    表单占据多少栅格 |        Number      |
   |     type          |       生成dom类型  |      String         |
   |     placeholder   |   select、input等placeholder内容  |    String         |
   |      rules        |   该字段验证规则    |      []             |
   |        on         |   绑定至dom的事件   |    Object           |
   
> RForm Events
>> 
   |     事件名        |        描述         |       参数         |
   | ------------------| ------------------ | ------------------ |
   |     submit        |          提交      |        fromData         |
   
***


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
