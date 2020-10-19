
(function() {
    let count = 0;
    let userNumChatMessages = 0;
    let userChatHistory = [];
    let userChatHistoryCount = userChatHistory.length - 1;
    let isStartHistory = true;
    const MAXCHATMESSAGES = 100;
    const textarea = document.querySelector('#chat-input__textarea');
    const sendBtn = document.querySelector('.send-btn');
    const chat = document.querySelector('#chat');
    const chatBox = document.querySelector('.chat-box');
    const chatInput = document.querySelector('.chat-input');

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  

    // set chatbox height
    chatBox.style.height = window.innerHeight + 'px';
    window.addEventListener('resize', setChatHeight, false);
   
    window.addEventListener("keydown", function(event) {
        if(event.defaultPrevented) {
            return;
        }
        if(document.activeElement === textarea) {
            switch(event.key) {
                case "Enter":
                    event.preventDefault();
                    send();
                    break;
                case "ArrowUp":
                    chatHistory(-1);
                    break;
                case "ArrowDown":
                    chatHistory(1);
                    break;
                default:
                    return;
            }
        }
        if(event.key != "ArrowDown" && event.key != "ArrowUp") {
            userChatHistoryCount = userChatHistory.length - 1;
        }
        
        event.preventDefault();
    }, true);
    
    textarea.addEventListener('input', autoResize, false);
    textarea.addEventListener('focus', focusKeyboard, false);
    sendBtn.addEventListener('click', send, false);
    

    function focusKeyboard() {
        if(isMobile) {
            document.addEventListener('scroll', stickToKeyboard) 
        }
    }

    function stickToKeyboard() {
        document.querySelector('.test').innerHTML = window.pageYOffset;
        chatInput.style.bottom = (window.innerHeight - window.pageYOffset) + 'px';
        document.body.style.backgroundColor = 'black';
    }

    function setChatHeight() {
        chatBox.style.height = window.innerHeight + 'px';
    }

    function autoResize() {
        // set height for 1 line
        let height = parseInt(this.scrollHeight);
        if(height <= 72)  {
            this.style.height = 'auto';
        } else {
            //upper size limit
            let maxHeight;
            if(this.scrollHeight <= 165) {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
                maxHeight = this.style.height;
                this.style.overflow = 'hidden';
            } else {
                this.style.height = maxHeight;
                this.style.overflow = 'auto';
            }
        }

       
    }
    
    function autoSize() {
        this.style.height = 'auto';
    }
    

    function chatHistory(direction) {
        if(userChatHistory.length != 0 && (direction < 0 && userChatHistoryCount >= 0) || 
           (direction > 0 && userChatHistoryCount <= userChatHistory.length)) {

            if(direction < 0 && userChatHistoryCount > 0 || direction > 0 && userChatHistoryCount < userChatHistory.length - 1) {
                if(isStartHistory) {
                    textarea.value = userChatHistory[userChatHistoryCount];
                    isStartHistory = false;
                } else {
                    userChatHistoryCount += direction;
                    textarea.value = userChatHistory[userChatHistoryCount];
                }
               
            } else {
                if(direction > 0) {
                    textarea.value = '';
                    userChatHistoryCount = userChatHistory.length;
                }
                else {
                    textarea.value = userChatHistory[userChatHistoryCount];
                }
            }
        }
    }
    
    function send() {
        isStartHistory = true;
        var inputString = textarea.value;
        if(isValidString(inputString)) {
            var newChatLineMessage = document.createElement('div');
            newChatLineMessage.setAttribute('class', 'chat-line__message');
            var newChatLineUsername = document.createElement('span');
            newChatLineUsername.setAttribute('class', 'chat-line__username');
            newChatLineMessage.append(newChatLineUsername);
            var newMessage = document.createElement('span');
            newMessage.setAttribute('class', 'message');
            newChatLineMessage.append(newMessage);
            var chatBox = document.getElementById("chat");
            chatBox.appendChild(newChatLineMessage);
    
            var chatLineUsername = document.querySelectorAll('.chat-line__username');
            var message = document.querySelectorAll('.message');
            
            newChatLineUsername.innerHTML = "user" + count + ": ";
    
            // prevent html injection
            inputString = inputString.replace(/</g, "&lt;").replace(/>/g,"&gt;");
            
            newMessage.innerHTML = inputString.replace('\n', ' ');
            textarea.value = '';
            count++;
            autoSize.call(textarea);
    
            // add input to chat history
            userChatHistory.push(inputString);
    
            // scroll down
            chat.scrollTop = chat.scrollHeight;

            // chat message limit
            if (userNumChatMessages > MAXCHATMESSAGES) {
                var chatLineMessage = document.querySelectorAll('.chat-line__message');
                chatLineMessage[0].remove();
            } else {
                userNumChatMessages++;
            }
        }
    }
    
    function isValidString(s) {
        return !/^\s+$/.test(s) && s;
    }
    
})();
