<template>
    <div class="reimbursement">
        <aui-group>
            <aui-popup-picker v-model="selValue"
                              title="预算名称"
                              :data="nameList"
                              placeholder="请选择">
            </aui-popup-picker>
        </aui-group>
        <p class="reiMoneyInfo">预算总额：1000元，可用：800元</p>
        <div v-for="(info,num) in labelList"
             :key="num"
             class="label-list">
            <div>
        <span @click="isShowThis(num)"
              class="titleInfoSty">{{'报销明细(' + (num + 1) + ')'}}</span>
                <div class="delImgSty"
                     @click="delReim(num)"><img src="static/images/new-issue/delete.png"
                                                class="delImg"></div>
            </div>
            <aui-group v-for="(item,index) in info"
                       :key="index"
                       v-show="labelList[num][0][0].showThis">
                <aui-popup-picker v-for="(items,indexs) in item"
                                  :key="indexs"
                                  v-model="labelList[num][index][indexs].value"
                                  v-if="items.type=='sel'"
                                  :title="items.title"
                                  :data="items.optionsList"
                                  placeholder="请选择">
                </aui-popup-picker>
                <aui-input v-for="(items,indexs) in item"
                           :key="indexs"
                           :title="items.title"
                           v-model="labelList[num][index][indexs].value"
                           v-if="items.type=='input'"
                           :placeholder="'输入'+items.title"
                           text-align="right">
                </aui-input>
                <aui-calendar v-for="(items,indexs) in item"
                              :key="indexs"
                              v-model="labelList[num][index][indexs].value"
                              v-if="items.type=='time'"
                              :title="items.title"
                              value-text-align="left">
                </aui-calendar>
                <aui-textarea v-for="(items,indexs) in item"
                              :key="indexs"
                              v-if="items.type=='textarea'"
                              title="报销事由"
                              placeholder="请输入报销事由"
                              v-model="labelList[num][index][indexs].value"
                              :show-counter="false"
                              :rows="3"></aui-textarea>
            </aui-group>
        </div>
        <aui-button @click="addReim">增加明细</aui-button>
        <div class="foot-btn">
            <aui-button type="primary"
                        @click="submitList">提交
            </aui-button>
            <aui-button @click="submitList">保存草稿</aui-button>
        </div>

    </div>

</template>

<script>
    // import ServicesNames from '@/common/services-manager/services-names.js'
    // import {ServicesManager} from 'ab-manager-services'//通讯服务管理器
    export default {
        data() {
            return {
                nameList: [['2018XX日常', 'XX银行网点项目', 'XX银行柜面维护']],
                selValue: [],
                labelList: [],
                labelListItem: [
                    [{'showThis': 'true'}],
                    [
                        {"label": "reimAmount", "title": "报销金额", "type": "input", 'value': ''},
                        {"label": "invoiceAmount", "title": "发票金额", "type": "input", 'value': ''}
                    ],
                    [
                        {"label": "name", "title": "发票日期", "type": "time", 'value': ''},
                        {"label": "name", "title": "当日考勤", "type": "sel", "optionsList": [['已填', '未填']], 'value': []}
                    ],
                    [
                        {"label": "name", "title": "管理类别一级", "type": "sel", "optionsList": [['出差', '旅游']], 'value': []},
                        {"label": "name", "title": "管理类别二级", "type": "sel", "optionsList": [['报销', '自费']], 'value': []},
                    ],
                    [
                        {"label": "reimAmount", "title": "开票单位", "type": "input", 'value': ''},
                        {"label": "reimAmount", "title": "发票张数", "type": "input", 'value': ''},
                        {"label": "reimAmount", "title": "发票号", "type": "input", 'value': ''},
                        {
                            "label": "name",
                            "title": "发票类型",
                            "type": "sel",
                            "optionsList": [['增值税', '普通发票']],
                            'value': []
                        },
                    ],
                    [
                        {"label": "reimAmount", "title": "报销事由", "type": "textarea", 'value': ''},
                    ]],
            };
        },
        mounted() {
            this.labelList.push(this.labelListItem);

            //
            this.$store.state.headTitle = '报销申请';
            this.$store.state.headBack = true;
            this.$store.state.headAdd = false;
            this.$store.state.headBackLink = '/home/workbench';
            this.$store.state.showDownMenu = false;
            this.init()
        },

        methods: {
            init(){
                let subData={"userId":"129"}
                // ServicesManager.getService(ServicesNames.REIMBURSEMENTBUDGET4MOBIL, subData).then(res => {
                //     console.log('REIMBURSEMENTBUDGET4MOBIL', res);

                // })
            },
            submitList(){
              let validateInfo=true
              for(let i=0;i<this.labelList.length;i++){
                      for(let j=1;j<this.labelList[i].length;j++){
                          for(let q=0;q<this.labelList[i][j].length;q++){
                              if(this.labelList[i][j][q].value==''){
                                    this.$aui.toast.show({
                                   type: "text",
                                   text: this.labelList[i][j][q].title+'不能为空',
                                   })
                                  validateInfo=false;
                                    break
                              }
                          }
                      }
              }
                if(validateInfo){
                      this.$aui.loading.show({
                     text: "正在提交中"
                     })
                     setTimeout(() => {
                     this.$aui.loading.hide()
                     let dialogList = [{
                     src: 'static/images/success.png',
                     title: "提交成功",
                     desc: '确认后返回消息列表',
                     }];
                     this.$store.state.dialogList = dialogList;
                     this.$store.state.dialogLink = '/home/msgCenter';
                     this.$store.state.showDialog = true;
                     this.$store.commit("setSelectedTabbarItem", 0);
                     }, 2000)
                }
            },
            isShowThis(index) {
                if (this.labelList[index][0][0].showThis) {
                    this.labelList[index][0][0].showThis = false;
                } else {
                    this.labelList[index][0][0].showThis = true;
                }
            },
            addReim() {
                let labList = [
                    [{'showThis': 'true'}],
                    [
                        {"label": "reimAmount", "title": "报销金额", "type": "input", 'value': ''},
                        {"label": "invoiceAmount", "title": "发票金额", "type": "input", 'value': ''}
                    ],
                    [
                        {"label": "name", "title": "发票日期", "type": "time", 'value': ''},
                        {"label": "name", "title": "当日考勤", "type": "sel", "optionsList": [['已填', '未填']], 'value': []}
                    ],
                    [
                        {"label": "name", "title": "管理类别一级", "type": "sel", "optionsList": [['出差', '旅游']], 'value': []},
                        {"label": "name", "title": "管理类别二级", "type": "sel", "optionsList": [['报销', '自费']], 'value': []},
                    ],
                    [
                        {"label": "reimAmount", "title": "开票单位", "type": "input", 'value': ''},
                        {"label": "reimAmount", "title": "发票张数", "type": "input", 'value': ''},
                        {"label": "reimAmount", "title": "发票号", "type": "input", 'value': ''},
                        {
                            "label": "name",
                            "title": "发票类型",
                            "type": "sel",
                            "optionsList": [['增值税', '普通发票']],
                            'value': []
                        },
                    ],
                    [
                        {"label": "reimAmount", "title": "报销事由", "type": "textarea", 'value': ''},
                    ]]
                this.labelList.push(labList);

            },
            delReim(index) {
                this.labelList.splice(index, 1);
            }
        }
    };
</script>

<style scoped>
    .reimbursement {
        position: relative;
        width: 100%;
        height: 120%;
        padding-bottom: 120px;
        background: #fafafa;
    }

    .reiMoneyInfo {
        font-family: SourceHanSansCN-Normal;
        font-size: 12px;
        color: #c8c8c8;
        letter-spacing: 0;
        margin-left: 15px;
        margin-top: 10px;
        margin-bottom: 30px;
    }

    .label-list {
        margin-bottom: 26px;
    }

    .label-list > h4 {
        margin-left: 15px;
        font-size: 12px;
        font-weight: normal;
        margin-bottom: 8px;
    }

    .delImgSty {
        float: right;
        height: 25px;
        width: 25px;
        margin-right: 20px;
        margin-top: -6px;
    }

    .delImg {
        height: 100%;
        width: 100%;
    }

    .titleInfoSty {
        margin-left: 15px;
    }

    .foot-btn {
        position: absolute;
        bottom: -12px;
        left: 0;
        width: 100%;
        display: flex;
    }

    .foot-btn button {
        border-radius: 0;
        flex: 1;
    }
</style>
<style>
    .label-list .aui-group:first-of-type .aui-cells {
        margin-top: 0;
    }

    .reimbursement .aui-cells {
        margin-top: 15px;
    }

    .reimbursement .aui-cells:before {
        border-top: 0;
    }

    .reimbursement .aui-cells:after {
        border-bottom: 0;
    }

    .reimbursement .aui-btn:after {
        border: none;
    }

    .reimbursement .agree-aui-textarea.aui-cell {
        margin-bottom: 25px;
    }

    .reimbursement .aui-btn + .aui-btn {
        margin-top: 0;
    }
</style>
