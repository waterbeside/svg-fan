import { Arc, ArcSetting } from '../../../src/class/arc'
import { Fan, FanSetting } from '../../../src/class/fan'
import { Section } from '../components/Section'
// import { FlexBox } from '../components/FlexBox'
import { createElement, createSvgTag } from '../../../src/utils'

export function ReadMeView() {
  const title = '# ReadMe Demo'

  const demoList = [
    function () {
      const text = createElement('h3', '画一个弧形')
      const setting: ArcSetting = {
        r: 30, // 内径
        R: 50, // 外径
        start: 20, // 圆弧起始角度
        end: 280, // 圆弧结速角度
        attr: {
          // 圆弧的svg属性设置
          fill: '#FF9988',
          stroke: '#cc2211',
          strokeWidth: 4
        }
      }
      const arc = new Arc(setting)
      const svg = createSvgTag('svg', { width: 120, height: 120 })
      svg.appendChild(arc.getElement())
      return createElement('div', [text, svg], { class: 'readme-demo-item' })
    },
    function () {
      const text = createElement('h3', '画一个圆环')
      const setting: ArcSetting = {
        r: 30, // 内径
        R: 50, // 外径
        start: 0, // 当起始角与结束角度之差大于360度时，将变成一个圆
        end: 360, // 圆弧结速角度
        attr: {
          // 圆弧的svg属性设置
          fill: '#443C85'
        }
      }
      const arc = new Arc(setting)
      const div = createElement('div')
      arc.mount(div)
      return createElement('div', [text, div], { class: 'readme-demo-item' })
    },
    function () {
      const text = createElement('h3', '画一个扇形')
      const setting: ArcSetting = {
        r: 0, // 内径为0时，即画扇形
        R: 50, // 外径
        start: 0,
        end: 90,
        attr: {
          // 圆弧的svg属性设置
          fill: '#889C85'
        }
      }
      const arc = new Arc(setting)
      const div = createElement('div')
      arc.mount(div)
      return createElement('div', [text, div], { class: 'readme-demo-item' })
    },
    function () {
      const text = createElement('h3', '把圆弧拉直变成梯形')
      const setting: ArcSetting = {
        r: 20, // 内径
        R: 50, // 外径
        start: -30,
        end: 30,
        straighten: true, // 设置straighten为true时，把弧线拉直，但起点和终点的角度差必须少于180度
        attr: {
          // 圆弧的svg属性设置
          fill: '#5faf65'
        }
      }
      const arc = new Arc(setting)
      const div = createElement('div')
      arc.mount(div)
      return createElement('div', [text, div], { class: 'readme-demo-item' })
    },
    function () {
      const text = createElement('h3', '在圆弧内添加文字')
      const setting: ArcSetting = {
        r: 40, // 内径
        R: 80, // 外径
        start: -30,
        end: 30,
        attr: {
          fill: '#8870ee'
        },
        text: '离',
        textAttr: {
          fill: '#fff',
          fontSize: 18,
          fontWeight: 600
        }
      }
      const arc = new Arc(setting)
      const div = createElement('div')
      arc.mount(div)
      return createElement('div', [text, div], { class: 'readme-demo-item' })
    },
    function () {
      const text = createElement('h3', '把圆等分成6份')
      const setting: FanSetting = {
        r: 0, // 内径
        R: 100, // 外径
        n: 6, // 分成6份
        attr: {
          fill: '#5faf65',
          strokeWidth: 4,
          stroke: '#2f4f33'
        }
      }
      const fan = new Fan(setting)
      const div = createElement('div')
      fan.mount(div)
      return createElement('div', [text, div], { class: 'readme-demo-item' })
    },
    function () {
      const text = createElement('h3', '设置每份弧的间距')
      const setting: FanSetting = {
        r: 20, // 内径
        R: 100, // 外径
        n: 6, // 分成6份
        gap: 10, // 每份相隔多少角度
        attr: {
          fill: '#5faf65',
          strokeWidth: 4,
          stroke: '#2f4f33'
        }
      }
      const fan = new Fan(setting)
      const div = createElement('div')
      fan.mount(div)
      return createElement('div', [text, div], { class: 'readme-demo-item' })
    },
    function () {
      const text = createElement('h3', '把圆等分成4份, 每份颜色单独设置')
      const setting: FanSetting = {
        r: 60, // 内径
        R: 100, // 外径
        n: 4, // 分成4份,
        attr: {
          strokeWidth: 4,
          stroke: '#2f4f33'
        },
        arcSetting: [
          {
            attr: {
              fill: '#2f6f65'
            }
          },
          {
            attr: {
              fill: '#5f8f65'
            }
          },
          {
            attr: {
              fill: '#7faf65'
            }
          },
          {
            attr: {
              fill: '#afcf65'
            }
          }
        ]
      }
      const fan = new Fan(setting)
      const div = createElement('div')
      fan.mount(div)
      return createElement('div', [text, div], { class: 'readme-demo-item' })
    },
    function () {
      const text = createElement('h3', '设置start值，使第一份弧的起始角度为0')
      const setting: FanSetting = {
        r: 60, // 内径
        R: 100, // 外径
        n: 4, // 分成4份,
        start: 0, // 通过设置start值，可设置第一份弧的起始角度，否则第一份弧形的中心会位默认于正上方。
        attr: {
          strokeWidth: 4,
          stroke: '#2f4f33'
        },
        arcSetting: [
          {
            attr: {
              fill: '#2f6f65'
            }
          },
          {
            attr: {
              fill: '#5f8f65'
            }
          },
          {
            attr: {
              fill: '#7faf65'
            }
          },
          {
            attr: {
              fill: '#afcf65'
            }
          }
        ]
      }
      const fan = new Fan(setting)
      const div = createElement('div')
      fan.mount(div)
      return createElement('div', [text, div], { class: 'readme-demo-item' })
    },
    function () {
      const text = createElement('h3', '画一个八卦')
      const setting: FanSetting = {
        r: 50,
        R: 100,
        n: 8,
        straighten: true,
        attr: {
          strokeWidth: 1,
          stroke: '#999',
          fill: '#fff'
        },
        arcSetting: [
          {
            text: '離',
            textAttr: {
              fill: 'red'
            },
            attr: {
              fill: '#ffeeee'
            }
          },
          {
            text: '坤'
          },
          {
            text: '兌'
          },
          {
            text: '乾'
          },
          {
            text: '坎',
            textAttr: {
              fill: 'blue'
            },
            attr: {
              fill: '#eeeeff'
            }
          },
          {
            text: '艮'
          },
          {
            text: '震'
          },
          {
            text: '巽'
          }
        ]
      }
      const fan = new Fan(setting)
      const div = createElement('div')
      fan.mount(div)
      return createElement('div', [text, div], { class: 'readme-demo-item' })
    }
  ]

  const fm = document.createDocumentFragment()
  demoList.forEach(itemFn => {
    fm.appendChild(itemFn())
  })

  return Section(title, fm)
}
