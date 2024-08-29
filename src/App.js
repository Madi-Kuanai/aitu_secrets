import { useEffect, useState, useCallback } from 'react';
import "./App.css"
import {wait} from "@testing-library/user-event/dist/utils";

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!window.Telegram) {
      console.error('Telegram WebApp API не доступен');
    }
  }, []);

  const onSendData = useCallback(() => {
    const tg = window.Telegram ? window.Telegram.WebApp : null;
    const user = tg.initData?.user;
    const fs = require('node:fs');
    const content = 'Some content!';
    fs.writeFile('./logs.txt', content, err => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    });

    if (tg) {
      const data = {
        text,
        user: {
          first_name: user?.first_name,
          last_name: user?.last_name,
          username: user?.username,
        },
      };
      tg.sendData(JSON.stringify(data));
    } else {
      console.error('Telegram WebApp API не доступен');
    }
  }, [text]);

  return (
      <div className="App">
      <textarea
          className="text-box"
          placeholder="Введите текст..."
          value={text}
          onChange={(e) => setText(e.target.value)}
      ></textarea>
        <button className="submit-button" onClick={onSendData}>
          Отправить
        </button>
      </div>
  );
}

export default App;
