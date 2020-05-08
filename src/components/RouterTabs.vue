<script>
export default {
  name: 'RouterTabs',
  props: {
    prefix: {
      type: String,
      required: true
    },
    config: {
      type: Array,
      default: () => []
    },
    keepAliveIncludes: {
      type: [String, Array],
      default: ''
    },
    extBtnText: {
      type: String,
      default: '帮助文档'
    },
    docUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isMove: false
    }
  },
  components: {},
  computed: {
    activeTab () {
      const { config } = this
      const PATH = this.$route.path.replace(this.prefix, '')
      let result = ''
      for (let i = 0; i < config.length; i++) {
        let temp = config[i].path
        let regexp = new RegExp(`^/${temp}`, 'i')
        if (PATH === temp || regexp.test(PATH)) result = temp
      }
      return result
    }
  },
  mounted () {},
  methods: {
    modifyScroller () {
      // TODO: 一般情况一个页面只会用一个此类型文件，但安全起见还是得将DOM ID设计成动态生成的
      const navBox = document.getElementById('nav_box')
      const scrollerBox = document.getElementById('scroller_box')
      const scroller = document.getElementById('scroller')
      if (navBox.offsetWidth === navBox.scrollWidth) return
      let prevX = null
      const _this = this
      let hasDown = false
      scroller.style.width = (navBox.offsetWidth / navBox.scrollWidth) * scrollerBox.offsetWidth + 'px'
      scroller.style.opacity = 1
      const RATIO = (navBox.scrollWidth - navBox.offsetWidth) / (scrollerBox.offsetWidth - scroller.offsetWidth)
      scrollerBox.addEventListener('mousedown', function (e) {
        hasDown = true
        if (e.target === scroller) prevX = e.pageX
        document.onmouseup = function (e) {
          _this.isMove = false
          hasDown = false
          if (!_this.isInTab) _this.hiddenScroller()
          document.onmousemove = document.onmouseup = prevX = null
        }
        document.onmousemove = function (e) {
          e.preventDefault()
          if (hasDown) _this.isMove = true
          if (prevX) {
            navBox.scrollLeft += (e.pageX - prevX) * RATIO
            let distance = navBox.scrollLeft / RATIO
            scroller.style.transform = `translateX(${distance}px)`
            prevX = e.pageX
          }
        }
      })
    },
    jumpTo () {
      if (!this.docUrl) return
      window.open(this.docUrl)
    },
    tabClick (v) {
      this.$router.push(`${this.prefix}/${v.path}`)
      this.$emit('tab-click', v)
    },
    showScroller () {
      const navBox = document.getElementById('nav_box')
      if (navBox.scrollWidth === navBox.offsetWidth) return
      const scrollerBox = document.getElementById('scroller_box')
      scrollerBox.style.display = 'block'
      this.modifyScroller()
    },
    hiddenScroller () {
      if (this.isMove) return
      const scrollerBox = document.getElementById('scroller_box')
      scrollerBox.style.display = 'none'
    },
    renderDefaultButton (h) {
      if (!this.extBtnText || !this.docUrl) return
      return (
        <div class="ext-btn">
          <el-tooltip class="item" effect="dark" content={this.extBtnText} placement="top">
            <i class="el-icon-question" onClick={ this.jumpTo }></i>
          </el-tooltip>
        </div>
      )
    },
    renderTips (h) {
      return (
        <div class="tips-content">
          { this.config.map(v => {
            if (this.activeTab !== v.path) return
            return v.tips ? v.tips(h) : ''
          }) }
        </div>
      )
    },
    renderTabs (h) {
      return (
        <div class="tabs-outter-box" onMouseover={this.showScroller} onMouseout={this.hiddenScroller}>
          <div id="nav_box" class="tabs-wrapper">
            { this.config.map(v => {
              return (
                <div class="each-tab">
                  <div class={{'tab-inner-box': true, 'active-item': v.path === this.activeTab}} onClick={this.tabClick.bind(this, v)}>{ v.name }</div>
                </div>
              )
            }) }
            {
              this.$slots.extBtn ? this.$slots.extBtn : this.renderDefaultButton(h)
            }
          </div>
          <div id="scroller_box" class="scroller-box">
            <div id="scroller" class="scroller"></div>
          </div>
        </div>
      )
    }
  },
  render (h) {
    let { keepAliveIncludes } = this
    if (typeof keepAliveIncludes === 'string' && !keepAliveIncludes) {
      keepAliveIncludes = []
    }
    return (
      <div class="router-tabs">
        <div class="router-header">
          {[
            this.renderTips(h),
            this.renderTabs(h)
          ]}
        </div>
        <div class="router-content">
          <keep-alive include={ keepAliveIncludes }>
            <router-view />
          </keep-alive>
        </div>
      </div>
    )
  }
}

</script>
<style lang='scss' scoped>
/*****************变量******************/
$router-header-color: #e4ebf1;
$router-main-color: #ffffff;
$router-content-left-right-padding: 16px;
$router-content-top-padding: 24px;
$tab-border-radius: 4px;
$tab-border-color: #dddee1;
$tab-bg-color: #d5e0e9;
$tab-normal-color: #000000;
$tab-active-color: #409EFF;
/**************************************/
.router-tabs{
  .tips-content{
    text-align: left;
  }
  .router-header{
    background-color: $router-header-color;
    padding: $router-content-left-right-padding;
    padding-top: $router-content-top-padding;
    padding-bottom: 0;
    // border: 1px solid #dddee1;
    border-bottom: none;
    border-top-left-radius: $tab-border-radius;
    border-top-right-radius: $tab-border-radius;
  }
  .tips-content{
    padding: 8px 16px;
    line-height: 20px;
    margin-bottom: 8px;
    background-color: $router-main-color;
    border-top-left-radius: $tab-border-radius;
    border-top-right-radius: $tab-border-radius;
  }
  .tabs-outter-box{
    position: relative;
  }
  .tabs-wrapper{
    display: flex;
    overflow: hidden;
  }
  .each-tab{
    padding-right: 8px;
  }
  .each-tab:last-child{
    padding-right: 0;
  }
  .tab-inner-box{
    padding: 12px 16px;
    // border: 1px solid $tab-border-color;
    border-top-left-radius: $tab-border-radius;
    border-top-right-radius: $tab-border-radius;
    border-bottom: none;
    cursor: pointer;
    background-color: $tab-bg-color;
    white-space: nowrap;
  }
  .active-item{
    background-color: #ffffff;
    color: $tab-active-color;
  }
  .tab-inner-box:hover {
    font-weight: 600;
  }
  .router-content{
    // border: 1px solid $tab-border-color;
    border-top: none;
    padding: 18px $router-content-left-right-padding;
    background-color: #ffffff;
  }
  .scroller-box{
    display: none;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 7px;
    bottom: 0px;
    transition: display linear .6s;
  }
  .scroller{
    height: 6px;
    background-color: #bebebe;
    border-radius: 6px;
    transform: translateX(0px);
  }
  .ext-btn{
    line-height: 40px;
    font-size: 22px;
    margin-left: 8px;
    cursor: pointer;
  }
  .ext-btn:hover{
    color: $tab-active-color;
  }
}
</style>
