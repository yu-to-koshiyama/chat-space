$(function () {
  function buildHTML(message) {
    if (message.image.url) {
      let html = `<div class="message-box" data-message-id=${message.id}>
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
                    </div>`;
      return html;
    } else {
      let html = `<div class="message-box" data-message-id=${message.id}>
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
                    </div>`;
      return html;
    }
  }

  let reloadMessages = function () {
    let last_message_id = $(".message-box:last").data("message-id");
    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: "json",
      data: { id: last_message_id }
    })
      .done(function (messages) {
        if (messages.length !== 0) {
          let insertHTML = "";
          $.each(messages, function (i, message) {
            insertHTML += buildHTML(message);
          });
          $(".main-bar__message-list").append(insertHTML);
          $(".main-bar__message-list").animate({
            scrollTop: $(".main-bar__message-list")[0].scrollHeight,
          });
        }
      })
      .fail(function () {
        alert("error");
      });
  };
  setInterval(reloadMessages, 7000);
});
