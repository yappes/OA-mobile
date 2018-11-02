<template>
  <aui-expansion :tip="expansionTitle" v-model="expansionCtrl">
    <div slot="content" class="list-page-button">
        <aui-button class="list-page-button-item" v-for="item in tags" 
                :key="item.type" @click="selectTag(item)" 
                :class="{buttonActive:selectType==item.type}">{{item.tagName}}
        </aui-button>
    </div>
  </aui-expansion>
</template>

<script>
export default {
  name: 'TagExpansion',
  props: {
    value: String,
  },
  data() {
    return {
      expansionCtrl: false,
      tags: [{
        type: 'all',
        tagName: '全部',
      },{
        type: 'announcement',
        tagName: '公告',
      },{
        type: 'notify',
        tagName: '通知',
      },{
        type: 'tip',
        tagName: '提醒',
      },{
        type: 'letter',
        tagName: '私信',
      },],
    }
  },
  computed: {
    selectType: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    expansionTitle() {
      let selectTypeMap = {
        announcement: '公告',
        notify: '通知',
        letter: '私信',
        tip: '提醒',
        all: '全部',
      }
      return selectTypeMap[this.selectType] || '全部'
    }
  },
  methods: {
    selectTag(item) {
      if(!item) {
        this.selectType = 'all'
      }else {
        this.selectType = item.type
      }
      this.expansionCtrl = false
    }
  }
}
</script>

<style lang="less">
    .aui-expansion-content-show{
        position: absolute;
        width: 100%;
    }
    .aui-expansion{
        padding: 0;
        height: 0;
    }
    .aui-expansion::before{
        position: static;
    }
    .aui-expansion::after{
        position: static;
    }
    .aui-expansion-tip{
        box-shadow: 0 3px 2px #eee;
    }
    .aui-expansion-mask{
        top:50px;
    }
    .aui-expansion-arrow-transition{
        display: inline-block;
        font-size: 16px;
        margin-top: 4px;
        margin-bottom:5px;
    }
    .aui-expansion-arrow-up:after{
        margin-top: -3px;
        right: -3px;
    }
    .aui-expansion-arrow-down:after{
        margin-top: -7px;
        right: -3px;
    }
    .list-page-button{
      overflow: hidden;
      padding: 10px 0;
      .list-page-button-item{
        width: 30%;
        float: left;
        margin: 10px 1.5%;
        background: #eee;
        color: #999;
        white-space: nowrap;
        text-overflow: ellipsis;
        &::after{
            border: none;
        }
      }
      .buttonActive{
          background: #33C2CF;
          color: #fff;
      }
    }
</style>

