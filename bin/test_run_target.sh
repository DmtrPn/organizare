#!/bin/bash

# Получаем путь к тестовому файлу из аргумента
TEST_FILE_PATH="$1"

# Заменяем "src" на "dist" и расширение ".ts" на ".js"
MODIFIED_PATH="${TEST_FILE_PATH/src/dist}"
MODIFIED_PATH="${MODIFIED_PATH/.ts/.js}"

# Запускаем тест командой из package.json
TS_NODE_BASEURL=./dist node -r tsconfig-paths/register --test "$MODIFIED_PATH"
