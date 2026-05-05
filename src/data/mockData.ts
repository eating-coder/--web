export interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: string
}

export interface FanTrend {
  date: string
  count: number
}

export interface EngagementTrend {
  date: string
  likes: number
  comments: number
  shares: number
}

export interface ContentItem {
  id: string
  title: string
  thumbnail: string
  likes: number
  comments: number
  shares: number
  views: number
}

export interface TopicItem {
  id: string
  title: string
  angle: string
  tags: string[]
}

export interface MaterialItem {
  id: string
  type: 'image' | 'text'
  content: string
  category: string
}

export interface DraftItem {
  id: string
  title: string
  date: string
  status: 'draft' | 'pending' | 'published'
  platform: string
}

export interface PlanItem {
  id: string
  title: string
  type: 'topic' | 'report' | 'suggestion' | 'template'
  date: string
}

export interface KnowledgeItem {
  id: string
  title: string
  category: string
  summary: string
}

export const initialMessages: Message[] = [
  {
    id: '1',
    type: 'ai',
    content: '今天想让我帮你写什么？选题、文案还是复盘？',
    timestamp: '刚刚'
  }
]

export const fanTrendData: FanTrend[] = [
  { date: '周一', count: 1250 },
  { date: '周二', count: 1320 },
  { date: '周三', count: 1280 },
  { date: '周四', count: 1450 },
  { date: '周五', count: 1520 },
  { date: '周六', count: 1680 },
  { date: '周日', count: 1820 }
]

export const engagementTrendData: EngagementTrend[] = [
  { date: '04-01', likes: 234, comments: 45, shares: 12 },
  { date: '04-05', likes: 312, comments: 67, shares: 23 },
  { date: '04-10', likes: 289, comments: 54, shares: 18 },
  { date: '04-15', likes: 423, comments: 89, shares: 34 },
  { date: '04-20', likes: 356, comments: 72, shares: 28 },
  { date: '04-25', likes: 489, comments: 98, shares: 45 },
  { date: '04-30', likes: 567, comments: 123, shares: 56 }
]

export const topContents: ContentItem[] = [
  { id: '1', title: '5个提升内容曝光的小技巧', thumbnail: '', likes: 2345, comments: 345, shares: 123, views: 12500 },
  { id: '2', title: '如何打造个人IP人设', thumbnail: '', likes: 1892, comments: 234, shares: 89, views: 9800 },
  { id: '3', title: '短视频拍摄设备推荐', thumbnail: '', likes: 1567, comments: 189, shares: 67, views: 8200 },
  { id: '4', title: '爆款文案写作公式', thumbnail: '', likes: 2134, comments: 312, shares: 98, views: 11200 },
  { id: '5', title: '数据分析入门指南', thumbnail: '', likes: 1456, comments: 156, shares: 54, views: 7600 }
]

export const topicsList: TopicItem[] = [
  { id: '1', title: '如何提升粉丝互动率', angle: '从评论区运营入手', tags: ['运营技巧', '粉丝互动'] },
  { id: '2', title: '短视频脚本结构解析', angle: '3分钟学会爆款框架', tags: ['短视频', '脚本'] },
  { id: '3', title: '选题灵感来源', angle: '5个挖掘爆款选题的渠道', tags: ['选题', '灵感'] },
  { id: '4', title: '个人品牌定位', angle: '找到你的差异化优势', tags: ['品牌', '定位'] },
  { id: '5', title: '直播带货技巧', angle: '新手也能上手的直播策略', tags: ['直播', '带货'] },
  { id: '6', title: '图文内容排版', angle: '提升阅读体验的设计原则', tags: ['图文', '排版'] }
]

export const materialsList: MaterialItem[] = [
  { id: '1', type: 'image', content: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=beautiful%20sunset%20landscape&image_size=landscape_16_9', category: '风景' },
  { id: '2', type: 'text', content: '人生没有白走的路，每一步都算数。', category: '金句' },
  { id: '3', type: 'image', content: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=modern%20office%20workspace&image_size=landscape_16_9', category: '工作' },
  { id: '4', type: 'text', content: '成功不是将来才有的，而是从决定去做的那一刻起，持续累积而成。', category: '金句' },
  { id: '5', type: 'image', content: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=coffee%20cup%20on%20wooden%20table&image_size=square', category: '生活' },
  { id: '6', type: 'text', content: '努力到无能为力，拼搏到感动自己。', category: '金句' }
]

export const draftList: DraftItem[] = [
  { id: '1', title: '新账号运营攻略', date: '2024-05-01', status: 'pending', platform: '小红书' },
  { id: '2', title: '内容创作心得分享', date: '2024-05-03', status: 'draft', platform: '抖音' },
  { id: '3', title: '粉丝增长技巧', date: '2024-05-05', status: 'published', platform: '微博' },
  { id: '4', title: '直播复盘总结', date: '2024-05-08', status: 'pending', platform: '小红书' },
  { id: '5', title: '爆款案例拆解', date: '2024-05-10', status: 'draft', platform: '抖音' }
]

export const planList: PlanItem[] = [
  { id: '1', title: '4月份选题方案', type: 'topic', date: '2024-04-01' },
  { id: '2', title: 'Q1运营诊断报告', type: 'report', date: '2024-04-15' },
  { id: '3', title: '内容优化建议', type: 'suggestion', date: '2024-04-20' },
  { id: '4', title: '短视频模板合集', type: 'template', date: '2024-04-25' },
  { id: '5', title: '5月份选题方案', type: 'topic', date: '2024-05-01' }
]

export const knowledgeList: KnowledgeItem[] = [
  { id: '1', title: '小红书平台规则详解', category: 'platform', summary: '了解小红书社区规范，避免违规踩坑' },
  { id: '2', title: '抖音算法推荐机制', category: 'platform', summary: '深度解析抖音推荐算法，提升内容曝光' },
  { id: '3', title: '内容数据指标解读', category: 'benchmark', summary: '核心数据指标含义及参考标准' },
  { id: '4', title: '行业数据基准参考', category: 'benchmark', summary: '各领域KOL数据表现参考范围' },
  { id: '5', title: '美妆爆款案例分析', category: 'case', summary: '拆解美妆类爆款内容的成功要素' },
  { id: '6', title: '美食账号运营案例', category: 'case', summary: '美食类账号从0到1的运营路径' },
  { id: '7', title: '内容创作方法论', category: 'methodology', summary: '系统化的内容创作流程和方法' },
  { id: '8', title: '粉丝运营策略', category: 'methodology', summary: '提升粉丝粘性和转化率的策略' }
]

export const accountStats = {
  followers: 12580,
  followersChange: 320,
  engagementRate: 4.8,
  engagementChange: 0.5,
  postsThisMonth: 18,
  profileViews: 3240,
  profileViewsChange: 120
}

export const reviewReport = {
  highlights: [
    '粉丝增长320人，环比增长2.6%',
    '互动率提升至4.8%，创历史新高',
    '单篇内容最高点赞达2345次'
  ],
  contentAnalysis: [
    '美妆类内容表现最佳，平均互动率6.2%',
    '教程类内容完播率较高，建议增加产出',
    '周末发布效果优于工作日'
  ],
  suggestions: [
    '尝试发布系列化内容，提升粉丝粘性',
    '增加直播频次，加强粉丝互动',
    '优化封面设计，提高点击率'
  ],
  nextTopics: [
    '夏季护肤指南',
    '新手化妆教程',
    '平价好物推荐'
  ]
}

export const hotKeywords = ['AI创作', '短视频运营', '直播带货', '私域流量', '内容变现', '个人IP', '小红书运营', '抖音运营', '粉丝增长', '爆款文案']
