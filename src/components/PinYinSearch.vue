<template>
  <div>
    <el-select
      v-model="username"
      filterable
      clearable
      :filter-method="debounce(filterMethods)"
      @change="changeCallback"
      @clear="setOption"
    >
      <el-option
        v-for="item in filterOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import PINYIN from 'pinyin'
import { debounce } from '@/utils/index.js'
const OPTIONS = {
  style: PINYIN.STYLE_NORMAL,
  heteronym: true
}

export default {
  name: '',
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    // 未避免消息过多,dom渲染过程中造成卡顿，可限制显示条数
    countLimit: {
      type: Number,
      default: 50
    }
  },
  data () {
    return {
      username: this.value,
      filterOptions: []
    }
  },
  computed: {},
  mounted () {
    this.setOption()
  },
  methods: {
    debounce,
    changeCallback (value) {
      this.$emit('input', value)
      let name = ''
      for (let i = 0; i < this.filterOptions.length; i++) {
        if (value === this.filterOptions[i].value) name = this.filterOptions[i].label
      }
      this.$emit('getNameCN', name)
    },
    setOption () {
      if (this.options.length > this.countLimit) {
        this.filterOptions = this.options.slice(0, this.countLimit)
      } else {
        this.filterOptions = this.options
      }
    },
    filterMethods (key) {
      let count = 0
      if (!key) {
        this.setOption()
      } else {
        this.filterOptions = this.options.filter(v => {
          if (count >= this.countLimit) return
          const regexp = new RegExp(`${key}`, 'i')
          const target = v.label + v.value + (this.sortArr(PINYIN(v.label, OPTIONS)).join(''))
          return regexp.test(target) && ++count
        })
      }
    },
    sortArr (arrays) {
      var arr = ['']
      for (let i = 0; i < arrays.length; i++) {
        arr = this.getValuesByArray(arr, arrays[i])
      }
      return arr
    },
    getValuesByArray (arr1, arr2) {
      let arr = []
      for (let i = 0; i < arr1.length; i++) {
        let v1 = arr1[i]
        for (let j = 0; j < arr2.length; j++) {
          let v2 = arr2[j]
          let value = v1 + v2
          arr.push(value)
        }
      }
      return arr
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
