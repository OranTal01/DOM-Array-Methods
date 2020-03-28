const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');
const main = document.getElementById('main');

let data = [];

const getRandomPerson = async _ => {
    try {
        const result = await axios.get('https://randomuser.me/api');
        const personData = result.data.results;
        for (const person of personData) {
            const { name } = person;
            const personFirstName = name.first;
            const personLastName = name.last;
            const fullName = `${personFirstName} ${personLastName}`;
            const wealth = Math.floor(Math.random() * 10000000);
            data.push({
                fullName,
                wealth
            });
            updateDom();
        }
    } catch (error) {
        throw new Error('something want wrong');
    }
};

const updateDom = _ => {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    data.forEach(person => {
        const divPersonEl = document.createElement('div');
        divPersonEl.classList.add('person');
        divPersonEl.innerHTML = `<strong>${person.fullName}</strong> ${formatWealth(person.wealth)}`;
        main.appendChild(divPersonEl);
    });
};

const doublePersonWealth = _ => {
    data = data.map(person => {
        return {
            ...person,
            wealth: person.wealth * 2
        };
    });
    updateDom();
};

const formatWealth = wealth => {
    return '$' + wealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

const setMillionaires = _ => {
    data = data.filter(person => person.wealth >= 1000000);
    updateDom();
};

const sortByRichest = _ => {
    data = data.sort((a, b) => b.wealth - a.wealth);
    updateDom();
};

const calculateTotalWealth = _ => {
    let totalWealth = data.reduce((accumulator, currentValue) => accumulator + currentValue.wealth,
        0);
    const h3El = document.createElement('h3');
    h3El.innerHTML = `Total Wealth:<strong>${formatWealth(totalWealth)}</strong>`;
    main.appendChild(h3El);
};

getRandomPerson();
getRandomPerson();
getRandomPerson();

addUser.addEventListener('click', getRandomPerson);
double.addEventListener('click', doublePersonWealth);
showMillionaires.addEventListener('click', setMillionaires);
sort.addEventListener('click', sortByRichest);
calculateWealth.addEventListener('click', calculateTotalWealth);