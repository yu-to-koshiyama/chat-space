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
  function appendNoUser() {
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>
                `;
    user_list.append(html);
  }

  function addChatMember(name, id) {
    let html = `
                  <div class="ChatMember">
                    <p class="ChatMember__name">${name}</p>
                    <input name="group[user_ids][]" type="hidden" value=${id} />
                    <div class="ChatMember__remove ChatMember__button">削除</div>
                  </div>
                  `;
    $(".ChatMembers").append(html)
  };

  $('#UserSearch__field').on('keyup', function (e) {
    e.preventDefault()
    let input = $('#UserSearch__field').val();
    $.ajax({
      url: "/users",
      type: "GET",
      data: { keyword: input },
      dataType: 'json'
    })
      .done(function (users) {
        user_list.empty();
        if (users.length !== 0) {
          users.forEach(function (user) {
            appendUser(user);
          })
        } else if (users.length == 0) {
          return false;
        } else {
          appendNoUser();
        }
      })
      .fail(function () {
        alert("通信エラーです。ユーザーが表示できません");
      })
  });
  $("#UserSearchResult").on('click', ".ChatMember__add", function (e) {
    $(this).parent("div").remove();
    const user_id = $(this).data('user-id');
    const user_name = $(this).data('user-name');
    addChatMember(user_name, user_id);
  });
  $(".ChatMembers").on('click', ".ChatMember__remove", function (e) {
    $(this).parent("div").remove();
  });
});