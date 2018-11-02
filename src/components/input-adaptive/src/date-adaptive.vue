<template>
  <aui-datetime v-model='currentValue' :placeholder='placeholder' :readonly='disabled' :format='_format' :min-year='1900' :max-year='2100'>
    <span slot="title" style="color: #444444; padding-right: 10px;" >
      {{label}}
      <font v-if="required" style="color: red;font-weight: 700;">*</font>
    </span>
  </aui-datetime>
</template>

<script>
  // import { ValidatorManager } from "ab-manager-validator";
  // import validTemplate from '@/components/validate-component/ValidTemplate'
  // import { getValidators } from "@/common/validators.js";
  
  let valid = {}
  export default {
    props: {
      value: [Number, String],
      placeholder: String,
      disabled: Boolean,
      required: Boolean,
      label: String,
      format: {
        type: String,
        default: 'YYYY-MM-DD',
      },
    },
    data() {
      return {
        currentValue: this.timeString(this.value, this.format),
        tempValue: null,
      }
    },
    mounted() {
      // console.log(this.column)
      // valid = getValidators(this.column);    
    },
    computed: {
      _format() {
        if(this.format === 'week') {
          return 'YYYY-MM-DD'
        }
        return this.format
      }
    },
    watch: {
      value(val) {
        if(val === this.tempValue) {
          return 
        }
        this.currentValue = this.timeString(this.value, this.format)
      },
      currentValue(val) {
        console.log('watch currentValue', val)
        this.tempValue = this.timeStamp(val)
        this.$emit('input', this.tempValue)
      },
    },
    methods: {
      //字符串---> 时间戳
      timeStamp(dateTime) {
        console.log('timeStamp', dateTime)
        if(!dateTime) {
          return null
        }
        let dateString = dateTime.split(' ')[0]
        let timeString = dateTime.split(' ')[1]
        let date = dateString.split('-')
        let r_date = date.join('/')
        if(this.format === 'YYYY-MM-DD' || this.format === 'YYYY-MM' || this.format === 'week') {
          console.log(r_date)
          return new Date(r_date).getTime()
        }
        if(this.format === 'YYYY-MM-DD HH:mm') {
          let r = `${r_date} ${timeString}`
          return new Date(r).getTime()
        }
        if(this.format === 'YYYY') {
          let r = `${r_date}/1`
          return new Date(r).getTime()
        }
        if(this.format === 'MM-DD') {
          let year = new Date().getFullYear()
          let r = `${year}/${r_date}`
          return new Date(r).getTime()
        }
        if(this.format === 'HH:mm') {
          let hour = dateTime.split(':')[0]
          let min = dateTime.split(':')[1]
          let date = new Date()
          let year = date.getFullYear()
          let month = date.getMonth() + 1
          let day = date.getDate()
          let r = `${year}/${month}/${day} ${hour}:${min}`
          return new Date(r).getTime()
        }
      },
      //时间戳--->显示字符串
      timeString(timeStamp) {
        if(!timeStamp) {
          return null
        }
        let date = new Date(Number(timeStamp))
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hour = date.getHours()
        let min = date.getMinutes()
        let second = date.getSeconds()
        if(this.format === 'YYYY-MM-DD') {
          return `${year}-${month}-${day}`
        }
        if(this.format === 'YYYY-MM') {
          return `${year}-${month}`
        }
        if(this.format === 'YYYY-MM-DD HH:mm') {
          return `${year}-${month}-${day} ${hour}:${min}`
        }
        if(this.format === 'YYYY') {
          return `${year}`
        }
        if(this.format === 'MM-DD') {
          return `${month}-${day}`
        }
        if(this.format === 'HH:mm') {
          return `${hour}:${min}`
        }
        if(this.format === 'week') {
          let week = this.getWeekNumber(year, month, day) 
          let weekDay = new Date(timeStamp).getDay()
          let res = `${year}-${month}-${day}是${year}年第${week}周, 周${weekDay}`
          let weekstamp = this.getWeekstamp(year, week)
          let newdate = new Date(Number(weekstamp))
          let newyear = newdate.getFullYear()
          let newmonth = newdate.getMonth() + 1
          let newday = newdate.getDate()
          console.log(res, `${newyear}-${newmonth}-${newday}`)
          return `${newyear}-${newmonth}-${newday}`
        }
      },
      // weekOfYear(timeStamp) {
      //   let date = new Date(Number(timeStamp))
      //   let year = date.getFullYear()
      //   let yearString = `${year}/1`
      //   let yearstamp = new Date(yearString).getTime()
      //   let dayNum = 1000 * 60 * 60 * 24
      //   let week = Math.ceil((timeStamp - yearstamp) / dayNum / 7)
      //   return week
      // },
      getWeekNumber(y, m, d) {
        let targetDay = new Date(y, m - 1, d);
        let year = targetDay.getFullYear();
        let month = targetDay.getMonth();
        let days = targetDay.getDate();
        //那一天是那一年中的第多少天
        for (let i = 1; i < m; i++) {
          days += this.getMonthDays(year, i);
        }
        //那一年第一天是星期几
        let yearFirstDay = new Date(year, 0, 1).getDay();
        //计算是第几周
        days += yearFirstDay;
        let week = Math.ceil(days / 7);
        return week;
      },
      /**
       *获取某年某月的天数
      */
      getMonthDays(year, month) {
        return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
      },
      /**
       *判断年份是否为润年
      */
      isLeapYear(year) {
        return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
      },
      getWeekstamp(timeStamp) {
        // let yearFirstDay = new Date(year, 0, 1).getDay();
        let weekDay = new Date(timeStamp).getDay()
        let dayNum = weekDay - 1
        let oneday = 1000 * 60 * 60 * 24
        let thisWeekStamp = timeStamp - dayNum * oneday
        // if(yearFirstDay / 7 < 0.5) {
        //   weekNum = weekNum + 1
        // }
        // let dayNum = weekNum * 7 - yearFirstDay + 1
        // let yearstamp = new Date(`${year}/1`).getTime()
        // // let oneday = 1000 * 60 * 60 * 24
        // let res = yearstamp + (dayNum - 1) * oneday
        // console.log('第一天是周几', yearFirstDay)
        // console.log('是今年的第几天', dayNum)
        // console.log('第一天时间戳', yearstamp)
        return thisWeekStamp
      },
      validate() {
        let validation;
        let parent = this.$refs.input;
        do {
          if (parent.$validation) {
            console.log(parent)
            parent.$validate();
            validation = parent.$validation;
          }
        } while (!validation && (parent = parent.$parent));
        // this.errors = validation.errors;
        // return this.errors.inputValue;
      }
      // validate() {
      //   // let self = this.$refs.input
      //   let parent = this.$parent
      //   parent.$validate()
      // }
 
    },
  }
</script>