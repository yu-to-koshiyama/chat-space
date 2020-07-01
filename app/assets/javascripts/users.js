$(function () {
  let user_list = $("#UserSearchResult");

  function appendUser(user) {
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>
                `;
    user_list.append(html);
  }
  function appendErrMsgToHTML() {
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>
                `;
    user_list.append(html);
  }

  $('#UserSearch__field').on('keyup', function (e) {
    e.preventDefault()
    let input = $('#UserSearch__field').val();
    console.log(input)
    $.ajax({
      url: "/users",
      type: "GET",
      data: { keyword: input },
      dataType: 'json'
    })
      .done(function (users) {
        $("#UserSearchResult").empty()
        if (users.length !== 0) {
          users.foreach(function (user) {
            appendUser(user);
          })
        } else {
          appendErrMsgToHTML();
        }
        console.log("成功です");
      })
      .fail(function () {
        console.log("失敗です");
      })
  });
});