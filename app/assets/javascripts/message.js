$(function () {
  function buildHTML(message) {
    if (message.image.url) {
      let html =
        `<div class="message-box">
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
        `<div class="message-box">
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
      // $(".Form__submit").always('submit', function () {
      //   $(this).prop('disabled', false)
      // })
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
});