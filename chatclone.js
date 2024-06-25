const contacts = ['Person A', 'Person B', 'Person C', 'Person D'];

const contactsList = document.getElementById('contactsList');
const chatTitle = document.getElementById('chatTitle');
const chatBody = document.getElementById('chatBody');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessageButton');

let activeChat = null;
let messages = {};

document.addEventListener('DOMContentLoaded', () => {
  renderContacts();
  sendMessageButton.addEventListener('click', sendMessage);
});

function renderContacts() {
  contactsList.innerHTML = '';
  contacts.forEach(contact => {
    const li = document.createElement('li');
    li.textContent = contact;
    li.addEventListener('click', () => openChat(contact));
    contactsList.appendChild(li);
  });
}

function openChat(contact) {
  activeChat = contact;
  chatTitle.textContent = contact;
  renderMessages();
}

// Sending a message
function sendMessage() {
  if (!messageInput.value.trim() || !activeChat) return;

  const message = {
    id: Date.now(),
    text: messageInput.value,
    sender: 'You',
    timestamp: new Date().toLocaleTimeString()
  };

  if (!messages[activeChat]) messages[activeChat] = [];
  messages[activeChat].push(message);
  messageInput.value = '';
  renderMessages();
}

// Deleting a message
function deleteMessage(messageId) {
  if (!activeChat || !messages[activeChat]) return;
  messages[activeChat] = messages[activeChat].filter(msg => msg.id !== messageId);
  renderMessages();
}

function renderMessages() {
  chatBody.innerHTML = '';
  if (messages[activeChat]) {
    messages[activeChat].forEach(message => {
      const div = document.createElement('div');
      div.className = 'message';

      const messageText = document.createElement('span');
      messageText.textContent = `[${message.timestamp}] ${message.sender}: ${message.text}`;
      div.appendChild(messageText);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-button';
      deleteButton.addEventListener('click', () => deleteMessage(message.id));
      div.appendChild(deleteButton);

      chatBody.appendChild(div);
    });
  }
}
