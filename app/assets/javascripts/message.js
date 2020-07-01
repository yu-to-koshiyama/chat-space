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
      console.log(html)
      console.log("image")
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
      console.log(html)
      console.log("body")
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
        console.log(data);
        let html = buildHTML(data);
        $(".main-bar__message-list").append(html);
        $('form')[0].reset();
      })
  });
});