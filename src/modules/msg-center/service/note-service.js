import axios from "axios";
const appKey = window.sessionStorage.getItem("paas:cloud:platform:appKey");

/**
 * 企业内部通知、公告提醒服务
 */
class NoteServise {
  /**
   * 根据企业应用key（appKey）,发送通知、公告
   * @param {string} appKey 应用key(非必须)
   * @param {string} attachment 附件(非必须)
   * @param {string} content 内容
   * 
   * @param {string} entKey 企业key(非必须)
   * @param {int64} id  (非必须)
   * @param {string} sender 发送人(非必须)
   * @param {string} senderType 发送类型(非必须)
   * @param {string} status 状态(非必须)
   * @param {string} subject 主题
   * @param {string} tipsType 提醒类型
   * @param {array<string>} toAddress 接收人
   * @param {string} type 类型 
   */
  addNote({
    attachment,
    content,
    // createTime,
    // entKey,
    // id,
    // sender,
    senderType,
    // status,
    subject,
    // tipsType,
    toAddress,
    type,
    }) {
    return axios.post(`message://msg/add/${appKey}`, {
      appKey,
      attachment,
      content,
      // createTime,
      // entKey,
      // id,
      // sender,
      senderType,
      // status,
      subject,
      // tipsType,
      toAddress,
      type,
      }).then(res => res)
  }

  /**
   * 查询应用内所有通知公告信息集合（发送的）
   * 根据企业应用key（appKey）,查询应用内所有通知公告信息集合
   * @param {string} appKey 应用key
   */
  findSendAll() {
    return axios.get(`message://msg/findAll/${appKey}`).then(res => res)
  }

  /**
   * 查询应用内所有通知公告信息分页集合（发送的）
   * 根据企业应用key（appKey）,查询应用内所有通知公告信息分页集合
   * @param {string} appKey 应用key
   * @param {string} type 类型
   * @param {int32} currentPage 当前页(可选)
   * @param {int32} pageSize 每页条数(可选)
   * @param {string} order 排序方式(可选)
   * @param {string} sidx 排序字段(可选)
   */
  findSendAllByPage({
    type,
    currentPage = 1,
    pageSize = 10,
    order = 'desc',
    sidx = '',
  }) {
    return axios.get(`message://msg/findAllByPage/${appKey}/${type}?currentPage=${currentPage}&pageSize=${pageSize}&order=${order}&sidx=${sidx}`).then(res => res)
  }

  /**
   * 根据企业应用key（appKey）,获取通知、公告详情
   * @param {string} appKey 应用key
   * @param {int64} id 
   */
  findDetailById({
    id,
  }) {
    return axios.get(`message://msg/get/${appKey}/${id}`).then(res => res.data)
  }

  /**
   * 查询应用内通知公告Top5的信息集合（收到的）
   * @param {string} appKey 应用key
   * @param {string} type 类型  NOTIFY(通知)、ANNOUNCEMENT（公告）
   * @param {string} status READ已读 NOREAD未读
   */
  findRecieveTop5({
    type,
    status,
  }) {
    return axios.get(`message://usermsg/getTop5/${appKey}/${type}?status=${status}`).then(res => res)
  }

    /**
   * 查询应用内所有通知公告信息分页集合（收到的）
   * 根据企业应用key（appKey）,查询应用内所有通知公告信息分页集合
   * @param {string} appKey 应用key
   * @param {string} type 类型
   * @param {string} status READ已读 NOREAD未读 ''全部
   * @param {int32} currentPage 当前页(可选)
   * @param {int32} pageSize 每页条数(可选)
   * @param {string} order 排序方式(可选)
   * @param {string} sidx 排序字段(可选)
   */
  findRecieveAllByPage({
    type,
    status,
    pageNow = 1,
    pageSize = 10,
    //TODO:可选，不传
    // order = 'desc',
    // sidx = '',
  }) {
    return axios.get(`message://usermsg/findAllByPage/${appKey}?type=${type}&status=${status}&currentPage=${pageNow}&pageSize=${pageSize}`).then(res => res)
  }

  findRecieveAll({
    type,
    status,
  }) {
    // console.log('appKey:', appKey)
    return axios.get(`message://usermsg/findAll/${appKey}?type=${type}&status=${status}`).then(res => res)
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

export default new NoteServise()