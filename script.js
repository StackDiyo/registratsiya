// Kategoriya tugmalari 
const categoryButtons = document.querySelectorAll('.category');
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
    });
});

// Testlar ro'yxati 
const testsForm = document.getElementById('tests-form');
const selectedTestsBody = document.getElementById('selected-tests-body');
const totalEl = document.getElementById('total');
const paidEl = document.getElementById('paid');
const remainingEl = document.getElementById('remaining');

let selectedTests = [];

testsForm.addEventListener('change', (e) => {
    if (e.target.name === 'test') {
        const testName = e.target.value;
        const testPrice = parseInt(e.target.dataset.price);

        // Agar oldin qo'shilgan bo'lsa
        const exists = selectedTests.some(t => t.name === testName);
        if (!exists) {
            selectedTests.push({ name: testName, price: testPrice });
            renderSelectedTests();
        }
    }
});

// Jadvalni chizish
function renderSelectedTests() {
    selectedTestsBody.innerHTML = '';
    selectedTests.forEach((test, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${test.name}</td>
            <td>
                <button class="delete-btn" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        selectedTestsBody.appendChild(row);
    });

    calculateSummary();
}

// O'chirish tugmasi
selectedTestsBody.addEventListener('click', (e) => {
    if (e.target.closest('.delete-btn')) {
        const index = e.target.closest('.delete-btn').dataset.index;
        selectedTests.splice(index, 1);
        renderSelectedTests();
    }
});

// Jami, Qoldi hisoblash
function calculateSummary() {
    let total = selectedTests.reduce((sum, test) => sum + test.price, 0);
    let paid = 0; // Hozircha 0 (keyinchalik to‘lov tizimi bilan integratsiya qilinadi)
    let remaining = total - paid;

    totalEl.textContent = total.toLocaleString();
    paidEl.textContent = paid.toLocaleString();
    remainingEl.textContent = remaining.toLocaleString();
}

// Saqlash tugmasi
document.querySelector('.save-btn').addEventListener('click', () => {
    if (selectedTests.length === 0) {
        alert('Hech qanday test tanlanmagan!');
        return;
    }
    console.log('Saqlangan testlar:', selectedTests);
    alert('Testlar muvaffaqiyatli saqlandi!');
});
