// Datos del índice RIPTE desde 2015 hasta la actualidad
const ripteData = {
  // Valores mensuales del RIPTE por año
  // Fuente: Ministerio de Trabajo, Empleo y Seguridad Social de Argentina
  2015: {
    valores: [11998.00, 12410.77, 12869.99, 13077.34, 13556.94, 14104.44, 14535.84, 14598.48, 14983.42, 15202.49, 15526.19, 15800.99],
    variacionAnual: 32.19
  },
  2016: {
    valores: [15822.95, 16520.57, 16977.34, 17691.33, 18042.76, 18277.67, 18988.50, 19216.84, 19666.53, 20069.32, 20422.68, 20690.22],
    variacionAnual: 30.94
  },
  2017: {
    valores: [21048.30, 21483.11, 22285.55, 22650.63, 23030.06, 23470.04, 24849.26, 24700.54, 25136.41, 25843.57, 26177.42, 26301.47],
    variacionAnual: 27.12
  },
  2018: {
    valores: [26929.90, 27440.30, 28072.39, 28858.11, 29338.86, 29598.17, 30283.89, 30978.81, 31523.68, 33154.35, 33733.87, 34339.72],
    variacionAnual: 30.56
  },
  2019: {
    valores: [35362.36, 36733.81, 38884.59, 39658.24, 40911.24, 41584.36, 43291.07, 44092.97, 45485.33, 47834.45, 48591.74, 49574.49],
    variacionAnual: 44.36
  },
  2020: {
    valores: [53070.39, 56386.69, 56873.03, 56955.79, 57058.06, 58362.15, 60440.76, 60767.44, 61910.11, 64756.42, 65571.97, 66869.24],

    variacionAnual: 34.89
  },
  2021: {
    valores: [68100.97, 72293.62, 75809.39, 80502.20, 81464.74, 84513.84, 88274.31, 90340.32, 94157.71, 97538.78, 100590.14, 102589.87],
    variacionAnual: 53.42
  },
  2022: {
    valores: [107358.85, 112413.82, 121220.45, 128406.32, 133595.77, 141289.40, 148811.85, 155611.28, 165421.01, 174436.90, 184210.25, 194175.11],

    variacionAnual: 89.27
  },
  2023: {
    valores: [201580.26, 218543.91, 239882.73, 263481.22, 279820.37, 302562.69, 324997.28, 344057.43, 376594.32, 420706.55, 447079.59, 484079.57],
    variacionAnual: 149.41
  },
  2024: {
    valores: [555269.16, 619007.05, 705832.58, 819501.72, 879483.08, 933179.85, 994681.38, 1032410.48, 1075145.08, 1146474.18, 1178925.33, 1202927.89],
    variacionAnual: 148.39
  },
  2025: {
    valores: [1234658.40, 1310357.80, 1363510.33, 1402606.61, 1428661.30,  null, null, null, null, null, null, null],
    variacionAnual: 62.44
  }

};

// Nombres de los meses para la tabla
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

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

// Función para mostrar/ocultar detalles
function toggleDetails(id) {
  const details = document.getElementById(id);
  if (details.style.display === "none" || details.style.display === "") {
    details.style.display = "block"; // Mostrar detalles
  } else {
    details.style.display = "none"; // Ocultar detalles
  }
}

// Función para cargar la tabla RIPTE
function cargarTablaRIPTE() {
  const tabla = document.getElementById('tabla-ripte-valores').getElementsByTagName('tbody')[0];
  
  // Limpiar tabla
  tabla.innerHTML = '';
  
  // Agregar filas para cada año
  Object.keys(ripteData).forEach(año => {
    const fila = tabla.insertRow();
    
    // Agregar celda para el año
    const celdaAño = fila.insertCell();
    celdaAño.textContent = año;
    
    // Agregar celdas para cada mes
    for (let i = 0; i < 12; i++) {
      const celda = fila.insertCell();
      const valor = ripteData[año].valores[i];
      celda.textContent = valor ? `$${valor.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '-';
    }
    
    // Agregar celda para la variación anual
    const celdaVariacion = fila.insertCell();
    const variacion = ripteData[año].variacionAnual;
    celdaVariacion.textContent = variacion ? `${variacion.toFixed(2)}%` : '-';
  });
}

// Función para crear el gráfico de barras
function crearGraficoRIPTE() {
  const canvas = document.getElementById('ripteChart');
  
  // Preparar datos para el gráfico
  const años = Object.keys(ripteData);
  const variaciones = años.map(año => ripteData[año].variacionAnual || 0);
  
  // Crear el gráfico
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: años,
      datasets: [{
        label: 'Variación Anual (%)',
        data: variaciones,
        backgroundColor: 'rgba(8, 149, 130, 0.7)',
        borderColor: 'rgba(8, 149, 130, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Porcentaje (%)',
            font: {
              weight: 'bold'
            }
          }
        },
        x: {
          title: {
            display: true,
            text: 'Año',
            font: {
              weight: 'bold'
            }
          }
        }
      }
    }
  });
}

// Cargar la tabla y el gráfico cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
  cargarTablaRIPTE();
  crearGraficoRIPTE();
});
