import React, { useState } from 'react'; // Мы подключаем React и хук useState, чтобы хранить данные, которые могут изменяться (например, текст в полях).
import axios from 'axios'; // Мы подключаем axios, чтобы отправлять запросы на сервер (в нашем случае, в Telegram).
import './MessageInput.css'; // Подключаем стили, чтобы форма выглядела красиво.

const MessageInput = () => { // Мы создаём компонент, который будет отображать нашу форму.
  
  // Здесь мы создаём переменные для хранения введённых данных (номер телефона, имя, описание) и ошибок для каждого поля.
  const [phone, setPhone] = useState(''); // Это хранит номер телефона, который ты ввёл.
  const [fullName, setFullName] = useState(''); // Это хранит имя, которое ты ввёл.
  const [description, setDescription] = useState(''); // Это хранит описание, которое ты ввёл.
  const [errors, setErrors] = useState({ phone: '', fullName: '', description: '' }); // Это хранит ошибки для каждого поля (например, "Заполните поле").

  const token = '8043384380:AAE86grub5pqt1iG5cwN3z3JzH8PmR6X22Q'; // Это ключ, который позволяет вашему боту отправлять сообщения.
  const chatId = '7983961143'; // Это ID чата, куда бот будет отправлять сообщение.

  // Функция для отправки сообщения в Telegram.
  const sendMessage = async (message) => {
    try {
      const response = await axios.post( // Мы отправляем POST-запрос через axios.
        `https://api.telegram.org/bot${token}/sendMessage`, // Ссылка на API для отправки сообщений в Telegram.
        {
          chat_id: chatId, // Куда отправлять сообщение (наш чат).
          text: message, // Текст сообщения, который мы отправляем.
        
        }
      );
      console.log('Message sent successfully', response.data); // Выводим информацию о том, что сообщение отправлено.
    } catch (error) {
      console.error('Error sending message', error.response || error.message); // Если возникла ошибка, мы её выводим.
    }
  };

  // Функция, которая срабатывает, когда ты отправляешь форму.
  const handleSubmit = (event) => {
    event.preventDefault(); // Это предотвращает перезагрузку страницы при отправке формы.

    // Проверка заполненности полей.
    const newErrors = {
      phone: phone.trim() ? '' : 'Заполните поле', // Если поле пустое, показываем ошибку.
      fullName: fullName.trim() ? '' : 'Заполните поле', // То же для имени.
      description: description.trim() ? '' : 'Заполните поле', // То же для описания.
    };

    setErrors(newErrors); // Обновляем ошибки.

    // Проверяем, есть ли ошибки.
    const hasErrors = Object.values(newErrors).some((error) => error !== ''); 
    if (hasErrors) return; // Если есть ошибка, не отправляем сообщение.

    // Если ошибок нет, создаём текст сообщения.
    const composedMessage = `📞 Phone: ${phone}\n👤 Name: ${fullName}\n📝 Description:\n${description}`;

    // Отправляем сообщение.
    sendMessage(composedMessage);

    // Очищаем поля формы после отправки.
    setPhone('');
    setFullName('');
    setDescription('');
    setErrors({ phone: '', fullName: '', description: '' }); // Сбрасываем ошибки.
  };

  return (
    <div className="MessageInput"> {/* Контейнер для всей формы */}
      <form onSubmit={handleSubmit} onKeyDown={(e)=>{
        if (e.key ==='Enter'){
          handleSubmit(e)
        }
      }}> {/* Форма для ввода данных */}
        <div className="input-group"> {/* Группа для поля ввода телефона */}
          <input
            type="number" // Тип поля: только числа.
            value={phone} // Значение поля — это номер телефона.
            onChange={(e) => setPhone(e.target.value)} // При изменении поля обновляем номер телефона.
            placeholder="Phone number" // Подсказка, что сюда нужно ввести номер телефона.
          />
          {errors.phone && <div className="error">{errors.phone}</div>} {/* Показываем ошибку, если есть */}
        </div>

        <div className="input-group"> {/* Группа для поля ввода имени */}
          <input
            type="text" // Тип поля: текст.
            value={fullName} // Значение поля — это имя.
            onChange={(e) => setFullName(e.target.value)} // При изменении поля обновляем имя.
            placeholder="Full name" // Подсказка, что сюда нужно ввести имя.
          />
          {errors.fullName && <div className="error">{errors.fullName}</div>} {/* Показываем ошибку, если есть */}
        </div>

        <div className="input-group"> {/* Группа для поля ввода описания */}
          <textarea
            value={description} // Значение поля — это описание.
            onChange={(e) => setDescription(e.target.value)} // При изменении поля обновляем описание.
            placeholder="Description" // Подсказка, что сюда нужно ввести описание.
            rows={4} // Устанавливаем количество строк.
          />
          {errors.description && <div className="error">{errors.description}</div>} {/* Показываем ошибку, если есть */}
        </div>

        <button type="submit">Send Message</button> {/* Кнопка отправки формы */}
      </form>
    </div>
  );
};

export default MessageInput; // Экспортируем компонент, чтобы его можно было использовать в других частях приложения.
