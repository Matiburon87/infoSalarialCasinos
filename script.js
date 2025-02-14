// Función para calcular el nuevo sueldo
function calculateNewSalary() {
  const currentSalary = parseFloat(document.getElementById('currentSalary').value);
  const increasePercentage = parseFloat(document.getElementById('increasePercentage').value);
  
  if (isNaN(currentSalary) || isNaN(increasePercentage)) {
    alert("Por favor, ingresa valores válidos.");
    return;
  }
  
  // Calcular el nuevo sueldo bruto
  const newSalaryBruto = currentSalary * (1 + increasePercentage / 100);
  
  // Calcular el sueldo de bolsillo (descontando 23.1%)
  const descuento = 23.1; // Porcentaje de descuento
  const sueldoBolsillo = newSalaryBruto * (1 - descuento / 100);
  
  // Mostrar los resultados
  document.getElementById('result-bruto').innerText = `Nuevo Sueldo Bruto: $${newSalaryBruto.toFixed(2)}`;
  document.getElementById('result-bolsillo').innerText = `Sueldo de Bolsillo (descontado 23.1%): $${sueldoBolsillo.toFixed(2)}`;
}
function toggleDetails(id) {
  const details = document.getElementById(id);
  if (details.style.display === "none" || details.style.display === "") {
    details.style.display = "block"; // Mostrar detalles
  } else {
    details.style.display = "none"; // Ocultar detalles
  }
}
