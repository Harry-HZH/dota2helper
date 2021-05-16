module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  // const Article = require('../../models/Article')
  const Article = require('../../models/Article')
  const Category = require('../../models/Category')
  const Hero = require('../../models/Hero')
  const Video = require('../../models/Video')

  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const oldnewsTitles = ["DPC中国联赛4月30日：VG多次完美团惜败iG Aster再度防守反击获胜", "DOTA2 4月30日更新日志：7.29c平衡性更新", "DPC中国联赛4月27日：天王回归，强队间的顶级拉扯", "DPC中国联赛4月26日：XG爆冷，四大天王明日回归", "荣耀之赏，初夏六折DOTA2蒸汽钱包充值福利", "DPC中国联赛4月25日：RNG两局60分钟长盘翻盘小象", "DPC中国联赛4月23日：LBZS重现大核荣光，EHOME轻松取胜", "+2属性黄点回归“…瓶；蜂王浆和死灵书被移除。", "DPC中国联赛4月30日：VG多次完美团惜败iG Aster再度防守反击获胜", "DOTA2 4月30日更新日志：7.29c平衡性更新", "DPC中国联赛4月27日：天王回归，强队间的顶级拉扯", "DPC中国联赛4月26日：XG爆冷，四大天王明日回归", "荣耀之赏，初夏六折DOTA2蒸汽钱包充值福利", "DPC中国联赛4月25日：RNG两局60分钟长盘翻盘小象", "DPC中国联赛4月23日：LBZS重现大核荣光，EHOME轻松取胜", "Major决赛iG…提前确定TI10直邀资格！", "DPC中国联赛4月30日：VG多次完美团惜败iG Aster再度防守反击获胜", "DPC中国联赛4月27日：天王回归，强队间的顶级拉扯", "DPC中国联赛4月26日：XG爆冷，四大天王明日回归", "DPC中国联赛4月25日：RNG两局60分钟长盘翻盘小象", "DPC中国联赛4月23日：LBZS重现大核荣光，EHOME轻松取胜", "DPC中国联赛第二赛季S级战队漫画海报", "DPC中国联赛第三周赛事前瞻：Major四雄强势归来", "DOTA2 4月3…对兽王等英雄作了平衡调整。", "DOTA2 4月10日更新日志：新英雄破晓辰星+7.29游戏性更新",].reverse()
    const newsTitles = Array.from([...new Set(oldnewsTitles)])
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0, 2),
        title: title,
      }
    })
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList)
  })

  router.get('/news/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        $addFields: {
          newsList: {
            $slice: ['$newsList', 5],
          }
        }
      },

    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCats }
      }).populate('categories').limit(5).lean()
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name
      })
    })
    res.send(cats)
  })

  router.get('/heroes/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '英雄分类'
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'heros',
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList'
        }
      },


    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      heroList: await Hero.find().where({
        categories: { $in: subCats }
      }).limit(10).lean()
    })


    res.send(cats)
  })
  router.get('/videos/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '精彩视频'
    })
    const cats = await Video.aggregate([
      { $match: { categories: parent._id } },
    ]).limit(4)

    res.send(cats)
  })


  router.get('/articles/:id', async (req, res) => {
    const data = await Article.findById(req.params.id).lean()
    res.send(data)
  })

  router.get('/videos/:id', async (req, res) => {
    const data = await Video.findById(req.params.id).lean()
    res.send(data)
  })

  router.get('/heroes/:id', async (req, res) => {
    const data = await Hero
      .findById(req.params.id)
      .populate('categories items1 items2 partners.hero')
      .lean()
    res.send(data)
  })



  app.use('/web/api', router)
}