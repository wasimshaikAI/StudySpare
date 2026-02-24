import { useEffect, useRef, useState, useCallback } from 'react';

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(`${protocol}//${window.location.host}`);

    socket.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket Connected');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLastMessage(data);
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket Disconnected');
    };

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = useCallback((data: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    }
  }, []);

  return { isConnected, lastMessage, sendMessage };
}
