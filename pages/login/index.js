const App = getApp()

Page({
	data: {
		logged: !1
	},
    onLoad() {},
    onShow() {
    	const token = App.WxService.getStorageSync('token')
    	this.setData({
    		logged: !!token
    	})
    	token && setTimeout(this.goIndex, 1500)
    },
    login() {
    	this.signIn(this.goIndex)
    },
    goIndex() {
    	App.WxService.switchTab({
    		url: '/pages/index/index'
    	})
    },
	showModal() {
		App.WxService.showModal({
            title: '友情提示',
            content: '获取用户登录状态失败，请重新登录',
            showCancel: !1,
        })
	},
	wechatDecryptData() {
		let code

		App.WxService.login()
		.then(data => {
			console.log('wechatDecryptData', data.code)
			code = data.code
			return App.WxService.getUserInfo()
		})
		.then(data => {
			return App.HttpService.wechatDecryptData({
				encryptedData: data.encryptedData,
				iv: data.iv,
				rawData: data.rawData,
				signature: data.signature,
				code: code,
			})
		})
		.then(data => {
			console.log(data)
		})
	},
	wechatSignIn(cb) {
		if (App.WxService.getStorageSync('token')) return
		App.WxService.login()
		.then(data => {
			console.log('wechatSignIn', data.resultCode)
			return App.HttpService.wechatSignIn({
				code: data.resultCode
			})
		})
		.then(data => {
			console.log('wechatSignIn', data)
			if (data.resultCode == 0) {
				App.WxService.setStorageSync('token', data.data.sessionKey)
				cb()
			} else if(data.resultCode == 40029) {
				App.showModal()
			} else {
				App.wechatSignUp(cb)
			}
		})
	},
	wechatSignUp(cb) {
		App.WxService.login()
		.then(data => {
			console.log('wechatSignUp', data.resultCode)
			return App.HttpService.wechatSignUp({
				code: data.resultCode
			})
		})
		.then(data => {
			console.log('wechatSignUp', data)
			if (data.resultCode == 0) {
				App.WxService.setStorageSync('token', data.data.sessionKey)
				cb()
			} else if(data.resultCode == 40029) {
				App.showModal()
			}
		})
	},
	signIn(cb) {
		if (App.WxService.getStorageSync('token')) return
		App.HttpService.signIn({
			clientType: 'M',
			mobileNo: '15800911536',
			password: 'AAbb3344',
			pictureCode: 8888,
			machineNo: 9999999999
		})
		.then(data => {
			console.log(data)
			if (data.resultCode == 0) {
				App.WxService.setStorageSync('token', data.data.sessionKey)
				cb()
			}
		})
	},
})