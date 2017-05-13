const App = getApp()

Page({
    data: {
        indicatorDots: !0,
        vertical: !1,
        autoplay: !1,
        interval: 3000,
        duration: 1000,
        current: 0,
        goods: {
            item: {}
        },
    },
    swiperchange(e) {
        this.setData({
            current: e.detail.current,
        })
    },
    onLoad(option) {
        this.shopService = App.HttpResource('shop/product/list', {shopId: '@shopId',clientType:'M',currentPage:1,pageSize:20})
        this.setData({
            id: option.id
        })

    },
    onShow() {
        this.getDetail(this.data.id)
    },
    addCart(e) {
        const goods = this.data.goods.item._id
        App.HttpService.addCartByUser(goods)
        .then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                this.showToast(data.meta.message)
            }
        })
    },
    previewImage(e) {
        const urls = this.data.goods && this.data.goods.item.images.map(n => n.path)
        const index = e.currentTarget.dataset.index
        const current = urls[Number(index)]

        App.WxService.previewImage({
            current: current,
            urls: urls,
        })
    },
    showToast(message) {
        App.WxService.showToast({
            title   : message,
            icon    : 'success',
            duration: 1500,
        })
    },
    getDetail(id) {
    	// App.HttpService.getDetail(id)
        this.shopService.getAsync({shopId: id})
        .then(data => {
        	console.log(data)
        	if (data.resultCode == 0) {
                data.data.list.forEach(n => n.path = App.renderImage(n.path))
        		this.setData({
                    serviceList: data.data.list,
                    total: data.data.totalCount,
                })
        	}
        })
    },
})