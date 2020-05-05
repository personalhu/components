<script>
import { type } from '@/utils/index.js'
const tagNameEnume = {
  'input': 'el-input',
  'inputnumber': 'el-input-number',
  'select': 'el-select',
  'date': 'el-date-picker',
  'daterange': 'el-date-picker',
  'switch': 'el-switch',
  'checkboxgroup': 'el-checkbox-group',
  'checkbox': 'el-checkbox',
  'radiogroup': 'el-radio-group',
  'radio': 'el-radio',
  'timerpicker': 'el-time-picker',
  'slider': 'el-slider'
}
const optionTagName = {
  'select': 'el-option',
  'checkboxgroup': 'el-checkbox',
  'radiogroup': 'el-radio'
}
export default {
  name: '',
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    gutter: {
      type: Number,
      default: 12
    },
    formList: {
      type: Array,
      default: () => []
    },
    submitText: {
      type: String,
      default: '提交'
    },
    cancelText: {
      type: String,
      default: '清空'
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    lockFormCenter: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // formDataCache: this.formData
    }
  },
  computed: {},
  beforeMount () {
    this.formList.forEach(v => {
      const defaultValue = this.getDefaultValue(v.type)
      this.$set(this.formData, v.key, defaultValue)
    })
  },
  methods: {
    type,
    getDefaultValue (type) {
      let defaultValue = null
      const defaultValueArrayItems = ['checkboxgroup', 'daterange']
      const defaultValueFalseItems = ['switch']
      const defaultValueNumberItems = ['slider']
      if (defaultValueArrayItems.indexOf(type) > -1) {
        defaultValue = []
      } else if (defaultValueFalseItems.indexOf(type) > -1) {
        defaultValue = false
      } else if (defaultValueNumberItems.indexOf(type) > -1) {
        defaultValue = 0
      } else {
        defaultValue = ''
      }
      return defaultValue
    },
    submit () {
      this.$refs.myForm.validate(valid => {
        if (valid) {
          this.$emit('submit', this.formData)
        }
      })
    },
    cancel () {
      this.$refs.myForm.resetFields()
    },
    gernerateTag (h, item) {
      let _node = [] // 生成的vnode节点
      const { labelWidth } = this
      let type = item.type || ''
      const placeholder = item.placeholder || ''
      const props = item.props || {}
      if (type === 'daterange') {
        type = 'date'
        props.type = 'daterange'
      }
      const rules = item.rules || []
      const on = item.on || {}
      const options = item.options || []
      const tagName = tagNameEnume[type]
      const span = item.span || 24
      if (item.render && this.type(item.render) === 'Function') {
        _node = item.render(h)
      } else {
        _node = h(tagName, {
          props: {
            value: this.formData[item.key]
          },
          attrs: {
            placeholder,
            rules: rules,
            ...props
          },
          on: {
            input: (value) => {
              this.formData[item.key] = value
            },
            ...on
          }
        }, options.length ? this.renderOptions(h, options, optionTagName[type]) : [])
      }
      return h('el-col', {
        props: {
          span: span
        }
      }, [h('el-form-item', {
        class: {
        },
        props: {
          'label': item.title ? item.title + '：' : '',
          'label-width': labelWidth,
          prop: item.key,
          rules: item.rules
        }
      }, [_node])])
      // return h('el-form-item', {
      //   class: {
      //   },
      //   props: {
      //     'label': item.title ? item.title + '：' : '',
      //     'label-width': labelWidth,
      //     prop: item.key,
      //     rules: item.rules
      //   }
      // }, [_node])
    },
    renderOnlyLabelOption (h, options, tag) {
      let optionsArr = []
      for (let i = 0; i < options.length; i++) {
        let _option = options[i]
        optionsArr.push(h(tag, {
          key: _option.value,
          attrs: {
            label: _option.value
          },
          scopedSlots: {
            default: props => {
              return h('span', _option.label)
            }
          }
        }))
      }
      return optionsArr
    },
    renderSelectOption (h, options, tag) {
      let optionsArr = []
      for (let i = 0; i < options.length; i++) {
        let _option = options[i]
        optionsArr.push(h(tag, {
          key: _option.value,
          attrs: {
            label: _option.label,
            value: _option.value
          }
        }))
      }
      return optionsArr
    },
    renderOptions (h, options, tag) {
      let result = []
      if (tag === 'el-option') {
        result = this.renderSelectOption(h, options, tag)
      } else {
        result = this.renderOnlyLabelOption(h, options, tag)
      }
      return result
    },
    gernerateOptions (h) {},
    renderSubmit (h) {
      return (
        <div>
          <el-button type="primary" onClick={ this.submit }>{ this.submitText }</el-button>
          <el-button type="default" onClick={ this.cancel }>{ this.cancelText }</el-button>
        </div>
      )
    },
    gernerateSubmit (h, item) {
      const { labelWidth } = this
      let _node = null
      _node = this.renderSubmit(h, item)
      return h('el-row', {}, [
        h('el-col', {
          props: {
            span: 24
          }
        }, [
          h('el-form-item', {
            props: {
              'label': item.title ? item.title + '：' : '',
              'label-width': labelWidth
            }
          }, [_node])
        ])
      ])
    },
    renderContent (h) {
      let renderArr = []
      for (let i = 0; i < this.formList.length; i++) {
        renderArr.push(this.gernerateTag(h, this.formList[i]))
      }
      // renderArr.push(this.gernerateSubmit(h, { type: 'submit' }))
      return h('el-row', {
        props: {
          gutter: this.gutter
        }
      }, renderArr)
    }
  },
  render (h) {
    if (!this.formList.length) return
    return h('el-form', {
      ref: 'myForm',
      'class': {
        'form-box': true,
        'lock-form-center': this.lockFormCenter
      },
      props: {
        model: this.formData
      },
      attrs: {
        'label-position': 'right'
      }
    }, [
      this.renderContent(h), this.gernerateSubmit(h, { type: 'submit' })
    ])
  }
}

</script>
<style lang='scss' scoped>
.lock-form-center{
  width: 800px;
  margin: 0 auto;
}
.form-box /deep/ {
  .el-date-editor, .el-select, .el-input-number{
    width: 100%;
  }
}
</style>
