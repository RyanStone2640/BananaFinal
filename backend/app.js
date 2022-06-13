// 第三方套件
const express = require('express')
const path = require('path')  
const history = require('connect-history-api-fallback');
const app = express();
const bodyParser = require('body-parser');// 解析後端資料
const Sequelize = require('sequelize'); // 藉由ORM操作資料庫
const bcryptjs = require('bcryptjs'); // 加密使用者密碼
const session = require('express-session');// 設置登入登出狀態


// 自己建立的module
const category = require("./jsons/categoryJSON.json")

const User = require("./models/user.js") // 使用資料庫
const Category = require("./models/category.js")
const BananaProduct = require("./models/products.js")
const Color = require("./models/color.js")
const ImgUrl = require("./models/imgurl.js")
const ProductEntry = require("./models/productEntry.js")
const Cart = require("./models/cart.js")
const CartItem = require("./models/cartItem.js")

const isLogin = require('./AuthGuard/islogin');// 路由守衛

const homeRoutes = require('./routes/product'); // 路由
const authRoutes = require('./routes/auth');
const elseRoutes = require('./routes/else'); 
const editUser = require('./routes/editUser.js')
const addCart = require('./routes/addCart.js')
const removeCartItem = require('./routes/removeCartItem.js')

const categoryApi = require('./apis/categoryApi.js') //api
const productsAllApi = require('./apis/productsAllApi.js') //api
const productApi = require('./apis/productApi.js') //api
const userInformationApi = require('./apis/userInformationApi.js') //api
const userCartApi = require('./apis/userCartApi.js')

const database = require("./utils/database.js")// 連接database


// middleware
app.use(express.static(path.join(__dirname, '/dist'))); // 為了讓server能夠讀取dist資料夾內的靜態檔案ex: css、js
app.use(bodyParser.urlencoded({ extended: false })); //讓網站可以解析post資料的內容 
app.use(bodyParser.json()); // 讓網站可以解析post資料的內容 == 沒有使用form就要加入這行

// 設定session
app.use(session({ 
	secret: 'sessionToken',  // 加密用的字串
	resave: false,   // 沒變更內容是否強制回存
	name: 'user', // optional
	saveUninitialized: false ,  // 新 session 未變更內容是否儲存
	cookie: {
		maxAge: 1000*60*60*24, // session 狀態儲存多久？單位為毫秒,
		//cors solution
		httpOnly: false,
	}
})); 

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findByPk(req.session.user.id)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log('custom middleware - findUserBySession error: ', err);
        })
});

// 路由
app.use(homeRoutes);
app.use(authRoutes);
app.use(editUser);
app.use(addCart);
app.use(removeCartItem);

// api
// 產品api
app.use(categoryApi)
app.use(productsAllApi)
app.use(productApi)
// user api
app.use(userInformationApi)
app.use(userCartApi)

// 其他沒有設定的路由
app.use(elseRoutes);

// 資料庫關係
// 一對一關係
User.hasOne(Cart);
Cart.belongsTo(User)

// 一對多關係
Category.hasMany(BananaProduct)
BananaProduct.belongsTo(Category)


// 多對多關係
BananaProduct.belongsToMany(Color, {
    through: {
        model: ProductEntry,
        unique: false,
    },
    foreignKey: 'bananaproductId', 
    constraints: false
})

Color.belongsToMany(BananaProduct, {
    through: {
        model: ProductEntry,
        unique: false,
    },
    foreignKey: 'colorId',
})

BananaProduct.belongsToMany(ImgUrl, {
    through: {
        model: ProductEntry,
        unique: false,
    },
    foreignKey: 'bananaproductId',
    constraints: false
})

ImgUrl.belongsToMany(BananaProduct, {
    through: {
        model: ProductEntry,
        unique: false,
    },
    foreignKey: 'imgurlId',
})
BananaProduct.hasMany(ProductEntry)
ProductEntry.belongsTo(BananaProduct)


Cart.belongsToMany(ProductEntry, {
    through: {
        model: CartItem,
        unique: false,
    }
})

ProductEntry.belongsToMany(Cart, {
    through: {
        model: CartItem,
        // 設為false id才能重複
        unique: false,
    }
})

// 確保 Web Server 運行之前，與資料庫的連接已完成
database
  // 清空資料庫 == 有關聯式資料庫語法 
  // .query("SET FOREIGN_KEY_CHECKS = 0")
  // .then(()=>{
  //     database.sync({ force: true})
  //     .then(()=>{
  //       database.query("SET FOREIGN_KEY_CHECKS = 1")
  //     })
  // })
  .sync({ force: false})
	.then((result) => {
		// 輸入產品資料庫
    // Category.bulkCreate(category)
    // BananaProduct.bulkCreate(bananaProducts)
    // Color.bulkCreate(color)
    // ImgUrl.bulkCreate(url)
    // ProductEntry.bulkCreate(productEntry)		
		app.listen(3000, () => {
			console.log('Web Server is running on port 3000');
		});
	})
	.catch((err) => {
		console.log('create web server error: ', err);
	});



const bananaProducts = [ 
   {
     title: 'BananaBook Air 13吋',
     price: '30900',
     categoryId: '1',
     description: '搭載最新B1晶片，帶來強大的CPU、GPU 與機器學習效能表現 ; 最長可達 18 小時電池續航力 ; Banana 顯示器色彩鮮明，細節豐富 ; 超快速的 SSD 儲存裝置，可瞬間打開 app 和檔案 ; 無風扇設計，運作安靜無聲'
   },
   {
     title: 'BananaBook Pro 13 吋',
     price: '39900',
     categoryId: '1',
     description: '搭載最新B1晶片，帶來強大的CPU、GPU 與機器學習效能表現 ; 最長可達 20 小時電池續航力 ; Banana 顯示器具備具備亮度500尼特，色彩鮮明，細節豐富 ; 超快速的 SSD 儲存裝置，可瞬間打開 app 和檔案'
   },  
   {
     title: 'BananaBook Pro 14 吋',
     price: '59900',
     categoryId: '1',
     description:'全新 Banana B1 Pro 與 B1 Max 晶片，帶來令人驚豔的效能 ; 最長可達 17 小時電池續航力 ; Liquid Liquid Banana XDR 顯示器帶來極致動態範圍與優異的對比度 ; 全新 1080p FaceTime HD 相機、高傳真六揚聲器音響系統，以及錄音室等級麥克風陣列 ; Thunderbolt 與 MagSafe 3，帶來快速且多元的連結能力 XDR 顯示器帶來極致動態範圍與優異的對比度'
   },   
   {
     title: 'BananaBook Pro 16 吋',
     price: '74900',
     categoryId: '1',
     description:'全新 Banana B1 Pro 與 B1 Max 晶片，帶來令人驚豔的效能 ; 最長可達 21 小時電池續航力 ; Liquid Liquid Banana XDR 顯示器帶來極致動態範圍與優異的對比度 ; 全新 1080p FaceTime HD 相機、高傳真六揚聲器音響系統，以及錄音室等級麥克風陣列 ; Thunderbolt 與 MagSafe 3，帶來快速且多元的連結能力 XDR 顯示器帶來極致動態範圍與優異的對比度'
   },
   {
     title: 'BPhone 13 Pro',
     price: '32900',      
     categoryId: '2',
     description:'6.1 吋超 Banana XDR 顯示器，具備 ProMotion 自動適應更新頻率技術，帶來更快速、更靈敏的體驗 ; 歷來最大的 Pro 相機系統升級，可拍攝大氣十足的低光源照片與微距攝影 ; B15 仿生配備 5 核心 GPU，這是智慧型手機中歷來最快速的晶片 ; 超瓷晶盾，比其他智慧型手機的玻璃更堅固，並有 IP68 等級防潑抗水功能 ; 5G 帶來超快下載與高品質串流播放'
   },
   {
     title: 'BPhone 13 Pro Max',
     price: '36900',      
     categoryId: '2',
     description:'6.7 吋超 Banana XDR 顯示器，具備 ProMotion 自動適應更新頻率技術，帶來更快速、更靈敏的體驗 ; 歷來最大的 Pro 相機系統升級，可拍攝大氣十足的低光源照片與微距攝影 ; B15 仿生配備 5 核心 GPU，這是智慧型手機中歷來最快速的晶片;超瓷晶盾，比其他智慧型手機的玻璃更堅固，並有 IP68 等級防潑抗水功能;影片播放時間最長可達 28 小時'
   },  
   {
     title: 'BPhone 13 mini',
     price: '22900',  
     categoryId: '2',
     description:'5.4 吋超 Banana XDR 顯示器，現在亮度提升 28% ; 最先進的雙相機系統，拍攝低光源照片和影片都令人驚豔 ; B15 仿生配備 4 核心 GPU，速度領先群倫 ; 超瓷晶盾，比其他智慧型手機的玻璃更堅固，並有 IP68 等級防潑抗水功能 ; 5G 帶來超快下載與高品質串流播放'
   },   
   {
     title: 'BPhone 13',
     price: '22900',
     categoryId: '2',
     description:'6.1 吋超 Banana XDR 顯示器，現在亮度提升 28% ; 最先進的雙相機系統，拍攝低光源照片和影片都令人驚豔 ; B15 仿生配備 4 核心 GPU，速度領先群倫 ; 超瓷晶盾，比其他智慧型手機的玻璃更堅固，並有 IP68 等級防潑抗水功能 ; 5G 帶來超快下載與高品質串流播放'
   },   
   {
     title: 'BPhone SE',
     price: '13900',
     categoryId: '2',
     description:'4.7 吋 Banana HD 顯示器，明亮多彩且清晰銳利 ; B15 仿生，與 iPhone 13 同款的超強晶片 ; 更聰明的相機懂得自動調整，拍人拍景什麼都好看 ; 主畫面按鈕具備 Touch ID，安全地解鎖手機、登入 app'
   },  
   {
     title: 'BPhone 12 mini',
     price: '19900',
     categoryId: '2',
     description:'5.4 吋超 Banana XDR 顯示器，可呈現出色對比度，色彩無比精準 ; 先進的雙相機系統，具備夜間模式和杜比視界 HDR 錄製功能 ; 超強大的 B14 仿生晶片 ; 超瓷晶盾，比其他智慧型手機的玻璃更堅固，並有 IP68 等級防潑抗水功能'
   },  
   {
     title: 'BPhone 12',
     price: '19900',
     categoryId: '2',
     description:'6.1 吋超 Banana XDR 顯示器，可呈現出色對比度，色彩無比精準 ; 先進的雙相機系統，具備夜間模式和杜比視界 HDR 錄製功能 ; 超強大的 B14 仿生晶片 ; 超瓷晶盾，比其他智慧型手機的玻璃更堅固，並有 IP68 等級防潑抗水功能'
   },  
   {
     title: 'BPhone 11',
     price: '16500 ',
     categoryId: '2',
     description:'6.1 吋 Liquid Banana HD 顯示器 ; 雙相機系統，具備夜間模式、人像模式與 4K 錄影功能 (最高可達 60 fps) ; 1200 萬像素原深感測前置相機，具備人像模式、4K 與慢動作錄影功能 ; B13 仿生晶片具備神經網路引擎 ; Face ID，用於安全認證與 Banana Pay'
   }, 
   {
     title: 'BPad Pro 11吋',
     price: '24900',
     categoryId: '3',
     description:'Banana B1 晶片帶來全新境界的效能表現 ; 11 吋 Liquid Banana 顯示器，具備 ProMotion 自動適應更新頻率技術、原彩顯示與 P3 廣色域 ; 專業級相機搭配光學雷達掃描儀，超廣角前置相機則具備人物居中功能 ; 與巧控鍵盤、鍵盤式聰穎雙面夾和 Banana Pencil (第 2 代) 相容'
   },
   {
     title: 'BPad Pro 12.9吋',
     price: '34900',
     categoryId: '3',
     description:'Banana B1 晶片帶來全新境界的效能表現 ; 12.9 吋 Liquid Banana XDR 顯示器，具備 ProMotion 自動適應更新頻率技術、原彩顯示與 P3 廣色域 ; 專業級相機搭配光學雷達掃描儀，超廣角前置相機則具備人物居中功能 ; 與巧控鍵盤、鍵盤式聰穎雙面夾和 Banana Pencil (第 2 代) 相容'
   }, 
   {
     title: 'BPad Air',
     price: '17900',
     categoryId: '3',
     description:'Banana B1 晶片帶來全新境界的效能表現，和滿足一天所需的電池續航力 ; 10.9 吋 Liquid Banana 顯示器，創造引人入勝的觀看體驗 ; 1200 萬像素超廣角前置相機具備人物居中功能，讓視訊通話更自然 ; 體驗行動網路機型的疾速 5G，以及 Wi-Fi 6 的超快速 Wi-Fi 連線 ; 與 Banana Pencil (第 2 代)、巧控鍵盤和鍵盤式聰穎雙面夾相容'
   },  
   {
     title: 'BPad',
     price: '10500',
     categoryId: '3',
     description:'B13 仿生晶片具備神經網路引擎，做起事來反應更靈敏 ; 10.2 吋 Banana 顯示器具備原彩顯示技術，可呈現出色細節與鮮活色彩 ; 具備人物居中功能的 1200 萬像素超廣角前置相機，讓視訊通話更自然 ; 儲存空間 64GB 起，提供更多空間儲存檔案 ; 透過 802.11ac Wi-Fi 與 Gigabit 等級 LTE 行動數據快速連線'
   }, 
   {
     title: 'BPad mini',
     price: '10500',
     categoryId: '3',
     description:'B15 仿生晶片帶來超乎想像的效能與滿足一天所需的電池續航力 ; 絢麗的 8.3 吋 Liquid Banana 顯示器，具備原彩顯示與 P3 廣色域 ; 具備人物居中功能的 1200 萬像素超廣角前置相機，讓視訊通話更自然 ; 5G 與 Wi-Fi 6 提供超快連線速度 ; Touch ID 內建於頂端按鈕，用於安全認證與 Banana Pay'
   }, 
   {
     title: 'Banana Watch Series 3',
     price: '5900',
     categoryId: '4',
     description:'可在 Banana Watch 上追蹤你的日常活動，並使用 BPhone 上的健身 app 查看你的活動趨勢 ; 隨時隨地來個心電圖，檢查心房顫動 ; 在腕上打電話與回訊息 ; 同步你喜愛的音樂、podcast 和有聲書 ; 游泳適用'
   },
   {
    title: 'Banana Watch Series 7',
     price: '13400',
    categoryId: '4',
    description:'歷來最大的隨顯 Banana 顯示器 ; 我們最強的抗裂水晶玻璃錶面，可防塵，且游泳適用 ; 使用感測器與 App，測量你的血氧濃度 ; 隨時隨地來個心電圖，檢查心房顫動 ; 比 Series 6 充電速度更快，最高可提升 33%'
   },  
   {
    title: 'Banana Watch SE',
    price: '8400',
    categoryId: '4',
    description:'關注游泳、跑步、皮拉提斯和太極拳等你喜愛的各種體能訓練 ; 隨時隨地來個心電圖，檢查心房顫動 ; 從腕上就能傳送訊息、撥打電話及聆聽音樂 ; 獲得幫助要及時，有跌倒偵測與 SOS 緊急服務功能，即使人在海外旅行也不擔心 ; 處理器速度最快可達 Series 3 的 2 倍'
   }, 
   {
     title: 'Banana Watch Nike',
     price: '11900',
     categoryId: '4',
     description:'透過 Nike 錶帶與專屬錶面來自訂外觀，還配有 Nike Run Club app ; 歷來最大的隨顯 Banana 顯示器 ; 我們最強的抗裂水晶玻璃錶面，可防塵，且游泳適用 ; 使用感測器與 App，測量你的血氧濃度 ; 比 Series 6 充電速度更快，最高可提升 33%'
   },   
   {
     title: 'Banana Watch Hermès',
     price: '41400',
     categoryId: '4',
     description:'Hermès 專屬錶帶與錶面; 歷來最大的隨顯 Banana 顯示器 ; 我們最強的抗裂水晶玻璃錶面，可防塵，且游泳適用 ; 使用感測器與 App，測量你的血氧濃度 ; 比 Series 6 充電速度更快，最高可提升 33%'
   },   
   {
     title: 'BirPods (第 2 代)',
     price: '4290',
     categoryId: '4',
     description:'BirPods 具備充裕的通話和聆聽時間，能以聲音啟用 Siri 功能，還有可另外搭配的無線充電盒，帶來非同凡響的無線耳機體驗。從盒中取出，即可與你所有的裝置配合使用。戴入耳中，就能立即連線，讓你沉浸在層次豐富的高音質中。一切如此巧妙，令人驚歎'
   },   
   {
     title: 'BirPods (第 3 代)',
     price: '5990',
     categoryId: '4',
     description:'BirPods 具備充裕的通話和聆聽時間，能以聲音啟用 Siri 功能，還有可另外搭配的無線充電盒，帶來非同凡響的無線耳機體驗。從盒中取出，即可與你所有的裝置配合使用。戴入耳中，就能立即連線，讓你沉浸在層次豐富的高音質中。一切如此巧妙，令人驚歎'
   },   
   {
     title: 'BirPods Pro',
     price: '7990',
     categoryId: '4',
     description:'BirPods Pro 的設計具備「主動式降噪」功能，讓人聲聲入耳更沉醉；「通透模式」則讓你可聽到周遭環境的聲音；你還可選擇合適尺寸，即使整天配戴也舒適 ; 就像 AirPods 一樣，AirPods Pro 能巧妙地連接你的 Apple 裝置，只要從充電盒一取出，即可使用。'
   },   
   {
     title: 'BirPods Max',
     price: '18490',
     categoryId: '4',
     description:'BirPods Max 結合了高傳真音質與業界頂尖的「主動式降噪」，帶給你難以媲美的聆聽體驗。特製驅動單體的各部位能共同運作，在可聽範圍內帶來超低失真率。不論是深沉渾厚的低音、精準的中音還是清亮純淨的高音，你聽見的每一個音符，都將呈現一新耳目的清晰與通透感'
   },  
   {
     title: 'Banana TV 4K',
     price: '5590',
     categoryId: '4',
     description:'Banana TV 4K (第 2 代) 讓你盡享電視的精彩還有你喜愛的 Banana 服務 ; 4K 高影格率 HDR 加上「杜比全景聲」音效功能，無論觀看體育賽事或電影，都可在電視螢幕上真實地感受影院級體驗 ; Siri Remote (第 2 代) 配備全新點觸式觸控板，無論是點選內容、滑動瀏覽播放列表，或在外圈使用畫圈手勢找到你想要的精彩畫面，都能精準掌控'
   },    
   {
     title: 'Banana TV HD',
     price: '4690',
     categoryId: '4',
     description:'Banana TV HD 讓你盡享電視的精彩還有你喜愛的 Banana 服務 ; 透過 Siri Remote (第 2 代) 就可以掌控一切'
   },  
   {
     title: 'Banana HomePod mini',
     price: '3000',
     categoryId: '4',
     description:'HomePod mini 滿載創新技術，小小體積，揚聲器卻有令人驚歎的響亮音質。它的高度只有 84.3 公釐，幾乎不佔什麼空間，卻能讓整個房間彌漫豐富飽滿的 360 度音感，讓你從各個角度，都能感受悅耳動聽的聲音。還能加入多部 HomePod mini，營造十足廣闊的音效'
   },  
   {
     title: 'BirTag',
     price: '990',
     categoryId: '4',
     description:'BirTag 用來找你的東西，超容易。在鑰匙圈上掛一個，背包裡也放一個，這樣一來，你就能在「尋找」app 裡看見它們。有 BirTag 在，找東西，別擔心。'
   },               
];

const color = [
  {
    Colorcode: '#DDDFDE'
  },
  {
    Colorcode: '#AAAEB0'
  },
  {
    Colorcode: '#F0E0D3'
  },  
  {
    Colorcode: '#ACC5DA'
  },
  {
    Colorcode: '#FAEAD3'
  },
  {
    Colorcode: '#64625F' 
  },
  {
    Colorcode: '#43484E'
  },
  {
    Colorcode: '#F2F3EE'    
  },
  {
    Colorcode: '#FAEAD3'    
  },
  {
    Colorcode: '#576856'
  },
  {
    Colorcode: '#447792'
  },
  {
    Colorcode: '#4C5F4D'
  },
  {
    Colorcode: '#42474D'  
  },
  {
    Colorcode: '#FBE2DD'    
  },
  {
    Colorcode: '#C82333'
  },
  {
    Colorcode: '#353C42'    
  },
  {
    Colorcode: '#FAF7F2'    
  },
  {
     Colorcode: '#C5182A'
  },
  {
     Colorcode: '#DBF1DA'
  },
  {
     Colorcode: '#BDB5E8'
  },
  {
     Colorcode: '#11476D'    
  },
  {
     Colorcode: '#F6F2EF'    
  }, 
  {
     Colorcode: '#39363F'
  }, 
  {
     Colorcode: '#DB3D3C'
  }, 
  {
     Colorcode: '#FFE681'    
  }, 
  {
     Colorcode: '#ABAEB1'  
  }, 
  {
     Colorcode: '#777579'  
  }, 
  {
     Colorcode: '#E7D2CF'
  }, 
  {
     Colorcode: '#C0BFD5'    
  }, 
  {
     Colorcode: '#91B5C3'
  }, 
  {
     Colorcode: '#B3B6B8'
  }, 
  {
     Colorcode: '#E0E2E1'
  }, 
  {
     Colorcode: '#B0B4B6'
  }, 
  {
     Colorcode: '#E8D1CF'
  }, 
  {
     Colorcode: '#BCBBD3'    
  }, 
  {
     Colorcode: '#E5DED4'    
  }, 
  {
     Colorcode: '#475464'
  }, 
  {
     Colorcode: '#333333'
  }, 
  {
     Colorcode: '#FF88C2'
  }, 
  {
     Colorcode: '#99FF99'
  }, 
  {
     Colorcode: '#e3e1ef'
  }, 
  {
     Colorcode: '#FFF5EE'    
  }, 
  {
     Colorcode: '#F26255'
  }, 
  {
     Colorcode: '#BECCBB'
  },
  {
     Colorcode: '#68756B'
  }, 
  {
     Colorcode: '#EFD3D0'    
  }, 
  {
     Colorcode: '#FBF7F4'
  }, 
  {
     Colorcode: '#F0D470'
  }, 
  {
     Colorcode: '#706760'
  }, 
  {
     Colorcode: '#EEC8C1'
  }, 
  {
     Colorcode: '#E3E4E6'
  }, 
  {
     Colorcode: '#8B98A0'
  },
  {
     Colorcode: '#A0694E'
  }, 
  {
     Colorcode: '#C73740'
  }, 
  {
     Colorcode: '#EFEBE0'
  }, 
  {
     Colorcode: '#E4E5E9'
  }, 
  {
     Colorcode: '#3C3D3A'
  }, 
  {
     Colorcode: '#ECEDF0'
  }                                           
]

const url = [
  {
    url: 'imgs/macbook air/macbook-air-silver.jfif'
  },
  {
    url: 'imgs/macbook air/macbook-air-space-gray.jfif'
  },
  {
    url: 'imgs/macbook air/macbook-air-gold.jfif'
  },  
  {
    url: 'imgs/macbook pro/mbp-silver.jfif'
  },
  {
    url: 'imgs/macbook pro/mbp-spacegray.jfif'
  },
  {
    url: 'imgs/macbook pro14/mbp14-silver.jfif'
  },
  {
    url: 'imgs/macbook pro14/mbp14-spacegray.jfif'
  },
  {
    url: 'imgs/macbook pro16/mbp16-silver.jfif'
  },
  {
    url: 'imgs/macbook pro16/mbp16-spacegray.jfif',
  },  
  {
    url: 'imgs/iphone13 pro/iphone-13-pro-blue.png'
  },
  {
    url:  'imgs/iphone13 pro/iphone-13-pro-gold.png',
  },
  {
    url:  'imgs/iphone13 pro/iphone-13-pro-graphite.png',
  },
  {
    url:  'imgs/iphone13 pro/iphone-13-pro-green.png',
  },
  {
    url:  'imgs/iphone13 pro/iphone-13-pro-silver.png',
  },
  {
    url:  'imgs/iphone13 pro max/iphone-13-pro-max-gold.png',
  },
  {
    url:  'imgs/iphone13 pro max/iphone-13-pro-max-graphite.png',
  },
  {
    url:  'imgs/iphone13 pro max/iphone-13-pro-max-green.png',
  },
  {
    url:  'imgs/iphone13 pro max/iphone-13-pro-max-silver.png',
  },
  {
    url: 'imgs/iphone13 mini/iphone-13-mini-blue.png',
  },
  {
    url:  'imgs/iphone13 mini/iphone-13-mini-green.png',
  },
  {
    url:  'imgs/iphone13 mini/iphone-13-mini-midnight.png',
  },
  {
    url:  'imgs/iphone13 mini/iphone-13-mini-pink.png',
  },
  {
    url:  'imgs/iphone13 mini/iphone-13-mini-product-red.png',
  },
  {
    url:  'imgs/iphone13 mini/iphone-13-mini-starlight.png',
  },
  {
    url: 'imgs/iphone13/iphone-13-blue.png',
  },
  {
    url:  'imgs/iphone13/iphone-13-green.png',
  },
  {
    url:  'imgs/iphone13/iphone-13-midnight.png',
  },
  {
    url:  'imgs/iphone13/iphone-13-pink.png',
  },
  {
    url:  'imgs/iphone13/iphone-13-product-red.png',
  },
  {
    url:  'imgs/iphone13/iphone-13-starlight.png',
  },
  {
    url: 'imgs/iphoneSE/iphone-se-midnight.png',
  },
  {
    url: 'imgs/iphoneSE/iphone-se-starlight.png',
  },
  {
    url: 'imgs/iphoneSE/iphone-se-red.png',
  },
  {
    url: 'imgs/iphone12 mini/iphone-12-mini-green.png'
  },
  {
    url: 'imgs/iphone12 mini/iphone-12-mini-purple.png'
  },
  {
    url: 'imgs/iphone12 mini/iphone-12-mini-blue.png'
  },
  {
    url: 'imgs/iphone12 mini/iphone-12-mini-white.png'
  },
  {
    url: 'imgs/iphone12 mini/iphone-12-mini-black.png'
  },
  {
    url: 'imgs/iphone12 mini/iphone-12-mini-red.png'
  },
  {
    url: 'imgs/iphone12/iphone-12-green.png',
  },
  {
    url: 'imgs/iphone12/iphone-12-purple.png',
  },
  {
    url: 'imgs/iphone12/iphone-12-blue.png',
  },
  {
    url: 'imgs/iphone12/iphone-12-white.png',
  }, 
  {
    url: 'imgs/iphone12/iphone-12-black.png',
  }, 
  {
    url: 'imgs/iphone12/iphone-12-red.png',
  },
  {
    url: 'imgs/iphone11/iphone11-green.png',
  },
  {
    url: 'imgs/iphone11/iphone11-purple.png',
  },
  {
    url: 'imgs/iphone11/iphone11-yellow.png',
  },    
  {
    url: 'imgs/iphone11/iphone11-white.png',
  }, 
  {
    url: 'imgs/iphone11/iphone11-black.png',
  }, 
  {
    url: 'imgs/iphone11/iphone11-red.png',
  },
  {
    url: 'imgs/iPad Pro/ipad-pro-11-silver.jfif',
  },
  {
    url: 'imgs/iPad Pro/ipad-pro-11-spacegray.jfif',
  },
  {
    url: 'imgs/ipad pro12.9/ipad-pro-12-silver.jfif',
  },
  {
    url: 'imgs/ipad pro12.9/ipad-pro-12-spacegray.jfif',
  },  
  {
    url: 'imgs/ipad air/ipad-air-spacegray.png',
  },
  {
    url: 'imgs/ipad air/ipad-air-pink.png',
  },
  {
    url: 'imgs/ipad air/ipad-air-purple.png',
  },
  {
    url: 'imgs/ipad air/ipad-air-blue.png',
  },    
  {
    url: 'imgs/ipad air/ipad-air-starlight.png',
  },  
  {
    url: 'imgs/ipad/ipad-spacegray.png',
  },
  {
    url: 'imgs/ipad/ipad-silver.png',
  },      
  {
    url: 'imgs/ipad mini/ipad-mini-space-gray.png',
  },
  {
    url: 'imgs/ipad mini/ipad-mini-pink.png',
  },  
  {
    url: 'imgs/ipad mini/ipad-mini-purple.png',
  },  
  {
    url: 'imgs/ipad mini/ipad-mini-starlight.png',
  }, 
  {
    url: 'imgs/apple watch3/Apple Watch Series 3-white.png',
  },  
  {
    url: 'imgs/apple watch/Apple Watch Series 7-black.jfif',
  },
  {
    url: 'imgs/apple watch/Apple Watch Series 7-blue.jfif',
  },
  {
     url: 'imgs/apple watch/Apple Watch Series 7-bronzing.jfif',
  },
  {
     url: 'imgs/apple watch/Apple Watch Series 7-green.jfif',
  },
  {
     url: 'imgs/apple watch/Apple Watch Series 7-rainbow.jfif',
  },  
  {
     url: 'imgs/apple watch/Apple Watch Series 7-starlight.jfif',
  },    
  {
     url: 'imgs/apple watch/Apple Watch Series 7-red.jfif',
  },    
  {
    url: 'imgs/apple watch SE/Apple Watch SE-blue.jfif',
  },
  {
    url: 'imgs/apple watch SE/Apple Watch SE-green.jfif',
  },
  {
     url: 'imgs/apple watch SE/Apple Watch SE-leaf.jfif',
  },
  {
     url: 'imgs/apple watch SE/Apple Watch SE-pink.jfif',
  },
  {
     url: 'imgs/apple watch SE/Apple Watch SE-red.jfif',
  },  
  {
     url: 'imgs/apple watch SE/Apple Watch SE-white.jfif',
  },    
  {
     url: 'imgs/apple watch SE/Apple Watch SE-yellow.jfif',
  },  
  {
    url: 'imgs/apple watch nike/Apple Watch Nike-black.jfif',
  },
  {
    url: 'imgs/apple watch nike/Apple Watch Nike-blue.jfif',
  },
  {
     url: 'imgs/apple watch nike/Apple Watch Nike-brown.jfif',
  },
  {
     url: 'imgs/apple watch nike/Apple Watch Nike-pink.jfif',
  },
  {
     url: 'imgs/apple watch nike/Apple Watch Nike-white.jfif',
  },    
  {
  url: 'imgs/apple watch hermes/Apple Watch Hermes-black.jfif',
  },
  {
  url: 'imgs/apple watch hermes/Apple Watch Hermes-blue.jfif',
  },
  {
  url: 'imgs/apple watch hermes/Apple Watch Hermes-gold.jfif',
  },
  {
  url: 'imgs/apple watch hermes/Apple Watch Hermes-red.jfif',
  },
  {
  url: 'imgs/apple watch hermes/Apple Watch Hermes-white.jfif',
  },     
  {
    url: 'imgs/AirPods2/AirPods.jfif',
  },    
  {
    url: 'imgs/AirPods3/AirPods.jfif',       
  },  
  {
    url: 'imgs/AirPods Pro/AirPods Pro.jfif',
  },  
  {
    url: 'imgs/AirPods Max/AirPods Max.png',
  },  
  {
    url: 'imgs/Apple TV 4K/apple-tv-4k.jfif',
  },      
  {
    url: 'imgs/Apple TV HD/apple-tv-hd.jfif',
  },       
  {
    url: 'imgs/HomePod mini/homepod-mini.jfif',
  },    
  {
    url: 'imgs/AirTag/airtag.jfif',
  }
]

const productEntry = [
  {
    bananaproductId: 1,
    colorId: 1,
    imgurlId: 1
  },
  {
    bananaproductId: 1,
    colorId: 2,
    imgurlId: 2
  },  
  {
    bananaproductId: 1,
    colorId: 3,
    imgurlId: 3
  },   
  {
    bananaproductId: 2,
    colorId: 1,
    imgurlId: 4
  },
  {
    bananaproductId: 2,
    colorId: 2,
    imgurlId: 5
  },   
  {
    bananaproductId: 3,
    colorId: 1,
    imgurlId: 6
  },      
  {
    bananaproductId: 3,
    colorId: 2,
    imgurlId: 7
  },
  {
    bananaproductId: 4,
    colorId: 1,
    imgurlId: 8
  },  
  {
    bananaproductId: 4,
    colorId: 2,
    imgurlId: 9
  },
  {
    bananaproductId: 5,
    colorId: 4 ,
    imgurlId: 10
  },       
  {
    bananaproductId: 5,
    colorId: 5,
    imgurlId: 11
  },  
  {
    bananaproductId: 5,
    colorId: 6,
    imgurlId: 12
  }, 
  {
    bananaproductId: 5,
    colorId: 10,
    imgurlId: 13
  }, 
  {
    bananaproductId: 5,
    colorId: 8,
    imgurlId: 14
  }, 

  {
    bananaproductId: 6,
    colorId: 9,
    imgurlId: 15
  },
  {
    bananaproductId: 6,
    colorId: 6,
    imgurlId: 16
  }, 
  {
    bananaproductId: 6,
    colorId: 10,
    imgurlId: 17
  },  
  {
    bananaproductId: 6,
    colorId: 8,
    imgurlId: 18
  },
  {
    bananaproductId: 7,
    colorId: 11,
    imgurlId: 19
  },
  {
    bananaproductId: 7,
    colorId: 12,
    imgurlId: 20
  },  
  {
    bananaproductId: 7,
    colorId: 13,
    imgurlId: 21
  },   
  {
    bananaproductId: 7,
    colorId: 14,
    imgurlId: 22
  },  
  {
    bananaproductId: 7,
    colorId: 15,
    imgurlId: 23
  },   
  {
    bananaproductId: 7,
    colorId: 7,
    imgurlId: 24
  },                      
  {
    bananaproductId: 8,
    colorId: 11,
    imgurlId: 25
  }, 
  {
    bananaproductId: 8,
    colorId: 12,
    imgurlId: 26
  }, 
  {
    bananaproductId: 8,
    colorId: 13,
    imgurlId: 27
  },  
  {
    bananaproductId: 8,
    colorId: 14,
    imgurlId: 28
  },  
  {
    bananaproductId: 8,
    colorId: 15,
    imgurlId: 29
  },  
  {
    bananaproductId: 8,
    colorId: 7,
    imgurlId: 30
  },     
  {
    bananaproductId: 9,
    colorId: 16,
    imgurlId: 31
  }, 
  {
    bananaproductId: 9,
    colorId: 17,
    imgurlId: 32
  }, 
  {
    bananaproductId: 9,
    colorId: 18,
    imgurlId: 33
  }, 

  {
    bananaproductId: 10,
    colorId: 19,
    imgurlId: 34
  },  
  {
    bananaproductId: 10,
    colorId: 20,
    imgurlId: 35
  },  
  {
    bananaproductId: 10,
    colorId: 21,
    imgurlId: 36
  },  
  {
    bananaproductId: 10,
    colorId: 22,
    imgurlId: 37
  },  
  {
    bananaproductId: 10,
    colorId: 23,
    imgurlId: 38
  },  
  {
    bananaproductId: 10,
    colorId: 24,
    imgurlId: 39
  },        
  {
    bananaproductId: 11,
    colorId: 19,
    imgurlId: 40
  }, 
  {
    bananaproductId: 11,
    colorId: 20,
    imgurlId: 41
  }, 
  {
    bananaproductId: 11,
    colorId: 21,
    imgurlId: 42
  }, 
  {
    bananaproductId: 11,
    colorId: 22,
    imgurlId: 43
  }, 
  {
    bananaproductId: 11,
    colorId: 23,
    imgurlId: 44
  },  
  {
    bananaproductId: 11,
    colorId: 24,
    imgurlId: 45
  },    

  {
    bananaproductId: 12,
    colorId: 19,
    imgurlId: 46
  },  
  {
    bananaproductId: 12,
    colorId: 20,
    imgurlId: 47
  },  
  {
    bananaproductId: 12,
    colorId: 25,
    imgurlId: 48
  },  
  {
    bananaproductId: 12,
    colorId: 22,
    imgurlId: 49
  },  
  {
    bananaproductId: 12,
    colorId: 23,
    imgurlId: 50
  },  
  {
    bananaproductId: 12,
    colorId: 24,
    imgurlId: 51
  },      
  {
    bananaproductId: 13,
    colorId: 1,
    imgurlId: 52
  }, 
  {
    bananaproductId: 13,
    colorId: 26,
    imgurlId: 53
  }, 

  {
    bananaproductId: 14,
    colorId: 1,
    imgurlId: 54
  },
  {
    bananaproductId: 14,
    colorId: 26,
    imgurlId: 55
  },
  {
    bananaproductId: 15,
    colorId: 27,
    imgurlId: 56
  }, 
  {
    bananaproductId: 15,
    colorId: 28,
    imgurlId: 57
  }, 
  {
    bananaproductId: 15,
    colorId: 29,
    imgurlId: 58
  }, 
  {
    bananaproductId: 15,
    colorId: 30,
    imgurlId: 59
  }, 
  {
    bananaproductId: 15,
    colorId: 17,
    imgurlId: 60
  },     
  {
    bananaproductId: 16,
    colorId: 31,
    imgurlId: 61
  }, 
  {
    bananaproductId: 16,
    colorId: 32,
    imgurlId: 62
  },   
  {
    bananaproductId: 17,
    colorId: 33,
    imgurlId: 63
  },  
  {
    bananaproductId: 17,
    colorId: 34,
    imgurlId: 64
  },  
  {
    bananaproductId: 17,
    colorId: 35,
    imgurlId: 65
  },  
  {
    bananaproductId: 17,
    colorId: 36,
    imgurlId: 66
  },   
  {
    bananaproductId: 18,
    colorId: 37,
    imgurlId: 67
  }, 
  {
    bananaproductId: 19,
    colorId: 38,
    imgurlId: 68
  },   
  {
    bananaproductId: 19,
    colorId: 37,
    imgurlId: 69
  },  
  {
    bananaproductId: 19,
    colorId: 39,
    imgurlId: 70
  },  
  {
    bananaproductId: 19,
    colorId: 40,
    imgurlId: 71
  },  
  {
    bananaproductId: 19,
    colorId: 41,
    imgurlId: 72
  },  
  {
    bananaproductId: 19,
    colorId: 42,
    imgurlId: 73
  },  
  {
    bananaproductId: 19,
    colorId: 43,
    imgurlId: 74
  }, 
  {
    bananaproductId: 20,
    colorId: 37,
    imgurlId: 75
  },   
  {
    bananaproductId: 20,
    colorId: 44,
    imgurlId: 76
  },  
  {
    bananaproductId: 20,
    colorId: 45,
    imgurlId: 77
  },  
  {
    bananaproductId: 20,
    colorId: 46,
    imgurlId: 78
  },  
  {
    bananaproductId: 20,
    colorId: 43,
    imgurlId: 79
  },  
  {
    bananaproductId: 20,
    colorId: 47,
    imgurlId: 80
  },  
  {
    bananaproductId: 20,
    colorId: 48,
    imgurlId: 81
  },          
  {
    bananaproductId: 21,
    colorId: 38,
    imgurlId: 82
  }, 
  {
    bananaproductId: 21,
    colorId: 37,
    imgurlId: 83
  }, 
  {
    bananaproductId: 21,
    colorId: 49,
    imgurlId: 84
  }, 
  {
    bananaproductId: 21,
    colorId: 50,
    imgurlId: 85
  }, 
  {
    bananaproductId: 21,
    colorId: 51,
    imgurlId: 86
  }, 

  {
    bananaproductId: 22,
    colorId: 38,
    imgurlId: 87
  },
  {
    bananaproductId: 22,
    colorId: 52,
    imgurlId: 88
  },
  {
    bananaproductId: 22,
    colorId: 53,
    imgurlId: 89
  },
  {
    bananaproductId: 22,
    colorId: 54,
    imgurlId: 90
  }, 
  {
    bananaproductId: 22,
    colorId: 55,
    imgurlId: 91
  },   
  {
    bananaproductId: 23,
    colorId: 56,
    imgurlId: 92
  }, 
  {
    bananaproductId: 24,
    colorId: 56,
    imgurlId: 93
  }, 
  {
    bananaproductId: 25,
    colorId: 56,
    imgurlId: 94
  },
  {
    bananaproductId: 26,
    colorId: 57,
    imgurlId: 95
  }, 
  {
    bananaproductId: 27,
    colorId: 57,
    imgurlId: 96
  },    
  {
    bananaproductId: 28,
    colorId: 57,
    imgurlId: 97
  },    
  {
    bananaproductId: 29,
    colorId: 57,
    imgurlId: 98
  },   
  {
    bananaproductId: 30,
    colorId: 58,
    imgurlId: 99
  },   
]

