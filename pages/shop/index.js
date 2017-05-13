const App = getApp()

Page({
    data: {
        activeIndex: 0,
        shopList: [],
        prompt: {
            hidden: !0,
        },
    },
    onLoad() {
        this.getSystemInfo()
        this.onRefresh()
    },
    navigateTo(e) {
        console.log(e)
        App.WxService.navigateTo('/pages/goods/detail/index', {
            id: e.currentTarget.dataset.id
        })
    },
    getList() {
        App.HttpService.shopList({
            clientType: 'M',
            currentPage: 0,
            pageSize: 10
        }).then((data) => {
            console.log(data)
            if (data.resultCode == 0) {
                this.setData({
                    shopList: data.data.shopList,
                })

            }
        })

    },
    onRefresh() {
        this.getList()
    },
    onRefreshShops() {
        this.getList()
    },
    getMoreShops() {
        this.getList()
    },
    getSystemInfo() {
        App.WxService.getSystemInfo()
        .then(data => {
            console.log(data)
            this.setData({
                deviceWidth: data.windowWidth,
                deviceHeight: data.windowHeight,
            })
        })
    },
})