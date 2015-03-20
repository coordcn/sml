!doctype
!html
  !head
    - block titile
      !titile titile
      !titile titile1
        !a a1
          !a a2
            -block t1
          -block t2
        -block t3
    !meta(charset="utf-8")
  !body
    !div test
      - block content1
        !div test1
        -block content2
        !div test2
          -block content3
            !div test3
              !div test33
              -block content4
              -block content5
                !div test5
                  !div test55
                    -block content6