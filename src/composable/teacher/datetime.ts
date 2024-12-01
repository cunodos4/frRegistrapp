import { ref, computed, onMounted } from 'vue';
import { DatetimeCustomEvent } from '@ionic/core/dist/types/components/datetime/datetime-interface';
import { getDates } from './dateActions';

interface Clase {
  fecha: string;
  asistencia: boolean;
}

export function dateCompo() {
  const dates = ref<Clase[]>([]); // Inicializa como un arreglo vacío
  const today = new Date().toISOString().split('T')[0]; // .split('T')[0] para solo la fecha
  const selectedDate = ref(today);

  // Función para obtener datos de forma independiente
  const fetchData = async () => {
    const data = await getDates(); // Llama al método para obtener los datos
    dates.value = data.clases; // Asegúrate de que dates.value sea el arreglo 'clases'
  };

  // Llama a fetchData de forma asíncrona pero sin interferir en setup()
  onMounted(() => {
    fetchData(); // Ejecuta la función de manera controlada
  });

  // Función para manejar el cambio de fecha
  const handleDateChange = (event: DatetimeCustomEvent) => {
    const value = event.detail.value;
    if (value && typeof value === 'string') {
      // Si es un valor de tipo string, extraemos la fecha en formato YYYY-MM-DD
      selectedDate.value = value.split('T')[0];
    } else {
      selectedDate.value = ''; // Si no es válido, se limpia el valor
    }
  };

  // Filtrar las fechas según la fecha seleccionada
 const filteredDates = computed(() => {
    if (Array.isArray(dates.value)) {
      return dates.value.filter(item => {
        // Verificar si 'item.fecha' es un string o un objeto de tipo Date
        let fechaStr = item.fecha;

        if (typeof fechaStr !== 'string') {
          // Si 'fecha' no es un string, intentar convertirlo a string
          fechaStr = new Date(fechaStr).toISOString().split('T')[0];  // Convierte a ISO string (YYYY-MM-DDTHH:mm:ss.sssZ)
        }

        // Extraemos la parte de la fecha (YYYY-MM-DD)
        const date = fechaStr;
        return date === selectedDate.value;
      });
    }
    return [];  // Si no es un arreglo, retornamos un arreglo vacío
  });
  
  

  // Solo retorna valores sin lógica asíncrona
  return {
    selectedDate,
    handleDateChange,
    filteredDates,
  };
}
