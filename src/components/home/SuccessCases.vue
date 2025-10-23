<!--
 * @Author: lifenglei 1125911451@qq.com
 * @Date: 2025-03-27 15:03:17
 * @LastEditors: lifenglei 1125911451@qq.com
 * @LastEditTime: 2025-03-27 15:03:56
 * @Description: 成功案例组件 - Web端轮播，移动端静态展示
 *
-->
<template>
  <div class="py-8 sm:py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 lg:text-4xl">
          成功案例
        </h2>
        <p class="mt-3 sm:mt-4 max-w-2xl text-lg sm:text-xl text-gray-500 mx-auto px-4 sm:px-0">
          经过我们辅导的学员平均面试邀请率提升3倍
        </p>
      </div>

      <!-- 移动端：静态网格布局 -->
      <div class="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:gap-8 lg:hidden">
        <div
          v-for="(successCase, index) in successCasesWithAvatars"
          :key="index"
          class="testimonial-card bg-white rounded-xl shadow-lg p-6"
        >
          <div class="flex items-start space-x-4">
            <div 
              :class="['w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0 avatar-circle', successCase.avatar.bgColor]"
            >
              {{ successCase.avatar.surname }}
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-semibold text-gray-900">{{ successCase.name }}</h3>
              <p class="text-sm text-gray-600">{{ successCase.title }} @ {{ successCase.company }}</p>
              <div class="flex items-center mt-2">
                <div class="flex space-x-1">
                  <i 
                    v-for="star in 5" 
                    :key="star"
                    :class="star <= successCase.rating ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300'"
                    class="text-sm"
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-gray-700 leading-relaxed">
              <span class="text-4xl text-gray-300 leading-none">"</span>{{ successCase.testimonial }}
            </p>
          </div>
        </div>
      </div>

      <!-- Web端：轮播布局 -->
      <div class="mt-8 sm:mt-10 hidden lg:block">
        <div 
          class="swiper-container success-cases-swiper"
          @mouseenter="pauseAutoplay"
          @mouseleave="resumeAutoplay"
        >
          <div class="swiper-wrapper">
            <div
              v-for="(successCase, index) in successCasesWithAvatars"
              :key="index"
              class="swiper-slide"
            >
              <div class="testimonial-card bg-white rounded-xl shadow-lg p-6 h-full">
                <div class="flex items-start space-x-4 mb-4">
                  <div 
                    :class="['w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0 avatar-circle', successCase.avatar.bgColor]"
                  >
                    {{ successCase.avatar.surname }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-semibold text-gray-900">{{ successCase.name }}</h3>
                    <p class="text-sm text-gray-600">{{ successCase.title }} @ {{ successCase.company }}</p>
                    <div class="flex items-center mt-2">
                      <div class="flex space-x-1">
                        <i 
                          v-for="star in 5" 
                          :key="star"
                          :class="star <= successCase.rating ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300'"
                          class="text-sm"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4">
                  <p class="text-gray-700 leading-relaxed">
                    <span class="text-4xl text-gray-300 leading-none">"</span>{{ successCase.testimonial }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 导航按钮 -->
          <div class="swiper-button-next success-cases-next"></div>
          <div class="swiper-button-prev success-cases-prev"></div>
          
          <!-- 分页器 -->
          <div class="swiper-pagination success-cases-pagination"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 使用CDN引入Swiper，无需import

export default {
  name: 'SuccessCases',
  data () {
    return {
      successCases: [
        {
          name: '张同学',
          title: '前端开发工程师',
          company: '某互联网公司',
          rating: 5,
          testimonial: '使用AI简历修改后，我成功拿到了3个面试邀请，最终入职了心仪的公司。AI提供的修改建议非常专业，尤其是在工作经历的量化描述方面，让我的简历更有说服力。'
        },
        {
          name: '李同学',
          title: '前端开发工程师',
          company: '某科技公司',
          rating: 4,
          testimonial: '作为一名转行者，我不知道如何撰写前端开发工程师简历。AI生成功能帮我从零开始创建了一份专业简历，面试题库也让我对前端开发工程师面试有了充分准备，最终成功转型。'
        },
        {
          name: '王同学',
          title: '前端开发工程师',
          company: '某设计公司',
          rating: 5,
          testimonial: '简历模板非常精美，AI修改功能帮我优化了作品集展示方式。面试前我还使用了面试题库进行准备，对面试官可能问到的问题有了清晰的认识，面试过程非常顺利。'
        },
        {
          name: '陈同学',
          title: '前端开发工程师',
          company: '某金融科技公司',
          rating: 5,
          testimonial: '通过AI简历优化，我的技术栈描述更加专业，项目经验量化后更有说服力。最终获得了心仪公司的offer，薪资涨幅达到50%。'
        },
        {
          name: '刘同学',
          title: '前端开发工程师',
          company: '某电商公司',
          rating: 4,
          testimonial: 'AI帮我重新整理了数据分析项目，让简历更加突出我的专业技能。面试官对我的项目描述印象深刻，最终成功入职。'
        },
        {
          name: '赵同学',
          title: '前端开发工程师',
          company: '某创业公司',
          rating: 5,
          testimonial: '从传统行业转行到互联网，AI简历生成功能帮我快速创建了专业的简历模板，面试题库也让我对技术面试有了充分准备。'
        }
      ],
      swiper: null
    }
  },
  computed: {
    successCasesWithAvatars () {
      const colors = [
        'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
        'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
        'bg-orange-500', 'bg-cyan-500', 'bg-lime-500', 'bg-amber-500'
      ]
      
      return this.successCases.map((item, index) => {
        const surname = item.name.charAt(0)
        const bgColor = colors[index % colors.length]
        
        return {
          ...item,
          avatar: {
            surname,
            bgColor
          }
        }
      })
    }
  },
  mounted () {
    this.initSwiper()
  },
  beforeDestroy () {
    if (this.swiper) {
      this.swiper.destroy(true, true)
    }
  },
  methods: {
    initSwiper () {
      // 确保在DOM更新后初始化Swiper
      this.$nextTick(() => {
        if (document.querySelector('.success-cases-swiper') && window.Swiper) {
          this.swiper = new window.Swiper('.success-cases-swiper', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            speed: 800,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              reverseDirection: false,
              stopOnLastSlide: false
            },
            navigation: {
              nextEl: '.success-cases-next',
              prevEl: '.success-cases-prev'
            },
            pagination: {
              el: '.success-cases-pagination',
              clickable: true,
              dynamicBullets: true
            },
            effect: 'slide',
            grabCursor: true,
            keyboard: {
              enabled: true,
              onlyInViewport: true
            },
            breakpoints: {
              1024: {
                slidesPerView: 3,
                spaceBetween: 30
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 40
              }
            },
            on: {
              init: () => {
                console.log('Swiper initialized successfully with autoplay')
              },
              autoplayStart: () => {
                console.log('Autoplay started')
              },
              autoplayStop: () => {
                console.log('Autoplay stopped')
              }
            }
          })
        } else {
          console.log('Swiper not loaded or container not found')
        }
      })
    },
    pauseAutoplay () {
      if (this.swiper && this.swiper.autoplay) {
        this.swiper.autoplay.stop()
      }
    },
    resumeAutoplay () {
      if (this.swiper && this.swiper.autoplay) {
        this.swiper.autoplay.start()
      }
    }
  }
}
</script>

<style scoped>
/* 评价卡片样式 */
.testimonial-card {
  transition: all 0.3s ease;
  border: 1px solid #f3f4f6;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: #e5e7eb;
}

/* 移动端优化 */
@media (max-width: 640px) {
  .testimonial-card:hover {
    transform: none;
  }
}

/* Swiper 样式定制 */
.success-cases-swiper {
  padding: 0 50px 50px 50px;
}

.success-cases-swiper .swiper-slide {
  height: auto;
}

/* 导航按钮样式 */
.success-cases-next,
.success-cases-prev {
  color: #4f46e5;
  font-size: 20px;
  font-weight: bold;
  background: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.success-cases-next:hover,
.success-cases-prev:hover {
  color: #3730a3;
  transform: scale(1.1);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.success-cases-next:after,
.success-cases-prev:after {
  font-size: 20px;
}

/* 分页器样式 */
.success-cases-pagination {
  position: relative;
  margin-top: 20px;
}

.success-cases-pagination .swiper-pagination-bullet {
  background: #d1d5db;
  opacity: 1;
  width: 12px;
  height: 12px;
  margin: 0 6px;
  transition: all 0.3s ease;
}

.success-cases-pagination .swiper-pagination-bullet-active {
  background: #4f46e5;
  transform: scale(1.2);
}

/* 响应式优化 */
@media (max-width: 1024px) {
  .success-cases-swiper {
    padding: 0 30px 40px 30px;
  }
}

@media (max-width: 768px) {
  .success-cases-swiper {
    padding: 0 20px 30px 20px;
  }
}

/* 圆形姓氏头像样式 */
.testimonial-card .avatar-circle {
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.testimonial-card:hover .avatar-circle {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* 星级评分样式 */
.fa-star {
  transition: color 0.3s ease;
}

/* 引用符号样式 */
.testimonial-card p span {
  font-family: Georgia, serif;
  line-height: 1;
}
</style>
