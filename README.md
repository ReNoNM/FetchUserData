Небольшое мобильное приложение на React Native, которое отображает список пользователей, загруженный из API, с возможностью просмотра деталей и сохранения в "избранное".

- Получение данных из API (https://jsonplaceholder.typicode.com/users)
- Несколько экранов с разной информацией
- Поиск по имени пользователя среди загруженных пользователей
- Использован React Navigation для навигации
- Переключение темы
- Использован Zustand
- Сохранение "избранных" пользователей в AsyncStorage

# Getting Started

## Step 1: клонирование репозитория

```sh
git clone https://github.com/ReNoNM/FetchUserData.git
```

## Step 2: загрузка node_modules

```sh
npm i
```

## Step 3: Запуск Metro

```sh
npm start
```

## Step 4: Запуск приложения Андроид

```sh
npm run android
```

Если происходит ошибка, необходимо запустить cmd\редактор от администратора

### Запуск приложения iOS

```sh
bundle install
```

```sh
bundle exec pod install
```

```sh
npm run ios
```
