let patientData = [];

// Function to add a patient
function addPatient() {
    const name = document.getElementById('name').value;
    const severity = document.getElementById('severity').value;

    if (name === "") {
        alert("Please enter a patient name.");
        return;
    }

    // Add patient to the list
    patientData.push({
        name: name,
        severity: parseInt(severity) // Convert severity to an integer
    });

    // Update the patient list display
    updatePatientList();

    // Clear input fields
    document.getElementById('name').value = "";
    document.getElementById('severity').value = "1";
}

// Function to update the displayed patient list
function updatePatientList() {
    const patientListDiv = document.getElementById('patientList');
    patientListDiv.innerHTML = ''; // Clear previous list

    patientData.forEach((patient, index) => {
        const newPatient = document.createElement('p');
        newPatient.innerHTML = `Patient: ${patient.name} | Severity: ${patient.severity}
                                <button onclick="removePatient(${index})">Remove</button>`;
        patientListDiv.appendChild(newPatient);
    });
}

// Function to remove a patient from the list
function removePatient(index) {
    // Remove the patient from the array
    patientData.splice(index, 1);

    // Update the displayed patient list
    updatePatientList();
}

// Add event listener for form submission
document.getElementById('appointmentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addPatient(); // Call the addPatient function
});

// Function to display the appointment list
function displayAppointments() {
    // Sort patients by severity (high to low)
    const appointmentsListDiv = document.getElementById('appointmentsList');
    appointmentsListDiv.innerHTML = ''; // Clear previous list

    // Check if there are no patients
    if (patientData.length === 0) {
        appointmentsListDiv.innerHTML = '<p>No appointments available.</p>';
    } else {
        patientData.sort((a, b) => b.severity - a.severity);

        patientData.forEach((patient) => {
            const appointmentItem = document.createElement('p');
            appointmentItem.innerHTML = `Severity ${patient.severity}: ${patient.name}`;
            appointmentsListDiv.appendChild(appointmentItem);
        });
    }

    // Show the appointment page
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';
}

// Function to go back to the form
function goBack() {
    // Go back to the form (page 1)
    document.getElementById('page1').style.display = 'block';
    document.getElementById('page2').style.display = 'none';
}






