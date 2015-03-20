module.exports = function(it){it = it || {}; var __sml__out = "";__sml__out += "<!DOCTYPE html>";

__sml__out += "<html>";
  __sml__out += "<head>";
  
    // comment
    __sml__out += "<title>" + it.title + "</title>";
    __sml__out += "<meta charset='utf-8'>";
    var css = 'style.css';
    var js = 'main.js';
    //非转义内部变量 !{css}
    __sml__out += "<link href='" + css + "' type='text/css' rel='stylesheet'>";
    
    //   转义内部变量 #{js}
    js = 'part.js';
    __sml__out += "<script href='" + __sml__escape(js) + "' type='text/javascript'></script>";__sml__out += "</head>";
    
  __sml__out += "<body>";
    __sml__out += "<div class='cls'>";
      __sml__out += "<p>这里是外部变量无转义测试 " + it.unescaped + " 测试的屁股</p>";
      __sml__out += "<p>这里是外部变量转义测试 " + __sml__escape(it.escaped) + " </p>";
      __sml__out += "<p>" + it.unescaped + "</p>";
      __sml__out += "<p>" + __sml__escape(it.escaped) + "</p>";
      __sml__out += "<p>这里是文本测试";
      
        __sml__out += "我们这么大的国家，这么众多的人口，是不可能依附其他国家生存的。";
        __sml__out += "那些妄想可以通过外部力量来实现自己利益的人，必将输掉全部。";
        __sml__out += "很多人已经印证了这点，很多国家已经印证了这点。";
        
        __sml__out += "我们维护这个国家的利益，其实就是维护自己的利益。";
        __sml__out += "当国家混乱的时候，个人怎么可能独善其身？";
        __sml__out += "爱国者不仅仅是理想主义者，更是彻头彻尾的现实主义者，因为我们清楚的知道自身的利益所在。";
        __sml__out += "国家命运和个人命运其实是一体的。";

        __sml__out += "推荐好文";
        __sml__out += "<a href='http://blog.sina.com.cn/s/blog_48a082b70101bkcw.html'>《不要辜负我们的时代》</a>";
        __sml__out += "<a href='http://blog.sina.com.cn/s/blog_48a082b70101hevy.html'>《少年，你真的了解这个国家吗？》</a>";
        __sml__out += "<a href='http://tieba.baidu.com/p/1521337772'>《我们的征途是星辰大海》";
          __sml__out += "<span>在任何时候，我们都不应该辜负这个国家，这个民族，这个时代。实现国家民族的复兴，这是我们与生俱来的历史使命，我们责无旁贷。</span>";__sml__out += "</a></p>";
      __sml__out += "<p>";
        __sml__out += "<span>";
          __sml__out += "<span>";
            __sml__out += "<span>";
              __sml__out += "<span>";
                __sml__out += "<span>";
                  __sml__out += "<span>够深吧，这也是个测试</span>";__sml__out += "</span></span></span></span></span></p></div>";
                  
                  
                  
            
            
            
            // 其实上面的空行也是测试 里面是有玄机的 主要测试空行不按照缩进来写的后果 后果很严重
         // 这一行是注释的测试 注释和空行可以不严格按照缩进来写 
       // 这一行是注释的测试 注释和空行可以不严格按照缩进来写 
            
         
         
    __sml__out += "<div id='id' class='cls'>Code test for";
      var users = it.users;
      if(users && users.length){
        __sml__out += "<table>";
          for(var i = 0, l = users.length; i < l; i++){
            var user = users[i];
            __sml__out += "<tr>";
              __sml__out += "<td>名字：" + user.name + "";
                __sml__out += "！这是一名神奇的少年";
                __sml__out += "！这其实是一个测试";__sml__out += "</td>";
              __sml__out += "<td>年龄：" + user.age + "";
                __sml__out += "！这是一名神奇的少年";
                __sml__out += "！这其实是一个测试";
                __sml__out += "中国的惊叹号和外国的是不一样的。";__sml__out += "</td></tr>";}__sml__out += "</table>";}__sml__out += "</div>";
    __sml__out += "<div id='if'>code test if";
      var ifcase = it.deep0.deep1.deep2.ifcase;
      var elseifcase0 = it[elseifcase0];
      var ifresult = it.ifresult;
      var elseifresult0 = it.elseifresult0;
      if(ifcase){
        __sml__out += "<p>" + ifresult + " 我是if的结果";
          __sml__out += "这里再弄点文字什么的";
          __sml__out += "这其实还是一个测试";__sml__out += "</p>";
        __sml__out += "<div>div也是可以的吧</div>";}
      else if(elseifcase0){
        __sml__out += "<p>这是一个转义的结果 " + __sml__escape(elseifresult0) + " 我们来让结果转个义</p>";}
      else if(it.elseifcase1){
        __sml__out += "<p>这是是没有转义的结果 " + elseifresult0 + " 我们来不让结果转个义</p>";}
      else{
        __sml__out += "<p>终于到else 请大家注意，javascript语法的正确性保证要靠自己，所有语句将原封不动的替换到编译后的函数中去</p>";}__sml__out += "</div>";
    __sml__out += "<div id='forin'>code test for in";
      var forin = it.forin;
      __sml__out += "<ul>";
        for(var name in forin){
          __sml__out += "<li>名称：" + name + "   值：" + forin[name] + "</li>";}__sml__out += "</ul></div>";
    __sml__out += "<div id='while'>code test while";
      var i = 0;
      while(i < it.whilecase.length){
        __sml__out += "<p>这里是while测试 " + it.whilecase[i].name + "这里是while测试的年龄 " + it.whilecase[i].age + " </p>";
        i++;}__sml__out += "</div>";
    __sml__out += "<div id='switch'>code test switch";
      switch(it.switch){
        case 0:
        case 1:
        case 3:
          __sml__out += "<p>这里是switch测试 0 1 3</p>"; break;
        default:
          __sml__out += "<p>这里是switch测试 default</p>"; break;}__sml__out += "</div></body></html>";
          
        
      
function __sml__escape(content){
  if(!content) return ''; 
  if(typeof content !== 'string' || !(/[&<>"']/g.test(content))) return content; 
  return content.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
}

  return __sml__out;
};