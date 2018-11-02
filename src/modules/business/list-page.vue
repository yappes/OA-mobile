<template>
    <div class="list-page">
        <aui-header  :showBack="false" style="z-index:99;height: 45px;width: 100%;background-color: #33c3cf">
            <div style="height: 30px;width: 30px;" slot="overwrite-left" @click="back">
                <img src="@/assets/back.png" style="height: 100%;width: 100%;margin-top: -8px">
            </div>
            <div slot='right' style='height: 30px;width: 30px' v-if='view.operations.buttons&&view.operations.buttons.length>0' @click='showAllButtons=true;openChoose=false'>
              <img src="@/assets/more.png" style="height: 100%;width: 100%;margin-top: -8px">
            </div>
            <span>{{view.title}}</span>
        </aui-header>
        <list-grid ref="listGrid"
                   :viewId="view.$id"
                   :moduleId="view.moduleId"
                   :datasource="view.datasource" 
                   :columns="view.columns" 
                   :mobileListCaption="view.mobileListCaption"
                   :mobileListTitle="view.mobileListTitle"
                   :componentBtns="view.operations.component"
                   :openChoose="openChoose"
                   :buttons="batchOperation"
                   :isShowAdvanced="isShowAdvanced"
                   :select-tag-id="tagId"
                   @row-click="handleRowClick"
                   @button-click="handleButtonClick"
                   @component-click="handleComponentClick"
                   @selection-change="handleSelectionChange"
                   @close-choose="closeChoose"
                   @select-tag="selectTag"></list-grid>
        <aui-actionsheet v-model="showAllButtons" :menus="operations" @click-menu="handleButtonClick"></aui-actionsheet>

        <!--批量修改-->
        <div v-transfer-dom>
            <aui-popup v-model="batchDialogVisible" height="100%">
                <div>
                    <aui-popup-header class="popup-header" left-text="关闭" :title="batchDialogTitle" :show-bottom-border="false" @click-left="batchDialogTitle=false" style='font-size:18px;background-color:#33c3cf'>
                        <div slot='right-text' style='height: 30px;width: 30px' v-if='proxy.batchDialogView&&proxy.batchDialogView.operations&&proxy.batchDialogView.operations.length>0' @click='showPopupButtons=true'>
                            <img src="@/assets/more.png" style="height: 100%;width: 100%;margin-top: 5px">
                        </div>
                    </aui-popup-header>
                    <dialog-module v-if="proxy.batchDialogView&&proxy.batchDialogView.$id" :view="proxy.batchDialogView" ref="dialogModule"></dialog-module>
                </div>
            </aui-popup>
            <aui-actionsheet v-model="showPopupButtons" :menus="formatOperations(proxy.batchDialogView)" @click-menu="handlePopupButtonClick"></aui-actionsheet>
        </div>
        <!--批量修改 end-->
    </div>
</template>
<script>
import ListGrid from '@/components/list-grid/list-grid';
import {ListViewMobile} from 'paas-web-utils/rules';
const STORAGE_PREFIX = 'paas:cache:list:viewId:';
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
import DialogModule from '@/components/dialog-module/dialog-module';
export default {
    name:'ListPage',
    components:{ListGrid,AuiPopupHeader,DialogModule},
    props:{
        view:{
            type: Object,
            default: function() {
                return {
                    $id: 53,
                    datasource: {}
                };
            }
        }
    },
    data(){
        return{
            isShowAdvanced:true,//是否展示筛选组件
            openChoose:false,//多选框
            showAllButtons: false,//展示功能按钮
            proxy: {
                datasource: {},
                batchDialogView: {}
            },
            batchOperation:{},//批量操作功能按钮
            selectionrecordData: [],
            batchDialogVisible:false,
            batchDialogTitle:'加载中',
            showPopupButtons:false,
            tagId:undefined,//选中的tag的id
        }
    },
    mounted(){
        if(this.view.viewData.defaultSearchTagId){
            this.$set(this.proxy.datasource, "tagId", this.view.viewData.defaultSearchTagId)
        }
    },
    created(){
        this.initStorageData()
    },
    computed:{
        operations() {
            if (this.view.operations) {
                let operations = this.view.operations.buttons.filter(operation => {
                    return !operation.hidden;
                });
                console.log('operations',operations)
                let button = {};
                for (const b of operations) {
                    button[b.$id] = b.lable;
                }
                console.log('batchOperation',this.batchOperation)
                console.log('button',button)
                return button;
            }
        }
    },
    watch: {
        'view.datasource': {
            deep: true,
            handler() {
                this.setStorageData()
            }
        }
    },
    methods:{
        closeChoose(value){
            this.openChoose = false;
        },
        //改变顶部选项
        activeMenu(index){
            this.menuIndex = index;
        },
        //下拉框选项选择
        activeButtom(index){
            this.buttonIndex = index;
        },
        //返回
        back() {
            this.$router.push("/home/workbench");
        },
        handleSelectionChange(list) {
            this.selectionrecordData = list;
            this.view.$emit("update", this.view, list);
        },
        // 行点击
        handleRowClick(row) {
            this.view.rowClick(this, row);
        },
        //页面按钮点击事件
        handleButtonClick(menuKey, menuItem) {
            for (const button of this.view.operations.buttons) {
                if (button.$id == menuKey) {
                    if(button.type == 'SUBMIT' || button.type == 'SUBMIT_CONFIRM' || button.type == 'BATCH'){
                        this.openChoose = true;
                        this.batchOperation = button;
                        break;
                    }
                    button.triggerClick(this);
                    break;
                }
            }
        },
        // 功能按钮点击事件
        handleComponentClick(button, row) {
            if (row === "SELECT_DATA_LIST") {
                row = this.selectionrecordData;
            }
            console.log('row',row)
            button.triggerClick(this, row, this.$refs.listGrid.recordData);
        },
        //筛选标签点击事件
        selectTag(tagId){
            this.tagId = tagId;
            this.proxy.datasource.tagId = tagId;
            //选择tag时当前页应设置为1
            this.$set(this.proxy.datasource, "currentPage", 1);
            this.$set(this.proxy.datasource, "reload", true);
        },
        //存储
        setStorage(key, item) {
            let s = JSON.stringify(item)
            window.sessionStorage.setItem(key, s)
        },
        //读取
        getStorage(key) {
            let s = window.sessionStorage.getItem(key)
            return JSON.parse(s)
        },
        //读取缓存初始化列表
        initStorageData() {
            let viewId = String(this.view.$id)
            let key = STORAGE_PREFIX + viewId
            let data = this.getStorage(key)
            if(data) {
                this.view.datasource = data.datasource
                this.view.columns.forEach(col => {
                    data.columnStatus.forEach(e => {
                        if(e.id === col.$id) {
                            col.hidden = e.hidden
                        }
                    })
                })
            }
            this.$set(this.proxy, "datasource", this.view.datasource);
            this.$set(this, 'tagId', this.view.datasource.tagId)
            console.log('this.proxy.datasource',this.proxy.datasource)
        },
        //最新改变数据存入缓存
        setStorageData() {
            let viewId = String(this.view.$id)
            let datasource = this.view.datasource
            let columnStatus = this.view.columns.map(col => {
                return {
                    id: col.$id,
                    hidden: col.hidden,
                }
            })
            let data = {
                viewId,
                datasource,
                columnStatus,
            }
            let key = STORAGE_PREFIX + viewId
            this.setStorage(key, data)
        },
        openBatchDialog(view, data){
            this.batchDialogTitle = view.title;
            this.$delete(this.proxy, 'batchDialogView');
            setTimeout(() => {
                this.$set(this.proxy, 'batchDialogView', view);
                console.log('this.proxy.batchDialogView',this.proxy.batchDialogView)
                this.batchDialogVisible = true;
            }, 50);
        },
        formatOperations(view){
            if (view&&view.operations) {
                let button = {};
                for (const b of view.operations) {
                    button[b.$id] = b.lable;
                }
                return button;
            }
        },
        handlePopupButtonClick(menuKey, menuItem){
            let operations  = this.proxy.batchDialogView.operations;
            if(operations){
                for (const button of operations) {
                    if (button.$id == menuKey) {
                        button.triggerClick(this.$refs.dialogModule)
                    }
                }
            }
        }
    }
}
</script>
<style lang="less">
.list-page{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .list-page-select{
        width: 100%;
        display: flex;
        justify-content: space-around;
        .list-page-select-menu{
            font-size: 16px;
        }
        .menuActive{
            color: #33C2CF;
        }
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
            &::after{
                border: none;
            }
        }
        .buttonActive{
            background: #33C2CF;
            color: #fff;
        }
    }
    .aui-search-bar__label{
        top: 4px;
    }
}
.popup-header {
    /deep/ .aui-popup-header-left {
        color:white
    }
    /deep/ .aui-popup-header-title {
        color:white
    }
    /deep/ .aui-popup-header-right {
        width:32px
    }
}
</style>

