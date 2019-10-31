const url = "https://www.sqyj.tech/schoolhome-server/";

const http = {
  getSchoolList: url + "school/getSchoolList.do?",// 获取学校列表
  addSchool: url + "school/addSchool.do?",// 添加学校
  deleteSchool: url + "school/deleteSchool.do?",// 删除学校
  getSchoolById: url + "school/getSchoolById.do?",// 获取学校信息
  oneFileUpload : url + "fileUpload/oneFileUpload.do?",// 单文件上传
  moreFileUpload: url + "fileUpload/moreFileUpload.do?",// 多文件上传
  /*
   * 轮播图
   */
  addBanner : url + "banner/addBanner.do?",// 新增轮播图
  modifyBanner : url + "banner/modifyBanner.do?",// 修改轮播图
  getBannerList : url + "banner/getBannerList.do?",// 获取轮播图列表
  deleteBanner : url + "banner/deleteBanner.do",// 删除轮播图
  /*
   * 新闻
   */
  getNewsList : url + "news/getNewsList.do?",// 获取新闻列表
  modifyNews : url + "news/modifyNews.do?",// 修改新闻
  addNews : url + "news/addNews.do?",// 新增新闻
  deleteNews : url + "news/deleteNews.do?",// 删除新闻
  /*
   * 管理员
   */
  getAdminList : url + "admin/getAdminList.do?",// 获取管理员列表
  addAdmin : url + "admin/addAdmin.do?",// 新增管理员
  modifyAdmin : url + "admin/modifyAdmin.do?",// 修改管理员
  login : url + "admin/login.do?",// 管理员登录
  /*
   * 问答
   */
  getQuestionList: url + "question/getQuestionList.do?",// 获取提问列表
  deleteQuestion: url + "question/deleteQuestion.do?",// 删除问题
  modifyQuestion: url + "question/modifyQuestion.do?",// 修改问题
  getAnswerList: url + "answer/getAnswerList.do?",// 获取问题的回答列表
  deleteAnswer: url + "answer/deleteAnswer.do?",// 删除答案
  modifyAnswer: url + "answer/modifyAnswer.do?",// 修改答案
  /*
   * 预约
   */
  getSubscribeList: url + "subscribe/getSubscribeList.do",// 获取预约列表
};

export default http;
