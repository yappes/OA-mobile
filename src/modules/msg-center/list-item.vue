<template>
  <div class='item' @click='handlerClick'>
    <div class='item-image'>
      <img class='item-image-content' :src='imgSrc'>
      <aui-badge v-if='itemData.status==="NOREAD"' class='item-image-badge'></aui-badge>
    </div>
    <div class='item-con'>
      <h4 class='item-title'>{{itemData.title}}</h4>
      <p class='item-content'>{{itemData.content}}</p>
      <div class='item-time'>{{itemData.createTime_}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    itemData: {
      type: Object
    }
  },
  data() {
    return {
      imgSrcMap: {
        announcement: `static/images/msg-center/notice.png`,
        notify: `static/images/msg-center/notice.png`,
        tip: `static/images/msg-center/backlog.png`,
        letter: `static/images/msg-center/email.png`
      }
    };
  },
  computed: {
    imgSrc() {
      return this.imgSrcMap[this.itemData.type];
    }
  },
  methods: {
    handlerClick() {
      this.$emit('click', this.itemData)
    }
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped>
.item {
  padding: 10px;
  position: relative;
  background-color: white;
  .item-image {
    width: 40px;
    height: 40px;
    margin-right: 20px;
    float: left;
    position: relative;
    .item-image-content {
      width: 100%;
      height: 100%;
    }
    .item-image-badge {
      position: absolute;
      top: -4px;
      left: -4px;
    }
  }
  .item-con {
    color: #444444;
    margin-left: 60px;
    .item-title {
      font-size: 18px;
      margin-bottom: 8px;
    }
    .item-content {
      color: #808080;
      font-size: 12px;
      line-height: 1.2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-time {
      color: #808080;
      text-align: right;
    }
  }
}
</style>


