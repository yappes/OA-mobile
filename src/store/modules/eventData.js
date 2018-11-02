//import {UserService} from "paas-web-utils/services";
const state = {
  allEventList: [], //全部日程的数据
  eventList: [],//需要显示的日程数据
};
const mutations = {
  changeAllEventList(state, data) {
    state.allEventList = data;
  },
  changeEventList(state, data) {
    state.eventList = data;
  },
};
const actions = {
  changeEventList({ commit }, date) {
    let data = [];
    for (const list of state.allEventList) {
      if (list.date === date) {
        data.push(list)
      }
    }
    commit("changeEventList", data);
  },
  getAllUserList({ commit }) {
    let data = [{
      id: 1,
      date: "2018-08-27",
      startDate: "16:30",
      endDate: "17:30",
      eventTitle: "测试一",
      eventContent: "这是用来测试的数据（一）"
    }, {
      id: 2,
      date: "2018-08-28",
      startDate: "17:35",
      endDate: "18:35",
      eventTitle: "测试二",
      eventContent: "这是用来测试的数据（二）"
    }, {
      id: 7,
      date: "2018-08-27",
      startDate: "16:30",
      endDate: "17:30",
      eventTitle: "测试一",
      eventContent: "这是用来测试的数据（一）"
    }, {
      id: 8,
      date: "2018-08-27",
      startDate: "17:35",
      endDate: "18:35",
      eventTitle: "测试二",
      eventContent: "这是用来测试的数据（二）"
    }, {
      id: 9,
      date: "2018-08-27",
      startDate: "16:30",
      endDate: "17:30",
      eventTitle: "测试一",
      eventContent: "这是用来测试的数据（一）"
    }, {
      id: 10,
      date: "2018-08-27",
      startDate: "17:35",
      endDate: "18:35",
      eventTitle: "测试二",
      eventContent: "这是用来测试的数据（二）"
    }]
    commit("changeAllEventList", data);
    // UserService
    //     .findUserList().then(data=>{
    //       commit("changeAllUserList", data);
    //     })
  }
};
const getters = {
  eventList(state) {
    return state.eventList;
  },
  allEventList(state) {
    return state.allEventList;
  },
};

export default { namespaced: true, state, mutations, actions, getters };
