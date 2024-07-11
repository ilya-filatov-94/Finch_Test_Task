# Тестовое задание для Frontend-разработчика

## Демо
<img src="https://github.com/ilya-filatov-94/Finch_Test_Task/blob/main/Demo_RapidoGame.gif" alt="demo" width="689"/>

## Требуется реализовать логику игры. Правила следующие:

У игры есть два поля, в первом поле будет девятнадцать клеток, во втором две клетки. От участника лотереи требуется отметить в первом поле восемь цифр, во втором одну цифру. При вычисление результата потребуется сравнить отмеченные участником числа с двумя случайно сгенерированными, в соответствиями с правилами игры (восемь чисел в первом массиве, одно во втором массиве), массивами чисел. В случае совпадения четырех и более цифр в первом поле, либо трех и более чисел в первом поле и одного во втором, пользователь считается победителем лотереи и получает причитающиеся ему лавры (ничего не получает).

- В качестве вёрстки, если вы будете её делать, возможно использовать вложенный макет.

## Что хотелось бы видеть:

1. Аккуратный, чистый код. Использование линтеров (eslint) приветствуется.
2. React любой предпочитаемой вами версии. Для быстрой первоначальной настройки проекта возможно использовать Create React App.
3. Минимальная визуализацию описанного выше

Задания со звёздочкой не обязательные, но мы будем рады, если вы их выполните. Альтернативно, мы просто зададим похожие вопросы уже на собеседовании.

4. (\*) Адаптивная mobile-first вёрстка, условно приближенная к макету. (https://www.figma.com/file/VDraSBJhGzDKP33eS4IBbp6Z/Finch_test).
5. (\*) Реализовать генерацию случайно выбранных полей в билете (в соответствие с правилами лотереи) по нажатию на значок волшебной палочки.
6. (\*) Реализовать логику отправки выбранных чисел на сервер по любому url'у (предлагаем использовать фейковый url, чтобы не иметь дела с CORS). Отправка должна происходить после нажатия на кнопку "Показать результат". В данных отправки должен быть объект

```json
{
  "selectedNumber": {
    { "firstField": [ "first field numbers" ], "secondField": [ "second field numbers" ] },
    "isTicketWon": "Boolean(true||false)"
  }
}
```

Нужно предусмотреть ситуацию, что в ответ придет код ответ не 200 OK, а любой другой. В таком случае требуется отправлять запрос еще два раза с интервалом 2 секунды. Если ответ 200 OK так и не пришел, то выдать какое-либо уведомление об ошибке.

## Запуск проекта:
Для работы с post запросом на фейковый url использовался json-server, запускающийся на 3001 порту.
Для запуска проекта можно воспользоваться скриптом: npm run dev,  
который запустит и фейковый json-server на 3001 порту и клиентское приложение на 3000 порту (используется concurrently)

