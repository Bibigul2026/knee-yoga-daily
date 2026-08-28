const sets = {
  breath: { name: 'Дыхание в удобном сидении', description: 'Сядьте на сложенное одеяло или стул. Сделайте спокойные вдохи и длинные мягкие выдохи.', dose: '1–2 минуты' },
  ankle: { name: 'Круги стопами лёжа', description: 'Лёжа на спине, медленно нарисуйте круги стопами в обе стороны. Колени остаются расслабленными.', dose: '6 кругов/сторона' },
  heelSlides: { name: 'Поза скользящей пятки', description: 'Лёжа на спине, плавно подвиньте пятку к тазу и обратно. Остановитесь до появления боли.', dose: '6–10 раз' },
  supportedBridge: { name: 'Поддержанный мостик', description: 'Поднимите таз совсем немного или положите под крестец устойчивую подушку. Колени направлены вперёд.', dose: '5–8 дыханий' },
  reclinedTree: { name: 'Дерево лёжа', description: 'Лёжа, поставьте стопу одной ноги на внутреннюю часть голени другой — не на колено. Смените сторону.', dose: '4 дыхания/сторона' },
  chairCatCow: { name: 'Кошка–корова на стуле', description: 'Сидя, на вдохе мягко расправьте грудь, на выдохе слегка округлите спину. Стопы устойчиво на полу.', dose: '6–8 циклов' },
  chairWarrior: { name: 'Воин на стуле', description: 'Сядьте боком на стул, одну ногу вытяните назад только настолько, насколько комфортно. Держите опору.', dose: '3 дыхания/сторона' },
  seatedPress: { name: 'Йога-пресс сидя с гантелями', description: 'Сядьте устойчиво, возьмите очень лёгкие гантели. На вдохе поднимите руки до комфортной высоты, на выдохе медленно опустите. Колени остаются неподвижными.', dose: '5–8 раз' },
  weightedRaise: { name: 'Подъём прямой ноги с утяжелителем', description: 'Наденьте лёгкий утяжелитель на лодыжку. Лёжа, напрягите бедро и поднимите прямую ногу невысоко, затем медленно опустите.', dose: '5–6 раз/сторона' },
  legsUp: { name: 'Ноги на стене или стуле', description: 'Лягте и положите голени на сиденье стула. Полностью расслабьте бёдра и колени.', dose: '2–4 минуты' },
  rest: { name: 'Короткая шавасана', description: 'Лягте удобно, при необходимости подложите валик под колени. Наблюдайте за спокойным дыханием.', dose: '2 минуты' }
};
const list = document.querySelector('#exercise-list');
const title = document.querySelector('#plan-title');
const note = document.querySelector('#plan-note');
const warning = document.querySelector('#warning');
const plan = document.querySelector('#plan');
const braceGuide = document.querySelector('#brace-guide');

function poseArt(key) {
  const kind = ['supportedBridge'].includes(key) ? 'bridge' : ['breath', 'chairCatCow', 'chairWarrior', 'seatedPress'].includes(key) ? 'seat' : ['heelSlides', 'reclinedTree', 'legsUp', 'rest', 'weightedRaise'].includes(key) ? 'lying' : 'ankle';
  const art = {
    seat: '<circle cx="52" cy="23" r="8"/><path d="M52 32v23m0-14 17 10m-17-10-17 10M35 67h34M42 55v12m20-12v12"/>',
    lying: '<circle cx="29" cy="50" r="7"/><path d="M36 51h28l15-16M47 51l19 18M66 69h21M45 69H25"/>',
    bridge: '<circle cx="24" cy="59" r="7"/><path d="M31 58h18l17-22 19 25M49 58l20 18m16-15 8 15M39 76H22"/>',
    ankle: '<circle cx="49" cy="27" r="8"/><path d="M49 36v21m0-12-17 12m17-12 17 12M39 80l10-23 10 23M31 80h36"/>'
  };
  return `<div class="pose-art ${kind}" aria-label="Схематичная иллюстрация позы" role="img"><svg viewBox="0 0 100 100" aria-hidden="true">${art[kind]}</svg></div>`;
}

function build() {
  const level = document.querySelector('#level').value;
  const duration = document.querySelector('#duration').value;
  const comfort = document.querySelector('#comfort').value;
  const brace = document.querySelector('#brace').value;
  const equipment = document.querySelector('#equipment').value;
  const walkingPain = comfort === 'walkingPain';
  const warningTitle = document.querySelector('#warning-title');
  const warningText = document.querySelector('#warning-text');
  document.querySelector('#total-time').textContent = duration;
  warning.classList.toggle('hidden', comfort !== 'pain' && !walkingPain);
  plan.style.display = comfort === 'pain' ? 'none' : 'block';
  warningTitle.textContent = walkingPain ? 'Боль при ходьбе — выбираем разгрузку.' : 'Сегодня лучше сделать паузу.';
  warningText.textContent = walkingPain
    ? 'Не выполняйте упражнения стоя и не пытайтесь «расходить» боль. Если вы не можете опираться на ногу, колено горячее, сильно опухло, изменило форму, блокируется или подкашивается — нужна срочная медицинская оценка.'
    : 'При боли, отёке, блокировке сустава, нестабильности или боли после травмы не выполняйте упражнения. Обратитесь к врачу или физиотерапевту.';
  const braceText = brace === 'soft'
    ? '<strong>Мягкий наколенник: только как дополнительная поддержка.</strong><p>Наденьте его ровно и комфортно — без онемения, покалывания или изменения цвета кожи. Снимите при натирании, усиливающейся боли или отёке. Он не должен ограничивать дыхание практики или заменять постепенное укрепление.</p>'
    : brace === 'prescribed'
      ? '<strong>Назначенный ортез: следуйте индивидуальному плану.</strong><p>Не меняйте шарниры, ограничители сгибания и время ношения самостоятельно. Выполняйте лишь те позы и ту нагрузку, которые разрешил врач или физиотерапевт; при натирании, пузырях, онемении или усилении отёка обратитесь к специалисту.</p>'
      : '<strong>Практика без наколенника.</strong><p>Выбирайте устойчивую нескользкую поверхность и мягкую опору под колени, если поза этого требует. Важнее комфортная амплитуда, чем глубина позы.</p>';
  if (comfort === 'pain') return;
  const sensitive = comfort === 'sensitive';
  let items = level === 'beginner'
    ? ['breath','ankle','heelSlides','supportedBridge','chairCatCow','rest']
    : ['breath','ankle','heelSlides','supportedBridge','reclinedTree','chairWarrior','rest'];
  if (sensitive) items = ['breath','ankle','heelSlides','chairCatCow','legsUp','rest'];
  if (walkingPain) items = ['breath','ankle','heelSlides','reclinedTree','legsUp','rest'];
  const useWeight = !sensitive && !walkingPain && comfort !== 'pain';
  const equipmentText = equipment === 'dumbbells' && useWeight
    ? '<strong>Гантели: только лёгкий вес и сидя.</strong><p>Добавлена сидячая йога-пресс-вариация. Не используйте вес для углубления поз или давления на колени. Остановитесь при боли в суставе.</p>'
    : equipment === 'ankleWeights' && useWeight
      ? '<strong>Утяжелители: начните с самого лёгкого.</strong><p>Добавлен подъём прямой ноги лёжа. Увеличивайте нагрузку только если движение остаётся полностью безболезненным во время и после практики.</p>'
      : equipment !== 'none'
        ? '<strong>Сегодня — без дополнительного веса.</strong><p>При чувствительности или боли в ходьбе безопаснее оставить только собственный вес и мягкую амплитуду. Вернитесь к утяжелению после консультации специалиста или когда практика станет комфортной.</p>'
        : '';
  braceGuide.innerHTML = braceText + equipmentText;
  if (equipment === 'dumbbells' && useWeight) items.splice(-1, 0, 'seatedPress');
  if (equipment === 'ankleWeights' && useWeight) items.splice(-1, 0, 'weightedRaise');
  if (duration === '10') items.splice(-2, 1);
  if (duration === '20' && level === 'regular' && !sensitive) items.splice(-1, 0, 'legsUp');
  title.textContent = walkingPain ? 'Йога без опоры' : sensitive ? 'Бережная йога' : level === 'beginner' ? 'Мягкое начало' : 'Спокойная устойчивость';
  note.textContent = walkingPain ? 'Выполняйте только лёжа или сидя, в очень небольшой амплитуде. Прекратите, если упражнение усиливает боль. Этот режим не заменяет осмотр: если боль при ходьбе не проходит или мешает обычным делам, обратитесь к врачу или физиотерапевту.' : sensitive ? 'Только мягкая амплитуда: без глубокого сгибания, приседаний и балансов на одной ноге. Уменьшите время поз примерно на треть и остановитесь, если дискомфорт нарастает.' : 'Не стремитесь к глубине позы: ровное спокойное дыхание важнее амплитуды. Между позами делайте несколько свободных вдохов.';
  list.innerHTML = items.map((key, i) => { const ex = sets[key]; return `<article class="exercise"><span class="number">0${i + 1}</span>${poseArt(key)}<div><h3>${ex.name}</h3><p>${ex.description}</p></div><span class="dose">${ex.dose}</span></article>`; }).join('');
  document.querySelector('#complete').classList.remove('done');
  document.querySelector('#complete').textContent = 'Отметить практику';
}
document.querySelector('#generate').addEventListener('click', build);
document.querySelector('#complete').addEventListener('click', (event) => {
  event.currentTarget.classList.add('done'); event.currentTarget.textContent = 'Практика завершена ✓';
  localStorage.setItem('knee-plan-last-completed', new Date().toDateString());
  document.querySelector('#streak').textContent = 'Отлично! Небольшая регулярная работа поддерживает движение.';
});
build();
