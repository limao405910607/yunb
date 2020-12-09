// 封装一下 所有的http请求  方便维护和统一管理


var http = (optObj)=>{

  var deOpt = {
    url: optObj.url,
    method: optObj.method || "get",
    data: optObj.data || {},
    successFn: optObj.successFn || null,
    failFn: optObj.failFn || null
  }
// 封装一下
wx.request({
  url: 'http://localhost:5000'+ deOpt.url,
  method: deOpt.method,
  data: deOpt.data,
  success:res=>{
    //  console.log(res);
    // 执行一个成功的回调
    (typeof deOpt.successFn==='function')&&deOpt.successFn(res.data)
  },
  fail:res=>{

    (typeof deOpt.failFn ==='function')&&deOpt.failFn(res.data)
  }
})

}



export default http;