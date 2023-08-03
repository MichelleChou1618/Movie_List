// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

//將 JSON 檔案載入 Express 中
const movieList = require('./movies.json')

// setting template engine
//定義要使用的樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
//告訴 Express 說要設定的 view engine 是 handlebars
app.set('view engine', 'handlebars')

// setting static files
//告訴 Express 靜態檔案的資料夾位置: 告訴 Express 靜態檔案是放在名為 public 的資料夾中，它不必針對這個資料夾內的檔案做什麼，只要產生對應的路由讓我們可以使用就好。
app.use(express.static('public'))


// routes setting
app.get('/', (req, res) => {
  
  // create a variable to store movieOne
  const movieOne = {
    id: 1,
    title: 'Jurassic World: Fallen Kingdom',
    image: 'https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
  }

  // test for storing multiple data: creating list
  const numberList = [1, 2, 3, 4, 5, 6, 7, 8]

  // create a variable to store movies
  // const movieList = [
  //   {
  //     id: 1,
  //     title: 'Jurassic World: Fallen Kingdom',
  //     image: 'https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg'
  //   },
  //   {
  //     id: 2,
  //     title: 'Ant-Man and the Wasp test',
  //     image: 'https://movie-list.alphacamp.io/posters/rv1AWImgx386ULjcf62VYaW8zSt.jpg'
  //   },
  //   {
  //     id: 3,
  //     title: "Thor: Ragnarok",
  //     image: "https://movie-list.alphacamp.io/posters/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg"
  //   },
  //   {
  //     id: 4,
  //     title: "Avengers: Infinity War",
  //     image: "https://movie-list.alphacamp.io/posters/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
  //   },
  //   {
  //     id: 5,
  //     title: "Mission: Impossible - Fallout",
  //     image: "https://movie-list.alphacamp.io/posters/80PWnSTkygi3QWWmJ3hrAwqvLnO.jpg"
  //   },
  //   {
  //     id: 6,
  //     title: "Incredibles 2",
  //     image: "https://movie-list.alphacamp.io/posters/x1txcDXkcM65gl7w20PwYSxAYah.jpg"
  //   },
  //   {
  //     id: 7,
  //     title: "Fifty Shades Freed",
  //     image: "https://movie-list.alphacamp.io/posters/jjPJ4s3DWZZvI4vw8Xfi4Vqa1Q8.jpg"
  //   },
  //   {
  //     id: 8,
  //     title: "The First Purge",
  //     image: "https://movie-list.alphacamp.io/posters/2slvblTroiT1lY9bYLK7Amigo1k.jpg"
  //   },
  // ]

  
  
  //res.send('This is my movie list built with Express')
  //res.send()
  // Express 就會在使用者輸入 localhost:3000 進到根目錄時，根據 index.handlebars 這支檔案回傳對應的 HTML 給瀏覽器。
  // 不同的路由透過 res.render() 告訴它要根據哪個局部樣板來回傳 HTML，於是就達到不同路由產生不同內容，但上方都會出現 Movie List 的情況。
  //res.render('index')

  // past the movie data into 'index' partial template
  //在 res.render('index') 的第二個參數處放一個物件，這個物件則會在 index.handlebars 這個樣板中被使用-> 就可以把 movieOne 的資料送到 index.handlebars 中使用
  //res.render('index', { movie: movieOne });

  // past the number list into 'index' partial template
  //res.render('index', { numbers: numberList })

  // past the movie data into 'index' partial template
  res.render('index', { movies: movieList.results })

})

//把路由設定為輸入 /movies/1 時，會顯示第一部電影的資訊
// app.get('/movies/1', (req, res) => {
//   const movieOne = {
//     id: 1,
//     title: 'Jurassic World: Fallen Kingdom',
//     description:
//       'Several years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the island of Isla Nublar. Claire Dearing, the former park manager and founder of the Dinosaur Protection Group, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.',
//     release_date: '2018-06-06',
//     image: 'c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg'
//   }
//   res.render('show', { movie: movieOne })
// })

//根據動態路由把內容從資料中篩選出來，丟到樣板去呈現
app.get('/movies/:movie_id', (req, res) => {
  console.log('req.params.movie_id', req.params.movie_id)
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  res.render('show', { movie: movie })
})


app.get('/search', (req, res) => {
  // 可以透過 req.query 這個物件存取網頁網址中 ? 後的內容: 在網址列中 ? 後面的內容，稱作「查詢字串」（queryString）。queryString 可以讓伺服器知道你是從哪個管道進到這個網站、或是從哪裡分享出這篇文章。許多導購的網頁、分享資訊的媒體網站都會在網頁中發入 queryString。
  console.log('req.query', req.query)
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { movies: movies, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})