
// Фукнция перемешивает случайным образом массив
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

    // поменять элементы местами используем для этого синтаксис "деструктурирующее присваивание"
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export { shuffle };
