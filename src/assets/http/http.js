const url = "/schoolhome-server";

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
  getBannerList : url + "banner/getBannerList.do?",
  moreFileUpload: url + "fileUpload/moreFileUpload.do?",
  // 校查查
  getSchoolList: url + "school/getSchoolList.do?",
};

export default http;
