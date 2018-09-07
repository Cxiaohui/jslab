####设计一个定时器，能设置多段执行频率

> 如：当计数器在[1,50]内每N秒执行

> [51,100]内每M秒执行

> ......

> 以此类推


> 配置数据如：
```javascript
var options = {
    "timers":[
        {"name":"timer1","range":[1,10],"step":1000,"do_func":function(counter){
            console.log('timer1:'+counter);
        } }   ,
        {"name":"timer2","range":[11,20],"step":2000,"do_func":function(counter){
            console.log('timer2:'+counter);
        } },
        {"name":"timer3","range":[21,30],"step":3000,"do_func":function(counter){
            console.log('timer3:'+counter);
        } }
    ],
    "shutdownCounter":31

};
```