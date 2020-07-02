$(function () {
  let reloadMessages = function () {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_message_id = $('.message-box:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "./api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: { id: last_message_id }
    })
      .done(function (messages) {
        // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
        if (messages.length !== 0) {
          //追加するHTMLの入れ物を作る
          let insertHTML = '';
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          $.each(messages, function (i, message) {
            insertHTML += buildHTML(message)
          });
          //メッセージが入ったHTMLに、入れ物ごと追加
          $('.main-bar__message-list').append(insertHTML);
          $('.main-bar__message-list').animate({ scrollTop: $('.MessageField')[0].scrollHeight });

        }
      })
      .fail(function () {
        alert('error');
      });
  };
  setInterval(reloadMessages, 7000);
});
function buildHTML(message) {
  if (message.image.url) {
    let html =
      `<div class="message-box" data-message-id=${message.id}>
                              <div class="message-info">
                                <div class="message-info__user">
                                  ${message.user_name}
                                </div>
                                <div class="message-info__date">
                                  ${message.created_at}
                                </div>
                              </div>
                          <div class="message-body">
                              <p class="message__body">
                                ${message.body}
                              </p>
                              <img class="message__image" src="${message.image.url}">
                          </div>
                  </div>`
    return html;
  } else {
    let html =
      `<div class="message-box" data-message-id=${message.id}>
                    <div class="message-info">
                      <div class="message-info__user">
                        ${message.user_name}
                      </div>
                      <div class="message-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-body">
                      <p class="message__body">
                        ${message.body}
                      </p>
                    </div>
                  </div>`
    return html;
  };
}
$('.Form').on('submit', function (e) {
  e.preventDefault()
  let formData = new FormData(this);
  let url = $(this).attr('action');
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function (data) {
      let html = buildHTML(data);
      $(".main-bar__message-list").append(html);
      $('form')[0].reset();
      $('.main-bar__message-list').animate({ scrollTop: $('.main-bar__message-list')[0].scrollHeight });
    })
    .fail(function () {
      alert("メッセージ送信に失敗しました");
    }).always(function () {
      $(".Form__submit").prop('disabled', false);
    });
});