const App = getApp()

Page({
    data: {
        activeIndex: 0,
        navList: [],
        indicatorDots: !0,
        autoplay: true,
        current: 0,
        interval: 3000,
        duration: 1000,
        circular: !0,
        shopList: [],
        prompt: {
            hidden: false,
        },
        bannersList: []
    },
    swiperchange(e) {
        // console.log(e.detail.current)
    },
    onShow() {
        this.getList();
    },
    initData() {
        const type = this.data.goods.params && this.data.goods.params.type || ''
        const goods = {
            items: [],
            params: {
                page : 1,
                limit: 10,
                type : type,
            },
            paginate: {}
        }

        this.setData({
            goods: goods
        })
    },
    navigateTo(e) {
        console.log(e)
        App.WxService.navigateTo('/pages/goods/detail/index', {
            id: e.currentTarget.dataset.id
        })
    },
    search() {
        App.WxService.navigateTo('/pages/search/index')
    },
    getList() {
        	App.HttpService.homepage({
            clientType: 'M',
            latitude: '31.912',
            longitude: '180.234'
        }).then((data) => {
			console.log(data)
			if (data.resultCode == 0) {
                this.setData({
                      bannersList: data.data.bannersList,
                      shopList: data.data.shopList,
                      'prompt.hidden': data.data.shopList.length
                  })
			}
		})
    },
    onPullDownRefresh() {
        console.info('onPullDownRefresh')
        this.initData()
        this.getList()
    },
    onReachBottom() {
        console.info('onReachBottom')
        if (!this.data.goods.paginate.hasNext) return
        this.getList()
    },
    onTapTag(e) {debugger
        const type = e.currentTarget.dataset.type
        const index = e.currentTarget.dataset.index
        const goods = {
            items: [],
            params: {
                page : 1,
                limit: 10,
                type : type,
            },
            paginate: {}
        }
        this.setData({
            activeIndex: index,
            goods: goods,
        })
        this.getList()
    },
})
