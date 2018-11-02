<template>
  <div>
    <aui-group>
      <!-- <aui-checklist title="title" :options="options" v-model="value"></aui-checklist> -->
    </aui-group>
    <aui-group >
      <!-- <aui-popup-picker :data='list2' v-model='currentValue'>
      </aui-popup-picker> -->
    </aui-group>
    <aui-group >
      <!-- <date-adaptive v-model="dateValue" :format='format_1'> -->
      <!-- </date-adaptive> -->
      <!-- <date-adaptive v-model="dateValue" :format='format_1'>
      </date-adaptive> -->
      <!-- <radio-mobile v-model='selectValue' :options='list_2' placeholder='gua' :required='true' label='label'>
      </radio-mobile> -->
      <div>
        <!-- <div class='half'>
          <aui-datetime-view v-model='startValue'></aui-datetime-view>
        </div> -->
        <!-- <div class='half'>
          <aui-datetime-view v-model='endValue' :start-date='startdate'></aui-datetime-view>
        </div> -->
      </div>

    </aui-group>
    <!-- <my-select :options='list_2' v-model='selectValue'></my-select> -->
    <!-- <my-select-mpl :options='list_2' v-model='selectValue_2'></my-select-mpl> -->
    <!-- <dept-selection v-model='dept' ></dept-selection> -->
    <!-- <data-selection v-model='dataSelect'></data-selection> -->
    <!-- <date-range v-model='rangeValue' placeholder='请选择时间'></date-range> -->
    <date-adaptive v-model='dateValue' placeholder='请选择时间' format='YYYY-MM-DD HH:mm' label='时间1' :disabled='true'></date-adaptive>
    <date-adaptive v-model='dateValue' placeholder='请选择时间' format='YYYY-MM-DD HH:mm' label='时间2' ></date-adaptive>

  </div>
</template>

<script>
  import dateAdaptive from '../../components/input-adaptive/src/date-adaptive'
  import mySelect from '../../components/input-adaptive/src/select-mobile'
  import mySelectMpl from '../../components/input-adaptive/src/select-mobile-multiple'
  import deptSelection from '../../components/dept-selection/dept-selection'
  import dataSelection from '../../components/data-selection/data-selection'
  import radioMobile from "../../components/input-adaptive/src/radio-mobile";
  import dateRange from "../../components/input-adaptive/src/date-range";
  import AuiDatetimeView from "AUI/components/form-components/aui-datetime-view";

  export default {
    components: {
      dateAdaptive,
      mySelect,
      mySelectMpl,
      deptSelection,
      dataSelection,
      radioMobile,
      dateRange,
      AuiDatetimeView
    },
    data() {
      return {
        dept: '0001001012',
        dataSelect: '',
        // options: ['1111', '2222'],
        options: [{
          key: 'key_1',
          value: 'value_1',
        }, {
          key: 'key_2',
          value: 'value_2'
        },{
          key: 'key_3',
          value: 'value_3',
        }, {
          key: 'key_4',
          value: 'value_4'
        },{
          key: 'key_5',
          value: 'value_5',
        }, {
          key: 'key_6',
          value: 'value_6'
        },{
          key: 'key_7',
          value: 'value_7',
        }, {
          key: 'key_8',
          value: 'value_8'
        }],
        value: ['key_1'],
        dateValue: null,
        format_1: 'HH:mm',
        // gua: [],
        list: [{
          name: '今天',
          value: 1,
        },{
          name: '昨天',
          value: 2,
        },{
          name: '明天',
          value: 3,
        },{
          name: '本周',
          value: 4,
        },{
          name: '上周',
          value: 5,
        },{
          name: '本月',
          value: 6,
        },{
          name: '上月',
          value: 7,
        },{
          name: '本年',
          value: 8,
        },{
          name: '上年',
          value: 9,
        },],
        currentValue: [2],
        list2: [this.list],
        temp: null,
        selectValue: 2,
        selectValue_2: [2,3],
        show1: '',
        list_2: [],
        required: true,
        startValue: null,
        endValue: '',
        maxYear: null,
        startdate: '',
        // rangeValue: [1473436800000, 1539100800000]
        rangeValue: null
      }
    },
    methods: {
      gua() {
        if(!this.value) {
          return null
        }
        let val = String(this.value)
        return [val]
      },
      format(value) {
        let map = {
          '1': '今天',
          '2': '昨天',
          '3': '明天',
          '4': '本周',
          '5': '上周',
          '6': '本月',
          '7': '上月',
          '8': '本年',
          '9': '上年',
        }
        let key = value[0]
        return map[key]
      }
    },
    watch: {
      value(val) {
        if(val === this.temp) {
          return 
        }
        this.currentValue = this.gua()
      },
      currentValue(val) {
        if(!val) {
          this.temp = null
        }
        this.temp = Number(val[0])
        this.$emit('input', this.temp)
      }
    },
    mounted() {
      // this.list_2 = this.list
      setTimeout(() => {
        this.list_2 = this.list
        // this.list_2 = []
      }, 1000)
    }
  }
</script>

<style>
  .half {
    width: 45%;
    display: inline-block;
  }
</style>
