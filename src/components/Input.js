import React from 'react';
import $ from 'jquery';

class Input extends React.Component {

  handleClick(e) {
    let sendOne = this.props.sendOne;
    let content = this.textarea.value;
    let name = $('.signIn').find('span').html();
    e.preventDefault();
    $.ajax({
      type: 'GET'
      , url: '/sendmessage'
      , data: {
        content: content
      }
      , success: (datas) => {
        if (datas.state === 'success') {
          console.log('成功了');
          console.log({
            from: {
              name: name
            }
            , meta: {createAt: new Date().getTime()}
            , content: content
          });
          sendOne({
            from: {
              name: name
            }
            , meta: {createAt: new Date().getTime()}
            , content: content
          })
        } else {
          console.log('获取数据失败，请稍后再试')
        }
      }
      , error: () => {
        console.log('连接失败，请稍后再试')
      }
    });
  }

  render() {
    return (
      <div className="chatInputBox">
        <div>
          <textarea name="chatMessage"
                    id="chatMessage"
                    cols="30"
                    rows="5"
                    ref={(textarea) => {
                      this.textarea = textarea
                    }}
          />
        </div>
        <div>
          <a className="btn" onClick={this.handleClick.bind(this)}>提交</a>
        </div>
      </div>
    )
  }
}

export default Input;
