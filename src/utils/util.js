
export function get(url,data){
	return request(url,'GET',data)
}

export function post(url,data){
	return request(url,'POST',data)
}

function request (url, method, data, header = {}) {
  return new Promise((resolve, reject) => {
    mpvue.request({
      data,
      method,
      header,
      url: 'http://localhost:5757' + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          showModal('失败', res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}

export function showModal(title,content){
	mpvue.showModal({
		title,
		content,
		showCancel:false
	})
}

export function showSuccess(text){
	mpvue.showToast({
		title: text,
		icon: 'success'
	})
}