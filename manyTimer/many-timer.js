/**
 * Created by chenxh on 2018/9/7.
 */
var manyTimers = {
    "runingTimer":null,
    "runingTimerName":"",
    "maxRunCounter":100,
    "counter":1,
    "counterRunTimer":null,
    "options":{
        "shutdownCounter":1000
    },
    "init":function(options){
        this.options = this.mergeData(this.options,options);
        this.maxRunCounter = this.options.timers[this.options.timers.length-1].range[1];
        this.runCounter();
    },
    "runCounter":function(){
        var _this = this;
        this.counterRunTimer = setInterval(function(){

            if(_this.counter > _this.maxRunCounter && _this.runingTimer){
                //console.log('clear Runing');
                _this.clearTimer(_this.runingTimer);
                _this.runingTimer = null;
            }else{
                _this.selectTimer();
            }

            if(_this.counter>_this.options.shutdownCounter){
                _this.stopCounter();
                _this.clearTimer(_this.runingTimer);
            }
            _this.counter++;

        },1000);
    },
    "selectTimer":function(){
        var len = this.options.timers.length;
        if(len<=0){
            return false;
        }
        //var _this = this;
        for(var i=0;i<len;i++){
            var theTimer = this.options.timers[i];
            if(this.counter >= theTimer.range[0]
                && this.counter <= theTimer.range[1]
                && theTimer.name != this.runingTimerName){

                this.clearTimer(this.runingTimer);
                this.removeTimerOption();

                this.runingTimerName = theTimer.name;

                //
                theTimer.do_func && theTimer.do_func();

                this.runingTimer = setInterval(function(){
                    theTimer.do_func && theTimer.do_func();
                },theTimer.step);

                //
                break;
            }
        }
    },

    "removeTimerOption":function(){
        this.options.timers.shift();
    },
    "stopCounter":function(){
        //console.log('stopCounter:'+this.counter);
        this.clearTimer(this.counterRunTimer);
    },
    "clearTimer":function(timer){
        clearInterval(timer);
    },
    "mergeData":function(data,inputData){
        for(var inputd in inputData){
            data[inputd] = inputData[inputd]
        }
        return data;
    }


};