const url = "https://www.sqyj.tech/schoolhome-server/";

const http = {
  getUserList: url + 'user/getUserList.do?',
  getCouponList: url + 'coupon/getCouponList.do?',
  addCoupon: url + 'coupon/addCoupon.do?',
  deleteCoupon: url + 'coupon/deleteCoupon.do?',
  getDriverList: url + 'driver/getDriverList.do?',
  driverApplyReview: url + 'driver/driverApplyReview.do?',
  getOrderList: url + 'order/getOrderList.do?',
  getOrderById: url + 'order/getOrderById.do?',
  getWithdrawalList: url + 'withdrawal/getWithdrawalList.do?',
  reviewWithdrawal: url + 'withdrawal/reviewWithdrawal.do?',
  getNewsList: url + "news/getNewsList.do?",
  getNewsById: url + "news/getNewsById.do?",
  modifyNewsById: url + "news/modifyNews.do?",
  addNews: url + "news/addNews.do?",
  deletedNewsById: url + "news/deleteNews.do?",
  getSettingById: url + "setting/getSettingById.do?",
  modifySetting : url + "setting/modifySetting.do?",
  moreFileUpload: url + "fileUpload/moreFileUpload.do?",
  // 校查查
  getSchoolList: url + "school/getSchoolList.do?",// 获取学校列表
  getQuestionList: url + "question/getQuestionList.do?",// 获取提问列表
  deleteQuestion: url + "question/deleteQuestion.do?",// 删除问题
  modifyQuestion: url + "question/modifyQuestion.do?",// 修改问题
  getAnswerList: url + "answer/getAnswerList.do?",// 获取问题的回答列表
  deleteAnswer: url + "answer/deleteAnswer.do?",// 删除答案
  getBannerList : url + "banner/getBannerList.do?",// 获取轮播图列表
  oneFileUpload : url + "fileUpload/oneFileUpload.do?",// 单文件上传
  modifyBanner : url + "banner/modifyBanner.do?",// 修改轮播图
  getAdminList : url + "admin/getAdminList.do?",// 获取管理员列表
  addAdmin : url + "admin/addAdmin.do?",// 新增管理员
  modifyAdmin : url + "admin/modifyAdmin.do?",// 修改管理员
};

export default http;
