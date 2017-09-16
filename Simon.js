
var Simon={
	steparr:[],
	step:0,
	peoplearr:[],
	isOpen:false,
	isStrict:false,
	islock:true,
}
//随机生成游戏步骤
function creatstep(){
	var arr=[];
	for (var i = 0; i < 20; i++) {
		arr.push(parseInt(Math.random()*4+1));
		//console.log(arr.length);
	}
	Simon.steparr=arr;
}
//开关
$("#switch div").click(function toswitch(){
   if(Simon.isOpen){
   	$("#open").css("backgroundColor","black");
   	$("#close").css("backgroundColor","blue");
   	Simon={
	    steparr:[],
	    step:0,
	    peoplearr:[],
	    isOpen:false,
	    isStrict:false,
	    islock:true,
        }
    $("#dot").css("backgroundColor","black");
   	$("#count div").text("");
    }else{
	console.log(1);

   	$("#open").css("backgroundColor","blue");
   	$("#close").css("backgroundColor","black");
    Simon.isOpen=true;
   	$("#count div").text("--");

   }
});

//开始游戏
function start(){
    creatstep();
	Simon.peoplearr=[];
	Simon.step=0;
    Simon.islock=true;
    $("#count div").text("--");
    setTimeout(function(){
    if (Simon.isOpen) {
	stepn();
	}},1000);
}
$("#click1").click(function(){
        if (Simon.isOpen) {
           start();
        }
    });
//游戏某一步
function stepn(){
    $("#count div").text(Simon.step+1);
	tolight(Simon.steparr.slice(0,Simon.step+1));
}
//演示某步顺序
function tolight(arr){
	Simon.islock=true;
    var i=0;
    var a=setInterval(function(){
    switch(arr[i]){
    	case 1:$("#lt").fadeTo("slow",0.3,con(0)).fadeTo("slow",1);break;
    	case 2:$("#rt").fadeTo("slow",0.3,con(1)).fadeTo("slow",1);break;
    	case 3:$("#lb").fadeTo("slow",0.3,con(2)).fadeTo("slow",1);break;
    	case 4:$("#rb").fadeTo("slow",0.3,con(3)).fadeTo("slow",1);break;
    }
    i++;
    if (i==arr.length||Simon.isOpen==false) {
    	clearInterval(a);
	    setTimeout(function(){
            if (Simon.isOpen) {
	    	Simon.islock=false;
	    	console.log(123);}},1500);
            
    }
    },2000);
}
//开关点击锁

$("#lt").click(function(){people(1);});
$("#rt").click(function(){people(2);});
$("#lb").click(function(){people(3);});
$("#rb").click(function(){people(4);})
//开启严格模式
$("#click2").click(function(){
	if (Simon.isOpen) {
    if (!Simon.isStrict) {
       $("#dot").css("backgroundColor","red");
       Simon.isStrict=true;
    }else{
    	$("#dot").css("backgroundColor","black");
       Simon.isStrict=false;
    }
    }
});
//获得输入
function people(n){
	if (!Simon.islock) {
	console.log(n);
	switch(n){
    	case 1:$("#lt").fadeTo("fast",0.3,con(0)).fadeTo("fast",1);break;
    	case 2:$("#rt").fadeTo("fast",0.3,con(1)).fadeTo("fast",1);break;
    	case 3:$("#lb").fadeTo("fast",0.3,con(2)).fadeTo("fast",1);break;
    	case 4:$("#rb").fadeTo("fast",0.3,con(3)).fadeTo("fast",1);break;
    }
    Simon.peoplearr.push(n);
    charge();
    }
}

//判断
function charge(){
	for (var i = 0; i < Simon.peoplearr.length; i++) {
		if(Simon.peoplearr[i]===Simon.steparr[i]){
            if (i===Simon.step) {
               Simon.step=Simon.step+1;
	           Simon.peoplearr=[];

               console.log(Simon.step);
              
            if (Simon.isOpen) {
	    	stepn();
	    	}
    	       return;
            }
		}else{
			Simon.isStrict?allretry():retry();
		}
	}
}
//失误重启
function allretry(){
	creatstep();
	//console.log(Simon.steparr+":");
	Simon.peoplearr=[];
	Simon.step=0;
    Simon.islock=true;
    $("#count div").text("!!");
    con(0);
    con(1);
    con(2);
    con(3);
    setTimeout(function(){
    if (Simon.isOpen) {
	stepn();
	}},1500);
    
}
function retry(){
	Simon.peoplearr=[];
	Simon.islock=true;
    $("#count div").text("!!");
    con(0);
    con(1);
    con(2);
    con(3);
    setTimeout(function(){
    if (Simon.isOpen) {
	stepn();
	}},1500);
    
}
//声音
function con(n){
    $(".sound")[n].play();
}
//运行
