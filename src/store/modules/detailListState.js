const state = {
    showPopup:false,
}
const mutations = {
    changeShowPopup(state, data) {
      state.showPopup = data;
    },
};
const actions = {
    changeShowPopup({ commit }, data) {
        commit("changeShowPopup", data);
    },
}
const getters = {
    showPopup(state){
        return state.showPopup;
    },
}
export default { namespaced: true, state, mutations, actions, getters };
