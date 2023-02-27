// База данных
let listData = [
  {
    name: 'Олег',
    surname: 'Иванович',
    lastname: 'Мостин',
    age: 18,
    hobby: 'Игры',
  },
  {
    name: 'Юлия',
    surname: 'Александровна',
    lastname: 'Воронина',
    age: 21,
    hobby: 'Танцы',
  },
  {
    name: 'Евгения',
    surname: 'Анатольевна',
    lastname: 'Ильина',
    age: 18,
    hobby: 'Спорт',
  },
  {
    name: 'Юлия',
    surname: 'Олеговна',
    lastname: 'МосАнтоноватин',
    age: 21,
    hobby: 'Спорт',
  },
  {
    name: 'Александр',
    surname: 'Иванович',
    lastname: 'Воронин',
    age: 19,
    hobby: 'Танцы',
  }
]

let sortColumnFlag = 'fio';
let sortDirFlag = true;

// Создание элеменотов
const $app = document.getElementById('app');
const $addForm = document.getElementById('add-form');

let $nameInp = document.getElementById('add-form__name-inp');
const $surnameInp = document.getElementById('add-form__surname-inp');
const $lastnameInp = document.getElementById('add-form__lastname-inp');
const $ageInp = document.getElementById('add-form__age-inp');
const $hobbyInp = document.getElementById('add-form__hobby-inp');
const $sortFioBtn = document.getElementById('sort__fio');
const $sortAgeBtn = document.getElementById('sort__age');

$filterForm = document.getElementById('filter-form')
$fioFilterInp = document.getElementById('filter-form__fio-inp')
$hobbyFilterInp = document.getElementById('filter-form__hobby-inp')

const $table = document.createElement('table');
const $tableHead = document.createElement('thead');
const $tableBody = document.createElement('tbody');

const $tableHeadTr = document.createElement('tr');
const $tableHeadThFIO = document.createElement('th');
const $tableHeadThAge = document.createElement('th');
const $tableHeadThBithYear = document.createElement('th');
const $tableHeadThHobby = document.createElement('th');

$table.classList.add("table", 'table-striped')

$tableHeadThFIO.textContent = 'Фио'
$tableHeadThAge.textContent = 'Возраст'
$tableHeadThBithYear.textContent = 'Год рождения'
$tableHeadThHobby.textContent = 'Хобби'

$tableHeadTr.append($tableHeadThFIO)
$tableHeadTr.append($tableHeadThAge)
$tableHeadTr.append($tableHeadThBithYear)
$tableHeadTr.append($tableHeadThHobby)

$tableHead.append($tableHeadTr)
$table.append($tableHead)
$table.append($tableBody)
$app.append($table)


function createUserTr(oneUser) {
  const $userTr = document.createElement('tr');
  const $userFIO = document.createElement('th');
  const $userAge = document.createElement('th');
  const $userBithYear = document.createElement('th');
  const $userHobby = document.createElement('th');

  $userFIO.textContent = oneUser.fio
  $userAge.textContent = oneUser.age
  $userBithYear.textContent = oneUser.bithYear
  $userHobby.textContent = oneUser.hobby

  $userTr.append($userFIO)
  $userTr.append($userAge)
  $userTr.append($userBithYear)
  $userTr.append($userHobby)

  return $userTr
}

// Филтрация


// Рендер
function render(arrData) {
  $tableBody.innerHTML = ''

  // Подготовка
  let copyListData = [...arrData]

  for (const oneUser of copyListData) {
    oneUser.fio = oneUser.lastname + ' ' + oneUser.name + ' ' + oneUser.surname
    oneUser.bithYear = 2022 - oneUser.age
  }

  // Сортировка

  copyListData = copyListData.sort(function (a, b) {
    let sort = (a[sortColumnFlag] < b[sortColumnFlag])

    if (sortDirFlag == false) {
      sort = a[sortColumnFlag] > b[sortColumnFlag]
    }

    if (sort) return -1
  })

  // Фильтрация
  if ($fioFilterInp.value.trim() !== '') {
    copyListData = copyListData.filter(function (oneUser) {
      if (oneUser.fio.includes($fioFilterInp.value.trim())) {
        return true
      }
    });
  }

  if ($hobbyFilterInp.value.trim() !== '') {
    copyListData = copyListData.filter(function (oneUser) {
      if (oneUser.hobby.includes($hobbyFilterInp.value.trim())) {
        return true
      }
    });
  }


  // Отрисовка

  for (const oneUser of copyListData) {
    const $newTr = createUserTr(oneUser)

    $tableBody.append($newTr)

  }
}

render(listData)

// Добавление

$addForm.addEventListener('submit', (event) => {
  event.preventDefault()

  // Валидация
  if ($nameInp.value.trim() == '') {
    alert('Имя не введено!')
    return
  }

  if ($surnameInp.value.trim() == '') {
    alert('Отчество не введено!')
    return
  }

  if ($lastnameInp.value.trim() == '') {
    alert('Фамилия не введено!')
    return
  }

  if ($ageInp.value.trim() == '') {
    alert('Возраст не введен!')
    return
  }

  listData.push({
    name: $nameInp.value,
    surname: $surnameInp.value.trim(),
    lastname: $lastnameInp.value.trim(),
    age: parseInt($ageInp.value),
    hobby: $hobbyInp.value.trim(),
  })

  render(listData)
})

// Клики сортировка

$sortFioBtn.addEventListener('click', () => {
  sortColumnFlag = 'fio'
  sortDirFlag = !sortDirFlag;
  render(listData)
})

$sortAgeBtn.addEventListener('click', () => {
  sortColumnFlag = 'age'
  sortDirFlag = !sortDirFlag;
  render(listData)
})


// Фильтр

$filterForm.addEventListener('submit', (event) => {
  event.preventDefault
})

$fioFilterInp.addEventListener('input', () => {
  render(listData)
})

$hobbyFilterInp.addEventListener('input', () => {
  render(listData)
})

