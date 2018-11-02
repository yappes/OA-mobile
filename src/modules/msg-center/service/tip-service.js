import axios from "axios";
const appKey = window.sessionStorage.getItem("paas:cloud:platform:appKey");

class TipService {
  /**
   * 根据应用key,获取应用内当前用户所有提醒信息
   * @param {string} appKey 应用key
   */
  findAll() {
    // console.log(appKey)
    return axios.get(`message://tips/findAll/${appKey}`).then(res => res)
  }

  /**
   * 根据appKey,获取当前用户提醒分页集合
   * 
   */
  findAllByPage({
    pageNow = 1,
    pageSize = 10,
    sidx = '',
    order = '',
  }) {
    return axios.get(`message://tips/findAllByPage/${appKey}?currentPage=${pageNow}&pageSize=${pageSize}&sidx=${sidx}&order=${order}`).then(res => res)
  }

  /**
   * 根据id,标记信息为已读
   */
  read({
    id,
  }) {
    return axios.put(`message://usermsg/read/${appKey}/${id}`).then(res => res)
  }
}

export default new TipService()