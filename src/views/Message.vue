<template>
  <div class="chat-container">
    <h2 class="chat-title">Chat Room</h2>

    <p class="status">
      Status:
      <span :class="isConnected ? 'status-online' : 'status-offline'">
        {{ isConnected ? 'Connected' : 'Disconnected' }}
      </span>
    </p>

    <ul class="message-list" ref="messageList">
      <li
          v-for="message in messages"
          :key="message.id"
          class="message-item"
          :class="{ 'message-own': isOwnMessage(message) }"
      >
        <span v-if="isServerMessage(message)" class="server-message">
          {{ message.text }}
        </span>
        <span v-else class="message-content">
          <strong class="sender-name">{{ message.from || 'Anonymous' }}:</strong>
          <span class="message-text">{{ message.text }}</span>
        </span>
      </li>
    </ul>

    <div class="send-to-container">
      <label for="receiver" class="send-to-label">Send to:</label>
      <select
          v-model="receiverId"
          id="receiver"
          class="send-to-select"
      >
        <option value="">Broadcast (all)</option>
        <option
            v-for="user in onlineUsers"
            :key="user"
            :value="user"
        >
          {{ user }}
        </option>
      </select>
    </div>

    <input
        type="text"
        v-model="inputMessage"
        placeholder="Type your message and press Enter"
        @keydown.enter="sendMessage"
        class="message-input"
        autocomplete="off"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const getOrCreateClientId = () => {
  let id = localStorage.getItem('client_id');
  if (!id) {
    id = 'user_' + Math.random().toString(36).substring(2, 10);
    localStorage.setItem('client_id', id);
  }
  return id;
};

const clientId = getOrCreateClientId();

const messages = ref([]);
const inputMessage = ref('');
const receiverId = ref('');
const onlineUsers = ref([]);
const isConnected = ref(false);

let websocket = null;

const isServerMessage = (message) => message.text.startsWith('[Server]');

const isOwnMessage = (message) => {
  return message.from === clientId || (!message.from && !isServerMessage(message));
};

const handleMessage = (event) => {
  try {
    const data = JSON.parse(event.data);

    if (data.type === 'userList' && Array.isArray(data.users)) {
      onlineUsers.value = data.users.filter((id) => id !== clientId);
      return;
    }

    messages.value.push(data);
    nextTick(() => {
      const el = document.querySelector('.message-list');
      if (el) el.scrollTop = el.scrollHeight;
    });
  } catch (err) {
    console.error('Invalid message from server:', event.data);
  }
};

const sendMessage = () => {
  const text = inputMessage.value.trim();
  if (!text) return;

  const message = {
    id: Date.now(),
    text,
    from: clientId,
  };

  // 只发送给服务器，不在本地push，避免重复
  const command = receiverId.value || '/all';
  websocket?.send(`${command} ${JSON.stringify(message)}`);
  inputMessage.value = '';
};

onMounted(() => {
  websocket = new WebSocket('ws://localhost:8080');

  websocket.onopen = () => {
    isConnected.value = true;
    websocket.send(JSON.stringify({ id: clientId }));
    console.log('My client ID:', clientId);
  };

  websocket.onmessage = handleMessage;

  websocket.onerror = (err) => {
    console.error('WebSocket error:', err);
  };

  websocket.onclose = () => {
    isConnected.value = false;
  };
});
</script>

<style scoped>
.chat-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.chat-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
  color: #333;
}

.status {
  margin-bottom: 16px;
  text-align: center;
  font-size: 14px;
  color: #555;
}

.status-online {
  color: #16a34a; /* green */
  font-weight: 600;
}

.status-offline {
  color: #dc2626; /* red */
  font-weight: 600;
}

.message-list {
  height: 260px;
  overflow-y: auto;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9fafb;
  margin-bottom: 16px;
  list-style: none;
}

.message-item {
  margin-bottom: 10px;
  word-wrap: break-word;
  display: flex;
}
.message-item:not(.message-own) {
  justify-content: flex-start;
}
.message-item.message-own {
  justify-content: flex-end;
}
.message-content {
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 12px;
  word-wrap: break-word;
}
.message-item:not(.message-own) .message-content {
  background-color: #e5e7eb;
  color: #111827;
}
.message-item.message-own .message-content {
  background-color: #4f46e5;
  color: white;
}
.server-message {
  color: #0d9488; /* teal */
  font-weight: 600;
  text-align: center;
  display: block;
  background-color: #f3f4f6;
  padding: 4px 8px;
  border-radius: 6px;
  margin: 4px 0;
}
.sender-name {
  font-weight: 600;
}
.message-item:not(.message-own) .sender-name {
  color: #4b5563; /* gray-700 */
}
.message-item.message-own .sender-name {
  color: rgba(255, 255, 255, 0.9);
}
.message-text {
  margin-left: 6px;
}
.message-item:not(.message-own) .message-text {
  color: #111827; /* gray-900 */
}
.message-item.message-own .message-text {
  color: white;
}

.send-to-container {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.send-to-label {
  font-weight: 600;
  color: #374151; /* gray-700 */
  flex-shrink: 0;
}

.send-to-select {
  flex-grow: 1;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s ease;
}

.send-to-select:focus {
  border-color: #4f46e5; /* indigo-600 */
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
}

.message-input {
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s ease;
}

.message-input:focus {
  border-color: #4f46e5; /* indigo-600 */
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
}
</style>
