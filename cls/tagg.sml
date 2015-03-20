- extends ./tag.sml   
    
    - block for    
      !div(id="id" class="cls") Code test for
        - var users = it.users;
        - if(users && users.length)
          !table
            - for(var i = 0, l = users.length; i < l; i++)
              - var user = users[i];
              !tr
                !td 名字：!{user.name}
                  ！这是一名神奇的少年
                  ！这其实是一个测试
                !td 年龄：!{user.age}
                  ！这是一名神奇的少年
                  ！这其实是一个测试
                  中国的惊叹号和外国的是不一样的。
    - block if   
      !div (id="if")code test if
        -var ifcase = it.deep0.deep1.deep2.ifcase;
        - var elseifcase0 = it[elseifcase0];
        - var ifresult = it.ifresult;
        - var elseifresult0 = it.elseifresult0;
        - if(ifcase)
          !p !{ifresult} 我是if的结果
            这里再弄点文字什么的
            这其实还是一个测试
          !div div也是可以的吧
        - else if(elseifcase0)
          !p 这是一个转义的结果 #{elseifresult0} 我们来让结果转个义
        - else if(it.elseifcase1)
          !p 这是是没有转义的结果 !{elseifresult0} 我们来不让结果转个义
        - else
          !p 终于到else 请大家注意，javascript语法的正确性保证要靠自己，所有语句将原封不动的替换到编译后的函数中去
    - block forin
      !div(id="forin") code test for in
        - var forin = it.forin;
        !ul
          - for(var name in forin)
            !li 名称：!{name}   值：!{forin[name]}
   // - block while
      //!div(id="while") code test while
        //- var i = 0;
        //- while(i < it.whilecase.length)
          //!p 这里是while测试 !{it.whilecase[i].name}这里是while测试的年龄 !{it.whilecase[i].age} 
         // - i++;
    - block switch
      !div(id="switch") code test switch
        - switch(it.switch)
          - case 0:
          - case 1:
          - case 3:
            !p 这里是switch测试 0 1 3
          - default:
            !p 这里是switch测试 default