var __sml__runtime = require("runtime");
function __sml__class(){}

__sml__class.prototype.render = function(it){
  it = it || {};
  var __sml__out = "<!DOCTYPE html><html><head><title>" + ((it.title || typeof it.title === "boolean") ? it.title : "") + "</title><meta charset='utf-8'>";
      var css = 'style.css';
      var js = 'main.js';
      __sml__out += "<link href='" + ((css || typeof css === "boolean") ? css : "") + "' type='text/css' rel='stylesheet'>";
      js = 'part.js';
      __sml__out += "<script href='" + ((js || typeof js === "boolean") ? __sml__runtime.escape(js) : "") + "' type='text/javascript'></script></head><body><div class='cls'><p>这里是外部变量无转义测试 " + ((it.unescaped || typeof it.unescaped === "boolean") ? it.unescaped : "") + " 测试的屁股</p><p>这里是外部变量转义测试 " + ((it.escaped || typeof it.escaped === "boolean") ? __sml__runtime.escape(it.escaped) : "") + " </p><p>" + ((it.unescaped || typeof it.unescaped === "boolean") ? it.unescaped : "") + "</p><p>" + ((it.escaped || typeof it.escaped === "boolean") ? __sml__runtime.escape(it.escaped) : "") + "</p><p>这里是文本测试我们这么大的国家，这么众多的人口，是不可能依附其他国家生存的。那些妄想可以通过外部力量来实现自己利益的人，必将输掉全部。很多人已经印证了这点，很多国家已经印证了这点。我们维护这个国家的利益，其实就是维护自己的利益。当国家混乱的时候，个人怎么可能独善其身？爱国者不仅仅是理想主义者，更是彻头彻尾的现实主义者，因为我们清楚的知道自身的利益所在。国家命运和个人命运其实是一体的。推荐好文<a href='http://blog.sina.com.cn/s/blog_48a082b70101bkcw.html'>《不要辜负我们的时代》</a><a href='http://blog.sina.com.cn/s/blog_48a082b70101hevy.html'>《少年，你真的了解这个国家吗？》</a><a href='http://tieba.baidu.com/p/1521337772'>《我们的征途是星辰大海》<span>在任何时候，我们都不应该辜负这个国家，这个民族，这个时代。实现国家民族的复兴，这是我们与生俱来的历史使命，我们责无旁贷。</span></a></p><p><span><span><span><span><span><span>够深吧，这也是个测试</span></span></span></span></span></span></p></div>" + this.blockfor(it) + this.blockif(it) + this.blockforin(it) + this.blockwhile(it) + this.blockswitch(it) + "</body></html>";
  return __sml__out;
};

__sml__class.prototype.blockfor = function(it){
  var __sml__out = "<div id='id' class='cls'>Code test for</div>";
  return __sml__out;
};

__sml__class.prototype.blockif = function(it){
  var __sml__out = "<div id='if'>code test if</div>";
  return __sml__out;
};

__sml__class.prototype.blockforin = function(it){
  var __sml__out = "<div id='forin'>code test for in</div>";
  return __sml__out;
};

__sml__class.prototype.blockwhile = function(it){
  var __sml__out = "<div id='while'>code test while";
    var i = 0;
    while(i < it.whilecase.length){
      __sml__out += "<p>这里是while测试 " + ((it.whilecase[i].name || typeof it.whilecase[i].name === "boolean") ? it.whilecase[i].name : "") + "这里是while测试的年龄 " + ((it.whilecase[i].age || typeof it.whilecase[i].age === "boolean") ? it.whilecase[i].age : "") + " </p>";
      i++;
    }
  __sml__out += "</div>";
  return __sml__out;
};

__sml__class.prototype.blockswitch = function(it){
  var __sml__out = "<div id='switch'>code test switch</div>";
  return __sml__out;
};

exports.getClass = function(){
  return __sml__class;
};

var __sml__instance = new __sml__class();
exports.render = function(data){
  return __sml__instance.render(data);
};