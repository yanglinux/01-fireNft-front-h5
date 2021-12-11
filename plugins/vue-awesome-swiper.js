import Vue from "vue"
import { Swiper as SwiperClass, Pagination, Navigation, Autoplay } from "swiper/core"
import getAwesomeSwiper from "vue-awesome-swiper/dist/exporter"

import "swiper/swiper-bundle.min.css"

SwiperClass.use([Pagination, Navigation, Autoplay])
Vue.use(getAwesomeSwiper(SwiperClass))

const { directive } = getAwesomeSwiper(SwiperClass)
Vue.directive("swiper", directive)
