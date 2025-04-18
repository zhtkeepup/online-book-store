


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


// import sensors from '@/app/sa-sdk-javascript-1.27.1/sensorsdata.min';
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
  
  console.log("当前浏览器地址,location.href:", location.href);
  // 注册公共属性
  sensors.registerPage({
    current_url: location.href,
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

