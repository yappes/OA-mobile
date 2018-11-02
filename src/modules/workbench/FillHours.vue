<template>
    <div class="fill-hours">
        <aui-inline-calendar ref="calendar"
                             slot="each-day"
                             @view-change="onViewChange"
                             class="inline-calendar-demo"
                             :show.sync="show"
                             :disable-month="true"
                             :replace-text-list="replaceTextList"
                             v-model="currentDay"
                             start-date="1970-01-01"
                             end-date="2120-01-01"
                             :render-on-value-change="isRender"
                             :range="range"
                             :show-last-month="showLastMonth"
                             :show-next-month="showNextMonth"
                             :highlight-weekend="highlightWeekend"
                             :return-six-rows="return6Rows"
                             :hide-header="hideHeader"
                             :hide-week-list="hideWeekList"
                             :weeks-list="weeksList"
                             :render-function="buildSlotFn"
                             :disable-past="disablePast"
                             :disable-weekend="disableWeekend"
                             :disable-date-function="disableDateFunction">
            <template slot-scope="props"
                      slot="each-day">
                <div @click="changeBgColorCss(props.child.formatedDate,props.child.day)"
                     :class="{'show-bg-color':daysArea.length>1?((daysArea[0]!=daysArea[1]!=props.child.formatedDate?(daysArea[0] === props.child.formatedDate || daysArea[1] === props.child.formatedDate):false)):daysArea[0] === props.child.formatedDate ,
        'line-bg-color':daysArea.length>1?props.child.year == daysArea[0].substr(0,4) && props.child.month_str == (daysArea[0].substr(5,2).startsWith('0')?daysArea[0].substr(6,1):daysArea[0].substr(5,2)) && (props.child.day>=daysArea[0].substr(-2,2)&&props.child.day<=daysArea[1].substr(-2,2)||props.child.day>=daysArea[1].substr(-2,2)&&props.child.day<=daysArea[0].substr(-2,2)):false}">
                    <!-- <div :class="{'show-sel':daysArea.length>1?((daysArea[0]!=daysArea[1]!=props.child.formatedDate?(daysArea[0] === props.child.formatedDate || daysArea[1] === props.child.formatedDate):false)):daysArea[0] === props.child.formatedDate }"> -->
                    <div :class="dateList[props.child.day-1].selDate&&(props.child.month==month-1)?'show-sel':''">
                        <span class="aui-calendar-each-date">
                            {{props.child.isToday?'今':props.child.day}}
                        </span>
                        <div class="dot-bg">
                            <span v-if="props.child.month === (month-1) && props.child.year === year"
                                  :class="dateList[props.child.day-1].type?'bottomDot':'approvedDot'">
                            </span>
                        </div>
                    </div>

                </div>
            </template>
        </aui-inline-calendar>
        <div class="label-list"
             v-for="(info,index) in approvedList"
             :key="index"
             v-if="listDisable==true">
            <h4>{{'报销明细('+(index+1)+')'}}</h4>
            <aui-group>
                <aui-input v-for="(item,index) in info.approveInfo"
                           :key="index"
                           :disabled="listDisable"
                           :title="item.label"
                           :value="item.value"
                           text-align="right">
                </aui-input>
            </aui-group>
        </div>
        <div v-for="(info,index) in labelList"
             :key="index"
             class="label-list"
             v-if="listDisable==false">
            <h4>{{'报销明细('+(index+1)+')'}}</h4>
            <aui-group>
                <aui-popup-picker v-for="(items,indexs) in info"
                                  :key="indexs"
                                  v-if="items.type=='sel'"
                                  v-model="items.value"
                                  :title="items.title"
                                  :data="items.optionsList"
                                  placeholder="请选择">
                </aui-popup-picker>
                <aui-input v-for="(items,indexs) in info"
                           :key="indexs"
                           :title="items.title"
                           v-if="items.type=='input'"
                           v-model="items.value"
                           :placeholder="'输入'+items.title"
                           text-align="right">
                </aui-input>
            </aui-group>
        </div>
        <aui-button @click="addReim">增加明细</aui-button>
        <aui-button type="primary"
                    @click="submitList">提交</aui-button>
    </div>
</template>
<script>
    // import ServicesNames from '@/common/services-manager/services-names.js'
    // import {ServicesManager} from 'ab-manager-services'//通讯服务管理器
    export default {
        data() {
            return {
                // selDate:false,
                listDisable:false,
                dateList:[{
                    "date":"1",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"2",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"3",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"4",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"5",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"6",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"7",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"8",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"9",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"10",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"11",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"12",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"13",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"14",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"15",
                    "type":false,
                    "info":[{
                        "approveType":"审批通过",
                        "approveInfo":[[],[],[],"",""]
                            }]
                },{
                    "date":"16",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"17",
                    "type":false,
                    "info":[{
                        "approveType":"审批通过",
                        "approveInfo":[]
                            }]
                },{
                    "date":"18",
                    "type":false,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"19",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"20",
                    "type":true,
                    "info":[{
                        "approveType":"审批通过",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型1"},{"label":"工时类型","value":"工时类型1"},{"label":"所属项目/售前","value":"所属项目/售前11"},{"label":"地点","value":"地点11"},{"label":"时长","value":"时长11"}]
                            },{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"21",
                    "type":true,
                    "info":[{
                        "approveType":"审批通过",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型1"},{"label":"工时类型","value":"工时类型1"},{"label":"所属项目/售前","value":"所属项目/售前11"},{"label":"地点","value":"地点11"},{"label":"时长","value":"时长11"}]
                            },{
                        "approveType":"审批通过",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型1"},{"label":"工时类型","value":"工时类型1"},{"label":"所属项目/售前","value":"所属项目/售前11"},{"label":"地点","value":"地点11"},{"label":"时长","value":"时长11"}]
                            },{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"22",
                    "type":true,
                    "info":[{
                        "approveType":"审批通过",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型1"},{"label":"工时类型","value":"工时类型1"},{"label":"所属项目/售前","value":"所属项目/售前11"},{"label":"地点","value":"地点11"},{"label":"时长","value":"时长11"}]
                            },{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"23",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"24",
                    "type":true,
                    "info":[{
                        "approveType":"审批通过",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型1"},{"label":"工时类型","value":"工时类型1"},{"label":"所属项目/售前","value":"所属项目/售前11"},{"label":"地点","value":"地点11"},{"label":"时长","value":"时长11"}]
                            },{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"25",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"26",
                    "type":true,
                    "info":[{
                        "approveType":"审批通过",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型1"},{"label":"工时类型","value":"工时类型1"},{"label":"所属项目/售前","value":"所属项目/售前11"},{"label":"地点","value":"地点11"},{"label":"时长","value":"时长11"}]
                            },{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"27",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"28",
                    "type":true,
                    "info":[{
                        "approveType":"审批通过",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型1"},{"label":"工时类型","value":"工时类型1"},{"label":"所属项目/售前","value":"所属项目/售前11"},{"label":"地点","value":"地点11"},{"label":"时长","value":"时长11"}]
                            },{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"29",
                    "type":true,
                    "info":[{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                },{
                    "date":"30",
                    "type":true,
                    "info":[{
                        "approveType":"审批通过",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型1"},{"label":"工时类型","value":"工时类型1"},{"label":"所属项目/售前","value":"所属项目/售前11"},{"label":"地点","value":"地点11"},{"label":"时长","value":"时长11"}]
                            }]
                },{
                    "date":"31",
                    "type":true,
                    "info":[{
                        "approveType":"审批通过",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型1"},{"label":"工时类型","value":"工时类型1"},{"label":"所属项目/售前","value":"所属项目/售前11"},{"label":"地点","value":"地点11"},{"label":"时长","value":"时长11"}]
                            },{
                        "approveType":"审批中",
                        "approveInfo":[{"label":"考勤类型","value":"考勤类型2222"},{"label":"工时类型","value":"工时类型222"},{"label":"所属项目/售前","value":"所属项目/售前22"},{"label":"地点","value":"地点2222"},{"label":"时长","value":"时长2222"}]
                            }]
                }],
                selValue:[],
                labelList:[],
                replaceTextList:{TODAY: "今"},
                approvedList:[],
                labelListItem:[
                    {"label":"attendanceType","value":[],"title":"考勤类型","type":"sel","optionsList":[['本地','出差','当日往返']]},
                    {"label":"fillHourType","value":[],"title":"工时类型","type":"sel","optionsList":[['项目执行中','售前活动','部门活动','销售活动']]},
                    {"label":"project","value":[],"title":"所属项目/售前","type":"sel","optionsList":[['xx运营管理xx研发项目','xx产品开发xx版本']]},
                    {"label":"place","value":"","title":"地点","type":"input"},
                    {"label":"duration","value":"","title":"时长","type":"input"},
                ],
                show: true,
                showworkhourtypelist: false,
                value: "",
                listValue: "",
                range: false,
                year: "",
                month: "",
                daysArea: [],
                workhourdetail: {},
                styles: 'show-bg-color-bk',
                isShowBottomDot: false,
                currentDay: "TODAY",
                targetnamelist: [1, 2, 3],
                countselectedday: 0,
                showLastMonth: true,
                showNextMonth: true,
                highlightWeekend: false,
                return6Rows: false,
                hideHeader: false,
                hideWeekList: false,
                replace: false,
                changeWeeksList: false,
                disableFuture:true,
                weeksList: [],
                useCustomFn: false,
                buildSlotFn: () => "",
                isRender: false,
                disablePast: false,
                disableFuture: false,
                disableFuture: false,
                disableWeekend: false,
                disableDateFunction (date) {
                    if (date.formatedDate === '2018-10-16') {
                        return true
                    }
                }
            };
        },
        mounted () {
            //初始化多条数据
            let newArr=[];
            console.log(this.labelListItem)
            // this.dateList.forEach(item=>{
            //     item.info.forEach(_item=>{

            //     })
            // })
            
            
            this.labelList.push(this.labelListItem);
            this.useCustomFn = true;
            this.$store.state.headTitle = '申请报工'
            this.$store.state.headBack = true
            this.$store.state.headAdd = false            
            this.$store.state.headLeftImg = "static/images/back.png",
            this.$store.state.headBackLink = '/home/workbench'
            this.$store.state.showDownMenu = false
            this.init();
            // this.$nextTick(function () {
            //     this.changeBgColorCss(this.currentDay)
            // })

        },
        methods: {
            init(){
                let subData={"userId":"129","findTime":"2018-07"}
                // ServicesManager.getService(ServicesNames.FINDALREADYJBBYUSERANDTIME, subData).then(res => {
                //     console.log('FINDALREADYJBBYUSERANDTIME', res);

                // })
            },
            submitList(){
                this.$aui.toast.show({
                    text: '提交成功！',
                    type: 'success'
                })
                this.$store.commit("setSelectedTabbarItem",0);
                console.log("store",this.$store.state.selectedTabbarItem)
                this.$router.push('/home/msgCenter')
            },
            addReim() {
                this.labelList.push([
                    {"label":"reimAmount","value":[],"title":"考勤类型","type":"sel","optionsList":[['本地','出差','当日往返']]},
                    {"label":"reimAmount","value":[],"title":"工时类型","type":"sel","optionsList":[['项目执行中','售前活动','部门活动','销售活动']]},
                    {"label":"reimAmount","value":[],"title":"所属项目/售前","type":"sel","optionsList":[['xx运营管理xx研发项目','xx产品开发xx版本']]},
                    {"label":"invoiceAmount","value":"","title":"地点","type":"input"},
                    {"label":"invoiceAmount","value":"","title":"时长","type":"input"},
                ]);
            },
            onViewChange(val, count) {
                console.log("on view change", val, count);
                this.year = val.year;
                this.month = val.month;
                if (this.year == this.currentDay.substr(0, 4) && this.month > this.currentDay.substr(6, 1)) {
                    //超过当前年月不渲染
                    // this.showNextMonth = false;
                }
            },
            changeBgColorCss(days,date){
                this.approvedList.splice(0,this.approvedList.length);
                if (this.year != days.substr(0, 4) || this.month != (days.substr(5, 2).startsWith('0') ? days.substr(6, 1) : days.substr(5, 2))) {
                    return;
                }
                for(var i = 0;i<this.dateList[date-1].info.length;i++){
                    this.approvedList[i] = this.dateList[date-1].info[i]
            }
                //点击日期 已审批则显示对应填写过内容
                if(this.dateList[date-1].type==true){
                    //清空填报工时数组
                    this.daysArea.splice(0,this.daysArea.length)
                    //列表编辑禁用
                    this.listDisable=true
                    //选中日期高亮显示并唯一
                    for(var i=0;i<this.dateList.length;i++){
                        this.dateList[i].selDate=false
                    }
                    this.dateList[date-1].selDate=!this.dateList[date-1].selDate
                }else{
                    //未审批则可以填写报工编辑
                    this.listDisable=false
                    //未报工日期选中时编辑框初始清空value
                    this.labelList.slice(0,1);
                    //未审批点击高亮
                    for(var i=0;i<this.dateList.length;i++){
                        this.dateList[i].selDate=false
                    }
                    this.dateList[date-1].selDate=true
                    console.log(this.daysArea);
                    //未审批选中两端深蓝色高亮                
                if (this.daysArea.length == 1) {
                    this.daysArea[1] = days;
                    this.countselectedday = this.datediff(this.daysArea[0], this.daysArea[1]) + 1;
                    var leftLen = this.daysArea[0].substr(8, 2).startsWith('0') ? this.daysArea[0].substr(9, 1) : this.daysArea[0].substr(8, 2)
                    var rightLen = this.daysArea[1].substr(8, 2).startsWith('0') ? this.daysArea[1].substr(9, 1) : this.daysArea[1].substr(8, 2)
                    this.dateList[leftLen-1].selDate=true
                    this.dateList[rightLen-1].selDate=true
                } else if (this.daysArea.length > 1) {
                    this.daysArea[0] = this.daysArea[1];
                    this.daysArea[1] = days;
                    this.countselectedday = this.datediff(this.daysArea[0], this.daysArea[1]) + 1;
                    var leftLen = this.daysArea[0].substr(8, 2).startsWith('0') ? this.daysArea[0].substr(9, 1) : this.daysArea[0].substr(8, 2)
                    var rightLen = this.daysArea[1].substr(8, 2).startsWith('0') ? this.daysArea[1].substr(9, 1) : this.daysArea[1].substr(8, 2)
                    this.dateList[leftLen-1].selDate=true
                    this.dateList[rightLen-1].selDate=true
                    
                } else {
                    this.daysArea[0] = days;
                    this.countselectedday = 1;
                }
                }
            },
            datediff(sDate1, sDate2){    //sDate1和sDate2是2006-12-18格式
                var aDate, oDate1, oDate2, iDays;
                aDate = sDate1.split("-");
                oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);   //转换为12-18-2006格式
                aDate = sDate2.split("-");
                oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
                iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);   //把相差的毫秒数转换为天数
                return iDays;
            },
            showworkhourlistmenus(){
                console.log("showworkhourlistmenus");
                this.showworkhourtypelist = true;
            },
            selectedWorhourtype(key){
                this.workhourdetail.workhourtype = key;
            }
        },
        watch: {           
            useCustomFn(val) {
                this.buildSlotFn = val
                    ? (line, index, data) => {
                        if (data.month === (this.month - 1) && data.year === this.year) {
                            if (/8/.test(data.date)) {
                                return '<div style="font-size:12px;text-align:center;line-height:10%"><span style="display:inline-block;width:5px;height:5px;background-color:red;border-radius:50%;"></span></div>'
                            } else if (/1/.test(data.date)) {
                                return '<div style="font-size:12px;text-align:center;line-height:10%"><span style="display:inline-block;width:5px;height:5px;background-color:#33C3CE;border-radius:50%;"></span></div>'
                            } else {
                                return '<div style="height:5px;"></div>';
                            }
                        } else {
                            return '<div style="height:5px;"></div>';
                        }
                    }
                    : () => "";
            },
            changeWeeksList(val) {
                // this.weeksList = val
                //     ? ["日", "一", "二", "三", "四", "五", "六 "]
                //     : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
            }
        }
    };
</script>

<style scoped>
.fill-hours {
  background: #fafafa;
}
.dot-bg {
  font-size: 12px;
  text-align: center;
  line-height: 10%;
  margin-top: -2px;
  padding-bottom: 4px;
}
.label-list {
  margin-top: 22px;
}
.label-list > h4 {
  margin-left: 15px;
  font-size: 12px;
  font-weight: normal;
  margin-bottom: 8px;
}
.inline-calendar-demo {
  background: rgba(255, 255, 255, 0.9);
}

.aui-prev-icon,
.aui-next-icon {
  position: absolute;
  left: 0;
  top: 15px;
  display: inline-block;
  width: 8px;
  height: 8px;
  border: 2px solid #ccc;
  border-radius: 0;
  border-top: none;
  border-right: none;
  transform: rotate(45deg);
  margin-left: 70px;
  line-height: 40px;
}

.calendar-year > span.calendar-header-right-arrow {
  left: auto;
  right: 0;
}

.calendar-header > div {
  float: left;
  width: 100%;
  text-align: center;
  overflow: hidden;
}

.aui-next-icon {
  transform: rotate(-135deg);
  left: auto;
  top: 14px;
  right: 70px;
}

.calendar-title {
  padding: 0 6%;
  color: #808080;
  font-family: Arial, Helvetica, sans-serif;
}

.bottomDot {
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: #f00;
  border-radius: 50%;
}
.approvedDot {
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: yellow;
  border-radius: 50%;
}
.show-sel {
  margin: 0 20%;
  background-color: #33c3ce !important;
  border-radius: 50%;
  color: #fff;
}
.show-bg-color {
  /* background-color: #33c3ce !important; */
  /* border-radius: 50%; */
  color: #fff !important;
}

.line-bg-color {
  background-color: #c1edf0;
}
.add-detail {
  display: block;
  margin-left: 0;
  width: 46%;
  height: 100%;
  float: left;
  /*     background: url(../assets/img/plus.png) no-repeat right;*/
}
</style>
<style>
.fill-hours .inline-calendar td.is-today,
.inline-calendar td.is-today.is-disabled {
  color: #33c3ce;
}
.label-list .aui-group:first-of-type .aui-cells {
  margin-top: 0;
}
.fill-hours button:nth-of-type(1) {
  margin-top: 25px;
}
.fill-hours .aui-btn:after {
  border: none;
}
.fill-hours button:nth-of-type(2) {
  width: 80%;
  margin-top: 32px;
}
.fill-hours .aui-cells:before {
  border-top: 0;
}
.fill-hours .aui-cells:after {
  border-bottom: 0;
}
</style>


