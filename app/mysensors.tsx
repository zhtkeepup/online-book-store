


/*
<script charset="UTF-8" src="请输入下载的 SDK 源码地址，如果不清楚请联系值班同学"></script>
<script charset="UTF-8">
var sensors = window['sensorsDataAnalytic201505'];
sensors.init({
  server_url: 'https://dsjyxdata.ctbu.edu.cn/sa',
  heatmap:{scroll_notice_map:'not_collect'},
  is_track_single_page:true,
  use_client_time:true,
  send_type:'beacon'    
});
sensors.quick('autoTrack');
</script>
*/


import { useEffect } from "react";


/* eslint-disable @typescript-eslint/no-explicit-any */
export let sensors: any = {};


export function Sensors() {
  useEffect(()=>{

    import("sa-sdk-javascript").then((impsensors)=>{
      sensors = impsensors;

      sensorsInit();

    });

  
  },[]);

  return (
    <></>
  )
}


export function sensorsInit() {
  console.log("sensorsInit xxxxxxxxxxxxxxxxxxxxxxxx--1");
  sensors.init({
    // server_url: 'http://sa.jialve.cn:8106/sa?project=demoTest8',
    // server_url: 'https://dsjyxdata.ctbu.edu.cn/sa?project=default',
    server_url: 'https://dsjyxdata.ctbu.edu.cn/sa',
    
    // is_track_single_page:true, // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
  
    heatmap:{
      //是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
      clickmap:"default",
      //是否开启触达图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
      scroll_notice_map:'default'
      },
    use_client_time:true,
    send_type:'beacon',
    show_log:true,
  });

  console.log("sensorsInit xxxxxxxxxxxxxxxxxxxxxxxx--2");
  let myurl = "localhost:3333";
  try {
    myurl = location.href;
  } catch (err11) {

  }
  
  console.log("当前浏览器地址,location.href:", myurl);
  // 注册公共属性
  sensors.registerPage({
    current_url: myurl,
    referrer: document.referrer
  });
  
  
  sensors.quick('autoTrack',{platform:'h5'});
}



export function sensorsLogin(userId:string) {
    sensors.login(userId);
}

export function sensorsTrack(eventName:string, trackProps:any) {
    console.log("sensors.track:", eventName, trackProps);
    sensors.track(eventName, trackProps)
}


export function sensorsSetKeyValue(kv:{}){
    sensors.setProfile(kv);
}

// export function sensorsSetItem() {
//     sensors.setItem();
// }





const sleep = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));
const autoBoot = {runnning: false};
async function gogogo() {

  if(autoBoot.runnning) {
    return;
  } else {
    autoBoot.runnning = true;
  }

  console.log(`******************************gogogogoog.................`);

  let xxx = 0;
  while (true) {
    try {
      // 生成 1-120 分的随机休眠时间
      let delay = Math.floor(Math.random() * 120 + 1) * 1000 * 60;
      console.log("(`******************************gogogo delay:", 1.0*delay/1000/60, "分");
      // delay = delay/60/10;  // 测试先除以60. 正式时注释掉。
      await sleep(delay);

      for(var i=0; i<100; i++) {
        let username = "userAuto" + i;
              // 输出当前时间
        const timestamp = new Date().toISOString();
        console.log(`******************************[自动用户 ${username}] ${timestamp}`);
        // 100%生成登录日志
        sensorsLogin(""+username);
        sensorsTrack("Login", {name:"登录",LoginUsername: username});
      
        
        if(i>80) {
          sensorsSetKeyValue({Age: 90});
          sensorsSetKeyValue({City:"成都市"});
        } else {
          sensorsSetKeyValue({Age: i+10});
          sensorsSetKeyValue({City:"重庆市"});
        }
          
        let cc = username.charAt(username.length-1);
        if(cc.charCodeAt(0) % 3 === 0) {
          sensorsSetKeyValue({Sex:"男"});
        } else {
          sensorsSetKeyValue({Sex:"女"});
        }

        if(cc.charCodeAt(0) % 4 === 0) {
          sensorsSetKeyValue({County:"大渡口区"});
        } else if(cc.charCodeAt(0) % 3 === 1) {
          sensorsSetKeyValue({County:"渝中区"});
        } else if(cc.charCodeAt(0) % 5 === 1) {
          sensorsSetKeyValue({County:"南岸区"});
        } else {
          sensorsSetKeyValue({County:"江北区"});
        }

        // 90%添加购物车
        if(Math.random()<0.9) {
          console.log(`******************************[${username}] 添加购物车}`);
          await sleep(5000);

          let rrr = Math.random()
          if(cc.charCodeAt(0) % 4 >= 0) {
            let prc = 69.99;
            sensorsTrack("AddToCart",{name:"加入购物车", bookId:1, bookName:"了不起的盖茨比", UserName:username, price:prc});
            if(rrr < 0.6) {
              // 加入购物车后60%会结算.
              await sleep(5000);
              sensorsTrack("Payment", {name:"支付",bookId:[1], TotalPrice: prc.toFixed(2),TotalPriceNum: prc});
            }
          } else if(cc.charCodeAt(0) % 4 >= 1) {
            let prc = 89.99;
            sensorsTrack("AddToCart",{name:"加入购物车", bookId:2, bookName:"杀死一只知更鸟", UserName:username, price:prc});
            if(rrr < 0.6) {
              // 加入购物车后60%会结算.
              await sleep(5000);
              sensorsTrack("Payment", {name:"支付",bookId:[2], TotalPrice: prc.toFixed(2),TotalPriceNum: prc});
            }
          } else if(cc.charCodeAt(0) % 4 >= 2) {
            let prc = 79.99;
            sensorsTrack("AddToCart",{name:"加入购物车", bookId:3, bookName:"一九八四", UserName:username, price:prc});
            if(rrr < 0.6) {
              // 加入购物车后60%会结算.
              await sleep(5000);
              sensorsTrack("Payment", {name:"支付",bookId:[3], TotalPrice: prc.toFixed(2),TotalPriceNum: prc});
            }
          } else if(cc.charCodeAt(0) % 4 >= 3) {
            let prc = 59.99;
            sensorsTrack("AddToCart",{name:"加入购物车", bookId:4, bookName:"傲慢与偏见", UserName:username, price:prc});
            if(rrr < 0.6) {
              // 加入购物车后60%会结算.
              await sleep(5000);
              sensorsTrack("Payment", {name:"支付",bookId:[4], TotalPrice: prc.toFixed(2),TotalPriceNum: prc});
            }
          }
        } else {
          console.log(`******************************[${username}] 不添加购物车}`);
        }
      }
      

    } catch (err) {
      console.error(`******************************11[错误处理] ${err} (${new Date().toISOString()})`);
      try {

        console.log("xxxxxxxxxxxxxxxxxxxxxxxx--12222222222444442");
      } catch (rrrr) {
        
        console.log("xxxxxxxxxxxxxxxxxxxxxxxx--12222222222222222");
      }
      
    }

    xxx +=1;
    if(xxx>3) {
      break;
    }
  }


}

gogogo();
