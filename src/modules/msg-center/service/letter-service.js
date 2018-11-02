import axios from "axios";
const appKey = window.sessionStorage.getItem("paas:cloud:platform:appKey");

class LetterService {
  /**
   * 根据应用key,获取当前用户所有私信信息
   * @param {string} appKey 应用key
   * @param {string} sender 发送人
   * @param {string} status READ已读 NOREAD未读 
   */
  findAll({
    sender='',
    status='',
  }) {
    // console.log('appKey', appKey)
    return axios.get(`message://letter/findAll/${appKey}?sender=${sender}&status=${status}`).then(res => res)
  }

  /**
   * 根据应用key,获取当前用户所有私信分页集合
   */
  findAllByPage({
    status = '',
    sender='',
    pageNow = 1,
    pageSize = 10,
  }) {
    return axios.get(`message://letter/findAllByPage/${appKey}?status=${status}&sender=${sender}&currentPage=${pageNow}&pageSize=${pageSize}`).then(res => res)
  }

  /**
   * 根据应用key,发送私信
   */
  addLetter({
    attachment,
    content,
    toAddress,
  }) {
    return axios.post(`message://letter/add/${appKey}`, {
      attachment,
      content,
      toAddress,
      status: '',
      // sender: '1',
      createTime: new Date().getTime()
    }).then(res => res)
  }

  /**
   * 根据id,标记信息为已读
   */
  read({
    id,
  }) {
    return axios.put(`message://letter/read/${appKey}/${id}`).then(res => res)
  }
}

export default new LetterService()