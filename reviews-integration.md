# 评论数据接入方案

## 结论

不要直接爬取 Google Maps、Tripadvisor、Yelp 或 Booking 页面评论。推荐采用：

1. 站内原生评论区，作为可长期积累和检索的自有内容。
2. Google Places API 等正式接口提供少量第三方评价。
3. 不同来源分栏展示，评分绝不混算。

当前原型中的评论全部明确标为“模拟内容”，不来自任何网站抓取。

## Google Places API (New)

[Place Details (New)](https://developers.google.com/maps/documentation/places/web-service/place-details) 可以通过 `placeId` 获取评分与评论。[Place 资源定义](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places) 当前说明评论最多返回 5 条，并按相关性排序，不提供获取全部评论的分页接口。

每条评论可能包含：

- `rating`
- `text` 与 `originalText`
- `publishTime` 与相对发布时间
- 作者姓名、头像和主页
- `googleMapsUri` 原评价链接
- `flagContentUri` 举报入口
- 部分地区的到访年月

展示时必须遵守 [Places API 归因与展示政策](https://developers.google.com/maps/documentation/places/web-service/policies)：

- 明确标注 Google Maps 来源。
- 保留作者归属。
- 每条评论提供 Google Maps 原文入口。
- 说明默认按相关性排序及额外筛选方式。
- 标明机器翻译，并允许查看原文。
- Google 内容与本站评论在视觉上分开。
- 无地图展示时也要提供规定的 Google Maps 归因。

Google 内容有预取、缓存和存储限制。`placeId` 是可以长期保存的主要例外；评论正文不能作为自己的数据库或训练数据长期沉淀。

## 推荐请求

由后端请求，不要把 Web Service API Key 写进浏览器代码：

```http
GET https://places.googleapis.com/v1/places/{PLACE_ID}
X-Goog-Api-Key: {SERVER_SIDE_KEY}
X-Goog-FieldMask: id,displayName,rating,userRatingCount,reviews,googleMapsLinks
```

前端只调用自己的受限接口，例如：

```text
GET /api/review-sources/google/{placeId}
```

后端应：

- 只接受合法 `placeId`，不允许客户端传任意 Google URL 或 Field Mask。
- 使用服务器密钥或支持时使用 OAuth。
- 按 IP、API 和环境限制密钥。
- 增加登录校验、用户级限流、配额与费用告警。
- 返回 `Cache-Control: private, no-store`。
- 不在日志、数据库、搜索索引或 CDN 中记录评论正文。
- 开发、测试和生产使用不同密钥。

密钥配置参考 [Google Maps Platform 安全指南](https://developers.google.com/maps/api-security-best-practices)。

## 其他授权来源

| 来源 | 用法 | 主要限制 |
|---|---|---|
| [Tripadvisor Terra](https://docs.terra.tripadvisor.com/docs/overview) | 旅游地点评论，合同允许时可分页和筛选 | 商业权限和缓存范围取决于套餐与合同 |
| [Yelp Reviews API](https://docs.developer.yelp.com/reference/v3_business_reviews) | 餐厅和本地商家评论摘录 | 数量有限，必须使用 Yelp 品牌与跳转，缓存受限 |
| [Booking.com Demand API](https://developers.booking.com/demand/docs/accommodations/about-accommodation) | 酒店评价 | 仅签约合作伙伴，适合住宿卡而非城市总评 |

## 站内评论建议数据模型

```text
CommunityReview
  id
  user_id
  destination_id / poi_id
  rating
  text
  visited_at
  traveler_type
  transport_mode
  topic_tags[]
  media[]
  verified_trip_method
  language
  moderation_status
  helpful_count
  created_at / updated_at
```

站内评论需要垃圾广告检测、个人信息遮盖、仇恨与骚扰审核、高风险指控人工复核、举报和申诉。评论中涉及种族、宗教、性别、性取向或残障的体验只能由用户自愿提供，不能从姓名、头像或语言推断。
