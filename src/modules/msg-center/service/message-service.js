import axios from "axios";
const appKey = window.sessionStorage.getItem("paas:cloud:platform:appKey");
export default {
  /**
 * 1.根据模块查询字段
 * @param {string} moduleId 应用key
 */
  findSourceColumnsByModuleId({
    moduleId: moduleId,
  }) {
    return axios.post("platform://custom/C01010", {
      moduleId: moduleId,
    }).then(res => res.data);
  },
  /**
   * 2.查询所有邮件模板分页集合
   * @param {string} appKey 应用key
   */
  getAllEmail({
    pageNow = 1,
    pageSize = 10,
    sidx = '',
    order = 'desc',
    searchKey = '',
  }) {
    return axios.post(`message://emailTemp/findAll/${appKey}?currentPage=${pageNow}&pageSize=${pageSize}&sidx=${sidx}&order=${order}&searchKey=${searchKey}`, {});
  },
  /**
   * 3.新增邮件模板
   * @param {string} appKey 应用key
   * @param {string} name 邮件模板名称
   * @param {string} title 邮件标题
   * @param {string} content 邮件内容
   * @param {string} senderMail 发送人邮箱ID
   * @param {string} state 状态
   */
  addEmailTemp({
    name: name,
    title: title,
    content: content,
    senderMail: senderMail,
    state: state,
  }) {
    return axios.post(`message://emailTemp/add/${appKey}`, {
      name: name,
      title: title,
      content: content,
      senderMail: senderMail,
      state: state,
    });
  },
  /**
   * 4.获取应用下企业邮箱列表
   * @param {string} appKey 应用key
   */
  getAllEntEmail({
  }) {
    return axios.get(`message://entEmail/findAll/${appKey}`);
  },
  /**
   * 5.获取邮件模板详情
   * @param {string} id 模板id
   */
  getEmailDetail({
    id: id
  }) {
    return axios.get(`message://emailTemp/get/${id}`, {
    });
  },
  /**
   * 6.获取应用下的短信模板分页集合
   * @param {string} id 模板id
   */
  getAllSmsTemp({
    pageNow = 1,
    pageSize = 10,
    sidx = '',
    order = 'desc',
  }) {
    // return axios.get(`message://smsTemp/findAll/${appKey}/${pageNow}/${pageSize}`, {
    return axios.get(`message://smsTemp/findAllByPage/${appKey}?currentPage=${pageNow}&pageSize=${pageSize}&sidx=${sidx}&order=${order}`);
  },
  /**
   * 7.新增短信模板
   * @param {string} appKey 应用key
   * @param {string} name 模板名称
   * @param {string} content 模板内容
   */
  addSmsTemp({
    sign: sign,
    content: content,
    type: type,
  }) {
    return axios.post(`message://smsTemp/add/${appKey}`, {
      sign: sign,
      content: content,
      type: type,
    });
  },
  /**
   * 8.获取短信模板详情
   * @param {string} id 模板id
   */
  getSmsTempDetail({
    id: id,
  }) {
    return axios.get(`message://smsTemp/get/${appKey}/${id}`, {
      id: id
    });
  },
  /**
   * 9.获取当前用户所有提醒分页集合
   * @param {string} appKey 应用key
   */
  getAllTips({
    pageNow = 1,
    pageSize = 10,
    sidx = '',
    order = 'desc',
    searchKey = '',
  }) {
    // return axios.post(`message://tipsTemp/findAll/${appKey}/${pageNow}/${pageSize}`, {
      return axios.post(`message://tipsTemp/findAllByPage/${appKey}?currentPage=${pageNow}&pageSize=${pageSize}&sidx=${sidx}&order=${order}&searchKey=${searchKey}`,{});
  },
  /**
   * 10.新增提醒
   * @param {string} appKey 应用key
   * @param {string} subject 主题
   * @param {string} content 内容
   * @param {string} state 状态
   */
  addTipsTemp({
    subject: subject,
    content: content,
    state: state,
  }) {
    return axios.post(`message://tipsTemp/add/${appKey}`, {
      subject: subject,
      content: content,
      state: state,
    });
  },
  /**
   * 11.获取提醒详情
   * @param {string} id 模板id
   */
  getTipsDetail({
    id: id,
  }) {
    return axios.get(`message://tips/get/${appKey}/${id}`, {
      id: id
    });
  },
  /**
   * 12.获取企业邮箱分页列表
   * @param {string} appKey 应用key
   */
  getAllEntEmailPage({
    pageNow = 1,
    pageSize = 10,
    sidx = '',
    order = 'desc',
  }) {
    return axios.get(`message://entEmail/findAllByPage/${appKey}?currentPage=${pageNow}&pageSize=${pageSize}&sidx=${sidx}?order=${order}`, {
    });
  },
  /**
   * 13.注册企业邮箱
   * @param {string} appKey 应用key
   */
  registerEntEmail({
    name: name,
    address: address,
    password: password,
    host: host,
    hostPort: hostPort,
    encryption: encryption
  }) {
    return axios.post(`message://entEmail/register/${appKey}`, {
      name: name,
      address: address,
      password: password,
      host: host,
      hostPort: hostPort,
      encryption: encryption
    });
  },
  /**
   * 14.删除企业邮箱
   * @param {string} appKey 应用key
   * @param {string} id 邮箱id
   */
  delEntEmail({
    id: id,
  }) {
    return axios.delete(`message://entEmail/del/${appKey}/${id}`, {
    });
  },
  /**
  * 15.编辑企业邮箱
  * @param {string} appKey 应用key
  * @param {string} id 邮箱id
  */
  editEntEmail({
    id: id,
    name: name,
    address: address,
    password: password,
    host: host,
    hostPort: hostPort,
    encryption: encryption
  }) {
    return axios.put(`message://entEmail/edit/${appKey}`, {
      id: id,
      name: name,
      address: address,
      password: password,
      host: host,
      hostPort: hostPort,
      encryption: encryption
    });
  },
  /**
* 16.编辑短信模板
* @param {string} appKey 应用key
* @param {string} id 模板id
* @param {string} name 模板名称
* @param {string} content 模板内容
*/
  editSmsTemp({
    id: id,
    sign: sign,
    content: content,
    type: type
  }) {
    return axios.put(`message://smsTemp/edit/${appKey}`, {
      id: id,
      sign: sign,
      content: content,
      type: type
    })
  },
  /**
  * 17.编辑邮件模板
  * @param {string} appKey 应用key
  * @param {string} id 模板id
  * @param {string} name 模板名称
  * @param {string} content 模板内容
  */
  editEmailTemplate({
    id: id,
    title: title,
    content: content,
    senderMail: senderMail,
    name: name,
    state: state,
  }) {
    return axios.put(`message://emailTemp/edit/${appKey}`, {
      id: id,
      title: title,
      content: content,
      senderMail: senderMail,
      name: name,
      state: state,
    });
  },
/**
  * 18.删除邮件模板
  * @param {string} appKey 应用key
  * @param {string} id 模板id
  */
  delEmailTemplate({
    id: id
  }){
    return axios.delete(`message://emailTemp/del/${appKey}/${id}`, {
      id: id,
    });
  },
/**
  * 19.启用/禁用邮件模板
  * @param {string} appKey 应用key
  * @param {string} state 模板状态
  */
 emailChangeState({
   state: state,
   ids:ids
 }){
   return axios.put(`message://emailTemp/edit/${appKey}/${state}`, {
     ids:ids
   });
 },
/**
 * 20.编辑提醒模板
 * @param {string} appKey 应用key
 * @param {string} id 模板id
 * @param {string} subject 提醒模板主题
 * @param {string} content 模板内容
 * @param {string} state 状态
 */
  editTipsTemplate({
    id: id,
    subject: subject,
    content: content,
    state: state,
  }) {
    return axios.put(`message://tipsTemp/edit/${appKey}`, {
      id: id,
      content: content,
      subject: subject,
      state: state,
    });
  },
/**
  * 21.删除提醒模板
  * @param {string} appKey 应用key
  * @param {string} id 模板id
  */
  delTipsTemplate({
    id: id
  }) {
    return axios.delete(`message://tipsTemp/del/${appKey}/${id}`, {
      id: id,
    });
  },
/**
  * 22.启用/禁用提醒模板
  * @param {string} appKey 应用key
  * @param {string} state 模板状态
  */
  tipsChangeState({
    state: state,
    ids: ids
  }) {
    return axios.put(`message://tipsTemp/edit/${appKey}/${state}`, {
      ids: ids
    });
  },
  /**
    * 21.删除短信模板
    * @param {string} appKey 应用key
    * @param {string} id 模板id
    */
  delSmsTemplate({
    id: id
  }) {
    return axios.delete(`message://smsTemp/del/${appKey}/${id}`, {
      id: id,
    });
  },
}
