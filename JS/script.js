document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        const nameInput = document.getElementById('fullName');
        const serviceSelect = document.getElementById('serviceSelect');
        const barberSelect = document.getElementById('barberSelect');
        const dateInput = document.getElementById('bookDate');

        const sumName = document.getElementById('sumName');
        const sumService = document.getElementById('sumService');
        const sumBarber = document.getElementById('sumBarber');
        const sumDate = document.getElementById('sumDate');
        const sumTotal = document.getElementById('sumTotal');

        function updateSummary() {
            sumName.textContent = `Name: ${nameInput.value || '---'}`;
            sumBarber.textContent = `Barber: ${barberSelect.value || '---'}`;
            sumDate.textContent = `Date: ${dateInput.value || '---'}`;
            
            if (serviceSelect.value) {
                const [serviceName, price] = serviceSelect.value.split('|');
                sumService.textContent = `Service: ${serviceName}`;
                sumTotal.textContent = `Total Cost: ${price}`;
            } else {
                sumService.textContent = `Service: ---`;
                sumTotal.textContent = `Total Cost: $0`;
            }
        }

        // Handle URL Parameters (e.g. booking.html?service=Classic%20Haircut)
        const params = new URLSearchParams(window.location.search);
        const urlService = params.get("service");

        if (urlService) {
            const decodedService = decodeURIComponent(urlService);
            for (let option of serviceSelect.options) {
                if (option.value.startsWith(decodedService)) {
                    serviceSelect.value = option.value;
                    break;
                }
            }
        }

        updateSummary();

        nameInput.addEventListener('input', updateSummary);
        serviceSelect.addEventListener('change', updateSummary);
        barberSelect.addEventListener('change', updateSummary);
        dateInput.addEventListener('change', updateSummary);

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const [serviceName] = serviceSelect.value.split('|');
            
            alert(`Success! Thank you, ${nameInput.value}.\nYour appointment for a "${serviceName}" with ${barberSelect.value} has been secured for ${dateInput.value}.`);
            
            bookingForm.reset();
            updateSummary();
        });
    }
});