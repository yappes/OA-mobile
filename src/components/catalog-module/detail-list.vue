<template>
    <div class='detail-list'>
        <aui-group>
            <aui-cell :title='batchView.title' is-link @click='openBatch'></aui-cell>
        </aui-group>
        <div v-transfer-dom>
            <aui-popup v-model="showPopup" height="100%">
                <div>
                    <aui-popup-header class="popup-header" left-text="关闭" :title="batchView.title" :show-bottom-border="false" @click-left="cancle" style='background-color: #33c3cf'></aui-popup-header>
                    <slot name="listGrid"></slot>
                </div>
            </aui-popup>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AuiPopupHeader from "AUI/components/form-components/aui-popup-header";
const STORAGE_PREFIX = 'paas:cache:list:viewId:';
export default {
    name:'DetailList',
    components:{AuiPopupHeader},
    props:{
        batchView:{
            type: Object
        },
    },
    data(){
        return {
            
        }
    },
    computed:{
        showPopup:{
            get(){
                return this.$store.getters["detailListState/showPopup"]; 
            },
            set(value){
                this.$store.dispatch("detailListState/changeShowPopup",value)
            },
        }
    },
    created(){
        
    },
    methods:{
        openBatch(){
            this.$store.dispatch("detailListState/changeShowPopup",true)
        },
        cancle(){
            this.$store.dispatch("detailListState/changeShowPopup",false)
        },
    }
}
</script>
<style lang="less" scoped>
.detail-list /deep/ .agree-aui-label:before {
    display: inline-block;
    content: "";
    width: 3px;
    height: 14px;
    background-color: #5ae884;
    margin-right: 10px;
    vertical-align: middle;
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


