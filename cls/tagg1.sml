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

