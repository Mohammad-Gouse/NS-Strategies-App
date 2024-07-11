
const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];
strategyArray = [
    {
        'View': 'Bullish',
        'Value': {
            '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Bull Put Spread', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Bull Call Spread'],
            '02-May-2024': ['Bull Call Spread', 'Bull Call Spread', 'Bull Put Spread', 'Long Call', 'Long Call', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy2', 'Strategy1', 'Strategy2', 'Bull Call Spread'],
            '09-May-2024': ['Strategy Put', 'Strategy Call', 'Strategy Call', 'Strategy Call', 'Strategy Put'],
        }
    },
    {
        'View': 'Bearish',
        'Value': {
            '24-Apr-2024': ['Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Long Put', 'Long 4 www.Nerve.SolutionsPut', 'Long Put', 'Bear Call Spread',],
            '31-May-2024': ['Long Put', 'Long Put', 'Long Put', 'Long Put', 'Long Put'], '21-Jun-2024': ['Strategy3', 'Strategy3', 'Bear Put Spread', 'Strategy3', 'Long Put', 'Long Put'],
        }
    },
    {
        'View': 'RangeBound',
        'Value': {
            '24-Apr-2024': ['Short Straddle', 'Short Strangle', 'Short Strangle', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Short Straddle'],
            '02-May-2024': ['Short Straddle', 'Short Straddle', 'Short Strangle', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Short Straddle'],
            '21-Jun-2024': ['Iron Condor', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Iron Condor'],
        }
    },
    {
        'View': 'Volatile',
        'Value': {
            '02-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Long Straddle'],
            '09-May-2024': ['Long Straddle', 'Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Long Straddle'],
            '31-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle'],
        }
    }
]

document.addEventListener('DOMContentLoaded', () => {
    const dateSelect = document.getElementById('dateSelect');
    const dateDefault = document.getElementById('dateDefault');
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const strategyCardsContainer = document.querySelector('.strategy-cards');

    const defaultText = document.createElement('div');
    defaultText.classList.add('defaultText')
    defaultText.textContent = formatDateString(dateArray[0])
    dateDefault.appendChild(defaultText)

    const defaultIcon = document.createElement('div');
    defaultIcon.classList.add('defaultIcon')
    var firstRender = true
    defaultIcon.innerHTML = "&#11167;";
    
    dateDefault.appendChild(defaultIcon)

    dateArray.forEach(date => {
        const option = document.createElement('div');
        option.value = date;
        option.textContent = formatDateString(date);
        option.classList.add('selectOptions')
        dateSelect.appendChild(option);
    

        option.addEventListener('click', () => {
            defaultText.textContent = formatDateString(date)
            dateSelect.value = date;
            renderStrategyCards();
        });
    });

    dateSelect.value = dateArray[0];

    console.log(formatDateString(dateArray[0]))


        // Toggle dropdown visibility
    dateDefault.addEventListener('click', () => {
        dateSelect.style.display = dateSelect.style.display === 'block' ? 'none' : 'block';
        firstRender = !firstRender
        if(firstRender == true){
            defaultIcon.innerHTML = "&#11167;";
        } else {
            defaultIcon.innerHTML = "&#11165;";
        }
        
    })

    // Handle toggle button click
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.toggle-btn.active').classList.remove('active');
            button.classList.add('active');
            renderStrategyCards();
        });
    });

    // Handle date change
    dateSelect.addEventListener('change', renderStrategyCards);

    // Initial render
    renderStrategyCards();

    function renderStrategyCards() {
        strategyCardsContainer.innerHTML = '';
        const selectedView = document.querySelector('.toggle-btn.active').dataset.view;
        const selectedDate = dateSelect.value;

        const viewObject = strategyArray.find(strategy => strategy.View === selectedView);
        const strategies = viewObject?.Value[selectedDate] || [];

        if (strategies.length === 0) {
            strategyCardsContainer.innerHTML = `<div class="empty-state"><div class="empty-text">There are no strategies for </div> <div class="empty-date"> ${formatDateString(selectedDate)}</div> </div>`;
        } else {
            const strategyCountMap = strategies.reduce((acc, strategy) => {
                acc[strategy] = (acc[strategy] || 0) + 1;
                return acc;
            }, {});

            for (const [strategy, count] of Object.entries(strategyCountMap)) {
                const card = document.createElement('div');
                card.classList.add('card');

                strategyCardsContainer.appendChild(card);

                const cardStrName = document.createElement('div');
                cardStrName.classList.add('cardStrName');
                cardStrName.textContent = `${strategy}`;
                card.appendChild(cardStrName)


                const countStr = document.createElement('div');
                countStr.classList.add('countStr');

                // Create a span for the dot
                const dotSpan = document.createElement('span');
                dotSpan.classList.add('dot');
                dotSpan.textContent = '•'; // Unicode character for smaller bullet point

                // Create a text node for the count text
                const countText = document.createTextNode(` ${count > 1 ? `${count} Strategies` : 'Strategy'}`);

                // Append the dot and the text to countStr
                countStr.appendChild(dotSpan);
                countStr.appendChild(countText);
                card.appendChild(countStr);




            }
        }
    }

});

function formatDateString(dateStr) {
    const parts = dateStr.split('-'); 
    const day = parts[0];
    const month = parts[1].charAt(0).toUpperCase() + parts[1].slice(1); 
    const year = parts[2];
    return `${day} ${month} ${year}`;
}
