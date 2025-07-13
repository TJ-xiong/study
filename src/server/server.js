import { WebSocketServer } from 'ws';
import express from 'express';
import cors from 'cors';
import readline from 'readline';

const app = express();
app.use(cors());

const server = app.listen(8080, () => {
    console.log('Server started on port 8080');
});

const wss = new WebSocketServer({ server });

// 用于存储客户端ID与连接的映射
const clients = new Map();

function broadcastUserList() {
    const userList = Array.from(clients.keys());
    const payload = JSON.stringify({
        type: 'userList',
        users: userList,
    });

    clients.forEach((ws) => {
        if (ws.readyState === ws.OPEN) {
            ws.send(payload);
        }
    });
}

wss.on('connection', (ws) => {
    console.log('Client connected, waiting for ID...');

    let clientId = null;

    // 首条消息当作客户端 ID 注册
    ws.once('message', (message) => {
        try {
            const data = JSON.parse(message);
            clientId = data.id;
            if (clientId) {
                clients.set(clientId, ws);
                console.log(`Client registered with ID: ${clientId}`);
                ws.send(JSON.stringify({ text: `[Server] Welcome, ${clientId}!`, id: Date.now() }));
                broadcastUserList(); // 更新用户列表
            } else {
                ws.send(JSON.stringify({ text: '[Server] Missing ID.', id: Date.now() }));
                ws.close();
                return;
            }
        } catch {
            ws.send(JSON.stringify({ text: '[Server] Invalid initial message format.', id: Date.now() }));
            ws.close();
            return;
        }

        // 监听后续消息
        ws.on('message', (msg) => {
            const str = msg.toString();

            // 消息格式示例： "/all {...}" 或 "/user123 {...}"
            const firstSpace = str.indexOf(' ');
            if (firstSpace === -1) {
                ws.send(JSON.stringify({ text: '[Server] Invalid message format. Use "/all message" or "/userId message".', id: Date.now() }));
                return;
            }

            const target = str.substring(0, firstSpace).trim();
            const payloadStr = str.substring(firstSpace + 1).trim();

            let payloadObj;
            try {
                payloadObj = JSON.parse(payloadStr);
            } catch {
                ws.send(JSON.stringify({ text: '[Server] Invalid JSON payload.', id: Date.now() }));
                return;
            }

            if (target === '/all') {
                // 广播给所有客户端
                clients.forEach((clientWs) => {
                    if (clientWs.readyState === clientWs.OPEN) {
                        clientWs.send(JSON.stringify({
                            ...payloadObj,
                            from: clientId,
                        }));
                    }
                });
                console.log(`Broadcast from ${clientId}: ${payloadStr}`);
            } else if (clients.has(target)) {
                // 定向发送
                const targetWs = clients.get(target);
                if (targetWs.readyState === targetWs.OPEN) {
                    targetWs.send(JSON.stringify({
                        ...payloadObj,
                        from: clientId,
                    }));
                    console.log(`Message from ${clientId} sent to ${target}: ${payloadStr}`);
                } else {
                    ws.send(JSON.stringify({ text: `[Server] Target ${target} is not connected.`, id: Date.now() }));
                }
            } else {
                ws.send(JSON.stringify({ text: `[Server] Invalid target or command: "${target}"`, id: Date.now() }));
            }
        });

        ws.on('close', () => {
            if (clientId) {
                clients.delete(clientId);
                console.log(`Client ${clientId} disconnected.`);
                broadcastUserList(); // 更新用户列表
            }
        });
    });
});

// 控制台输入处理
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Server> ',
});

rl.prompt();

rl.on('line', (line) => {
    const trimmed = line.trim();

    if (!trimmed) {
        rl.prompt();
        return;
    }

    let [command, ...rest] = trimmed.split(' ');
    command = command.substring(1, command.length);
    const content = rest.join(' ').trim();

    const payload = JSON.stringify({
        id: Date.now(),
        text: `[Server]: ${content}`,
    });

    console.log('Current clients:', Array.from(clients.keys()));
    if (command === '/all') {
        // 广播
        clients.forEach((ws) => {
            if (ws.readyState === ws.OPEN) {
                ws.send(payload);
            }
        });
        console.log(`Broadcast: ${content}`);
    } else if (clients.has(command)) {
        // 定向发送
        const target = clients.get(command);
        if (target.readyState === target.OPEN) {
            target.send(payload);
            console.log(`Sent to ${command}: ${content}`);
        }
    } else {
        console.log(`Invalid command or client ID: "${command}"`);
    }

    rl.prompt();
});
